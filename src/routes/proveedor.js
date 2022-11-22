const {Router} = require('express');
const router = Router();
const proveedorCtrl = require('../controllers/proveedorCtrl');

router.get('/', proveedorCtrl.getAll);
router.get('/cedula/:id', proveedorCtrl.getByDocumento);
router.get('/nombre/:id', proveedorCtrl.getByNombre);
router.post('/', proveedorCtrl.create);

module.exports = router;