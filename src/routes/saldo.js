const {Router} = require('express');
const router = Router();
const saldoCtrl = require('../controllers/saldoCtrl');

router.get('/', saldoCtrl.getAll);
router.get('/abono/:id', saldoCtrl.getAbonos);
router.post('/', saldoCtrl.create);
router.post('/filter', saldoCtrl.getByFilter);
router.post('/abono', saldoCtrl.insertAbono);
module.exports = router;