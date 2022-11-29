const request = require('supertest');
const app = require('../src/app');

describe('Servicio usuario', ()=>{
    test('deberia consultar todos los usuarios', async ()=>{
        const res = await request(app)
            .get('/usuario/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })

    test('deberia iniciar sesion un usuario', async ()=>{
        const res = await request(app)
            .get('/usuario/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })
})
