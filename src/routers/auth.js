const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar_campos');

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').notEmpty().isEmail().normalizeEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty().isLength({min: 6}),
    validarCampos
] , login);

module.exports = router;