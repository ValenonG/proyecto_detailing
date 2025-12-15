import { Request, Response } from 'express';
import Producto from '../../models/Producto';

const createProducto = async (req: Request, res: Response) => {
  try {
    const { nombre, proveedor, precio_venta, stock_actual,stock_minimo,isActive} = req.body;

    const producto = new Producto({
      nombre,
      proveedor,
      precio_venta,
      stock_actual,
      stock_minimo,
      isActive,
    });

    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({
      message: "Error creating producto", error
    });
  }
};

const getAllProductos = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.query;
    let filter: any = { isActive: true };

    if (nombre) {
      filter = { nombre: { $regex: nombre as string, $options: 'i' } };
    }

    const productos = await Producto.find(filter)
      .populate('proveedor', 'nombre apellido mail'); 

    res.status(200).json({
      message: "Productos fetched successfully",
      data: productos,
      error: false
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching productos", error: true });
  }
};

const getProductoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id).populate('proveedor', 'nombre apellido mail');
    if (!producto) {
      return res.status(404).json({ message: "Producto not found" });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error fetching producto", error });
  }
};

const updateProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre,proveedor,precio_venta,stock_actual,stock_minimo } = req.body;
    const producto = await Producto.findByIdAndUpdate(id, { nombre, proveedor,precio_venta,stock_actual,stock_minimo}, { new: true });
    if (!producto) {
      return res.status(404).json({ message: "producto not found" });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error updating producto", error });
  }
};

const hardDeleteProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByIdAndDelete(id);
    if (!producto) {
      return res.status(404).json({ message: "producto not found" });
    }
    res.status(200).json({ message: "producto deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting producto", error });
  }
};

const softDeleteProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!producto) {
      return res.status(404).json({ message: "producto not found" });
    }
    res.status(200).json({ message: "producto soft-deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error soft-deleting producto", error });
  }
};

const getLowStock = async (req: Request, res: Response) => {
  try {
    const productos = await Producto.find({
      isActive: true, 
      $expr: { $lte: ['$stock_actual', '$stock_minimo'] }
    }).populate('proveedor', 'nombre apellido mail');

    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos con stock bajo", error });
  }
};

export default { createProducto, getAllProductos, getProductoById, getLowStock, updateProducto, hardDeleteProducto, softDeleteProducto };