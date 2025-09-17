import { useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import type { Question } from "./usePanel";
import { toast } from "sonner";

export const usePresentation = () => {
    const API_URL = import.meta.env.PUBLIC_API_URL;
    const socket = useRef<Socket | null>(null);

    const [acceptedQuestions, setAcceptedQuestions] = useState<Question[]>([]);
    const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSelectingRandom, setIsSelectingRandom] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

    useEffect(() => {
        if (!socket.current) {
            socket.current = io(API_URL);
            socket.current.emit("client:joinRoom", "presentation");

            socket.current.on("server:error", (data: { message: string }) => {
                console.error("Error from server:", data.message || "Unknown error");
                toast.error("Error", { description: data.message });
            });

            socket.current.on("server:acceptedQuestions", (questions: Question[]) => {
                setAcceptedQuestions(questions);
                setIsLoading(false);
            });

            socket.current.on("server:answeredQuestions", (questions: Question[]) => {
                setAnsweredQuestions(questions);
                setIsLoading(false);
            });

            socket.current.on("server:questionAccepted", (question: Question) => {
                setAcceptedQuestions((prevQuestions) => [question, ...prevQuestions]);
            });

            socket.current.on("server:questionAnswered", (question: Question) => {
                setAcceptedQuestions((prev) => {
                    const filtered = prev.filter((q) => q._id !== question._id);
                    return filtered;
                });
                
                setAnsweredQuestions((prev) => {
                    const updated = [question, ...prev];
                    return updated;
                });

                setSelectedQuestion(question);
            });

            socket.current.on("server:selectingRandomQuestion", (data: { loading: boolean }) => {
                setIsSelectingRandom(data.loading);
                if (data.loading) {
                    toast.loading("Seleccionando pregunta aleatoria...", { id: "selecting" });
                } else {
                    toast.dismiss("selecting");
                }
            });

            socket.current.on("connect", () => {
                setIsLoading(false);
            });
        }

        return () => {
            if (socket.current) {
                socket.current.disconnect();
                socket.current = null;
            }
        };
    }, [API_URL]);

    const selectRandomQuestion = () => {
        if (socket.current && acceptedQuestions.length > 0 && !isSelectingRandom) {
            socket.current.emit("client:selectRandomQuestion");
        } else {
            if (acceptedQuestions.length === 0) {
                toast.error("No hay preguntas aceptadas disponibles");
            } else if (isSelectingRandom) {
                toast.info("Ya se está seleccionando una pregunta");
            }
        }
    };

    return {
        acceptedQuestions,
        answeredQuestions,
        isLoading,
        isSelectingRandom,
        selectRandomQuestion,
        selectedQuestion,
        setSelectedQuestion,
    };
};
