import { Request, Response } from 'express';
import axios from 'axios';
import admin from '../../firebase';
import Persona from '../../models/Persona';

const registrarPersona = async (req: Request, res: Response) => {
  try {
    const { email, password, nombre, apellido, dni, telefono, direccion, cuit, tipo } = req.body;

    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    const persona = new Persona({
      nombre,
      apellido,
      dni,
      email,
      telefono,
      direccion,
      cuit,
      tipo: tipo || 'Cliente',
      firebaseUid: userRecord.uid,
    });

    await persona.save();

    res.status(201).json({
      firebaseUser: userRecord,
      persona
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error al registrar usuario",
      error: error.message
    });
  }
};

const loginConEmailPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    const apiKey = process.env.FIREBASE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ message: 'API Key de Firebase no configurada' });
    }

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    const response = await axios.post(url, {
      email,
      password,
      returnSecureToken: true
    });

    const persona = await Persona.findOne({ firebaseUid: response.data.localId });

    if (!persona) {
      return res.status(404).json({ message: 'Usuario no encontrado en la base de datos' });
    }

    res.json({
      idToken: response.data.idToken,
      refreshToken: response.data.refreshToken,
      expiresIn: response.data.expiresIn,
      localId: response.data.localId,
      persona
    });
  } catch (error: any) {
    res.status(401).json({
      message: 'Login fallido',
      error: error.response?.data || error.message
    });
  }
};

const getAllPersonas = async (req: Request, res: Response) => {
  try {
    const personas = await Persona.find();
    res.status(200).json(personas);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener personas", error: error.message });
  }
};

const getPersonasByTipo = async (req: Request, res: Response) => {
  try {
    const { tipo } = req.params;
    const personas = await Persona.find({ tipo });
    res.status(200).json(personas);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener personas por tipo", error: error.message });
  }
};

const getPersonaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const persona = await Persona.findById(id);

    if (!persona) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    res.status(200).json(persona);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener persona", error: error.message });
  }
};

const updatePersona = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const persona = await Persona.findByIdAndUpdate(id, req.body, { new: true });

    if (!persona) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    res.status(200).json(persona);
  } catch (error: any) {
    res.status(500).json({ message: "Error al actualizar persona", error: error.message });
  }
};

const deletePersona = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const persona = await Persona.findByIdAndDelete(id);

    if (!persona) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    res.status(200).json({ message: "Persona eliminada correctamente" });
  } catch (error: any) {
    res.status(500).json({ message: "Error al eliminar persona", error: error.message });
  }
};

export default {
  registrarPersona,
  loginConEmailPassword,
  getAllPersonas,
  getPersonasByTipo,
  getPersonaById,
  updatePersona,
  deletePersona
};
