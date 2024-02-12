const { Router } = require("express")
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const{ getAbonoVenta, getAbonoVentas, postAbonoVenta, putAbonoVenta } = require('../../controllers/abonoVentaController/abonoVentaController')

route.get('/abonoVenta',getAbonoVentas)
route.get('/abonoVenta/:id',getAbonoVenta)
route.post('/abonoVenta',postAbonoVenta)
route.put('/abonoVenta/:id',putAbonoVenta)

module.exports = route
