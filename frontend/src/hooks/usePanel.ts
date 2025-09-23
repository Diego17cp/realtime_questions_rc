import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

export interface Question {
	_id: string;
	texto: string;
	eje: {
		id: string;
		nombre: string;
	};
	estado: "registrada" | "aceptada" | "rechazada" | "respondida";
	createdAt: string;
	updatedAt: string;
	__v?: number;
}
export const usePanel = () => {
	const API_URL = import.meta.env.PUBLIC_API_URL;
	const SOCKET_URL = import.meta.env.PUBLIC_SOCKET_URL
	const socket = useRef<Socket | null>(null);
	interface Stats {
		nuevas: number;
		aceptadas: number;
		rechazadas: number;
		respondidas: number;
		total: number;
	}

	const [questions, setQuestions] = useState<Question[]>([]);
	const [formEnabled, setFormEnabled] = useState<boolean>(true);
	const [stats, setStats] = useState<Stats>({
		nuevas: 0,
		aceptadas: 0,
		rechazadas: 0,
		respondidas: 0,
		total: 0,
	});
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!socket.current) {
			// For dev without proxy
            // socket.current = io(API_URL)
            // For prod. add path to redirect to backend
            socket.current = io(SOCKET_URL, {
                path: "/api/socket.io",
                transports: ["websocket", "polling"],
            })
			socket.current.emit("client:joinRoom", "moderators");
			socket.current.emit("client:getFormStatus");
			socket.current.on("server:error", (data: { message: string }) => {
				console.error(
					"Error from server:",
					data.message || "Unknown error"
				);
			});
			socket.current.on("server:newQuestion", (newQuestion: Question) => {
				setQuestions((prevQuestions) => [
					newQuestion,
					...prevQuestions,
				]);
			});
			socket.current.on(
				"server:formStatusChanged",
				(enabled: boolean) => {
					setFormEnabled(enabled);
					toast.info(
						`El formulario ha sido ${
							enabled ? "habilitado" : "deshabilitado"
						}.`,
						{
							description: `Los usuarios ${
								enabled ? "pueden" : "no pueden"
							} enviar nuevas preguntas.`,
						}
					);
				}
			);
			socket.current.on("server:statsUpdate", (newStats: Stats) => {
				setStats(newStats);
				setIsLoading(false);
				// Re-sincronizar preguntas pendientes cuando se actualizan las estadísticas
				if (socket.current) {
					socket.current.emit("client:getPendingQuestions");
				}
			});
			socket.current.on("connect", () => {
				setIsLoading(false);
				console.log("Panel conectado al servidor");
			});

			socket.current.on("disconnect", () => {
				console.log("Panel desconectado del servidor");
				setIsLoading(true);
			});

			socket.current.on("reconnect", () => {
				console.log("Panel reconectado al servidor");
				// Re-sincronizar datos después de reconexión
				socket.current?.emit("client:joinRoom", "moderators");
				socket.current?.emit("client:getFormStatus");
				socket.current?.emit("client:getStats");
			});
			socket.current.on(
				"server:pendingQuestions",
				(pendingQuestions: Question[]) => {
					setQuestions(pendingQuestions);
				}
			);
			socket.current.on(
				"server:questionUpdated",
				(updatedQuestion: Question) => {
					setQuestions((prevQuestions) => {
						// Si la pregunta ya no está en estado "registrada", la eliminamos de la lista
						if (updatedQuestion.estado !== "registrada") {
							return prevQuestions.filter((q) => q._id !== updatedQuestion._id);
						}
						// Si sigue siendo "registrada", la actualizamos
						return prevQuestions.map((q) =>
							q._id === updatedQuestion._id ? updatedQuestion : q
						);
					});
				}
			);
		}
		return () => {
			if (socket.current) {
				socket.current.disconnect();
				socket.current = null;
			}
		};
	}, []);
	const toggleFormStatus = () => {
		if (socket.current) {
			socket.current.emit("client:toggleForm");
		}
	};
	const updateQuestionState = (
		id: string,
		estado: "aceptada" | "rechazada"
	) => {
		if (socket.current) {
			socket.current.emit("client:updateQuestionState", { id, estado });
		}
	};
	const pendingQuestions = questions.filter((q) => q.estado === "registrada");
	const refreshStats = () => {
		if (socket.current) {
			socket.current.emit("client:getStats");
		}
	};

	return {
		questions: pendingQuestions,
		formEnabled,
		stats,
		isLoading,
		toggleFormStatus,
		updateQuestionState,
		refreshStats,
	};
};
