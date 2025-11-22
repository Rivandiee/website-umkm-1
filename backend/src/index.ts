import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { responseHandler } from "./utils/responseHandler";
import router from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Response Handler (dari file yang kamu upload)
app.use(responseHandler);

// Serve Static Images (untuk upload gambar menu)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api", router);

// Root Route
app.get("/", (req, res) => {
  res.send("UMKM Backend API is Running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});