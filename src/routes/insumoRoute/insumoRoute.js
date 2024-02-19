const { Router } = require('express')
const route = Router()
const { validarJWT } = require('../../middlewares/validar-jwt')

const { getInsumos, getInsumo, postInsumo, putInsumo, deleteInsumo, buscarInsumos,sumarCantidadInsumo, actualizarEstadoInsumo,restarCantidadInsumo, restarCantidadInsumoCompra } = require('../../controllers/insumoController/insumoController')

route.get('/insumo', [
    validarJWT
],getInsumos)
route.get('/insumo/:id', [
    validarJWT
],getInsumo)
route.post('/insumo', [
    validarJWT
],postInsumo)
route.put('/insumo/:id', [
    validarJWT
],putInsumo)
route.delete('/insumo/:id', [
    validarJWT
],deleteInsumo)
route.get('/insumo/buscar', [
    validarJWT
],buscarInsumos)
route.put('/insumo/sumarCantidad/:id', [
    validarJWT
],sumarCantidadInsumo)
route.put('/insumo/restarCantidad/:id', [
    validarJWT
],restarCantidadInsumo)
route.put('/insumo/actualizarEstado/:id', [
    validarJWT
],actualizarEstadoInsumo);
route.put('/insumo/restarCantidadCompra/:id', [
    validarJWT
],restarCantidadInsumoCompra)

module.exports = route