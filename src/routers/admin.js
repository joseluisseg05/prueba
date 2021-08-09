const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar_campos');
const { valiarJWT } = require('../middlewares/jwToken')

const { 
    CreateAdmin, 
    CreateDeposito, 
    CreateHolder, 
    GetDepositos, 
    GetTransacciones,
    EditHolder, 
    DeleteHolder 
} = require('../controllers/admin')

const router = Router();

router.post('/', [
    check('admin.name', 'El nombre del administrador es un campo requerido').notEmpty().trim().escape().toLowerCase(),
    check('admin.lastName', 'Los apellidos del administrador son campos requeridos').notEmpty().trim().escape().toLowerCase(),
    check('admin.user.email', 'El email es obligatorio').notEmpty().isEmail().normalizeEmail(),
    check('admin.user.password', 'La contraseña es obligatoria').notEmpty().isLength({min: 6}),
    validarCampos
], CreateAdmin)

router.post('/holder', [
    valiarJWT,
    check('holder.name', 'El nombre del holder es un campo requerido').notEmpty().trim().escape().toLowerCase(),
    check('holder.lastName', 'Los apellidos del holder son campos requeridos').notEmpty().trim().escape().toLowerCase(),
    check('holder.age', 'La edad es un campo obligatorio y debe de ser mayor a 18 años').notEmpty().isFloat({min: 18}),
    check('holder.user.email', 'El email es obligatorio').notEmpty().isEmail().normalizeEmail(),
    check('holder.user.password', 'La contraseña es obligatoria').notEmpty().isLength({min: 6}),
    validarCampos
], CreateHolder)

router.post('/deposito', [
    valiarJWT,
    check('deposito.cuenta', 'La cuenta destino es un campo requerido').notEmpty(),
    check('deposito.monto', 'El monto es un campo requerido').notEmpty(),
    //check('deposito.type', 'El tipo de deposito es un campo requerido').notEmpty().isIn(['Deposito']),
    validarCampos
], CreateDeposito)

router.get('/deposito', GetDepositos)

router.get('/transaccion', GetTransacciones)

router.delete('/:idholder', [
    valiarJWT,
    check('idholder', 'El id del holder es un campo requerido').notEmpty().isNumeric(),
    validarCampos
], DeleteHolder)

router.put('/:idholder', [
    valiarJWT,
    check('idholder', 'El id del holder es un campo requerido').notEmpty().isNumeric(),
    validarCampos
], EditHolder)

module.exports = router;