const {Router} = require('express');
const router = Router();
const saldoCtrl = require('../controllers/saldoCtrl');

router.get('/', saldoCtrl.getAll);
router.post('/', saldoCtrl.create);
router.post('/filter', saldoCtrl.getByFilter);
router.put('/', saldoCtrl.updateSaldo);
module.exports = router;