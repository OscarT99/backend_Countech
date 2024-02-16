const { request } = require('express');
const jwt = require('jsonwebtoken');
const  Usuario = require('../models/usuarioModel/usuarioModel');
const { async } = require('rxjs');
require ('dotenv').config();


const validarJWT = async( req = request, res = response, next ) => {
    const token = req.header('x-token');

    if ( !token ) {

        return res.status(401).json({
            msg: 'No hay token en la petición'
        });

    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //Leer el usuario que corresponde al uid
        //Verifica que existe un usuario y se encontró 
        const usuario = await Usuario.findByPk(uid)

        //Verifica que el usuario buscado exista en la BD
        if (!usuario){
            return res.status(401).json({
                msg: 'Token no válido no existe'
            })
        } 

        //Verificar que el usuario esta en estado activo
        if (!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido'
            })
        }

        req.usuario = usuario;       
        next();


    } catch (error){

        console.log(error);
        res.status(401).json({
            msg:'El token no es válido'
        })

    }
}


module.exports = {
    validarJWT
}
 