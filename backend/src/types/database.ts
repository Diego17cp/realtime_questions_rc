import { Types } from "mongoose";

export type QuestionState = "registrada" | "aceptada" | "rechazada" | "respondida";

export interface IEje {
    _id?: Types.ObjectId
    nombre: string
}
export interface IPregunta {
    _id?: Types.ObjectId
    texto: string
    eje: IEje
    estado: QuestionState
    createdAt?: Date
}

// Operations
export interface IPreguntaCreate {
    texto: string
    ejeId: Types.ObjectId
}