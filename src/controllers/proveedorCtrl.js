const pool = require('../models/repository_postgre');


exports.create = async (req, res) => {
    const {cedula_pro, nombre_pro, tipo_documento_pro, telefono_pro, correo_pro} = req.body;
    const response = await pool.query(`INSERT INTO proveedor (cedula_pro, nombre_pro, tipo_documento_pro, telefono_pro, correo_pro) VALUES ($1, $2, $3, $4, $5)`, [cedula_pro, nombre_pro, tipo_documento_pro, telefono_pro, correo_pro]);
    res.status(201).json({
        success: true,
        message: 'Created',
        body: {
            proveedor:{
                cedula_pro, nombre_pro, tipo_documento_pro, telefono_pro, correo_pro
            }
        }
    })
  }

exports.getAll = async (req, res) => {
    try {
        const response = await pool.query(`SELECT * FROM proveedor`);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}

exports.getByDocumento = async (req, res) => {
    try {
        const cedula = req.params.id;
        const response = await pool.query(`SELECT * FROM proveedor WHERE cedula_pro = ${cedula}`);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}

exports.getByNombre = async (req, res) => {
    try {
        const nombre = req.params.id;
        const response = await pool.query(`SELECT * FROM proveedor WHERE nombre_pro LIKE '%${nombre}%'`);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}
  