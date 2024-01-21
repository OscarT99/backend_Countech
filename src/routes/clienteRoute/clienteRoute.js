const { Router } = require("express")

const route = Router()

const{ getCliente, getClientes, deleteCliente, postCliente, putCliente, buscarClientes } = require('../../controllers/clienteController/clienteController')

route.get('/cliente',getClientes)
route.get('/cliente/:id',getCliente)
route.post('/cliente',postCliente)
route.put('/cliente/:id',putCliente)
route.get('/cliente/buscar',buscarClientes)

module.exports = route

