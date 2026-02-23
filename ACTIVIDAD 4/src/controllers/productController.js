const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        const { nombre, precio, descripcion, stock } = req.body;
        const nuevoProducto = new Product({ nombre, precio, descripcion, stock });
        await nuevoProducto.save();
        res.status(201).json({ message: 'Producto guardado', nuevoProducto });
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar', error: error.message });
    }
};


exports.getProducts = async (req, res) => {
    try {
        const productos = await Product.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};