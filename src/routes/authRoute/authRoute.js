const { Router } = require("express");
const { validarJWT } = require('../../middlewares/validar-jwt')



const route = Router()

const{login, forgotPassword, changePassword, searchUser, verificarCorreoExistente} = require('../../controllers/authController/authController')

route.post('/auth/login',login)
route.post('/auth/recuperar', forgotPassword)
route.post('/auth/cambiar-contrasena/:token', changePassword)
route.get('/auth/usuario-buscar', [
    validarJWT
], searchUser)
route.get('/auth/usuario-correo', [
    validarJWT
], verificarCorreoExistente)

module.exports = route

