const express = require("express");
const router = express.Router();
const { createValidator } = require('../../validators/empleado');
const { validarJWT } = require('../../middlewares/validar-jwt')

const {getEmpleadoProceso, getEmpleadoMobile, getAllEmpleados, getOneEmpleado, postEmpleado, putCambiarEstadoEmpleado, putEmpleado} = require('../../controllers/empleadoController/empleadoController');

router
    .get('/empleado/proceso', [
        validarJWT
    ], getEmpleadoProceso)
    .get('/empleado/mobile', getEmpleadoMobile)
    .get('/empleados', [
        validarJWT
    ], getAllEmpleados)
    .get('/empleado/:id', [
        validarJWT
    ], getOneEmpleado)
    .post('/empleado', [
        validarJWT
    ], postEmpleado)
    .put('/empleado/estado/:id', [
        validarJWT
    ], putCambiarEstadoEmpleado)
    .put('/empleado/:id', [
        validarJWT
    ], putEmpleado)

module.exports = router

