const express = require("express");
const router = express.Router();
const { validarJWT } = require('../../middlewares/validar-jwt')

const AsignarProcesoEmpleado = require('../../controllers/produccionController/asignarProcesoEmpleadoController');

router
    .get('/asignarproceso/avance', [
        validarJWT
     ], AsignarProcesoEmpleado.getProcesoAvance)
    .get('/asignarprocesos', [
        validarJWT
     ], AsignarProcesoEmpleado.getAllAsignarProcesos)
    .get('/asignarproceso/:id', [
        validarJWT
     ], AsignarProcesoEmpleado.getOneAsignarProceso)
    .post('/asignarproceso', [
        validarJWT
     ], AsignarProcesoEmpleado.postAsignarProceso)
    .put('/anularprocesoasignado/:id', [
        validarJWT
     ], AsignarProcesoEmpleado.putAnularProcesoAsignado)
    .put('/asignarproceso/:id', [
        validarJWT
     ], AsignarProcesoEmpleado.putAsignarProceso)
    .delete('/asignarproceso/:id', [
        validarJWT
     ], AsignarProcesoEmpleado.deleteAsignarProceso)

module.exports = router;
