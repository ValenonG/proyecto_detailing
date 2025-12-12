import { Request, Response } from 'express';
import Vehiculo from '../../models/Vehiculo';

const createVehiculo = async (req: Request, res: Response) => {
  try {
    const { cliente, marca, modelo, patente } = req.body;

    const vehiculo = new Vehiculo({
      cliente,
      marca,
      modelo,
      patente
    });

    await vehiculo.save();
    res.status(201).json(vehiculo);
  } catch (error: any) {
    // Si el error es por patente duplicada (código 11000 en Mongo)
    if (error.code === 11000) {
        return res.status(400).json({ message: "La patente ya existe", error: error.message });
    }
    res.status(500).json({
      message: "Error creating vehiculo",
      error: error.message
    });
  }
};

const getAllVehiculos = async (req: Request, res: Response) => {
  try {
    
    const { patente } = req.query;
    let filter = {};

    if (patente) {
      filter = { patente: { $regex: patente as string, $options: 'i' } };
    }

    const vehiculos = await Vehiculo.find(filter)
      .populate('cliente', 'nombre apellido email'); 

    res.status(200).json({
      message: "Vehiculos fetched successfully",
      data: vehiculos,
      error: false
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching vehiculos", error: error.message });
  }
};

const getVehiculoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findById(id).populate('cliente', 'nombre apellido email');
    
    if (!vehiculo) {
      return res.status(404).json({ message: "Vehiculo not found" });
    }
    res.status(200).json(vehiculo);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching vehiculo", error: error.message });
  }
};

const updateVehiculo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { cliente, marca, modelo, patente } = req.body;

    const vehiculo = await Vehiculo.findByIdAndUpdate(
      id, 
      { cliente, marca, modelo, patente }, 
      { new: true }
    );

    if (!vehiculo) {
      return res.status(404).json({ message: "Vehiculo not found" });
    }
    res.status(200).json(vehiculo);
  } catch (error: any) {
    res.status(500).json({ message: "Error updating vehiculo", error: error.message });
  }
};

const hardDeleteVehiculo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findByIdAndDelete(id);

    if (!vehiculo) {
      return res.status(404).json({ message: "Vehiculo not found" });
    }
    res.status(200).json({ message: "Vehiculo deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting vehiculo", error: error.message });
  }
};

const softDeleteVehiculo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findByIdAndUpdate(id, { isActive: false }, { new: true });

    if (!vehiculo) {
      return res.status(404).json({ message: "Vehiculo not found" });
    }
    res.status(200).json({ message: "Vehiculo soft-deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error soft-deleting vehiculo", error: error.message });
  }
};

export default { 
    createVehiculo, 
    getAllVehiculos, 
    getVehiculoById, 
    updateVehiculo, 
    hardDeleteVehiculo, 
    softDeleteVehiculo 
};