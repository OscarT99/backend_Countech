const { response } = require('express');
const Usuario = require('../../models/usuarioModel/usuarioModel')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const login = async(req, res = response) => {

    const { email, contrasena } = req.body;

    try{

        //verificar si el email existe
        //const usuario = await Usuario.findOne({ email });
        const usuario = await Usuario.findOne({ where: { email: email } });

        if ( !usuario){
            return res.status(400).json({
                msg: 'Email-Contraseña invalidos (email)'
            })
        }


        //verificar que el usuario este activo
        if ( !usuario.estado){
            return res.status(400).json({
                msg: 'El usuario no se encuentra activo'
            })
        }


        //verificaf contraseña
        const validContrasena = bcryptjs.compareSync( contrasena, usuario.contrasena);
        if ( !validContrasena){
            return res.status(400).json({
                msg: 'Email-Contraseña invalidos (contraseña)'
            })
        }


        //Generar JWT
        const generarJWT = (uid = '') => {
            return new Promise((resolve, reject) => {
                const payload = { uid };
                jwt.sign(payload, process.env.SECRETORPRIVATEKEY,  {
                    expiresIn: '4h'
                }, (err, token ) => {
                    if(err){
                        console.log(err);
                        reject('Nose pudo generar el token')
                    }else{
                        resolve(token);
                    }
                })
            })
        }
        
        
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: 'Upps ocurrio un error'
        })
    }

    
}


module.exports = {
    login
}