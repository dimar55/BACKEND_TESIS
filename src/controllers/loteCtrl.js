const pool = require('../models/repository_postgre');

exports.create = async (req, res) => {
    const {precio_entrada, precio_venta, cantidad_lote, fecha_entrada, fecha_vencimiento, cedula_pro, cedula_usu} = req.body;
    const response = await pool.query(`INSERT INTO lote (precio_entrada, precio_venta, cantidad_lote, fecha_entrada, fecha_vencimiento, cedula_pro, cedula_usu) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [precio_entrada, precio_venta, cantidad_lote, fecha_entrada, fecha_vencimiento, cedula_pro, cedula_usu]);
    res.status(201).json({
        success: true,
        message: 'Created',
        body: {
            producto:{
                precio_entrada, precio_venta, cantidad_lote, fecha_entrada, fecha_vencimiento, cedula_pro, cedula_usu
            }
        }
    })
  }

