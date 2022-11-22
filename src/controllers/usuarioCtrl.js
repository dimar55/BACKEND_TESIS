const pool = require('../models/repository_postgre');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUsuario = async (req, res) => {
    const {cedula_usu, nombre_usu, nick_usu, contra_usu, rol_usu} = req.body;
    const pswHash = bcrypt.hashSync(contra_usu, 10);
    const response = await pool.query(`INSERT INTO usuario (cedula_usu, nombre_usu, nick_usu, contra_usu, rol_usu) VALUES ($1, $2, $3, $4, $5)`, [cedula_usu, nombre_usu, nick_usu, pswHash, rol_usu]);
    res.status(201).json({
        success: true,
        message: 'Created',
        body: {
            user:{
                cedula_usu, nombre_usu, nick_usu, contra_usu, rol_usu
            }
        }
    })
  }

exports.getUsuarios = async (req, res) => {
    try {
        const response = await pool.query(`SELECT * FROM usuario WHERE rol_usu = 'Operador'`);
        res.status(200).send({ success: true, body: response.rows});
    } catch (error) {
        res.status(500).send({success: false, body: error});
    }
}
  
  exports.find = async (req, res, next) => {
      const nick = req.body.nick_usu;
      try {
          const response = await pool.query(`SELECT * FROM usuario WHERE nick_usu = '${nick}'`);
          if(response.rowCount>0){
              req.body.users = response.rows;
          }
          next();
      } catch (error) {
          return res.status(500).send({success: false, body: error});
      }
  }
  
  exports.signin = async (req, res) => {
      if (!req.body.users) return res.status(404).send({ success: false, body: {message: 'Usuario no existe'} });
      let user = req.body.users[0];
      const match = await bcrypt.compare(req.body.contra_usu, user.contra_usu);
      if (match) {
          jwt.sign({ user }, 'f3374801da1c40739c10d7fdb181cc74', function (err, token) {
              res.status(200).send({ success: true, body: {token} })
          });
      } else {
          res.status(403).send({ success: false, body: {message: 'Credenciales invalidas'} })
      }
  }
  
  exports.verifyToken = (req, res) => {
      let {token} = req.body;
      jwt.verify(token, 'f3374801da1c40739c10d7fdb181cc74', function(err, decoded) {
          if(err) return res.status(200).send({success: false, body: {message: 'Token invalido'}})
          res.status(200).send({success: true, body: {message: 'Token valido', decoded}})
      });
  }