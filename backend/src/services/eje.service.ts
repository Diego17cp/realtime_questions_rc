import { Eje } from "../models/eje.model";

export class EjeService {
    static async findAll() {
        return await Eje.find().sort({ nombre: 1 });
    }
    static async findById(id: string) {
        return await Eje.findById(id);
    }
}