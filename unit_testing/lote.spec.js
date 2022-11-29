const request = require('supertest');
const app = require('../src/app');

describe('Servicio lote', ()=>{
    test('deberia consultar todos los lotes', async ()=>{
        const res = await request(app)
            .get('/cliente/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })

    test('deberia consultar lote por id', async ()=>{
        const res = await request(app)
            .get('/cliente/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })

    test('deberia consultar todos los lotes por nombre', async ()=>{
        const res = await request(app)
            .get('/cliente/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })

    test('deberia consultar todos los lotes por cantidad disponible', async ()=>{
        const res = await request(app)
            .get('/cliente/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })
})
