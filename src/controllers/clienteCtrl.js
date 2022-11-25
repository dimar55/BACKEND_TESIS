const pool = require('../models/repository_postgre');

exports.create = async (req, res) => {
    try {
        const {cedula_cli, nombre_cli, tipo_documento_cli, telefono_cli, direccion_cli} = req.body;
    const response = await pool.query(`INSERT INTO cliente (cedula_cli, nombre_cli, tipo_documento_cli, telefono_cli, direccion_cli) VALUES ($1, $2, $3, $4, $5)`, [cedula_cli, nombre_cli, tipo_documento_cli, telefono_cli, direccion_cli]);
    res.status(201).json({
        success: true,
        message: 'Created',
        body: {
            cliente:{
                cedula_cli, nombre_cli, tipo_documento_cli, telefono_cli, direccion_cli
            }
        }
    })
    } catch (error) {
        res.status(500).send({ success: false, message: 'cliente.createErr', body: error})
    }
    
  }

exports.getAll = async (req, res) => {
    try {
        const response = await pool.query(`SELECT * FROM cliente`);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}

exports.getByDocumento = async (req, res) => {
    try {
        const cedula = req.params.id;
        const response = await pool.query(`SELECT * FROM cliente WHERE cedula_cli = ${cedula}`);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}

exports.getByNombre = async (req, res) => {
    try {
        const nombre = req.params.id;
        const response = await pool.query(`SELECT * FROM cliente WHERE nombre_cli LIKE '%${nombre}%'`);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}
  