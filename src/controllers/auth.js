const { request, response } = require('express')

const User = require('../models/user')
const { generarJWT } = require('../middlewares/jwToken')

exports.login = async(req= request, res= response)=> {
    const { email, password }= req.body;
    
    try {
        const user = await User.findOne({
            where: {email}
        });
        if(!user){
            return res.status(400).json({
                msg: 'No existe un Usuario'
            })
        } else {
            const verificar = user.validarPassword(password)
            if(!verificar) {
                return res.status(401).json({
                    msg: 'La contraseña no coincide'
                })
            } else {
                const token = await generarJWT(user.id)
                res.status(200).json({
                    user, 
                    token
                });
            }
        }

    } catch (error) {
        return res.status(500).json({
            msj: "Credenciales incorrectas"
        })
    }
}