import mongoose, { Schema, model, Types } from 'mongoose';

// Sub-interfaz para los items del pedido
interface IDetalleCompra {
    producto: Types.ObjectId;
    cantidad: number;
    costo_unitario: number;
}

export interface IPedido {
    proveedor: Types.ObjectId;
    administrador: Types.ObjectId; // Qué empleado hizo el pedido
    fecha: Date;
    costo_total: number;
    estado: 'Pendiente' | 'Recibido' | 'Cancelado';
    items: IDetalleCompra[];
}

const PedidoSchema = new Schema<IPedido>({
    proveedor: { type: Schema.Types.ObjectId, ref: 'Persona', required: true },
    administrador: { type: Schema.Types.ObjectId, ref: 'Persona', required: true },
    fecha: { type: Date, default: Date.now },
    costo_total: { type: Number, required: true },
    estado: {
        type: String,
        enum: ['Pendiente', 'Recibido', 'Cancelado'],
        default: 'Pendiente'
    },
    items: [{
        producto: { type: Schema.Types.ObjectId, ref: 'Producto' },
        cantidad: { type: Number, required: true },
        costo_unitario: { type: Number, required: true }
    }]
}, { timestamps: true });

export default model<IPedido>('Pedido', PedidoSchema);