const pool = require('../models/repository_postgre');

exports.create = async (req, res) => {
    try{
    const {precio_entrada, precio_venta, cantidad_lote, fecha_vencimiento, cedula_pro, cedula_usu} = req.body;
    const response = await pool.query(`INSERT INTO lote (precio_entrada, precio_venta, cantidad_lote, fecha_vencimiento, cedula_pro, cedula_usu) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_lote`, [precio_entrada, precio_venta, cantidad_lote, fecha_vencimiento, cedula_pro, cedula_usu]);
    res.status(201).json({
        success: true,
        message: 'Created',
        body: {
            producto:{
                id_lote: response.rows[0].id_lote, precio_entrada, precio_venta, cantidad_lote, fecha_vencimiento, cedula_pro, cedula_usu
            }
        }
    })
    } catch (error) {
        res.status(500).send({ success: false, message: 'lote.createErr', body: error})
    }
    
  }

