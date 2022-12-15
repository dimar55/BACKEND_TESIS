const pool = require('../models/repository_postgre');
const format = require('pg-format');

function obtenerNombres(array){
    let prods = "";
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        prods += index!=(array.length-1) ? element.nombre_product + ", " : element.nombre_product;
    }
    return prods;
}

exports.getLastId = async (req, res) => {
    try {
        const response = await pool.query('SELECT id_venta FROM venta ORDER BY id_venta DESC LIMIT 1');
        if(response.rowCount>0){
            res.status(200).send({success: true, body: response.rows})
        }else{
            res.status(404).send({success: false, message: 'No hay ventas'})
        }
    } catch (error) {
        res.status(500).send({ success: false, message: 'venta.getLastId', body: error})
    }
}

exports.getAll = async (req, res) => {
    try {
        const response = await pool.query(`SELECT  venta.id_venta, venta.total_venta ,to_char(venta.fecha_venta, 'YYYY-MON-DD') as fecha_venta, cliente.cedula_cli, cliente.nombre_cli FROM venta INNER JOIN venta_producto ON venta_producto.id_venta = venta.id_venta INNER JOIN cliente ON cliente.cedula_cli = venta.cedula_cli`);
        let resp = [];
        for (let index = 0; index < response.rows.length; index++) {
            const element = response.rows[index];
            let id_venta = element.id_venta;
            const nombres = await pool.query(`SELECT producto.id_product, producto.nombre_product, producto.marca_product, producto.cantidad_product, producto.unidad_product, venta_producto.cantidad_venta, venta_producto.subtotal_venta FROM producto INNER JOIN venta_producto ON venta_producto.id_product = producto.id_product WHERE venta_producto.id_venta = ${id_venta}`);
            const venta = {
                id_venta: element.id_venta,
                total_venta: element.total_venta,
                fecha_venta: element.fecha_venta,
                cedula_cli: element.cedula_cli,
                nombre_cli: element.nombre_cli,
                prod_nombres: obtenerNombres(nombres.rows),
                prods: nombres.rows
            }
            resp.push(venta)
        }
        res.status(200).send({success: true, body: resp})
    } catch (error) {
        res.status(500).send({ success: false, message: 'venta.getAll', body: error})
    }
}

exports.getByDate = async (req, res) => {
    try {
        const {fecha_ini, fecha_fin} = req.body;
        const response = await pool.query(`SELECT venta.id_venta, venta.total_venta ,to_char(venta.fecha_venta, 'YYYY-MON-DD') as fecha_venta FROM venta INNER JOIN venta_producto ON venta_producto.id_venta = venta.id_venta WHERE venta.fecha_venta >= '${fecha_ini}' AND venta.fecha_venta <= '${fecha_fin}'`);
        let resp = [];
        for (let index = 0; index < response.rows.length; index++) {
            const element = response.rows[index];
            let id_venta = element.id_venta;
            const nombres = await pool.query(`SELECT producto.nombre_product, venta_producto.cantidad_venta, venta_producto.subtotal_venta FROM producto INNER JOIN venta_producto ON venta_producto.id_product = producto.id_product WHERE venta_producto.id_venta = ${id_venta}`);
            const venta = {
                id_venta: element.id_venta,
                total_venta: element.total_venta,
                fecha_venta: element.fecha_venta,
                prod_nombres: obtenerNombres(nombres.rows),
                prods: nombres.rows
            }
            resp.push(venta)
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
        let subtotal = productos[index][1] * productos[index][2];
       ventap.push([req.body.id_venta, productos[index][0], productos[index][1], subtotal])
    }
    const response = await pool.query(format(`INSERT INTO venta_producto (id_venta, id_product, cantidad_venta, subtotal_venta) VALUES %L`, ventap))
    res.status(201).send({ success: true, body: {
        id_venta: req.body.id_venta,
        total_venta: req.body.total_venta,
        productos: ventap
    }})
}


exports.create = async (req, res, next) => {
    try {
        let total = 0;
    const {productos, cedula_cli} = req.body;
    for (let index = 0; index < productos.length; index++) {
        total += productos[index][1]*productos[index][2];
    }
    const response = await pool.query(`INSERT INTO venta (total_venta, cedula_cli) VALUES ($1, $2) RETURNING id_venta`, [total,cedula_cli]);
    req.body.id_venta = response.rows[0].id_venta;
    req.body.total_venta = total;
    next();
    } catch (error) {
        res.status(500).send({ success: false, message: 'venta.createErr', body: error})
    }
    
  }