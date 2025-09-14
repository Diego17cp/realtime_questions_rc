import http from "http";
import { Server as IOServer } from "socket.io";
import dotenv from "dotenv";
import app from "./app";
import { DatabaseConnection } from "./config/database";
import registerSocketHandlers from "./sockets";

dotenv.config();

const PORT = Number(process.env.PORT || 3000);
const server = http.createServer(app);
const io = new IOServer(server, {
	cors: { origin: process.env.FRONTEND_URL || "http://localhost:4321" },
});

async function start() {
	try {
		await DatabaseConnection.getInstance().connect();
		registerSocketHandlers(io);
		server.listen(PORT, () => {
			console.log(`Server running on port http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error("Error starting server:", error);
		process.exit(1);
	}
}
start();
