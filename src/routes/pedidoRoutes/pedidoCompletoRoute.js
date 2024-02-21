const {Router} = require('express')

const route = Router()

const { getAllPedidosConRelaciones, getPedidoProcesos, getPedidoInfo, getPedidoProcesoById, postPedidoCompleto, getPedidoConRelacionesPorId, deletePedidoCompleto } = require('../../controllers/pedidoControllers/pedidoCompletoController')


route.get('/pedido',getAllPedidosConRelaciones);
route.get('/pedido/info',getPedidoInfo);
route.get('/pedido/proceso',getPedidoProcesos);
route.get('/pedido/proceso/:id',getPedidoProcesoById);
route.get('/pedido/:id',getPedidoConRelacionesPorId); 
route.post('/pedido',postPedidoCompleto);
route.delete('/pedido/:id',deletePedidoCompleto); 

module.exports = route