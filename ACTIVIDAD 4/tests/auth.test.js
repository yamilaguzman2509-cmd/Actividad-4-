const request = require('supertest');
const app = require('../server'); 

describe('Pruebas de Seguridad (IA Generated)', () => {
    
    test('Debería responder 401 si intentamos crear un producto sin Token', async () => {
        const response = await request(app)
            .post('/api/products')
            .send({
                nombre: "Laptop de prueba",
                precio: 500
            });
        
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBeDefined();
    });

    test('Verificar que el servidor está en línea', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});