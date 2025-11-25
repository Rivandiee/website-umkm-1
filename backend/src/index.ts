import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { createServer } from "http"; // Import createServer
import { Server } from "socket.io";  // Import Socket.io
import { responseHandler } from "./utils/responseHandler";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

dotenv.config();

const app = express();
const httpServer = createServer(app); // Buat HTTP Server
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Sesuaikan dengan URL frontend
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simpan instance 'io' ke dalam app agar bisa diakses di controller
app.set("io", io);

// Socket.io Connection Handler (Opsional: untuk debug)
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
  
  // Room join logic jika customer ingin listen spesifik order ID
  socket.on("join-order", (orderId) => {
    socket.join(`order-${orderId}`);
  });
});

// Custom Response Handler
app.use(responseHandler);

// Serve Static Images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);

// Routes
app.use("/api", router);

// Root Route
app.get("/", (req, res) => {
  res.send("UMKM Backend API is Running...");
});

// Ganti app.listen dengan httpServer.listen
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});