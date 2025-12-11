import { Request, Response } from 'express';
import User from '../../models/Persona';
import Persona from '../../models/Persona';

const createPersona = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, telefono,dni,direccion,mail,cuit,tipo,isActive } = req.body;
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
        message: "Error creating persona", error
    });
  }
};

export default {createPersona};
