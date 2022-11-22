const {Router} = require('express');
const router = Router();
const loteCtrl = require('../controllers/loteCtrl');


router.post('/', loteCtrl.create);

module.exports = router;