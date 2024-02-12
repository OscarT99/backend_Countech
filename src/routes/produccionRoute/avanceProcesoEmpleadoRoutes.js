const express = require("express");
const AvanceProcesoEmpleado = require("../../controllers/produccionController/avanceProcesoEmpleadoController");
const router = express.Router();

router
    .get('/avanceprocesos', AvanceProcesoEmpleado.getAllAvanceProcesos)
    .get('/avanceproceso/:id', AvanceProcesoEmpleado.getOneAvanceProceso)
    .post('/avanceproceso', AvanceProcesoEmpleado.postAvanceProceso)
    .put('/avanceproceso/:id', AvanceProcesoEmpleado.putAvanceProceso)
    .delete('/avanceproceso/:id', AvanceProcesoEmpleado.deleteAvanceProceso)
    

module.exports = router;
