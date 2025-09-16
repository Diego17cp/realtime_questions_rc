import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "../types/socket";
import { SystemService } from "../services/system.service";
import { EjeService } from "../services/eje.service";
import { PreguntaService } from "../services/pregunta.service";

type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
type TypedServer = Server<ClientToServerEvents, ServerToClientEvents>;

const broadcastStats = async (io: TypedServer) => {
    try {
        const stats = await PreguntaService.getStats()
        io.to("moderators").emit("server:statsUpdate", stats)
    } catch (error) {
        console.error("Error broadcasting stats:", error)
    }
}

const registerSocketHandlers = (io: TypedServer) => {
	io.on("connection", (socket: TypedSocket) => {
		console.log("Socket connected:", socket.id);
		socket.on("client:joinRoom", async (room) => {
			socket.join(room);
			console.log(`Socket ${socket.id} joined room: ${room}`);

			if (room === "users")
				socket.emit(
					"server:formStatusChanged",
					SystemService.getFormStatus()
				);
            if (room === "moderators") {
                try {
                    const stats = await PreguntaService.getStats()
                    socket.emit("server:statsUpdate", stats)
                    const pendingQuestions = await PreguntaService.findByEstado("registrada")
                    socket.emit("server:pendingQuestions", pendingQuestions)
                } catch (error) {
                    console.error("Error fetching stats:", error)
                }
            }
		});
        socket.on("client:getStats", async() => {
            try {
                const stats = await PreguntaService.getStats()
                socket.emit("server:statsUpdate", stats)
            } catch (error) {
                console.error("Error fetching stats:", error)
                socket.emit("server:error", { message: "Error al obtener estadísticas" })
            }
        })
        socket.on("client:getFormStatus", () => {
            socket.emit("server:formStatusChanged", SystemService.getFormStatus())
        })
		socket.on("client:submitQuestion", async ({ texto, ejeId }) => {
			try {
				if (!SystemService.getFormStatus()) {
					socket.emit("server:error", {
						message: "El formulario está deshabilitado.",
					});
					return;
				}
				const eje = await EjeService.findById(ejeId);
				if (!eje) {
					socket.emit("server:error", {
						message: "Eje temático no encontrado.",
					});
					return;
				}
				const newQuestion = await PreguntaService.create(texto, {
					_id: eje._id!,
					nombre: eje.nombre,
				});
				io.to("moderators").emit("server:newQuestion", newQuestion);
                await broadcastStats(io);
				console.log("Nueva pregunta recibida:", newQuestion);
			} catch (error) {
				console.error("Error al procesar la nueva pregunta:", error);
				socket.emit("server:error", {
					message: "Error al procesar la pregunta.",
				});
			}
		});
        // Moderators
        socket.on("client:updateQuestionState", async ({ id, estado }) => {
            try {
                const updatedQuestion = await PreguntaService.updateEstado(id, estado);
                if (!updatedQuestion) {
                    socket.emit("server:error", { message: "Pregunta no encontrada." });
                    return;
                }
                if (estado === "aceptada") {
                    io.to("presentation").emit("server:questionAccepted", updatedQuestion);
                }
                await broadcastStats(io);
                console.log("Pregunta actualizada:", updatedQuestion);
            } catch (error) {
                console.error("Error al actualizar la pregunta:", error);
                socket.emit("server:error", { message: "Error al actualizar la pregunta." });
            }
        })
        socket.on("client:toggleForm", () => {
            try {
                const newStatus = SystemService.toggleForm()
                io.to("users").emit("server:formStatusChanged", newStatus)
                io.to("moderators").emit("server:formStatusChanged", newStatus)
                console.log(`Form ${newStatus ? "abled" : "disabled"}`)
            } catch (error) {
                console.error("Error toggling form status:", error)
                socket.emit("server:error", { message: "Error al cambiar el estado del formulario" })
            }
        }) 

        // Presentation
        socket.on("client:selectRandomQuestion", async() => {
            try {
                const selectedQuestion = await PreguntaService.getRandomAceptada()
                if (!selectedQuestion) {
                    socket.emit("server:error", { message: "No hay preguntas aceptadas disponibles." })
                    return
                }
                await PreguntaService.updateEstado(selectedQuestion._id!.toString(), "respondida")
                io.to("presentation").emit("server:questionAnswered", selectedQuestion)
                console.log("Pregunta aleatoria seleccionada:", selectedQuestion)
            } catch (error) {
                console.error("Error selecting random question:", error)
                socket.emit("server:error", { message: "Error al seleccionar una pregunta aleatoria" })
            }
        })
		socket.on("disconnect", () => {
			console.log("Socket disconnected:", socket.id);
		});
	});
};
export default registerSocketHandlers;
