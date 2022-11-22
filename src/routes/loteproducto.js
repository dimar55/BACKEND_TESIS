const {Router} = require('express');
const router = Router();
const loteproductoCtrl = require('../controllers/loteproductoCtrl');

router.get('/', loteproductoCtrl.getAll);
router.get('/id/:id', loteproductoCtrl.getById);
router.get('/nombre/:id', loteproductoCtrl.getByNombre);
router.get('/cantidad/:id', loteproductoCtrl.getByCantidad);
router.post('/', loteproductoCtrl.create);

module.exports = router;