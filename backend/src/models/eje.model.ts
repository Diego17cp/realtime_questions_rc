import { Schema, model } from 'mongoose';
import { IEje } from '../types/database';

const ejeSchema = new Schema<IEje>({
    nombre: { type: String, required: true, trim: true },
}, { timestamps: true });

export const Eje = model<IEje>('Eje', ejeSchema);