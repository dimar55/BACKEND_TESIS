const request = require('supertest');
const app = require('../src/app');

describe('Servicio saldo', ()=>{
    test('deberia consultar todos los saldos', async ()=>{
        const res = await request(app)
            .get('/usuario/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })

    test('deberia consultar los saldos por filtro', async ()=>{
        const res = await request(app)
            .get('/usuario/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })
})
