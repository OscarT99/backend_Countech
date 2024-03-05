const express = require("express");
const PedidoProdCompleto = require("../../controllers/produccionController/pedidoProduccionController");
const router = express.Router();

router
    .get('/pedidoproduccion', PedidoProdCompleto.getPedidoProdCompleto)
    .get('/produccion/mobile', PedidoProdCompleto.getPedidoProdMobile)

    // .get('/avanceproceso/:id', PedidoProduccion.getOneAvanceProceso)
    // .post('/pedidoproceso', PedidoProceso.postPedidoProceso)
    // .put('/avanceproceso/:id', PedidoProduccion.putAvanceProceso)
    // .delete('/avanceproceso/:id', PedidoProduccion.deleteAvanceProceso)
    

module.exports = router;