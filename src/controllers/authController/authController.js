const { response } = require('express');
const Usuario = require('../../models/usuarioModel/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generarJWT } = require('../../helpers/generar-jwt');
const nodemailer = require('nodemailer');
const { async } = require('rxjs');


const login = async (req, res = response) => {
    
  const { email, contrasena } = req.body;

  try {
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

//RESTABLECER CONTRASEÑA

//gmail de donde se envia el correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'countech.adso@gmail.com',
    pass: 'qats ngzp lyml lqcu'
  }
});


async function sendEmail(email, mailOptions) {
    try {
      // Verifica si el usuario con el correo proporcionado existe
      const usuario = await Usuario.findOne({ where: { email } });
  
      if (!usuario) {
        return { success: false, message: 'Usuario no encontrado.' };
      }
      const resetToken = generateResetToken();
  
      await transporter.sendMail(mailOptions);
  
      return { success: true, message: 'Se ha enviado un enlace para restablecer la contraseña, revisa el correo.' };
    } catch (error) {
      console.error('Error al recuperar la contraseña:', error);
      return { success: false, message: 'Error al recuperar la contraseña.' };
    }
}


let resetTokens = {};




async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
    // Busca al usuario por el correo proporcionado
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: 'El usuario no esta registrado' });
    }

    // Genera un token único para el restablecimiento de contraseña
    const resetToken = generateResetToken();

    // Almacena el token en la variable temporalt
    resetTokens[resetToken] = usuario;

    // Construye el objeto mailOptions con la información necesaria, incluyendo el token en el enlace
    // const mailOptions = {
    //   from: 'visor6183@gmail.com',
    //   to: correo,
    //   subject: 'Recuperación de Contraseña',
    //   text: `Haga clic en el siguiente enlace para restablecer su contraseña: https://proyecto-visor.web.app/#/cambiar-contrasena/${resetToken}`,
    // };

    const mailOptions = {
      from: 'countech.adso@gmail.com',
      to: email,
      subject: 'Recuperación de Contraseña Countech',
      html: `
      <div>
        <p>Estimado(a) Usuario,</p>
        <p>Recientemente ha solicitado cambiar su contraseña en nuestra plataforma.</p>
        <p>A continuación de le proporciona un enlace para restablecer su contraseña.</p>
        <a href="http://localhost:4200/#/cambiar-contrasena/${resetToken}" style="font-size:15px">Haga click en el enlace</a>
        <p>Porfa favor, utilice este enlace para restablecer su contraseña y poder acceder al aplicativo con su cuenta.</p>
        <p>Si usted no realizó esta solicitud, por favor haga caso omiso a este correo.</p>
        <p>Atentamente,</p>
        <p>Equipo de Coutech</p>
        <img src="../src/img/logo_countech.png" alt="Logotipo"
          style="width:200px; border-radius:50%" >
      </div>
      `
    };
    // Enviar correo con el enlace de restablecimiento de contraseña
    await sendEmail(email, mailOptions);

    res.json({ message: 'Se ha enviado un enlace para restablecer la contraseña por correo electrónico.' });
  } catch (error) {
    console.error('Error al recuperar la contraseña:', error);
    res.status(500).json({ error: 'Error al recuperar la contraseña.' });
  }
}


async function changePassword(req, res) {
  const { token } = req.params
  const { newPassword } = req.body;

  try {

    // Busca al usuario por el token de reseteo
    const usuario = resetTokens[token];

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(newPassword, saltRounds);

    // Actualiza la contraseña
    usuario.contrasena = hashedPassword;
    await usuario.save();

    // Elimina el token de la memoria
    delete resetTokens[token];

    res.json({ message: 'Contraseña actualizada exitosamente.' });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(500).json({ error: 'Error al cambiar la contraseña.' });
  }
}


async function searchUser(req, res) {
  const { email, nombre } = req.body;
  const valorBuscar = {};

  const validacion = /^[a-zA-Z]+(\s[a-zA-Z]+)?$/;
  const validacionCorreo = /^([a-zA-Z][a-zA-Z0-9._%-]*)@[a-zAZ0-9.-]+\.(com|co|org)$/;

  if (nombre) {
    if (!validacion.test(nombre)) {
      return res.status(400).json({ error: "El nombre solo puede contener letras." });
    }
    valorBuscar.nombre = nombre;
  }

 
  if (email) {
    if (!validacionCorreo.test(email)) {
      return res.status(500).json({ error: "El correo debe tener una estructura válida." });
    }
    valorBuscar.email = email;
  }

  try {
    const usuario = await Usuario.findOne({ where: valorBuscar });

    if (!usuario) {
      return res.status(404).json({ message: "No se encontraron usuarios con los parámetros proporcionados" });
    }

    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al buscar el usuario" });
  }
}

async function verificarCorreoExistente(req, res) {
  const { email } = req.query;

  try {
    const correoExistente = await Usuario.findOne({ where: { email } });
    res.json({ existe: !!correoExistente }); // Devuelve un objeto con la propiedad 'existe'
  } catch (error) {
    console.error('Error al verificar el email:', error);
    res.status(500).json({ error: 'Error al verificar el email.' });
  }
}
module.exports = {
  login,
  forgotPassword,
  changePassword,
  searchUser,
  verificarCorreoExistente
}