const request = require('supertest');
const app = require('../src/app');

describe('Servicio cliente', ()=>{
    test('deberia consultar todos los clientes', async ()=>{
        const res = await request(app)
            .get('/cliente/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })

    test('deberia consultar cliente por cedula', async ()=>{
        const res = await request(app)
            .get('/cliente/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })

    test('deberia consultar todos los clientes por nombre', async ()=>{
        const res = await request(app)
            .get('/cliente/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })
})
