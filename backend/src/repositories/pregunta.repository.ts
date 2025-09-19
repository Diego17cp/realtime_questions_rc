import { QuestionState } from "../types/database";
import { DatabaseConnection } from "../config/database";
import { IPregunta, IPreguntaCreate } from "../types/database";

export class PreguntaRepository {
	private db = DatabaseConnection.getInstance().getClient();

	async findAll(): Promise<IPregunta[]> {
		return this.db.pregunta.findMany({
			include: { eje: true },
			orderBy: { createdAt: "desc" },
		});
	}

	async findById(id: string): Promise<IPregunta | null> {
		return this.db.pregunta.findUnique({
			where: { id },
			include: { eje: true },
		});
	}

	async findByEstado(estado: QuestionState): Promise<IPregunta[]> {
		return this.db.pregunta.findMany({
			where: { estado },
			include: { eje: true },
			orderBy: { createdAt: "desc" },
		});
	}

	async findAceptadas(): Promise<IPregunta[]> {
		return this.findByEstado(QuestionState.aceptada);
	}

	async create(data: IPreguntaCreate): Promise<IPregunta> {
		return this.db.pregunta.create({
			data: {
				texto: data.texto,
				ejeId: data.ejeId,
			},
			include: { eje: true },
		});
	}

	async updateEstado(id: string, estado: QuestionState): Promise<IPregunta | null> {
		return this.db.pregunta.update({
			where: { id },
			data: { estado },
			include: { eje: true },
		});
	}

	async getRandomAceptadaWeighted(): Promise<IPregunta | null> {
		const aceptadas = await this.findAceptadas();
		if (aceptadas.length === 0) return null;
		
		const ejeCount = new Map<string, number>();
		const ejeNames = new Map<string, string>();

		aceptadas.forEach((pregunta) => {
			const ejeId = pregunta.ejeId;
			ejeCount.set(ejeId, (ejeCount.get(ejeId) || 0) + 1);
			ejeNames.set(ejeId, pregunta.eje.nombre);
		});

		// Crear pesos usando raíz cuadrada (más balanceado)
		const weightedQuestions: IPregunta[] = [];
		const ejeWeights = new Map<string, number>();

		aceptadas.forEach((pregunta) => {
			const count = ejeCount.get(pregunta.ejeId) || 1;
			const weight = Math.ceil(Math.sqrt(count));
			ejeWeights.set(pregunta.ejeId, weight);
			for (let i = 0; i < weight; i++) {
				weightedQuestions.push(pregunta);
			}
		});
		let totalWeightedCount = 0;
		ejeWeights.forEach((weight, ejeId) => {
			const originalCount = ejeCount.get(ejeId) || 1;
			const totalWeightForEje = weight * originalCount;
			totalWeightedCount += totalWeightForEje;
		});

		const randomIndex = Math.floor(Math.random() * weightedQuestions.length);
		const selectedQuestion = weightedQuestions[randomIndex];

		return selectedQuestion || null;
	}

	async getRandomAceptada(): Promise<IPregunta | null> {
		const aceptadas = await this.findAceptadas();
		if (aceptadas.length === 0) return null;

		const randomIndex = Math.floor(Math.random() * aceptadas.length);
		return aceptadas[randomIndex] || null;
	}

	async delete(id: string): Promise<IPregunta> {
		return this.db.pregunta.delete({
			where: { id },
			include: { eje: true },
		});
	}
}
