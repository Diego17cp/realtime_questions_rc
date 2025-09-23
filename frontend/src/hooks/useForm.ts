import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"
import { toast } from "sonner"
interface Eje {
    id: string,
    nombre: string
    createdAt?: string,
    updatedAt?: string
}

export const useForm = () => {
    const API_URL = import.meta.env.PUBLIC_API_URL
    const SOCKET_URL = import.meta.env.PUBLIC_SOCKET_URL
    const socket = useRef<Socket | null>(null)

    const [ejes, setEjes] = useState<Eje[]>([])
    const [formData, setFormData] = useState({
        eje: {
            id: "",
            nombre: ""
        }, 
        texto: ""
    })
    const [error, setError] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formEnabled, setFormEnabled] = useState<boolean>(true)

    useEffect(() => {
        if (!socket.current) {
            // For dev without proxy
            // socket.current = io(API_URL)
            // For prod. add path to redirect to backend
            socket.current = io(SOCKET_URL, {
                path: "/api/socket.io",
                transports: ["websocket", "polling"],
            })
            socket.current.emit("client:joinRoom", "users")
            socket.current.on("server:error", (data: { message: string }) => {
                toast.error("Error", { description: data.message || "Inténtalo de nuevo más tarde." })
                setIsSubmitting(false);
            })
            socket.current.on("server:initialFormStatus", (enabled: boolean) => {
                setFormEnabled(enabled)
            })
            socket.current.on("server:formStatusChanged", (enabled: boolean) => {
                setFormEnabled(enabled)
                if (!enabled) {
                    toast.error("Formulario deshabilitado", { description: "No puedes enviar preguntas en este momento." })
                } else {
                    toast.success("Formulario habilitado", { description: "Ya puedes enviar preguntas." })
                }
                
            })
            socket.current.on("connect", () => {
                socket.current?.emit("client:getFormStatus")
            })
        }
        return () => {
            if (socket.current) {
                socket.current.disconnect();
                socket.current = null;
            }
        }
    }, [])

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormData({
            ...formData,
            texto: e.target.value
        })
    }
    const handleEjeChange = (data: { id: string, nombre: string }) => {
        setFormData({
            ...formData,
            eje: data
        })
    }
    const fetchEjes = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/ejes`);
            if (response.data.success || response.status === 200) {
                const data = response.data.data;
                setEjes(data);
            } else {
                setEjes([]);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error("Error fetching ejes:", error.response.data);
            }
            console.error("Error fetching ejes:", error);
            setEjes([]);
        }
    }
    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.eje.id) {
            newErrors.eje = "Elige un eje";
        }
        if (!formData.texto.trim()) {
            newErrors.texto = "Escribe tu pregunta";
        }
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    const resetForm = () => {
        setFormData({
            eje: { id: "", nombre: "" },
            texto: ""
        })
        setError({});
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        if (!socket.current) {
            toast.error("Error de conexión", { description: "No se pudo conectar al servidor. Inténtalo de nuevo más tarde." });
            return;
        }
        try {
            setIsSubmitting(true);
            socket.current.emit("client:submitQuestion", { texto: formData.texto, ejeId: formData.eje.id })
            resetForm();
            toast.success("Pregunta enviada con éxito", { description: "Será respondida en la sesión." });
        } catch (error) {
            socket.current.on("server:error", (data: { message: string }) => {
                toast.error("Error al enviar la pregunta", { description: data.message || "Inténtalo de nuevo más tarde." });
            });
            console.error("Error submitting question:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        formData,
        handleTextChange,
        handleEjeChange,
        ejes,
        fetchEjes,
        error,
        isSubmitting,
        handleSubmit,
        formEnabled
    }
}