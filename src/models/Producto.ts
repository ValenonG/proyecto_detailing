import mongoose, { Schema, model, Types } from 'mongoose';

export interface IProducto {
    nombre: string;
    proveedor: Types.ObjectId; 
    precio_venta: number;     
    stock_actual: number;
    stock_minimo: number;
    isActive: boolean;
}

const ProductoSchema = new Schema<IProducto>({
    nombre: { type: String, required: true },
    proveedor: { 
        type: Schema.Types.ObjectId, 
        ref: 'Persona', // Debe ser tipo 'Proveedor'
        required: true 
    },
    precio_venta: { type: Number, required: true },
    stock_actual: { type: Number, default: 0 },
    stock_minimo: { type: Number, default: 10 },
    isActive: {
      type: Boolean,
      default: true
    },
}, { timestamps: true });

export default model<IProducto>('Producto', ProductoSchema);