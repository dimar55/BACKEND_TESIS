const {Router} = require('express');
const router = Router();
const facturaCtrl = require('../controllers/facturaCtrl');

//router.get('/', ventaCtrl.getAll);
//router.post('/filtro', ventaCtrl.getByDate);
router.post('/', facturaCtrl.create, facturaCtrl.insertarFacturaProducto);

module.exports = router;