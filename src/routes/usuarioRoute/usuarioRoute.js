const { Router } = require("express")
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const{ getUsuario, getUsuarios, postUsuario, putUsuario } = require('../../controllers/usuarioController/usuarioController')

route.get('/usuario', [
    validarJWT
 ],getUsuarios)
 route.get('/usuario/:id', [
    validarJWT
 ],getUsuario)
 route.post('/usuario', [
    validarJWT
 ],postUsuario)
 route.put('/usuario/:id', [
    validarJWT
 ],putUsuario);

 /*
route.get('/usuario',getUsuarios)
route.get('/usuario/:id',getUsuario)
route.post('/usuario',postUsuario)
route.put('/usuario/:id',putUsuario)
*/

module.exports = route

