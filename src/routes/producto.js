const {Router} = require('express');
const router = Router();
const productoCtrl = require('../controllers/productoCtrl');

router.get('/', productoCtrl.getAll);
router.get('/id/:id', productoCtrl.getById);
router.get('/nombre/:id', productoCtrl.getByNombre);
router.get('/cantidad/:id', productoCtrl.getByCantidad);
router.post('/', productoCtrl.create);

module.exports = router;