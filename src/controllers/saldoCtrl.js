const pool = require('../models/repository_postgre');

exports.create = async (req, res) => {
    try {
        const {estado_saldo, id_venta, cedula_cli, saldo} = req.body;
    const response = await pool.query(`INSERT INTO saldo (estado_saldo, id_venta, cedula_cli, saldo_total, saldo_actual) VALUES ($1, $2, $3, $4, $5)`, [estado_saldo, id_venta, cedula_cli, saldo, saldo]);
    res.status(201).json({
        success: true,
        message: 'Created',
        body: {
            saldo:{
                estado_saldo, id_venta, cedula_cli, saldo
            }
        }
    })
    } catch (error) {
        res.status(500).send({ success: false, message: 'saldo.createErr', body: error})
    }
    
  }

  exports.getAll = async (req, res) => {
    try {
        const response = await pool.query(`SELECT saldo.*, cliente.*, to_char(venta.fecha_venta, 'YYYY-MON-DD') as fecha_venta FROM saldo INNER JOIN cliente ON cliente.cedula_cli = saldo.cedula_cli INNER JOIN venta ON venta.id_venta = saldo.id_venta`);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}

exports.getByFilter = async (req, res) => {
    let query = "";
    const {estado_saldo, cedula_cli } = req.body;

    if(estado_saldo && cedula_cli){
        query = `SELECT * FROM saldo WHERE estado_saldo = '${estado_saldo}' AND cedula_cli = ${cedula_cli}`;
    }else if(estado_saldo){
        query = `SELECT * FROM saldo WHERE estado_saldo = '${estado_saldo}'`;
    }else if(cedula_cli){
        query = `SELECT * FROM saldo WHERE cedula_cli = ${cedula_cli}`;
    }else{
        query = `SELECT * FROM saldo`;
    }
    try {
        const response = await pool.query(query);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}

exports.getAbonos = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query(`SELECT saldo, to_char(fecha_abono, 'YYYY-MON-DD') as fecha_abono FROM saldo_abono WHERE id_saldo = ${id}`);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}

exports.insertAbono = async (req, res) => {
    try {
        const { id_saldo, saldo } = req.body;
        const response = await pool.query(`INSERT INTO saldo_abono (id_saldo, saldo) VALUES ($1, $2)`, [id_saldo, saldo]);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}
