import mongoose, { Schema, model } from 'mongoose';

export interface ITarea {
    descripcion: string;
    precio: number;
    tiempo_estimado: number;
    isActive: boolean;
}

const TareaSchema = new Schema<ITarea>({
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    tiempo_estimado: { type: Number, required: true },
    isActive: {
      type: Boolean,
      default: true
    },
}, { timestamps: true });

export default model<ITarea>('Tarea', TareaSchema);