import { EjeRepository } from "../repositories/eje.repository";
import { transformEjesArrayForFrontend, transformEjeForFrontend } from "../helpers/transformers";

export class EjeService {
    private static ejeRepository = new EjeRepository();

    static async findAll() {
        const ejes = await this.ejeRepository.findAll();
        return transformEjesArrayForFrontend(ejes);
    }
    
    static async findById(id: string) {
        const eje = await this.ejeRepository.findById(id);
        return eje ? transformEjeForFrontend(eje) : null;
    }
}