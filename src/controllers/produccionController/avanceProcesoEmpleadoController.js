const { response } = require('express');

const AvanceProcesoEmpleado = require('../../models/produccionModel/avanceProcesoEmpleado');
const PedidoProceso = require('../../models/pedidoModel/procesoReferenciaPedidoModel');
const AsignarProcesoEmpleado = require('../../models/produccionModel/asignarProcesoEmpleado');
const Empleado = require('../../models/empleadoModel/empleadoModel');

const getAllAvanceProcesos = async (req, res = response) => {
    try {
      const Avances = await AvanceProcesoEmpleado.findAll();
      res.json({ Avances });
    } catch (error) {
      console.log(error);
      res.json({
        msg: '¡Uy! Ha ocurrido un error',
      });
    }
  };
  
  const getOneAvanceProceso = async (req, res) => {
    try {
      const { id } = req.params;
      const avanceProcesoEmpleado = await AvanceProcesoEmpleado.findByPk(id);
  
      if (avanceProcesoEmpleado) {
        res.json(avanceProcesoEmpleado);
      } else {
        res.json({
          msg: `No existe un reporte de producción con el id ${id}`,
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        msg: '¡Uy! Ha ocurrido un error',
      });
    }
  };
  
  const postAvanceProceso = async (req, res = response) => {
    try {
      const { body } = req;
      const getAsignarProceso = await AsignarProcesoEmpleado.findByPk(body.asignarProcesoEmpleadoId)
      const getPedidoProceso = await PedidoProceso.findByPk(getAsignarProceso.pedidoprocesoId);
      const getEmpleado = await Empleado.findByPk(getAsignarProceso.empleadoId);



      if (!getAsignarProceso) {
        return res.status(404).json({
          msg: `No existe una asignación de proceso con el id ${body.asignarProcesoEmpleadoId}`,
        });
      } 
      
      if (body.cantidadHecha > getAsignarProceso.cantRestante) {
        return res.status(404).json({
          msg: `La cantidad terminada no puede ser mayor a la cantidad restante.`,
        });
      } else if (body.cantidadHecha <= 0) {
        return res.status(404).json({
          msg: `La cantidad terminada no puede ser menor o igual a 0.`,
        });
      }

      try{
        await AvanceProcesoEmpleado.create(body);

      }catch(err){
        console.log(err)
      }


      await getPedidoProceso.update({
        cantidadHecha: getPedidoProceso.cantidadHecha + body.cantidadHecha,
      })

      try{
      
      if((getAsignarProceso.cantRestante - body.cantidadHecha) == 0){
        await getAsignarProceso.update({
          cantRestante: getAsignarProceso.cantRestante - body.cantidadHecha,
          estadoProcAsig: true
        })
      } else{
        await getAsignarProceso.update({
          cantRestante: getAsignarProceso.cantRestante - body.cantidadHecha,
        })
      }}catch(err){
        console.log(err)
      }

      const validateEmpleado = await AsignarProcesoEmpleado.findAll({
        where: {
          empleadoId: getAsignarProceso.empleadoId,
          estadoProcAsig: false
        }
      })

      if(validateEmpleado.length === 0){
        await getEmpleado.update({
          estadoOcupado: false
        })
      }

      try{
        if((getPedidoProceso.cantidadTotal - getPedidoProceso.cantidadHecha) == 0){
          try{
            await getPedidoProceso.update({
              estado: true
            })
            
          }catch(err){
            console.log(err)
          }
        }} catch(err){
        console.log(err)
      }


      res.json({
        msg: 'El reporte de producción fue agregado con éxito.',
      });
    } catch (error) {
      console.log(error);
      res.json({
        msg: '¡Uy! Ha ocurrido un error',
      });
    }
  };
  
  const putAvanceProceso = async (req, res = response) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const reporteProduccion = await ReporteProduccion.findByPk(id);
  
      if (reporteProduccion) {
        await reporteProduccion.update(body);
        res.json({
          msg: 'El reporte de producción fue actualizado correctamente.',
        });
      } else {
        res.status(404).json({
          msg: `No existe un reporte de producción con el id ${id}`,
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        msg: '¡Uy! Ha ocurrido un error',
      });
    }
  };
  
  const deleteAvanceProceso = async (req, res = response) => {
    try {
      const { id } = req.params;
      const reporteProduccion = await ReporteProduccion.findByPk(id);
  
      if (reporteProduccion) {
        await reporteProduccion.destroy();
        res.json({
          msg: 'El reporte de producción fue eliminado con éxito.',
        });
      } else {
        res.status(404).json({
          msg: `No existe un reporte de producción con el id ${id}`,
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        msg: '¡Uy! Ha ocurrido un error',
      });
    }
  };
  
  module.exports = {
    getAllAvanceProcesos,
    getOneAvanceProceso,
    postAvanceProceso,
    putAvanceProceso,
    deleteAvanceProceso,
  };
  