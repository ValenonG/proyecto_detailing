import mongoose, { Schema, model, Types } from 'mongoose';

export interface IVehiculo {
    cliente: Types.ObjectId; // ID de Mongo
    marca: string;
    modelo: string;
    patente?: string;
}

const VehiculoSchema = new Schema<IVehiculo>({
    cliente: { 
        type: Schema.Types.ObjectId, 
        ref: 'Persona', 
        required: true 
    },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    patente: { type: String, unique: true }
}, { timestamps: true });

export default model<IVehiculo>('Vehiculo', VehiculoSchema);