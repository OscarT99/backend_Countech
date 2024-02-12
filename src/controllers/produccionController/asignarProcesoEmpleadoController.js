const { response } = require('express');
const AsignarProcesoEmpleado = require('../../models/produccionModel/asignarProcesoEmpleado')
const Empleado = require('../../models/empleadoModel/empleadoModel')
const PedidoProceso = require('../../models/pedidoModel/procesoReferenciaPedidoModel');
const AvanceProcesoEmpleado = require('../../models/produccionModel/avanceProcesoEmpleado');


  const getAllAsignarProcesos = async (req, res = response) => {
    try {
      const data = await AsignarProcesoEmpleado.findAll();
      res.json({ Procesos: data });
    } catch (error) {
      console.log(error);
      res.json({
        msg: '¡Uy! Ha ocurrido un error',
      });
    }
  };
  
  const getOneAsignarProceso = async (req, res = response) => {
    try {
      const { id } = req.params;
      const asignarProcedimiento = await AsignarProcesoEmpleado.findByPk(id);
  
      if (asignarProcedimiento) {
        res.json(asignarProcedimiento);
      } else {
        res.json({
          msg: `No existe una asignación de procedimiento con el id ${id}`,
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        msg: '¡Uy! Ha ocurrido un error',
      });
    }
  };
  
  const postAsignarProceso = async (req, res = response) => {
    try {
      const { body } = req;

      const getPedidoProceso = await PedidoProceso.findByPk(body.pedidoprocesoId);

      const getEmpleado = await Empleado.findByPk(body.empleadoId);


      if (!getEmpleado) {
        return res.status(404).json({
          msg: `No existe un empleado con el id ${body.empleadoId}`,
        });
      }else if (getEmpleado.estado === false){
        return res.status(404).json({
          msg: `El empleado no está activo.`,
        });
      } else if (body.cantidadAsignada > getPedidoProceso.cantidadPendiente) {
        return res.status(404).json({
          msg: `La cantidad asignada no puede ser mayor a la cantidad pendiente.`,
        });
      } else if (getPedidoProceso.cantidadTotal === getPedidoProceso.cantidadAsignada){
        return res.status(404).json({
          msg: `El pedido ya está completo.`,
        });
      }
       else if (body.cantidadAsignada <= 0) {
        return res.status(404).json({
          msg: `La cantidad asignada no puede ser menor o igual a 0.`,
        });
      }

      if (!getPedidoProceso) {
        return res.status(404).json({
          msg: `No existe un pedido con el id ${body.pedidoprocesoId}`,
        });
      } 


      try{

        //Se crea la asignación de proceso
        await AsignarProcesoEmpleado.create(body);

        //Se actualiza el pedido proceso
        await getPedidoProceso.update({
          cantidadAsignada: getPedidoProceso.cantidadAsignada + body.cantidadAsignada,
          cantidadPendiente: getPedidoProceso.cantidadPendiente - body.cantidadAsignada,
        })

        //Se actualiza el estado ocupado del empleado
        await getEmpleado.update({
          estadoOcupado: true
        });


      }catch(err){
        res.status(404).json({
          msg: `Error al asignar el proceso.`,
        });
      }

      res.json({
        msg: 'El proceso fue asignado con éxito.',
      });
    } catch (error) {
      console.log(error);
      res.json({
        msg: '¡Uy! Ha ocurrido un error',
      });
    }
  };

  const putAnularProcesoAsignado = async (req, res = response) => {
    try {
      const { body } = req;
      const { estadoAnular } = body
      const { id } = req.params;
      const getAsignarProceso = await AsignarProcesoEmpleado.findByPk(id);

      if(!getAsignarProceso){
        return res.status(404).json({
          msg: `No existe una asignación de proceso con el id ${id}`,
        });
      }

      const validateAvance = await AvanceProcesoEmpleado.findAll({
        where: {
          asignarProcesoEmpleadoId: getAsignarProceso.id
        }
      });

      if(validateAvance.length >= 1){
        return res.status(404).json({
          msg: `No se puede anular un proceso que ha tenido avance.`,
        });
      }else{
        await getAsignarProceso.update({
          estadoAnular: estadoAnular,
          estadoProcAsig: true,
          cantRestante: 0
        });

        const getPedidoProceso = await PedidoProceso.findByPk(getAsignarProceso.pedidoprocesoId);

        await getPedidoProceso.update({
          cantidadAsignada: getPedidoProceso.cantidadAsignada - getAsignarProceso.cantidadAsignada,
          cantidadPendiente: getPedidoProceso.cantidadPendiente + getAsignarProceso.cantidadAsignada,
        });

        try{

        const getEmpleado = await Empleado.findByPk(getAsignarProceso.empleadoId);
        const validateEmpleado = await AsignarProcesoEmpleado.findAll({
          where: {
            empleadoId: getAsignarProceso.empleadoId,
            estadoProcAsig: false,
            estadoAnular: false,
          }
        })

        if(validateEmpleado.length === 0){
          await getEmpleado.update({
            estadoOcupado: false
          })}
        }catch(err){
        console.log(err)
      }
        res.json({
          msg: 'El proceso fue anulado con éxito.',
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        msg: '¡Uy! Ha ocurrido un error',
      });
    }
  }
  
  const putAsignarProceso = async (req, res = response) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const asignarProcedimiento = await AsignarProcesoEmpleado.findByPk(id);
  
      if (asignarProcedimiento) {
        await asignarProcedimiento.update(body);
        res.json({
          msg: 'La asignación de procedimiento fue actualizada correctamente.',
        });
      } else {
        res.status(404).json({
          msg: `No existe una asignación de procedimiento con el id ${id}`,
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        msg: '¡Uy! Ha ocurrido un error',
      });
    }
  };
  
  const deleteAsignarProceso = async (req, res = response) => {
    try {
      const { id } = req.params;
      const asignarProcedimiento = await AsignarProcesoEmpleado.findByPk(id);
  
      if (asignarProcedimiento) {
        await asignarProcedimiento.destroy();
        res.json({
          msg: 'La asignación de procedimiento fue eliminada con éxito.',
        });
      } else {
        res.status(404).json({
          msg: `No existe una asignación de procedimiento con el id ${id}`,
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
    getAllAsignarProcesos,
    getOneAsignarProceso,
    postAsignarProceso,
    putAnularProcesoAsignado,
    putAsignarProceso,
    deleteAsignarProceso,
  };
  
  