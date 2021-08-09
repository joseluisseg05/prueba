const { response, request } = require('express')
const { existeHolder, existeUser } = require('../helpers/db_validate');

const Admin = require('../models/admin');
const Holder = require('../models/holder');
const User = require('../models/user');
const Transaccion = require('../models/transaccion');
const Cuenta = require('../models/cuenta');

exports.CreateAdmin = async(req= request, res = response)=> {
    try{
        const admin = new Admin(req.body.admin);
        const user = new User(req.body.admin.user);

        const existeDataUser = await existeUser(user.email);
        if(!existeDataUser){
            user.isAdmin = true;
            const dataUser = await user.save();
            admin.userId = dataUser.id
            await admin.save();
            
            res.status(201).json({
                message: "Adminsitrador creado"
            })
        } else {
            res.status(400).json({
                message: "El correo ya esta registrado"
            })
        }
    } catch(error){
        console.log(error)
        res.status(500).json({
            message: error
        })
    }
}

exports.CreateHolder = async(req= request, res = response)=> {
    try{
        const holder = new Holder(req.body.holder);
        const user = new User(req.body.holder.user);
        const isAdmin = await User.findByPk(req.user)
        if(isAdmin.isAdmin){
            const existeDataUser = await existeUser(user.email);
            if(!existeDataUser){
                const cuenta = new Cuenta();
                const dataUser = await user.save();
                holder.userId = dataUser.id
                const dataHolder = await holder.save();
                cuenta.holderId = dataHolder.id
                await cuenta.save()

                res.status(201).json({
                    message: "Holder creado"
                })
            } else {
                res.status(400).json({
                    message: "El correo ya esta registrado"
                })
            }
        } else {
            res.status(401).json({
                message: "Nivel de Acceso no valido"
            })
        }
        
    } catch(error){
        console.log(error)
        res.status(500).json({
            message: error
        })
    }
}

exports.CreateDeposito = async(req= request, res = response)=> {
    try{
        const cuenta = await Cuenta.findByPk(req.body.deposito.cuenta)
        const isAdmin = await User.findByPk(req.user)
        if(isAdmin.isAdmin){
            if(cuenta){
                const total = parseFloat(cuenta.cantidad) + parseFloat(req.body.deposito.monto)
                const data = {
                    monto: parseFloat(req.body.deposito.monto),
                    type: "Deposito",
                    idUser: req.user,
                    idCuenta: req.body.deposito.cuenta
                }
                const datatransaccion = new Transaccion(data);
                console.log(datatransaccion)
                cuenta.cantidad = total 
                
                await cuenta.save()
                await datatransaccion.save()
    
                res.status(201).json({
                    message: "Deposito creado"
                })
            } else {
                res.status(400).json({
                    message: "No existe una cuenta"
                })
            }
        } else {
            res.status(401).json({
                message: "Nivel de Acceso no valido"
            }) 
        }
        
        
    } catch(error){
        console.log(error)
        res.status(500).json({
            message: error
        })
    }
}

exports.GetTransacciones = async(req= request, res = response)=> {
    try{
        const data = await Transaccion.findAll({
            where: {
                type: "Transaccion"
            }
        })
        res.status(200).json({
            Tipo: "Transaccion",
            datos: data
        })
    } catch(error){
        console.log(error)
        res.status(500).json({
            message: error
        })
    }
}

exports.GetDepositos = async(req= request, res = response)=> {
    try{
        const data = await Transaccion.findAll({
            where: {
                type: "Deposito"
            }
        })
        res.status(200).json({
            Tipo: "Deposito",
            datos: data
        })
    } catch(error){
        console.log(error)
        res.status(500).json({
            message: error
        })
    }
}

exports.EditHolder = async(req= request, res = response)=> {
    try {
        const { idholder } = req.params;
        const existeDataHolder = await existeHolder(idholder);
        const isAdmin = await User.findByPk(req.user)
        if(isAdmin.isAdmin){
            if(existeDataHolder){
                const holder = await Holder.findByPk(idholder);
                holder.name = req.body.holder.name == "" ? holder.name : req.body.holder.name 
                holder.lastname =  req.body.holder.lastName == "" ? holder.lastname : req.body.holder.lastName 
                holder.age = req.body.holder.age == "" ? holder.age : req.body.holder.age
    
                await holder.save()
                //console.log(holder)
                res.status(200).json({
                    message: "Holder editado"
                })
            } else {
                res.status(400).json({
                    message: "No existe el holder con el ID: " + idholder
                })
            }
        } else {
            res.status(401).json({
                message: "Nivel de Acceso no valido"
            }) 
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error
        })
    }
}

exports.DeleteHolder = async(req= request, res = response)=> {
    try{
        const { idholder } = req.params;
        const existeDataHolder = await existeHolder(idholder);
        const isAdmin = await User.findByPk(req.user)
        if(isAdmin.isAdmin){
            if(existeDataHolder){
                const holder = await Holder.findByPk(idholder);
                const user = await User.findByPk(holder.userId);
                user.activo = 0
                await user.save()
                res.status(200).json({
                    message: "Holder eliminado"
                })
            } else {
                res.status(400).json({
                    message: "No existe el holder con el ID: " + idholder
                })
            }
        } else {
            res.status(401).json({
                message: "Nivel de Acceso no valido"
            }) 
        }
        
    } catch(error){
        console.log(error)
        res.status(500).json({
            message: error
        })
    }
}
