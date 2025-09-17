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
			socket.current = io(API_URL);
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
			});
			socket.current.on("connect", () => {
				setIsLoading(false);
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
					setQuestions((prevQuestions) =>
						prevQuestions.map((q) =>
							q._id === updatedQuestion._id ? updatedQuestion : q
						)
					);
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
