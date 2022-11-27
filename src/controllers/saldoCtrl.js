const pool = require('../models/repository_postgre');

exports.create = async (req, res) => {
    try {
        const {estado_saldo, id_venta, cedula_cli, saldo} = req.body;
    const response = await pool.query(`INSERT INTO saldo (estado_saldo, id_venta, cedula_cli, saldo) VALUES ($1, $2, $3, $4)`, [estado_saldo, id_venta, cedula_cli, saldo]);
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
        const response = await pool.query(`SELECT * FROM saldo`);
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

exports.updateSaldo = async (req, res) => {
    try {
        const { id_saldo, estado_saldo, saldo } = req.body;
        const response = await pool.query(`UPDATE saldo SET estado_saldo = '${estado_saldo}', saldo = ${saldo} WHERE id_saldo = ${id_saldo}`);
        res.status(204).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}
