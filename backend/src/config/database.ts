import mongoose from "mongoose";

export class DatabaseConnection {
	private static instance: DatabaseConnection;
	private isConnected: boolean = false;

	private constructor() {}
    
	public static getInstance(): DatabaseConnection {
		if (!DatabaseConnection.instance)
			DatabaseConnection.instance = new DatabaseConnection();
		return DatabaseConnection.instance;
	}
	public async connect(): Promise<void> {
		if (this.isConnected) return;
		try {
			const connectionUri = process.env.MONGODB_URI;
			await mongoose.connect(connectionUri!);
			this.isConnected = true;
			console.log("Connected to MongoDB");
			this.setupConnectionEvents();
		} catch (error) {
			console.error("Error connecting to MongoDB:", error);
			throw error;
		}
	}
	public async disconnect(): Promise<void> {
		if (!this.isConnected) return;
		try {
			await mongoose.disconnect();
			this.isConnected = false;
			console.log("Disconnected from MongoDB");
		} catch (error) {
			console.error("Error disconnecting from MongoDB:", error);
			throw error;
		}
	}
	public getConnection(): mongoose.Connection {
		return mongoose.connection;
	}
	public getStatus() {
		const conn = mongoose.connection
		return {
			readyState: conn.readyState,
			host: conn.host,
			name: conn.name,
		}
	}
	private setupConnectionEvents(): void {
		mongoose.connection.on("error", (err) => {
			console.error("MongoDB connection error:", err);
		});
		mongoose.connection.on("disconnected", () => {
			console.warn("MongoDB disconnected. Attempting to reconnect...");
			this.isConnected = false;
		});
		mongoose.connection.on("reconnected", () => {
			console.log("MongoDB reconnected");
			this.isConnected = true;
		});
	}
}
