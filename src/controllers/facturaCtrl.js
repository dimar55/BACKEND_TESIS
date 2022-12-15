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

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query(`SELECT * FROM factura WHERE id_fact = '${id}'`);
        res.status(200).send({success: true, body: response.rows})
    } catch (error) {
        res.status(500).send({ success: false, message: 'factura.getAll', body: error})
    }
}

exports.getByDate = async (req, res) => {
    try {
        const {fecha_ini, fecha_fin} = req.body;
        const response = await pool.query(`SELECT venta.id_venta, venta.total_venta ,to_char(venta.fecha_venta, 'YYYY-MON-DD') as fecha_venta FROM venta INNER JOIN venta_producto ON venta_producto.id_venta = venta.id_venta WHERE venta.fecha_venta >= '${fecha_ini}' AND venta.fecha_venta <= '${fecha_fin}'`);
        let resp = [];
        console.log(response.rowCount)
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


//id_product, precio_entrada, precio_venta, cantidad
exports.insertarFacturaProducto = async (req, res) => {
    const {productos} = req.body;
    const ventap = [];
    for (let index = 0; index < productos.length; index++) {
        let subtotal = productos[index][1] * productos[index][2];
       ventap.push([req.body.id_fact, productos[index][0], productos[index][1], productos[index][2], productos[index][3]])
    }
    const response = await pool.query(format(`INSERT INTO factura_producto (id_fact, id_product, precio_entrada, precio_venta, cantidad) VALUES %L`, ventap))
    res.status(201).send({ success: true, body: {
        id_fact: req.body.id_fact,
        total_fact: req.body.total_fact,
        productos: ventap
    }})
}

exports.create = async (req, res, next) => {
    try {
    let total = 0;
    const {productos, id_fact, empresa, cedula_pro, cedula_usu} = req.body;
    for (let index = 0; index < productos.length; index++) {
        total += productos[index][2]*productos[index][3];
    }
    const response = await pool.query(`INSERT INTO factura (id_fact, empresa, total_fact, cedula_pro, cedula_usu) VALUES ($1, $2, $3, $4, $5) RETURNING id_fact`, [id_fact, empresa, total, cedula_pro, cedula_usu]);
    req.body.id_fact = response.rows[0].id_fact;
    req.body.total_fact = total;
    next();
    } catch (error) {
        res.status(500).send({ success: false, message: 'venta.createErr', body: error})
    }
    
  }