const { Router } = require('express');

const route = Router();

const { getAsignarProcedimiento, getAsignarProcedimientos, postAsignarProcedimiento, putAsignarProcedimiento, deleteAsignarProcedimiento } = require('../../controllers/produccionController/asignarProcedimientoController');

route.get('/asignarprocedimiento', getAsignarProcedimientos);
route.get('/asignarprocedimiento/:id', getAsignarProcedimiento);
route.post('/asignarprocedimiento', postAsignarProcedimiento);
route.put('/asignarprocedimiento/:id', putAsignarProcedimiento);
route.delete('/asignarprocedimiento/:id', deleteAsignarProcedimiento);

module.exports = route;
