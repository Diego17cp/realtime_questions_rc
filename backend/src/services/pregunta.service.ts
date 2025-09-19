import { QuestionState } from "../types/database";
import { PreguntaRepository } from "../repositories/pregunta.repository";
import { EjeRepository } from "../repositories/eje.repository";
import { DatabaseConnection } from "../config/database";
import { transformPreguntaForFrontend, transformPreguntasArrayForFrontend } from "../helpers/transformers";

export class PreguntaService {
    private static preguntaRepository = new PreguntaRepository();
    private static ejeRepository = new EjeRepository();
    private static db = DatabaseConnection.getInstance().getClient();

    static async create(texto: string, ejeId: string) {
        const eje = await this.ejeRepository.findById(ejeId);
        if (!eje) {
            throw new Error("Eje no encontrado");
        }
        const pregunta = await this.preguntaRepository.create({ texto, ejeId });
        return transformPreguntaForFrontend(pregunta);
    }

    static async updateEstado(id: string, estado: QuestionState) {
        const pregunta = await this.preguntaRepository.updateEstado(id, estado);
        return pregunta ? transformPreguntaForFrontend(pregunta) : null;
    }

    static async findByEstado(estado: QuestionState) {
        const preguntas = await this.preguntaRepository.findByEstado(estado);
        return transformPreguntasArrayForFrontend(preguntas);
    }

    static async findAceptadas() {
        const preguntas = await this.preguntaRepository.findAceptadas();
        return transformPreguntasArrayForFrontend(preguntas);
    }

    static async getRandomAceptada() {
        console.log("🔍 Seleccionando pregunta aleatoria aceptada...");
        const pregunta = await this.preguntaRepository.getRandomAceptadaWeighted();
        if (pregunta) console.log("✅ Pregunta seleccionada:", pregunta.id);
        else console.log("❌ No se pudo seleccionar una pregunta");
        return pregunta ? transformPreguntaForFrontend(pregunta) : null;
    }

    static async getStats() {
        const [registradas, aceptadas, rechazadas, respondidas] = await Promise.all([
            this.db.pregunta.count({ where: { estado: QuestionState.registrada } }),
            this.db.pregunta.count({ where: { estado: QuestionState.aceptada } }),
            this.db.pregunta.count({ where: { estado: QuestionState.rechazada } }),
            this.db.pregunta.count({ where: { estado: QuestionState.respondida } }),
        ]);
        
        return { 
            nuevas: registradas, 
            aceptadas, 
            rechazadas, 
            respondidas, 
            total: registradas + aceptadas + rechazadas + respondidas 
        };
    }
}