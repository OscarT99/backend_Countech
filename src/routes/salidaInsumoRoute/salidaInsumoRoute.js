const { Router } = require('express')
const route = Router()

const { getSalidasDeInsumo, postSalidaDeInsumo } = require('../../controllers/salidaInsumoController/salidaInsumoController')

route.get('/salidaInsumo',getSalidasDeInsumo)
route.post('/salidaInsumo',postSalidaDeInsumo)

module.exports = route