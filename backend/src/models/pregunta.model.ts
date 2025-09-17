import { Model, Schema, Types, model } from "mongoose";
import { IPregunta, IPreguntaCreate, QuestionState } from "../types/database";

interface IPreguntaModel extends Model<IPregunta> {
    findByEstado(estado: QuestionState): Promise<IPregunta[]>;
    findAceptadas(): Promise<IPregunta[]>;
    createWithEje(data: IPreguntaCreate, eje: { _id: Types.ObjectId, nombre: string }): Promise<IPregunta>;
    updateEstado(id: string, newState: QuestionState): Promise<IPregunta | null>;
    getRandomAceptada(): Promise<IPregunta | null>;
}
interface IPreguntaDocument extends IPregunta {
    aceptar(): Promise<IPreguntaDocument>;
    rechazar(): Promise<IPreguntaDocument>;
    responder(): Promise<IPreguntaDocument>;
}

const preguntaSchema = new Schema<IPreguntaDocument>({
	texto: { type: String, required: true, trim: true },
	eje: {
		_id: { type: Schema.Types.ObjectId, required: true },
		nombre: { type: String, required: true, trim: true },
	},
	estado: {
		type: String,
		enum: ["registrada", "aceptada", "rechazada", "respondida"],
		default: "registrada",
        index: true
	},
}, { timestamps: true });

preguntaSchema.index({ estado: 1, createdAt: -1 });
preguntaSchema.index({ "eje._id": 1 });

preguntaSchema.statics = {
    async findByEstado(estado: QuestionState) {
        return this.find({ estado }).sort({ createdAt: -1 }).lean();
    },
    async findAceptadas() {
        return this.find({ estado: "aceptada" }).lean();
    },
    async createWithEje(data: IPreguntaCreate, eje: { _id: Types.ObjectId, nombre: string }) {
        return this.create({
            texto: data.texto,
            eje: { _id: eje._id, nombre: eje.nombre },
        })
    },
    async updateEstado(id: string, newState: QuestionState) {
        return this.findByIdAndUpdate(
            id,
            { estado: newState },
            { new: true, lean: true }
        )
    },
    async getRandomAceptada() {
        const aceptadas = await this.find({ estado: "aceptada" })
        if (aceptadas.length === 0) return null
        const randomIndex = Math.floor(Math.random() * aceptadas.length)
        return aceptadas[randomIndex]
    }
}
preguntaSchema.methods = {
    async aceptar() {
        this.estado = "aceptada"
        return this.save()
    },
    async rechazar() {
        this.estado = "rechazada"
        return this.save()
    },
    async responder() {
        this.estado = "respondida"
        return this.save()
    }
}

preguntaSchema.set("toJSON", {
    virtuals: true,
    transform: (_, obj: any) => {
        if (obj._id) {
            obj.id = obj._id.toString();
            obj._id = obj._id.toString(); // ← Mantiene _id como string (opcional)
        }        
        if (obj.eje && obj.eje._id) {
            obj.eje.id = obj.eje._id.toString();
            obj.eje._id = obj.eje._id.toString(); // ← Mantiene _id como string (opcional)
        }
        delete obj.__v;
        return obj;
    }
});

export const Pregunta = model<IPreguntaDocument, IPreguntaModel>("Pregunta", preguntaSchema);
