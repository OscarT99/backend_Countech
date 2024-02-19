const { Router } = require('express')
const { validarJWT } = require('../../middlewares/validar-jwt')


const route = Router()

const { getSalidasDeInsumo, postSalidaDeInsumo } = require('../../controllers/salidaInsumoController/salidaInsumoController')

route.get('/salidaInsumo', [
    validarJWT
],getSalidasDeInsumo)
route.post('/salidaInsumo', [
    validarJWT
],postSalidaDeInsumo)

module.exports = route