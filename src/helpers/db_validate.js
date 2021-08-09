const Cuenta = require('../models/cuenta')
const Holder = require('../models/holder')
const User = require('../models/user')

exports.existeCuenta = async(id=0)=> {
    const existe = await Cuenta.findByPk(id)
    if(!existe){
        return false
    }
    return true
}

exports.existeHolder = async(id=0)=> {
    const holder = await Holder.findByPk(id)
    const existe = await User.findByPk(holder.userId)
    if(existe.activo == 0){
        return false
    }
    return true
}

exports.existeUser = async(email="")=> {
    const existe = await User.findOne({
        where: {email}
    })
    if(!existe){
        return false
    }
    return true
}