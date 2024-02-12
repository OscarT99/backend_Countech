const { Router } = require("express")
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const{ getAbonoCompra, getAbonoCompras, postAbonoCompra } = require('../../controllers/abonoCompraController/abonoCompraController')

route.get('/abonoCompra',getAbonoCompras)
route.get('/abonoCompra/:id',getAbonoCompra)
route.post('/abonoCompra',postAbonoCompra)

module.exports = route
