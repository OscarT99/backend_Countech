const { Router } = require('express')
const route = Router()

const { getCategoriasInsumo, getCategoriaInsumo, postCategoriaInsumo, putCategoriaInsumo, deleteCategoriaInsumo, buscarCategoriasInsumo, actualizarEstadoCategoria } = require('../../controllers/insumoController/categoriaInsumoController')

route.get('/categoriaInsumo',getCategoriasInsumo)
route.get('/categoriaInsumo/:id',getCategoriaInsumo)
route.post('/categoriaInsumo',postCategoriaInsumo)
route.put('/categoriaInsumo/:id',putCategoriaInsumo)
route.delete('/categoriaInsumo/:id',deleteCategoriaInsumo)
route.get('/categoriaInsumo/buscar',buscarCategoriasInsumo)
route.put('/categoriaInsumo/actualizarEstado/:id',actualizarEstadoCategoria);


module.exports = route