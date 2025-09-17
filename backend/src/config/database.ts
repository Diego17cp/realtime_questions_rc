import { PrismaClient } from "@prisma/client";

export class DatabaseConnection {
	private static instance: DatabaseConnection;
	private prisma: PrismaClient;
	private isConnected: boolean = false;

	private constructor() {
		this.prisma = new PrismaClient({
			log: ['query', 'info', 'warn', 'error'],
		});
	}
    
	public static getInstance(): DatabaseConnection {
		if (!DatabaseConnection.instance)
			DatabaseConnection.instance = new DatabaseConnection();
		return DatabaseConnection.instance;
	}

	public async connect(): Promise<void> {
		if (this.isConnected) return;
		try {
			await this.prisma.$connect();
			this.isConnected = true;
			console.log("Connected to PostgreSQL");
		} catch (error) {
			console.error("Error connecting to PostgreSQL:", error);
			throw error;
		}
	}

	public async disconnect(): Promise<void> {
		if (!this.isConnected) return;
		try {
			await this.prisma.$disconnect();
			this.isConnected = false;
			console.log("Disconnected from PostgreSQL");
		} catch (error) {
			console.error("Error disconnecting from PostgreSQL:", error);
			throw error;
		}
	}

	public getClient(): PrismaClient {
		return this.prisma;
	}

	public getStatus() {
		return {
			connected: this.isConnected,
			provider: "postgresql",
		};
	}
}
