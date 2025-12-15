import { Request, Response } from 'express';
import Trabajo from '../../models/Trabajo';

const createTrabajo = async (req: Request, res: Response) => {
  try {
    const {
      vehiculo,
      estado,
      observaciones,
      precio_total,
      tareas,
      productos_usados
    } = req.body;

    const trabajo = new Trabajo({
      vehiculo,
      estado,
      observaciones,
      precio_total,
      tareas,
      productos_usados
    });

    await trabajo.save();
    res.status(201).json(trabajo);
  } catch (error: any) {
    res.status(500).json({
      message: "Error creating trabajo",
      error: error.message
    });
  }
};

const getAllTrabajos = async (req: Request, res: Response) => {
  try {
    const { estado } = req.query;
    let filter = {};

    if (estado) {
      filter = { estado: { $regex: estado as string, $options: 'i' } };
    }

    const trabajos = await Trabajo.find(filter)
      .populate({
        path: 'vehiculo',
        select: 'marca modelo patente cliente',
        populate: {
          path: 'cliente',
          select: 'nombre apellido email'
        }
      })
      .populate('tareas.tarea', 'descripcion tiempo_estimado')
      .populate('productos_usados.producto', 'nombre precio_venta stock_actual');

    res.status(200).json({
      message: "Trabajos fetched successfully",
      data: trabajos,
      error: false
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching trabajos", error: error.message });
  }
};

const getTrabajoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const trabajo = await Trabajo.findById(id)
      .populate({
        path: 'vehiculo',
        select: 'marca modelo patente cliente',
        populate: {
          path: 'cliente',
          select: 'nombre apellido email'
        }
      })
      .populate('tareas.tarea', 'descripcion tiempo_estimado')
      .populate('productos_usados.producto', 'nombre precio_venta stock_actual');

    if (!trabajo) {
      return res.status(404).json({ message: "Trabajo not found" });
    }
    res.status(200).json(trabajo);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching trabajo", error: error.message });
  }
};

const updateTrabajo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      vehiculo,
      estado,
      observaciones,
      precio_total,
      tareas,
      productos_usados
    } = req.body;

    // Obtener el trabajo actual para comparar estados
    const trabajoActual = await Trabajo.findById(id);

    if (!trabajoActual) {
      return res.status(404).json({ message: "Trabajo not found" });
    }

    // Si el estado cambia a "Terminado", restar stock de productos
    if (estado === 'Terminado' && trabajoActual.estado !== 'Terminado') {
      const Producto = require('../../models/Producto').default;

      for (const prodUsado of trabajoActual.productos_usados) {
        await Producto.findByIdAndUpdate(
          prodUsado.producto,
          { $inc: { stock_actual: -prodUsado.cantidad } },
          { new: true }
        );
      }
    }

    const trabajo = await Trabajo.findByIdAndUpdate(
      id,
      { vehiculo, estado, observaciones, precio_total, tareas, productos_usados },
      { new: true }
    )
      .populate({
        path: 'vehiculo',
        select: 'marca modelo patente cliente',
        populate: {
          path: 'cliente',
          select: 'nombre apellido email'
        }
      })
      .populate('tareas.tarea', 'descripcion tiempo_estimado')
      .populate('productos_usados.producto', 'nombre precio_venta stock_actual');

    res.status(200).json(trabajo);
  } catch (error: any) {
    res.status(500).json({ message: "Error updating trabajo", error: error.message });
  }
};

const hardDeleteTrabajo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const trabajo = await Trabajo.findByIdAndDelete(id);

    if (!trabajo) {
      return res.status(404).json({ message: "Trabajo not found" });
    }
    res.status(200).json({ message: "Trabajo deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting trabajo", error: error.message });
  }
};

const softDeleteTrabajo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const trabajo = await Trabajo.findByIdAndUpdate(id, { isActive: false }, { new: true });

    if (!trabajo) {
      return res.status(404).json({ message: "Trabajo not found" });
    }
    res.status(200).json({ message: "Trabajo soft-deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error soft-deleting trabajo", error: error.message });
  }
};

const getTrabajosByEstado = async (req: Request, res: Response) => {
  try {
    const { estado } = req.params;
    const trabajos = await Trabajo.find({ estado })
      .populate({
        path: 'vehiculo',
        select: 'marca modelo patente cliente',
        populate: {
          path: 'cliente',
          select: 'nombre apellido email'
        }
      })
      .populate('tareas.tarea', 'descripcion tiempo_estimado')
      .populate('productos_usados.producto', 'nombre precio_venta stock_actual');

    res.status(200).json(trabajos);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener trabajos por estado", error: error.message });
  }
};

export default {
  createTrabajo,
  getAllTrabajos,
  getTrabajoById,
  getTrabajosByEstado,
  updateTrabajo,
  hardDeleteTrabajo,
  softDeleteTrabajo
};