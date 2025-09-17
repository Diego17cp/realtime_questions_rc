import { QuestionState } from "./database"

export interface Stats {
    nuevas: number
    aceptadas: number
    rechazadas: number
    respondidas: number
    total: number
}

export interface ServerToClientEvents {
    "server:formStatusChanged": (enabled: boolean) => void
    "server:newQuestion": (question: any) => void
    "server:questionAccepted": (question: any) => void
    "server:questionRejected": (question: any) => void
    "server:questionAnswered": (question: any) => void
    "server:statsUpdate": (stats: Stats) => void
    "server:pendingQuestions": (questions: any[]) => void
    "server:acceptedQuestions": (questions: any[]) => void
    "server:answeredQuestions": (questions: any[]) => void
    "server:selectingRandomQuestion": (data: { loading: boolean }) => void
    "server:error": (error: { message: string }) => void
}
export interface ClientToServerEvents {
    "client:submitQuestion": (question: { texto: string, ejeId: string }) => void
    "client:updateQuestionState": (data: { id: string, estado: QuestionState }) => void
    "client:toggleForm": () => void
    "client:selectRandomQuestion": () => void
    "client:joinRoom": (room: "users" | "moderators" | "presentation") => void
    "client:getFormStatus": () => void
    "client:getStats": () => void
}