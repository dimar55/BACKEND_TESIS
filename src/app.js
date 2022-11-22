const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

//routes
const usuarioRoutes = require('./routes/usuario');
const clienteRoutes = require('./routes/cliente');
const proveedorRoutes = require('./routes/proveedor');
const productoRoutes = require('./routes/producto');
const loteRoutes = require('./routes/lote');
const loteproductoRutes = require('./routes/loteproducto');
const ventaRoutes = require('./routes/venta');
const saldoRoutes = require('./routes/saldo');

//endpoints
app.use('/usuario', usuarioRoutes);
app.use('/cliente', clienteRoutes);
app.use('/proveedor', proveedorRoutes);
app.use('/producto', productoRoutes);
app.use('/lote', loteRoutes);
app.use('/loteP', loteproductoRutes);
app.use('/venta', ventaRoutes);
app.use('/saldo', saldoRoutes);

module.exports = app;