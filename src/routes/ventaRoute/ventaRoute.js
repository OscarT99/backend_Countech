const { Router } = require("express")

const route = Router()

const{ getVenta, getVentas, putVenta } = require('../../controllers/ventaController/ventaController')

route.get('/venta',getVentas)
route.get('/venta/:id',getVenta)
route.put('/venta/:id',putVenta)

module.exports = route
