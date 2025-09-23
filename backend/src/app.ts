import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler";
import { validateOrigin } from "./middleware/validateOrigin";
import { DatabaseConnection } from "./config/database";
import { EjeService } from "./services/eje.service";

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
// API for list of ejes
app.get("/api/ejes", validateOrigin, async (_, res) => {
	try {
		const ejes = await EjeService.findAll();
		res.json({
			success: true,
			data: ejes,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error al obtener los ejes",
		})
	}
})

// API status
app.get("/api/status", (_, res) => {
	res.json({
		status: "RUNNING",
		timestamp: new Date().toISOString(),
	});
});

app.use(errorHandler);

export default app;
