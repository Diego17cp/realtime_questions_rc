import { Eje, Pregunta, QuestionState } from "@prisma/client";

export { QuestionState };

export type IEje = Eje;

export type IPregunta = Pregunta & {
    eje: Eje;
};

// Operations
export interface IPreguntaCreate {
    texto: string;
    ejeId: string;
}