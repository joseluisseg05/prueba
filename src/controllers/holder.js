const { response, request } = require('express')
const { existeCuenta } = require('../helpers/db_validate');

const Transaccion = require('../models/transaccion');
const Cuenta = require('../models/cuenta');
const Holder = require('../models/holder');
const Users = require('../models/user');

exports.CreateTrasferencia = async(req= request, res = response) => {
    try{
        const user = Users.findByPk(req.user)
        if(user){
            const holder = await Holder.findOne({
                where: { userId: req.user}
            })
            const cuentaHolder = await Cuenta.findOne({
                where: {holderId: holder.id}
            })

            if(existeCuenta(req.body.deposito.cuenta)){
                const cuentaDestino = await Cuenta.findByPk(req.body.deposito.cuenta)
                if(parseFloat(cuentaHolder.cantidad) > parseFloat(req.body.deposito.monto)){
                    const totalHoldel = parseFloat(cuentaHolder.cantidad) - parseFloat(req.body.deposito.monto)
                    const totalDestino = parseFloat(cuentaDestino.cantidad) + parseFloat(req.body.deposito.monto)
                    
                    const data = {
                        monto: parseFloat(req.body.deposito.monto),
                        type: "Transaccion",
                        idUser: req.user,
                        idCuenta: req.body.deposito.cuenta
                    }
                    const datatransaccion = new Transaccion(data);
                    cuentaHolder.cantidad = parseFloat(totalHoldel) 
                    cuentaDestino.cantidad = parseFloat(totalDestino)

                    await cuentaDestino.save()
                    await cuentaHolder.save()
                    await datatransaccion.save()

                    res.status(201).json({
                        message: "Deposito creado"
                    })
                } else {
                    res.status(400).json({
                        message: "El monto de la es mayor al que se tiene"
                    })
                }
            } else {
                res.status(400).json({
                    message: "No existe una cuenta"
                })
            }
        } else {
            res.status(400).json({
                message: "No existe el usuario"
            })
        }
        
    } catch(error){
        console.log(error)
        res.status(500).json({
            message: error
        })
    }
}
