const pool = require('../models/repository_postgre');
const format = require('pg-format');

function obtenerNombres(array){
    let prods = []
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        prods.push(element.nombre_product)
    }
    return prods;
}

exports.getAll = async (req, res) => {
    try {
        const ventas = await pool.query('SELECT id_venta, total_venta FROM venta');
        const response = await pool.query(`SELECT  venta.id_venta, to_char(venta.fecha_venta, 'YYYY-MON-DD') as fecha_venta, producto.nombre_product FROM venta_producto INNER JOIN producto ON producto.id_product = venta_producto.id_product INNER JOIN venta ON venta.id_venta = venta_producto.id_venta`);
        let resp = [];
        for (let index = 0; index < ventas.rows.length; index++) {
            const element = ventas.rows[index];
            let prods = response.rows.filter(ele => ele.id_venta == element.id_venta);
            if(prods.length>0){
                const venta = {
                    id_venta: element.id_venta,
                    total_venta: element.total_venta,
                    fecha_venta: prods[0].fecha_venta,
                    prods: obtenerNombres(prods)
                }
                resp.push(venta)
            }
            
        }
        res.status(200).send({success: true, body: resp})
    } catch (error) {
        res.status(500).send({ success: false, message: 'venta.getAll', body: error})
    }
}

exports.getByDate = async (req, res) => {
    try {
        const {Dateini, Datefin} = req.body;
        const ventas = await pool.query(`SELECT id_venta, total_venta FROM venta WHERE fecha_venta >= '${Dateini}' AND fecha_venta <= '${Datefin}'`);
        const response = await pool.query(`SELECT  venta.id_venta, to_char(venta.fecha_venta, 'YYYY-MON-DD') as fecha_venta, producto.nombre_product FROM venta_producto INNER JOIN producto ON producto.id_product = venta_producto.id_product INNER JOIN venta ON venta.id_venta = venta_producto.id_venta`);
        let resp = [];
        for (let index = 0; index < ventas.rows.length; index++) {
            const element = ventas.rows[index];
            let prods = response.rows.filter(ele => ele.id_venta == element.id_venta);
            if(prods.length>0){
                const venta = {
                    id_venta: element.id_venta,
                    total_venta: element.total_venta,
                    fecha_venta: prods[0].fecha_venta,
                    prods: obtenerNombres(prods)
                }
                resp.push(venta)
            }
            
        }
        res.status(200).send({success: true, body: resp})
    } catch (error) {
        res.status(500).send({ success: false, message: 'venta.getAll', body: error})
    }
}

exports.insertarVentaProducto = async (req, res) => {
    const {productos} = req.body;
    const ventap = [];
    for (let index = 0; index < productos.length; index++) {
       ventap.push([req.body.id_venta, productos[index][0], productos[index][1]])
    }
    const response = await pool.query(format(`INSERT INTO venta_producto (id_venta, id_product, cantidad_venta) VALUES %L`, ventap))
    res.status(201).send({ success: true, body: {
        id_venta: req.body.id_venta,
        total_venta: req.body.total_venta,
        productos: ventap
    }})
}


exports.create = async (req, res, next) => {
    try {
        let total = 0;
    const {productos} = req.body;
    for (let index = 0; index < productos.length; index++) {
        total += productos[index][1]*productos[index][2];
    }
    const response = await pool.query(`INSERT INTO venta (total_venta) VALUES ($1) RETURNING id_venta`, [total]);
    
    req.body.id_venta = response.rows[0].id_venta;
    req.body.total_venta = total;
    next();
    } catch (error) {
        res.status(500).send({ success: false, message: 'venta.createErr', body: error})
    }
    
  }