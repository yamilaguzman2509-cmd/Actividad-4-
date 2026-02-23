const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTRO DE USUARIOS
exports.register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Verificar si el correo ya está registrado
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'El correo ya está en uso' });

        // Encriptar la contraseña (seguridad)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear y guardar el nuevo usuario
        const newUser = new User({ nombre, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// LOGIN DE USUARIOS
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

        // Comparar la contraseña ingresada con la encriptada en la DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });

        // Si todo es correcto, crear el Token JWT
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } // El token expira en 1 hora
        );

        res.json({
            token,
            user: { id: user._id, nombre: user.nombre, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};