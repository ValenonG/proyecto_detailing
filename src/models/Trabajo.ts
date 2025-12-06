import mongoose, { Schema, model, Types } from 'mongoose';

// Sub-interfaces para que el código sea ordenado
interface IDetalleTarea {
    tarea: Types.ObjectId;
    precio_al_momento: number;
}

interface IDetalleProducto {
    producto: Types.ObjectId;
    cantidad: number;
}

// La interfaz principal
export interface ITrabajo {
    vehiculo: Types.ObjectId;
    estado: 'Pendiente' | 'En Proceso' | 'Terminado' | 'Entregado';
    observaciones?: string;
    precio_total: number;
    tareas: IDetalleTarea[];      // Usamos las sub-interfaces aquí
    productos_usados: IDetalleProducto[];
}

const TrabajoSchema = new Schema<ITrabajo>({
    vehiculo: { 
        type: Schema.Types.ObjectId, 
        ref: 'Vehiculo', 
        required: true 
    },
    estado: { 
        type: String, 
        enum: ['Pendiente', 'En Proceso', 'Terminado', 'Entregado'],
        default: 'Pendiente'
    },
    observaciones: { type: String },
    precio_total: { type: Number, default: 0 },
    
    tareas: [{
        tarea: { type: Schema.Types.ObjectId, ref: 'Tarea' },
        precio_al_momento: { type: Number }
    }],

    productos_usados: [{
        producto: { type: Schema.Types.ObjectId, ref: 'Producto' },
        cantidad: { type: Number, default: 1 }
    }]
}, { timestamps: true });

export default model<ITrabajo>('Trabajo', TrabajoSchema);