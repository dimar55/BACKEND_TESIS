const request = require('supertest');
const app = require('../src/app');

describe('Servicio producto', ()=>{
    test('deberia consultar todos los productos', async ()=>{
        const res = await request(app)
            .get('/producto/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })

    test('deberia consultar producto por id', async ()=>{
        const res = await request(app)
            .get('/producto/id/'+7709990)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.body[0].id_product).toEqual('7709990');
    })

    test('deberia consultar todos los productos por nombre', async ()=>{
        const res = await request(app)
            .get('/producto/nombre/'+'Desodorante')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })
})
