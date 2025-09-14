import { Types } from "mongoose";
import { Pregunta } from "../models/pregunta.model";
import { QuestionState } from "../types/database";

export class PreguntaService {
    static async create(texto: string, eje: { _id: Types.ObjectId, nombre: string }) {
        return await Pregunta.createWithEje({ texto, ejeId: eje._id }, eje);
    }
    static async updateEstado(id: string, estado: QuestionState) {
        return await Pregunta.updateEstado(id, estado);
    }
    static async findByEstado(estado: QuestionState) {
        return await Pregunta.findByEstado(estado);
    }
    static async findAceptadas() {
        return await Pregunta.findAceptadas();
    }
    static async getRandomAceptada() {
        return await Pregunta.getRandomAceptada();
    }
}