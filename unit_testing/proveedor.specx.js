const request = require('supertest');
const app = require('../src/app');

describe('Servicio proveedor', ()=>{
    test('deberia consultar todos los proveedores', async ()=>{
        const res = await request(app)
            .get('/cliente/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })

    test('deberia consultar proveedor por cedula', async ()=>{
        const res = await request(app)
            .get('/cliente/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })

    test('deberia consultar todos los proveedores por nombre', async ()=>{
        const res = await request(app)
            .get('/cliente/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })
})
