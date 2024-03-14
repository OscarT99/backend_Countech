const express = require("express");
const PedidoProceso = require("../../controllers/produccionController/pedidoProcesoController");
const { validarJWT } = require('../../middlewares/validar-jwt')


const router = express.Router();

router
    .get('/pedidoprocesos', [
        validarJWT
     ], PedidoProceso.getAllPedidoProcesos)
    // .get('/avanceproceso/:id', PedidoProduccion.getOneAvanceProceso)
    .post('/pedidoproceso', [
        validarJWT
     ], PedidoProceso.postPedidoProceso)
    // .put('/avanceproceso/:id', PedidoProduccion.putAvanceProceso)
    // .delete('/avanceproceso/:id', PedidoProduccion.deleteAvanceProceso)
    

module.exports = router;
