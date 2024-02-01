const express = require("express");
const router = express.Router();

const empleadoController = require('../../controllers/empleadoController/empleadoController')

router
    .get('/empleados', empleadoController.getAllEmpleados)
    .get('/empleado/:id', empleadoController.getOneEmpleado)
    .post('/empleado', empleadoController.postEmpleado)
    .put('/empleado/:id', empleadoController.putCambiarEstadoEmpleado)
    .put('/empleado/:id', empleadoController.putEmpleado)

module.exports = router

