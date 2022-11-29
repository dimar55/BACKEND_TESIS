const request = require('supertest');
const app = require('../src/app');

describe('Servicio producto', ()=>{
    test('deberia consultar todos los productos', async ()=>{
        const res = await request(app)
            .get('/cliente/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })

    test('deberia consultar producto por id', async ()=>{
        const res = await request(app)
            .get('/cliente/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })

    test('deberia consultar todos los productos por nombre', async ()=>{
        const res = await request(app)
            .get('/cliente/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })
})
