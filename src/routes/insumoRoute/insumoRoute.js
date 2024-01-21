const { Router } = require('express')
const route = Router()

const { getInsumos, getInsumo, postInsumo, putInsumo, deleteInsumo, buscarInsumos,sumarCantidadInsumo, actualizarEstadoInsumo,restarCantidadInsumo } = require('../../controllers/insumoController/insumoController')

route.get('/insumo',getInsumos)
route.get('/insumo/:id',getInsumo)
route.post('/insumo',postInsumo)
route.put('/insumo/:id',putInsumo)
route.delete('/insumo/:id',deleteInsumo)
route.get('/insumo/buscar',buscarInsumos)
route.put('/insumo/sumarCantidad/:id',sumarCantidadInsumo)
route.put('/insumo/restarCantidad/:id',restarCantidadInsumo)
route.put('/insumo/actualizarEstado/:id',actualizarEstadoInsumo);

module.exports = route