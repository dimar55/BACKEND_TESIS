const {Router} = require('express');
const router = Router();
const clienteCtrl = require('../controllers/clienteCtrl');

router.get('/', clienteCtrl.getAll);
router.get('/cedula/:id', clienteCtrl.getByDocumento);
router.get('/nombre/:id', clienteCtrl.getByNombre);
router.post('/', clienteCtrl.create);

module.exports = router;