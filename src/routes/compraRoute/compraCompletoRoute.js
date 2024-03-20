const Router = require('express')
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const { getAllComprasConRelaciones, getCompraConRelacionesPorId, postCompraCompleta, putCompraCompleta, anularCompra, putEstadoCompra } = require('../../controllers/compraController/compraCompletoController')


route.get('/compra', [
    validarJWT
],getAllComprasConRelaciones)
route.get('/compra/:id', [
    validarJWT
],getCompraConRelacionesPorId)
route.post('/compra', [
    validarJWT
],postCompraCompleta)
route.put('/compras/:id', [
    validarJWT
],putCompraCompleta)
route.put('/compra/anularCompra/:id', [
    validarJWT
],anularCompra)
route.put('/compra/cambiarEstado/:id', [
    validarJWT
],putEstadoCompra)


/*
route.get('/compra',getAllComprasConRelaciones)
route.get('/compra/:id',getCompraConRelacionesPorId)
route.post('/compra',postCompraCompleta)
route.put('/compra/:id',putCompraCompleta),
route.put('/compra/anularCompra/:id',anularCompra)
*/

module.exports = route