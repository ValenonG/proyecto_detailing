import { Request, Response } from 'express';
import Tarea from '../../models/Tarea';

const createTarea = async (req: Request, res: Response) => {
  try {
    const { descripcion, precio, tiempo_estimado, isActive } = req.body;

    const tarea = new Tarea({
      descripcion,
      precio,
      tiempo_estimado,
      isActive
    });

    await tarea.save();
    res.status(201).json(tarea);
  } catch (error: any) {
    res.status(500).json({
      message: "Error creating tarea",
      error: error.message
    });
  }
};

const getAllTareas = async (req: Request, res: Response) => {
  try {
    // Filtro por descripción
    const { descripcion } = req.query;
    let filter = {};

    if (descripcion) {
      filter = { descripcion: { $regex: descripcion as string, $options: 'i' } };
    }

    const tareas = await Tarea.find(filter);

    res.status(200).json({
      message: "Tareas fetched successfully",
      data: tareas,
      error: false
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching tareas", error: error.message });
  }
};

const getTareaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findById(id);
    
    if (!tarea) {
      return res.status(404).json({ message: "Tarea not found" });
    }
    res.status(200).json(tarea);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching tarea", error: error.message });
  }
};

const updateTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { descripcion, precio, tiempo_estimado } = req.body;

    const tarea = await Tarea.findByIdAndUpdate(
      id, 
      { descripcion, precio, tiempo_estimado }, 
      { new: true }
    );

    if (!tarea) {
      return res.status(404).json({ message: "Tarea not found" });
    }
    res.status(200).json(tarea);
  } catch (error: any) {
    res.status(500).json({ message: "Error updating tarea", error: error.message });
  }
};

const hardDeleteTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByIdAndDelete(id);

    if (!tarea) {
      return res.status(404).json({ message: "Tarea not found" });
    }
    res.status(200).json({ message: "Tarea deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting tarea", error: error.message });
  }
};

const softDeleteTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByIdAndUpdate(id, { isActive: false }, { new: true });

    if (!tarea) {
      return res.status(404).json({ message: "Tarea not found" });
    }
    res.status(200).json({ message: "Tarea soft-deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error soft-deleting tarea", error: error.message });
  }
};

export default { 
    createTarea, 
    getAllTareas, 
    getTareaById, 
    updateTarea, 
    hardDeleteTarea, 
    softDeleteTarea 
};