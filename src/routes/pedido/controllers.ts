import { Request, Response } from 'express';
import Pedido from '../../models/Pedido';

const createPedido = async (req: Request, res: Response) => {
  try {
    const { proveedor, administrador, fecha, costo_total, estado, items, isActive } = req.body;

    const pedido = new Pedido({
      proveedor,
      administrador,
      fecha,
      costo_total,
      estado,
      items,
      isActive
    });

    await pedido.save();
    res.status(201).json(pedido);
  } catch (error: any) {
    res.status(500).json({
        message: "Error creating pedido", 
        error: error.message 
    });
  }
};

const getAllPedidos = async (req: Request, res: Response) => {
  try {
    
    const { estado } = req.query;
    let filter = {};

    if (estado) {
      filter = { estado: { $regex: estado as string, $options: 'i' } };
    }

    const pedidos = await Pedido.find(filter)
      .populate('proveedor', 'nombre apellido mail')      
      .populate('administrador', 'nombre apellido mail')   
      .populate('items.producto', 'nombre precio_venta'); 

    res.status(200).json({
      message: "Pedidos fetched successfully",
      data: pedidos,
      error: false
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching pedidos", error: error.message });
  }
};

const getPedidoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findById(id)
      .populate('proveedor', 'nombre apellido email')
      .populate('administrador', 'nombre apellido email')
      .populate('items.producto', 'nombre precio_venta');

    if (!pedido) {
      return res.status(404).json({ message: "Pedido not found" });
    }
    res.status(200).json(pedido);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching pedido", error: error.message });
  }
};

const updatePedido = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { proveedor, administrador, fecha, costo_total, estado, items } = req.body;
    
    const pedido = await Pedido.findByIdAndUpdate(id, { 
        proveedor, 
        administrador, 
        fecha, 
        costo_total, 
        estado, 
        items 
    }, { new: true });

    if (!pedido) {
      return res.status(404).json({ message: "Pedido not found" });
    }
    res.status(200).json(pedido);
  } catch (error: any) {
    res.status(500).json({ message: "Error updating pedido", error: error.message });
  }
};

const hardDeletePedido = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findByIdAndDelete(id);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido not found" });
    }
    res.status(200).json({ message: "Pedido deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting pedido", error: error.message });
  }
};

const softDeletePedido = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!pedido) {
      return res.status(404).json({ message: "Pedido not found" });
    }
    res.status(200).json({ message: "Pedido soft-deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error soft-deleting pedido", error: error.message });
  }
};

export default { createPedido, getAllPedidos, getPedidoById, updatePedido, hardDeletePedido, softDeletePedido };