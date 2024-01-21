const { Router } = require("express")

const route = Router()

const{ getAbonoVenta, getAbonoVentas, postAbonoVenta, putAbonoVenta } = require('../../controllers/abonoVentaController/abonoVentaController')

route.get('/abonoVenta',getAbonoVentas)
route.get('/abonoVenta/:id',getAbonoVenta)
route.post('/abonoVenta',postAbonoVenta)
route.put('/abonoVenta/:id',putAbonoVenta)

module.exports = route
