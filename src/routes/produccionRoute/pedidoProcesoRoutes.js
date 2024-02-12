const express = require("express");
const PedidoProceso = require("../../controllers/produccionController/pedidoProcesoController");
const router = express.Router();

router
    .get('/pedidoprocesos', PedidoProceso.getAllPedidoProcesos)
    // .get('/avanceproceso/:id', PedidoProduccion.getOneAvanceProceso)
    .post('/pedidoproceso', PedidoProceso.postPedidoProceso)
    // .put('/avanceproceso/:id', PedidoProduccion.putAvanceProceso)
    // .delete('/avanceproceso/:id', PedidoProduccion.deleteAvanceProceso)
    

module.exports = router;
