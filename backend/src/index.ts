import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import http from "http"
import { DatabaseConnection } from "./config/database"
import { Eje } from "./models/eje.model"
import { Pregunta } from "./models/pregunta.model"

dotenv.config()

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4321',
    methods: ['GET', 'POST'],
    allowedHeaders: "*",
}))
app.use(helmet())

const PORT = process.env.PORT || 3000

app.get("/", (_, res) => {
    res.send("API is running...")
})

// Ruta para crear ejes hardcodeados
app.post("/test/crear-ejes", async (_, res) => {
    try {
        const ejesHardcodeados = [
            { nombre: "Transparencia y Rendición de Cuentas" },
            { nombre: "Gestión Financiera" },
            { nombre: "Participación Ciudadana" },
            { nombre: "Desarrollo Social" },
            { nombre: "Infraestructura y Servicios Públicos" }
        ]

        // Limpiar ejes existentes (solo para pruebas)
        await Eje.deleteMany({})
        
        const ejesCreados = await Eje.insertMany(ejesHardcodeados)
        
        res.json({
            message: "Ejes creados exitosamente",
            ejes: ejesCreados
        })
    } catch (error) {
        console.error("Error creando ejes:", error)
        res.status(500).json({ error: "Error creando ejes" })
    }
})

// Ruta para crear pregunta hardcodeada
app.post("/test/crear-pregunta", async (_, res) => {
    try {
        // Obtener el primer eje disponible
        const primerEje = await Eje.findOne()
        
        if (!primerEje) {
            return res.status(400).json({ 
                error: "No hay ejes disponibles. Ejecuta primero /test/crear-ejes" 
            })
        }

        const preguntaHardcodeada = {
            texto: "¿Cuáles fueron los principales logros en transparencia durante este período?",
            ejeId: primerEje._id!
        }

        // Usar el método estático del modelo
        const preguntaCreada = await Pregunta.createWithEje(
            preguntaHardcodeada,
            {
                _id: primerEje._id!,
                nombre: primerEje.nombre
            }
        )

        return res.json({
            message: "Pregunta creada exitosamente",
            pregunta: preguntaCreada
        })
    } catch (error) {
        console.error("Error creando pregunta:", error)
        return res.status(500).json({ error: "Error creando pregunta" })
    }
})

// Ruta para obtener todas las preguntas (verificar)
app.get("/test/preguntas", async (_, res) => {
    try {
        const preguntas = await Pregunta.find().sort({ createdAt: -1 })
        res.json({
            total: preguntas.length,
            preguntas
        })
    } catch (error) {
        console.error("Error obteniendo preguntas:", error)
        res.status(500).json({ error: "Error obteniendo preguntas" })
    }
})

// Ruta para probar cambio de estado
app.patch("/test/pregunta/:id/estado/:nuevoEstado", async (req, res) => {
    try {
        const { id, nuevoEstado } = req.params
        
        const preguntaActualizada = await Pregunta.updateEstado(id, nuevoEstado as any)
        
        if (!preguntaActualizada) {
            return res.status(404).json({ error: "Pregunta no encontrada" })
        }

        return res.json({
            message: `Estado actualizado a ${nuevoEstado}`,
            pregunta: preguntaActualizada
        })
    } catch (error) {
        console.error("Error actualizando estado:", error)
        return res.status(500).json({ error: "Error actualizando estado" })
    }
})

const start = async () => {
    try {
        await DatabaseConnection.getInstance().connect()
        server.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`)
            console.log(`\nRutas de prueba disponibles:`)
            console.log(`POST http://localhost:${PORT}/test/crear-ejes`)
            console.log(`POST http://localhost:${PORT}/test/crear-pregunta`)
            console.log(`GET  http://localhost:${PORT}/test/preguntas`)
            console.log(`PATCH http://localhost:${PORT}/test/pregunta/:id/estado/:nuevoEstado`)
        })
    } catch (error) {
        console.error("Error starting server:", error)
    }
}
start()