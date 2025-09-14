import { Schema, model } from 'mongoose';
import { IEje } from '../types/database';

const ejeSchema = new Schema<IEje>({
    nombre: { type: String, required: true, trim: true },
}, { timestamps: true });

ejeSchema.set("toJSON", {
    virtuals: true,
    transform: (_, obj: any) => {
        delete obj._id;
        delete obj.__v;
        return obj;
    }
});

export const Eje = model<IEje>('Eje', ejeSchema);