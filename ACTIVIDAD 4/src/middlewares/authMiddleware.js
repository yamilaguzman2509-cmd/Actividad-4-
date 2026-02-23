const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    const token = req.header('Authorization');


    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se encontró un token.' });
    }

    try {
    
        const tokenLimpio = token.startsWith('Bearer ') ? token.slice(7) : token;
        
    
        const verificado = jwt.verify(tokenLimpio, process.env.JWT_SECRET);
        
        req.user = verificado;
        
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token no válido o expirado.' });
    }
};