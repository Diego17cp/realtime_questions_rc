import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import http from "node:http"
import { DatabaseConnection } from "./config/database"
import { EjeService } from "./services/eje.service"
import { PreguntaService } from "./services/pregunta.service"
import type { QuestionState } from "./types/database"

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
        // Note: This would need to be implemented in the service/repository layer
        // For now, this is a placeholder since we don't have create methods in EjeService
        res.status(501).json({ 
            error: "Create functionality not implemented in EjeService yet" 
        })
    } catch (error) {
        console.error("Error creando ejes:", error)
        res.status(500).json({ error: "Error creando ejes" })
    }
})

// Ruta para crear pregunta hardcodeada
app.post("/test/crear-pregunta", async (_, res) => {
    try {
        // Obtener todos los ejes disponibles
        const ejes = await EjeService.findAll()
        
        if (!ejes || ejes.length === 0) {
            return res.status(400).json({ 
                error: "No hay ejes disponibles. Ejecuta primero /test/crear-ejes" 
            })
        }

        const primerEje = ejes[0]
        if (!primerEje) {
            return res.status(400).json({ 
                error: "No se pudo obtener el primer eje" 
            })
        }

        const texto = "¿Cuáles fueron los principales logros en transparencia durante este período?"
        const preguntaCreada = await PreguntaService.create(texto, primerEje.id)

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
        const stats = await PreguntaService.getStats()
        // Get questions from different states
        const registradas = await PreguntaService.findByEstado("registrada")
        const aceptadas = await PreguntaService.findByEstado("aceptada")
        const rechazadas = await PreguntaService.findByEstado("rechazada")
        const respondidas = await PreguntaService.findByEstado("respondida")
        
        const todasLasPreguntas = [...registradas, ...aceptadas, ...rechazadas, ...respondidas]
        
        res.json({
            total: stats.total,
            stats,
            preguntas: todasLasPreguntas
        })
    } catch (error) {
        console.error("Error obteniendo preguntas:", error)
        res.status(500).json({ error: "Error obteniendo preguntas" })
    }
})
app.get("/test/ejes", async (_, res) => {
    try {
        const ejes = await EjeService.findAll()
        res.json({
            total: ejes.length,
            ejes
        })
    } catch (error) {
        console.error("Error obteniendo ejes:", error)
        res.status(500).json({ error: "Error obteniendo ejes" })
    }
})

// Ruta para probar cambio de estado
app.patch("/test/pregunta/:id/estado/:nuevoEstado", async (req, res) => {
    try {
        const { id, nuevoEstado } = req.params
        
        const preguntaActualizada = await PreguntaService.updateEstado(id, nuevoEstado as QuestionState)
        
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