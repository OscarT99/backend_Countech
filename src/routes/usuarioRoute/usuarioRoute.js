const { Router } = require("express")

const route = Router()

const{ getUsuario, getUsuarios, postUsuario, putUsuario } = require('../../controllers/usuarioController/usuarioController')

route.get('/usuario',getUsuarios)
route.get('/usuario/:id',getUsuario)
route.post('/usuario',postUsuario)
route.put('/usuario/:id',putUsuario)

module.exports = route

