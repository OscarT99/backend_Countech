const { Router } = require('express');

const route = Router();

const { getReporteProduccion, getReporteProducciones, postReporteProduccion, putReporteProduccion, deleteReporteProduccion } = require('../../controllers/produccionController/reporteProduccionController');

route.get('/reporteproduccion', getReporteProducciones);
route.get('/reporteproduccion/:id', getReporteProduccion);
route.post('/reporteproduccion', postReporteProduccion);
route.put('/reporteproduccion/:id', putReporteProduccion);
route.delete('/reporteproduccion/:id', deleteReporteProduccion);

module.exports = route;
