const express = require("express");
const AvanceProcesoEmpleado = require("../../controllers/produccionController/avanceProcesoEmpleadoController");
const { validarJWT } = require('../../middlewares/validar-jwt')


const router = express.Router();

router
    .get('/avanceprocesos', [
        validarJWT
     ], AvanceProcesoEmpleado.getAllAvanceProcesos)
    .get('/avanceproceso/:id', [
        validarJWT
     ], AvanceProcesoEmpleado.getOneAvanceProceso)
    .post('/avanceproceso', [
        validarJWT
     ], AvanceProcesoEmpleado.postAvanceProceso)
    .put('/avanceproceso/:id', [
        validarJWT
     ], AvanceProcesoEmpleado.putAvanceProceso)
    .delete('/avanceproceso/:id', [
        validarJWT
     ], AvanceProcesoEmpleado.deleteAvanceProceso)
    

module.exports = router;
