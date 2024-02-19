const { Router } = require("express")
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const{ getVenta, getVentas, putVenta } = require('../../controllers/ventaController/ventaController')

route.get('/venta', [
    validarJWT
],getVentas)
route.get('/venta/:id', [
    validarJWT
],getVenta)
route.put('/venta/:id', [
    validarJWT
],putVenta)

/*
route.get('/venta',getVentas)
route.get('/venta/:id',getVenta)
route.put('/venta/:id',putVenta)
*/

module.exports = route
