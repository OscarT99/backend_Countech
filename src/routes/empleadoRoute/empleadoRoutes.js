const express = require("express");
const router = express.Router();
const { createValidator } = require('../../validators/empleado');

const {getEmpleadoProceso, getAllEmpleados, getOneEmpleado, postEmpleado, putCambiarEstadoEmpleado, putEmpleado} = require('../../controllers/empleadoController/empleadoController');

router
    .get('/empleado/proceso', getEmpleadoProceso)
    .get('/empleados', getAllEmpleados)
    .get('/empleado/:id' , getOneEmpleado)
    .post('/empleado', createValidator, postEmpleado)
    .put('/empleado/estado/:id', putCambiarEstadoEmpleado)
    .put('/empleado/:id', putEmpleado)

module.exports = router

