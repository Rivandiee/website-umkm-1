// frontend/src/app/admin/login/page.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import axios untuk panggilan API

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "/api/admin/login"; // Endpoint API login yang diasumsikan

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Bersihkan error sebelumnya
    setIsLoading(true);

    try {
      // 1. Kirim kredensial ke API backend
      const response = await axios.post(API_URL, {
        username,
        password,
      });

      // Asumsi: Backend merespons dengan data yang mengandung token JWT
      const { token } = response.data;

      if (token) {
        // 2. Simpan token (misalnya di localStorage untuk sesi)
        localStorage.setItem("admin_token", token);
        
        // 3. Redirect ke dashboard
        router.push("/admin");
      } else {
        // Jika respons 200 OK tapi tidak ada token
        setError("Login gagal. Respon API tidak valid.");
      }

    } catch (err: any) {
      // 4. Tangani error dari API (e.g., 401 Unauthorized)
      console.error("Login API Error:", err);
      
      // Ambil pesan error dari respons API atau gunakan pesan default
      const errorMessage = err.response?.data?.message || "Username atau password salah!";
      setError(errorMessage);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-100 to-indigo-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-gray-800 mb-6"
        >
          Admin Login
        </motion.h1>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-center mb-4"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              className="mt-1 w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isLoading} // Menonaktifkan input saat loading
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="mt-1 w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isLoading} // Menonaktifkan input saat loading
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: isLoading ? 1 : 1.05 }} // Non-aktifkan hover scale saat loading
            whileTap={{ scale: isLoading ? 1 : 0.95 }} // Non-aktifkan tap scale saat loading
            className={`w-full text-white font-semibold py-3 rounded-xl shadow-lg transition-all mt-2 ${
                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Login"}
          </motion.button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          © 2025 UMKM Rumah Makan
        </p>
      </motion.div>
    </div>
  );
}