const { response, request } = require('express');
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.generarJWT = (id="") => {
    const payload = {id};
    //console.log(id);
    return new Promise( (resolve, reject)=> {
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: '4h'
        }, (err, token) => {
            if ( err){
                console.log(err);
                reject('No se pudo generar el Token');
            } else {
                console.log(token)
                resolve(token);
            }
        })
    })
}

exports.valiarJWT = async (req= request, res= response, next) => {
    const token = req.header('authorization'); 
    //console.log(token)
    if (!token)
        return res.status(401).json({
            msj: "No hay token en la peticion "
        });
    
    try {
        const { id } = jwt.verify(token, process.env.SECRET);
        const usuario = await User.findByPk(id);
        //console.log(usuario)
        if (!usuario ){
            return res.status(401).json({
                msj: "Usuario inexistente "
            });
        }

        req.user = usuario.id;
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msj: "Token no valido"
        });
    }

    next();
}