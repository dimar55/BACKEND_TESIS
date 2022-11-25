const pool = require('../models/repository_postgre');

exports.create = async (req, res) => {
    try {
        const {id_product, nombre_product, marca_product, categoria_product, unidad_poduct, cantidad_product } = req.body;
    const response = await pool.query(`INSERT INTO producto (id_product, nombre_product, marca_product, categoria_product, unidad_poduct, cantidad_product) VALUES ($1, $2, $3, $4, $5, $6)`, [id_product, nombre_product, marca_product, categoria_product, unidad_poduct, cantidad_product]);
    res.status(201).json({
        success: true,
        message: 'Created',
        body: {
            producto:{
                id_product, nombre_product, marca_product, categoria_product, unidad_poduct, cantidad_product
            }
        }
    })
    } catch (error) {
        res.status(500).send({ success: false, message: 'producto.createErr', body: error})
    }
    
  }

exports.getAll = async (req, res) => {
    try {
        const response = await pool.query(`SELECT * FROM producto`);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query(`SELECT * FROM producto WHERE id_product = ${id}`);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}

exports.getByNombre = async (req, res) => {
    try {
        const nombre_product = req.params.id;
        const response = await pool.query(`SELECT * FROM producto WHERE nombre_product LIKE '%${nombre_product}%'`);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}
  