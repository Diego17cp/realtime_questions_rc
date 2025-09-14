import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler";
import { DatabaseConnection } from "./config/database";

const app: Application = express();

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:4321",
		methods: ["GET", "POST", "PATCH", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.use(helmet());

// Health check
app.get("/", (_, res) => {
	res.json({
		message: "Sistema de Preguntas en Tiempo Real - API",
		status: "running",
		timestamp: new Date().toISOString(),
	});
});

// API status
app.get("/api/status", (_, res) => {
	res.json({
		api: "active",
		database: DatabaseConnection.getInstance().getStatus(),
		timestamp: new Date().toISOString(),
	});
});

app.use(errorHandler);

export default app;
