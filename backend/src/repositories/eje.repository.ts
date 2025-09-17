import { DatabaseConnection } from "../config/database";
import { IEje } from "../types/database";

export class EjeRepository {
    private db = DatabaseConnection.getInstance().getClient();

    async findAll(): Promise<IEje[]> {
        return this.db.eje.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }

    async findById(id: string): Promise<IEje | null> {
        return this.db.eje.findUnique({
            where: { id }
        });
    }

    async create(data: { nombre: string }): Promise<IEje> {
        return this.db.eje.create({
            data
        });
    }

    async update(id: string, data: { nombre: string }): Promise<IEje> {
        return this.db.eje.update({
            where: { id },
            data
        });
    }

    async delete(id: string): Promise<IEje> {
        return this.db.eje.delete({
            where: { id }
        });
    }
}