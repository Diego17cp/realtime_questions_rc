import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import http from "http"

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
server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})