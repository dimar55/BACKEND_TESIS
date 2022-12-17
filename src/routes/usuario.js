const {Router} = require('express');
const router = Router();
const usuarioCtrl = require('../controllers/usuarioCtrl');

router.get('/', usuarioCtrl.getUsuarios);
router.get('/comprobar/:id', usuarioCtrl.Comprobariniciado);
router.get('/codigo/:id', usuarioCtrl.Comprobarcodigo);
router.post('/verificar', usuarioCtrl.getExistentes);
router.post('/', usuarioCtrl.createUsuario);
router.post('/auth/', usuarioCtrl.find, usuarioCtrl.signin);
router.post('/verifyToken', usuarioCtrl.verifyToken);
router.post('/recuperarUsuario', usuarioCtrl.recuperarUsuario);
router.post('/recuperarContra', usuarioCtrl.obtnCodigo);
router.post('/iniciar', usuarioCtrl.UpdateIniciar);
router.post('/cerrar', usuarioCtrl.UpdateCerrar);
router.put('/', usuarioCtrl.UpdateByEmail);
module.exports = router;