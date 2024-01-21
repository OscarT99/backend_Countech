const { response } = require("express");
const Empleado = require("../../models/empleadoModel/empleadoModel");

const getEmpleados = async (req, res = response) => {
  try {
    const listEmpleados = await Empleado.findAll();
    res.json({ listEmpleados });
  } catch (error) {
    console.log(error);
    res.json({
      msg: `¡Uy! Ha ocurrido un error. Por favor intenta de nuevo.`,
    });
  }
};

const getEmpleado = async (req, res = response) => {
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
  getEmpleados,
  getEmpleado,
  postEmpleado,
  putEmpleado
};
