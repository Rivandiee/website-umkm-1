import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { responseHandler } from "./utils/responseHandler";
import router from "./routes";

// --- Tambahan Import Swagger ---
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Response Handler
app.use(responseHandler);

// Serve Static Images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// --- Setup Swagger UI ---
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);

// Routes
app.use("/api", router);

// Root Route
app.get("/", (req, res) => {
  res.send("UMKM Backend API is Running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});