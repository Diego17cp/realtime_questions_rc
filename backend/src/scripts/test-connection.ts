import { DatabaseConnection } from "../config/database";
import { EjeService } from "../services/eje.service";
import { PreguntaService } from "../services/pregunta.service";
import { QuestionState } from "../types/database";

async function testConnection() {
	try {
		console.log("🔄 Probando conexión a PostgreSQL...");

		// Test database connection
		await DatabaseConnection.getInstance().connect();
		console.log("✅ Conexión a base de datos exitosa");

		// Test ejes service
		console.log("🔄 Probando servicio de ejes...");
		const ejes = await EjeService.findAll();
		console.log(`✅ Encontrados ${ejes.length} ejes`);

		if (ejes.length > 0) {
			console.log("📋 Primer eje:", ejes[0]);
		}

		// Test preguntas service
		console.log("🔄 Probando servicio de preguntas...");
		const stats = await PreguntaService.getStats();
		console.log("✅ Estadísticas obtenidas:", stats);

		// Test question states
		const registradas = await PreguntaService.findByEstado(QuestionState.registrada);
		console.log(`✅ Preguntas registradas: ${registradas.length}`);

		console.log("🎉 Todas las pruebas pasaron exitosamente!");
	} catch (error) {
		console.error("❌ Error en las pruebas:", error);
	} finally {
		await DatabaseConnection.getInstance().disconnect();
		process.exit(0);
	}
}

testConnection();
