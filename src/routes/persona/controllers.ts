import { Request, Response } from 'express';
import Persona from '../../models/Persona';

const createPersona = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, telefono, dni, direccion, mail, cuit, tipo, isActive } = req.body;
    const persona = new Persona({
      nombre,
      apellido,
      telefono,
      dni,
      direccion,
      mail,
      cuit,
      tipo,
      isActive
    });
    await persona.save();
    res.status(201).json(persona);
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear persona', error
    });
  }
};

const getAllPersona = async (req: Request, res: Response) => {
  try {
    const personas = await Persona.find({ isActive: true });
    res.status(200).json(personas);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener personas', error
    });
  }
};

const getPersonaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const persona = await Persona.findById(id);

    if (!persona) {
      return res.status(404).json({
        message: 'Persona no encontrada'
      });
    }

    res.status(200).json(persona);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener persona', error
    });
  }
};

const updatePersona = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const persona = await Persona.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!persona) {
      return res.status(404).json({
        message: 'Persona no encontrada'
      });
    }

    res.status(200).json(persona);
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar persona', error
    });
  }
};

const hardDeletePersona = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const persona = await Persona.findByIdAndDelete(id);

    if (!persona) {
      return res.status(404).json({
        message: 'Persona no encontrada'
      });
    }

    res.status(200).json({
      message: 'Persona eliminada exitosamente',
      persona
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar persona', error
    });
  }
};

const softDeletePersona = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const persona = await Persona.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!persona) {
      return res.status(404).json({
        message: 'Persona no encontrada'
      });
    }

    res.status(200).json({
      message: 'Persona desactivada exitosamente',
      persona
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al desactivar persona', error
    });
  }
};

export default {
  createPersona,
  getAllPersona,
  getPersonaById,
  updatePersona,
  hardDeletePersona,
  softDeletePersona
};
