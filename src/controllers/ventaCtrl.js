const pool = require('../models/repository_postgre');
const format = require('pg-format');


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
    let total = 0;
    const {productos} = req.body;
    for (let index = 0; index < productos.length; index++) {
        total += productos[index][1]*productos[index][2];
    }
    const response = await pool.query(`INSERT INTO venta (total_venta) VALUES ($1) RETURNING id_venta`, [total]);
    
    req.body.id_venta = response.rows[0].id_venta;
    req.body.total_venta = total;
    next();
  }