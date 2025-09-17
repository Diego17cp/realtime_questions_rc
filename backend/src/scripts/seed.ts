import { DatabaseConnection } from "../config/database";
import { EjeRepository } from "../repositories/eje.repository";

const ejesIniciales = [
    { nombre: "Educación" },
    { nombre: "Salud" },
    { nombre: "Infraestructura" },
    { nombre: "Seguridad" },
    { nombre: "Medio Ambiente" },
    { nombre: "Desarrollo Económico" },
    { nombre: "Cultura y Deportes" },
    { nombre: "Servicios Públicos" }
];

async function seed() {
    try {
        console.log("Conectando a la base de datos...");
        await DatabaseConnection.getInstance().connect();
        
        const ejeRepository = new EjeRepository();
        
        console.log("Verificando ejes existentes...");
        const existingEjes = await ejeRepository.findAll();
        
        if (existingEjes.length > 0) {
            console.log(`Ya existen ${existingEjes.length} ejes en la base de datos.`);
            return;
        }
        
        console.log("Creando ejes iniciales...");
        for (const eje of ejesIniciales) {
            await ejeRepository.create(eje);
            console.log(`✓ Creado eje: ${eje.nombre}`);
        }
        
        console.log("✅ Seed completado exitosamente!");
        
    } catch (error) {
        console.error("❌ Error durante el seed:", error);
    } finally {
        await DatabaseConnection.getInstance().disconnect();
        process.exit(0);
    }
}

seed();