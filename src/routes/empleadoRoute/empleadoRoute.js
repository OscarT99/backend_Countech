const { Router } = require("express")

const route = Router()

const{ getEmpleados, getEmpleado, postEmpleado, putEmpleado} = require('../../controllers/empleadoController/empleadoController')

route.get('/Empleado',getEmpleados)
route.get('/Empleado/:id',getEmpleado)
route.post('/Empleado',postEmpleado)
route.put('/Empleado/:id',putEmpleado)

module.exports = route
