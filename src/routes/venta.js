const {Router} = require('express');
const router = Router();
const ventaCtrl = require('../controllers/ventaCtrl');

router.get('/', ventaCtrl.getAll);
router.post('/filtro', ventaCtrl.getByDate);
router.post('/', ventaCtrl.create, ventaCtrl.insertarVentaProducto);

module.exports = router;