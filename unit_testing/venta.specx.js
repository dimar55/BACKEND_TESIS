const request = require('supertest');
const app = require('../src/app');

describe('Servicio venta', ()=>{
    test('deberia consultar todas los ventas', async ()=>{
        const res = await request(app)
            .get('/usuario/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })

    test('deberia consultar las ventas por filtro', async ()=>{
        const res = await request(app)
            .get('/usuario/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })
})
