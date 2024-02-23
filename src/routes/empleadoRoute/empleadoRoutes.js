const express = require("express");
const router = express.Router();
const { createValidator } = require('../../validators/empleado');
const { validarJWT } = require('../../middlewares/validar-jwt')

const {getEmpleadoProceso, getAllEmpleados, getOneEmpleado, postEmpleado, putCambiarEstadoEmpleado, putEmpleado} = require('../../controllers/empleadoController/empleadoController');
/*
route.get('/Empleado', [
    validarJWT
],getEmpleados)
route.get('/Empleado/:id', [
    validarJWT
],getEmpleado)
route.post('/Empleado', [
    validarJWT
],postEmpleado)
route.put('/Empleado/:id', [
    validarJWT
],putEmpleado)
*/
router
    .get('/empleado/proceso', getEmpleadoProceso)
    .get('/empleados', getAllEmpleados)
    .get('/empleado/:id' , getOneEmpleado)
    .post('/empleado', postEmpleado)
    .put('/empleado/estado/:id', putCambiarEstadoEmpleado)
    .put('/empleado/:id', putEmpleado)

module.exports = router

