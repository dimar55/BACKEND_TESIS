const pool = require('../models/repository_postgre');

exports.create = async (req, res) => {
    try {
        const {id_lote , id_product} = req.body;
    const response = await pool.query(`INSERT INTO lote_producto (id_lote , id_product) VALUES ($1, $2)`, [id_lote , id_product]);
    res.status(201).json({
        success: true,
        message: 'Created',
        body: {
            producto:{
                id_lote , id_product
            }
        }
    })
    } catch (error) {
        res.status(500).send({ success: false, message: 'loteproducto.createErr', body: error})
    }
  }


  
exports.getAll = async (req, res) => {
    try {
        const response = await pool.query(`SELECT producto.*, lote.id_lote, lote.precio_entrada, lote.precio_venta, lote.cantidad_lote, to_char(lote.fecha_entrada, 'YYYY-MON-DD') as fecha_entrada, to_char(lote.fecha_vencimiento, 'YYYY-MON-DD') as fecha_vencimiento, lote.cedula_pro, lote.cedula_usu FROM lote_producto INNER JOIN producto ON producto.id_product = lote_producto.id_product INNER JOIN lote ON lote.id_lote = lote_producto.id_lote WHERE lote.cantidad_lote>0`);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query(`SELECT producto.*, lote.id_lote, lote.precio_entrada, lote.precio_venta, lote.cantidad_lote, to_char(lote.fecha_entrada, 'YYYY-MON-DD') as fecha_entrada, to_char(lote.fecha_vencimiento, 'YYYY-MON-DD') as fecha_vencimiento, lote.cedula_pro, lote.cedula_usu FROM lote_producto INNER JOIN producto ON producto.id_product = lote_producto.id_product INNER JOIN lote ON lote.id_lote = lote_producto.id_lote WHERE producto.id_product = ${id} AND lote.cantidad_lote>0`);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}


exports.getByNombre = async (req, res) => {
    try {
        const nombre = req.params.id;
        const response = await pool.query(`SELECT producto.*, lote.id_lote, lote.precio_entrada, lote.precio_venta, lote.cantidad_lote, to_char(lote.fecha_entrada, 'YYYY-MON-DD') as fecha_entrada, to_char(lote.fecha_vencimiento, 'YYYY-MON-DD') as fecha_vencimiento, lote.cedula_pro, lote.cedula_usu FROM lote_producto INNER JOIN producto ON producto.id_product = lote_producto.id_product INNER JOIN lote ON lote.id_lote = lote_producto.id_lote WHERE producto.nombre_product LIKE '%${nombre}%'`);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}

exports.getByCantidad = async (req, res) => {
    try {
        const cantidad = req.params.id;
        const response = await pool.query(`SELECT producto.*, lote.id_lote, lote.precio_entrada, lote.precio_venta, lote.cantidad_lote, to_char(lote.fecha_entrada, 'YYYY-MON-DD') as fecha_entrada, to_char(lote.fecha_vencimiento, 'YYYY-MON-DD') as fecha_vencimiento, lote.cedula_pro, lote.cedula_usu FROM lote_producto INNER JOIN producto ON producto.id_product = lote_producto.id_product INNER JOIN lote ON lote.id_lote = lote_producto.id_lote WHERE lote.cantidad_lote <= ${cantidad}`);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}