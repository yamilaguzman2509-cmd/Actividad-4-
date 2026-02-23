const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/views')); 

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('¡Conexión exitosa a MongoDB Atlas!'))
    .catch(err => {
        console.error('Error conectando a la base de datos:');
        console.error(err);
    });

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/products', require('./src/routes/productRoutes'));

app.get('/', (req, res) => {
    res.send('Servidor de Yami funcionando correctamente');
});

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`📡 Servidor encendido en http://localhost:${PORT}`);
    });
}

module.exports = app;