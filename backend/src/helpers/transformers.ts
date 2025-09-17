import { IPregunta, IEje } from "../types/database";

// Transform Prisma objects to frontend-compatible format
export const transformPreguntaForFrontend = (pregunta: IPregunta) => {
    return {
        _id: pregunta.id,
        id: pregunta.id,
        texto: pregunta.texto,
        estado: pregunta.estado,
        createdAt: pregunta.createdAt,
        updatedAt: pregunta.updatedAt,
        eje: {
            id: pregunta.eje.id,
            _id: pregunta.eje.id,
            nombre: pregunta.eje.nombre,
            createdAt: pregunta.eje.createdAt,
            updatedAt: pregunta.eje.updatedAt
        }
    };
};

export const transformEjeForFrontend = (eje: IEje) => {
    return {
        _id: eje.id,
        id: eje.id,
        nombre: eje.nombre,
        createdAt: eje.createdAt,
        updatedAt: eje.updatedAt
    };
};

export const transformPreguntasArrayForFrontend = (preguntas: IPregunta[]) => {
    return preguntas.map(transformPreguntaForFrontend);
};

export const transformEjesArrayForFrontend = (ejes: IEje[]) => {
    return ejes.map(transformEjeForFrontend);
};