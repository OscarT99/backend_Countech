const {Router} = require('express')
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const { getAllPedidosConRelaciones, getPedidoProcesos, getPedidoInfo, getPedidoProcesoById, postPedidoCompleto, getPedidoConRelacionesPorId, putPedidoCompleto, anularPedido } = require('../../controllers/pedidoControllers/pedidoCompletoController')


route.get('/pedido', [
    validarJWT
 ],getAllPedidosConRelaciones);
route.get('/pedido/info', [
    validarJWT
 ],getPedidoInfo);
route.get('/pedido/proceso', [
    validarJWT
 ],getPedidoProcesos);
route.get('/pedido/proceso/:id', [
    validarJWT
 ],getPedidoProcesoById);
route.get('/pedido/:id', [
    validarJWT
 ],getPedidoConRelacionesPorId); 
route.post('/pedido', [
    validarJWT
 ],postPedidoCompleto);
route.put('/pedido/:id', [
    validarJWT
 ],putPedidoCompleto);
route.put('/pedido/anularPedido/:id', [
    validarJWT
 ],anularPedido)


module.exports = route