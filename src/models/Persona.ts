import mongoose, { Schema, model } from 'mongoose';

export interface IPersona {
    nombre: string;
    apellido: string;
    telefono?: string;
    dni: string;
    direccion?: string;
    mail: string;
    cuit?: string;
    tipo: 'Cliente' | 'Empleado' | 'Administrador' | 'Proveedor';
}

const PersonaSchema = new Schema<IPersona>({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: String},
    dni: { type: String, required: true, unique: true },
    direccion: { type: String },
    mail: { type: String, required: true, unique: true },
    cuit: { type: String },
    tipo: { 
        type: String, 
        required: true, 
        enum: ['Cliente', 'Empleado', 'Administrador', 'Proveedor'] 
    }
}, { timestamps: true });


export default model<IPersona>('Persona', PersonaSchema);