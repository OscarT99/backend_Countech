/*
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
                        reject('No se pudo generar el token')
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
*/

const { response } = require('express');
const Usuario = require('../../models/usuarioModel/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generarJWT } = require('../../helpers/generar-jwt');
const nodemailer = require('nodemailer');
const { async } = require('rxjs');

// const login = async (req, res = response) => {
//   const {correo, password} = req.body;

//   try {
//      const usuario = await Usuario.findOne({correo});
//     if(!usuario){
//       return res.status(400).json({
//         error: 'Usuario no registrado'
//         });
//         }
//     if (!usuario.estado) {
//         return res.status(400).json({
//           error: 'Usuario no activo'
//           });
//         }

//         const validPassword = await bcrypt.compare(String(password), String(usuario.password));
//         if (!validPassword) {
//       return res.status(400).json({
//         error: 'Contraseña incorrecta'
//         });
//         }
//     if (!usuario.rol) {
//       return res.status(403).json({ error: 'Acceso denegado. El usuario no tiene un rol asignado.'
//      });
//      }


//     const token = await generarJWT(usuario._id);

//     res.json ({
//       msg: "Inicio de sesión exitoso.",
//       usuario,
//       token
//     })

//   } catch (error) {
//     console.error('Error en la autenticación:', error);
//     return res.status(500).json({
//       msg: 'Error en el servidor. Por favor, contacte al administrador.'
//     });
//   }
// }


const login = async (req, res = response) => {
  const { email, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    

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



    //verificar contraseña
    const validContrasena = bcrypt.compareSync( contrasena, usuario.contrasena);
    if ( !validContrasena){
        return res.status(400).json({
            msg: 'Email-Contraseña invalidos (contraseña)'
        })
    }


    const token = await generarJWT(usuario.id);

    res.json({
      msg: 'Inicio de sesión exitoso.',
      usuario,
      token
    });
  } catch (error) {
    console.error('Error en la autenticación:', error);
    return res.status(500).json({
      msg: 'Error en el servidor. Por favor, contacte al administrador.'
    });
  }
};


function generateResetToken() {
  // Implementa la generación de un token único aquí
  // Puedes utilizar alguna librería para generar tokens o implementar tu propia lógica
  // Por ejemplo, puedes generar un token aleatorio de longitud 20
  const token = Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12);
  return token;
}



module.exports = {
  login,
  //forgotPassword,
  //changePassword
}