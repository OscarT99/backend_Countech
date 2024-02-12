const express = require("express");
const router = express.Router();

const AsignarProcesoEmpleado = require('../../controllers/produccionController/asignarProcesoEmpleadoController');

router
    .get('/asignarprocesos', AsignarProcesoEmpleado.getAllAsignarProcesos)
    .get('/asignarproceso/:id', AsignarProcesoEmpleado.getOneAsignarProceso)
    .post('/asignarproceso', AsignarProcesoEmpleado.postAsignarProceso)
    .put('/anularprocesoasignado/:id', AsignarProcesoEmpleado.putAnularProcesoAsignado)
    .put('/asignarproceso/:id', AsignarProcesoEmpleado.putAsignarProceso)
    .delete('/asignarproceso/:id', AsignarProcesoEmpleado.deleteAsignarProceso)

module.exports = router;
