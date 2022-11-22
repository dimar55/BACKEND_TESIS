const {Router} = require('express');
const router = Router();
const ventaCtrl = require('../controllers/ventaCtrl');


router.post('/', ventaCtrl.create, ventaCtrl.insertarVentaProducto);

module.exports = router;