const pool = require('../models/repository_postgre');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const accountTransport = require("../utils/account_transport.json");
const generarCodigo = (tam) => {
    const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let aleatoria = "";
    for (let i = 0; i < tam; i++) {
        aleatoria += banco.charAt(Math.floor(Math.random() * banco.length));
    }
    return aleatoria;
};

exports.createUsuario = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).send({ success: false, message: 'usuario.createErr', body: error})
    }
    
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

exports.obtnCodigo = async (req, res) => {
    try{
        const {correo_usu} = req.body;
        const code = generarCodigo(8);
        const response = await pool.query(`SELECT * FROM usuario WHERE correo_usu = '${correo_usu}'`);
        if(response.rowCount>0){
            const message = {
                from: "soporte.yamelcris@gmail.com",
                to: correo_usu,
                subject: "Código de verificación",
                text: `Su código de verificación es: ${code}`,
            };
            const oauth2Client = new OAuth2(
                accountTransport.auth.clientId,
                accountTransport.auth.clientSecret,
                "https://developers.google.com/oauthplayground",
            );
            oauth2Client.setCredentials({
                refresh_token: accountTransport.auth.refreshToken,
                tls: {
                    rejectUnauthorized: false
                }
            });
            oauth2Client.getAccessToken((err, token) => {
                if (err) res.status(403).send({ success: false, body: {message: 'Error obteniendo token', err} });
                accountTransport.auth.accessToken = token;     
            });
            let mail = await nodemailer.createTransport(accountTransport).sendMail(message)
            res.status(200).send({success: true, body: {message: 'Correo enviado', message, code}})
        }else{
            res.status(404).send({ success: false, body: {message: 'El correo ingreso no existe'} });
        }
        
    }catch(err){
        console.log(" err sendEmailCodigo = ", err);
        res.status(500).send({ success: false, body: {message: 'Error al enviar correo', err} });
    }
}

exports.recuperarUsuario = async (req, res) => {
    try{
        const {correo_usu} = req.body;
        const response = await pool.query(`SELECT * FROM usuario WHERE correo_usu = '${correo_usu}'`);
        if(response.rowCount>0){
            const message = {
                from: "soporte.yamelcris@gmail.com",
                to: correo_usu,
                subject: "Recuperación de usuario",
                text: `Su usuario es: ${response.rows[0].nick_usu}`,
            };
            const oauth2Client = new OAuth2(
                accountTransport.auth.clientId,
                accountTransport.auth.clientSecret,
                "https://developers.google.com/oauthplayground",
            );
            oauth2Client.setCredentials({
                refresh_token: accountTransport.auth.refreshToken,
                tls: {
                    rejectUnauthorized: false
                }
            });
            oauth2Client.getAccessToken((err, token) => {
                if (err) res.status(403).send({ success: false, body: {message: 'Error obteniendo token', err} });
                accountTransport.auth.accessToken = token;     
            });
            let mail = await nodemailer.createTransport(accountTransport).sendMail(message)
            res.status(200).send({success: true, body: {message: 'Correo enviado', message}})
        }else{
            res.status(404).send({ success: false, body: {message: 'El correo ingreso no existe'} });
        }
        
    }catch(err){
        console.log(" err sendEmailUsuario = ", err);
        res.status(500).send({ success: false, body: {message: 'Error al enviar correo', err} });
    }
}

exports.UpdateByEmail = async ( req, res ) =>{
    try{
        const {contra_usu, correo_usu} = req.body;
        const pswHash = bcrypt.hashSync(contra_usu, 10);
        const response = await pool.query(`UPDATE usuario SET contra_usu = $1 WHERE correo_usu = $2`, [pswHash, correo_usu]);
        res.status(200).send({success: true, body: {message: 'Contraseña actualizada'}})
    }catch(err){
        console.log(" err actualizarContra = ", err);
        res.status(500).send({ success: false, body: {message: 'Error al actualizar contraseña', err} });
    }
}