const Usuario = require('../models/usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const nodemailer = require('nodemailer');
const {generarToken } = require ('./authController')



// Método para solicitar restablecimiento
const solicitarRestablecimiento = async (req, res) => {
  const { correo } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Generar token de restablecimiento y establecer la fecha de vencimiento
    const resetToken = generarToken(usuario, 'reset');
    const resetTokenExpires = moment().add(1, 'day').toDate(); // El token expira en 1 día

    // Actualizar en la base de datos
    await usuario.update({ reset_token: resetToken, reset_token_expires: resetTokenExpires });

    // Configurar credenciales para el envío del correo
    const credencialesGmail = {
      usuario: 'kaizerzuleta@gmail.com',  // Reemplaza con tu dirección de correo Gmail
      contrasena: 'ogrr wmso attv fldh',  // O utiliza una contraseña de aplicación
    };

    // Enviar correo electrónico con el enlace de recuperación que contiene el token
    await enviarCorreoRecuperacion(usuario.correo, resetToken, credencialesGmail);

    res.json({ mensaje: 'Correo de recuperación enviado con éxito',resetToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en la solicitud de restablecimiento de contraseña' });
  }
};



// Función para enviar correo de recuperación
const enviarCorreoRecuperacion = async (correoDestino, token, credenciales) => {
  try {
    // Configuración del transporte de correo electrónico para Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: credenciales.usuario,
        pass: credenciales.contrasena,
      },
    });

    // Configuración del contenido del correo electrónico
    const mailOptions = {
      from: credenciales.usuario,
      to: correoDestino,
      subject: 'Recuperación de Contraseña',
      text: 'Haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:3001/newPassword?token=${token}',
    };

    // Envío del correo electrónico
    const info = await transporter.sendMail(mailOptions);

    console.log('Correo de recuperación enviado a ${correoDestino}', correoDestino);
    console.log('URL de prueba de correo:', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error al enviar el correo de recuperación a', correoDestino, error);
    throw error;
  }
};

const cambiarContrasena = async (req, res) => {
  const { token, nuevaContrasena } = req.body;

  try {
    // Verifica y decodifica el token
    const decodedToken = jwt.verify(token, 'secreto-seguro');

    // Busca al usuario en la base de datos por el ID proporcionado en el token
    const usuario = await Usuario.findByPk(decodedToken.userId);

    // Verifica si el usuario existe
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Hashea la nueva contraseña y actualiza en la base de datos
    const hashedContrasena = await bcrypt.hash(nuevaContrasena, 10);
    await usuario.update({ contrasena: hashedContrasena, reset_token: null, reset_token_expires: null });

    res.json({ mensaje: 'Contraseña cambiada con éxito' });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(500).json({ mensaje: 'Error al cambiar la contraseña' });
  }
};


  // Verifica si el token de cambio de contraseña ha expirado (opcional)

    //if (moment().isAfter(decodedToken.exp * 1000)) {
     // return res.status(400).json({ mensaje: 'El token de cambio de contraseña ha caducado' });
   // }



/*const recuperarContrasena = async (req, res) => {
  const { correo } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Generar token de restablecimiento y establecer la fecha de vencimiento
    const resetToken = generarToken(usuario, 'reset');
    const resetTokenExpires = moment().add(1, 'day').toDate(); // El token expira en 1 día

    // Actualizar en la base de datos
    await usuario.update({ reset_token: resetToken, reset_token_expires: resetTokenExpires });

    // Enviar correo electrónico con el enlace de recuperación que contiene el token
    await enviarCorreoRecuperacion(usuario.correo, resetToken);

    res.json({ mensaje: 'Correo de recuperación enviado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en la recuperación de contraseña' });
  }
  */
  

module.exports = {solicitarRestablecimiento,cambiarContrasena};