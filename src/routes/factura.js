const {Router} = require('express');
const router = Router();
const facturaCtrl = require('../controllers/facturaCtrl');

router.get('/id/:id', facturaCtrl.getById);
//router.post('/filtro', ventaCtrl.getByDate);
router.post('/', facturaCtrl.create, facturaCtrl.insertarFacturaProducto);

module.exports = router;