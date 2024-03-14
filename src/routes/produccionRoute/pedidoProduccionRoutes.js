const express = require("express");
const PedidoProdCompleto = require("../../controllers/produccionController/pedidoProduccionController");
const { validarJWT } = require('../../middlewares/validar-jwt')

const router = express.Router();

router
    .get('/pedidoproduccion', [
        validarJWT
     ], PedidoProdCompleto.getPedidoProdCompleto)
    .get('/produccion/mobile', PedidoProdCompleto.getPedidoProdMobile)

    // .get('/avanceproceso/:id', PedidoProduccion.getOneAvanceProceso)
    // .post('/pedidoproceso', PedidoProceso.postPedidoProceso)
    // .put('/avanceproceso/:id', PedidoProduccion.putAvanceProceso)
    // .delete('/avanceproceso/:id', PedidoProduccion.deleteAvanceProceso)
    

module.exports = router;