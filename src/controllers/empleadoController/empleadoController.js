const { response } = require("express");
const Empleado = require("../../models/empleadoModel/empleadoModel");
const AsignarProcesoEmpleado = require("../../models/produccionModel/asignarProcesoEmpleado");


const getAllEmpleados = async (req, res) => {
  try {
    const data = await Empleado.findAll();
    res.json({ Empleados: data });
  } catch (error) {
    console.log(error);
    res.json({
      msg: `¡Uy! Ha ocurrido un error. Por favor intenta de nuevo.`,
    });
  }
};

const getOneEmpleado = async (req, res = response) => {
  try {
    const { id } = req.params;
    const empleado = await Empleado.findByPk(id);

    if (empleado) {
      res.json(empleado);
    } else {
      res.json({
        msg: `No existe un Empleado con el id ${id}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: 'Ocurrió un error al buscar el empleado por ID.',
    });
  }
};

const postEmpleado = async (req, res = response) => {
  try {
    const { body } = req;


    // if(!body.nombre){
    //   return res.status(400).json({error: 'El campo nombre es obligatorio.'});
    // }
    // const validateRes = await validateEmpleado(dataEmpleado, res);
    
    // console.log(validateRes);

    // () => {
    //   if (!validateRes.success) {
    //     return res.status(400).json(validateRes);
    //   }
    // }

    await Empleado.create(body);

    res.json({
      msg: `¡El Empleado fue agregado con exito!`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: `¡Uy! Ha ocurrido un error. Por favor intenta de nuevo.`,
    });
  }
};

const putCambiarEstadoEmpleado = async (req, res = response) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const getEmpleado = await Empleado.findByPk(id);

    if(!getEmpleado){
      return res.status(404).json({
        msg: `No existe un empleado con el id ${id}`,
      });
    }

    const validateProcesoAsignado = await AsignarProcesoEmpleado.findAll({
      where: {
        empleadoId: getEmpleado.id,
        estadoProcAsig: false,
      }
    })
  

    console.log(validateProcesoAsignado)

    if(validateProcesoAsignado.length > 0){
      return res.status(400).json({
        msg: `El empleado tiene procesos asignados pendientes.`,
      });
    }else{
      await getEmpleado.update(body);
      res.json({
        msg: `¡El estado del empleado fue actualizado con exito!`,
      });
    }

  } catch (error) {
    console.log(error);
    res.json({
      msg: `¡Uy! Ha ocurrido un error. Por favor intenta de nuevo.`,
    });
  }
}

const putEmpleado = async (req, res = response) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const empleado = await Empleado.findByPk(id);

    if (empleado) {
      await empleado.update(body);
      res.json({
        msg: `¡El Empleado fue actualizado con exito!`,
        
      });
    } else {
      res.json({
        msg: `El empleado: ${id} no ha sido encontrado`,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
        msg: `¡Uy! Ha ocurrido un error. Por favor intenta de nuevo.`,
    });
  }
};

module.exports = {
  getAllEmpleados,
  getOneEmpleado,
  postEmpleado,
  putCambiarEstadoEmpleado,
  putEmpleado,
};
