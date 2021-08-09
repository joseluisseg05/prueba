const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar_campos');
const { valiarJWT } = require('../middlewares/jwToken')

const { CreateTrasferencia } = require('../controllers/holder')
const router = Router();

router.post('/deposito', [
    valiarJWT,
    check('deposito.cuenta', 'La cuenta destino es un campo requerido').notEmpty(),
    check('deposito.monto', 'El monto es un campo requerido').notEmpty(),
    validarCampos
], CreateTrasferencia)

module.exports = router;