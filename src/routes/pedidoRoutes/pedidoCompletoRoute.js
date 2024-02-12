const {Router} = require('express')

const route = Router()

const { getAllPedidosConRelaciones,postPedidoCompleto, getPedidoConRelacionesPorId, putPedidoCompleto, anularPedido } = require('../../controllers/pedidoControllers/pedidoCompletoController')


route.get('/pedido',getAllPedidosConRelaciones);
route.get('/pedido/:id',getPedidoConRelacionesPorId); 
route.post('/pedido',postPedidoCompleto);
route.put('/pedido/:id',putPedidoCompleto);
route.put('/pedido/anularPedido/:id',anularPedido)


module.exports = route