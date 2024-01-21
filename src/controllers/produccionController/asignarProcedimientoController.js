const {response} = require('express')
const AsignarProcedimiento = require('../../models/produccionModel/asignarProcedimiento')

const getAsignarProcedimientos = async (req, res = response) => {
    try {
      const listAsignarProcedimientos = await AsignarProcedimiento.findAll();
      res.json({ listAsignarProcedimientos });
    } catch (error) {
      console.log(error);
      res.json({
        msg: '¡Uy! Ha ocurrido un error',
      });
    }
  };
  
  const getAsignarProcedimiento = async (req, res = response) => {
    try {
      const { id } = req.params;
      const asignarProcedimiento = await AsignarProcedimiento.findByPk(id);
  
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
  
  const postAsignarProcedimiento = async (req, res = response) => {
    try {
      const { body } = req;
      await AsignarProcedimiento.create(body);
      res.json({
        msg: 'La asignación de procedimiento fue agregada con éxito.',
      });
    } catch (error) {
      console.log(error);
      res.json({
        msg: '¡Uy! Ha ocurrido un error',
      });
    }
  };
  
  const putAsignarProcedimiento = async (req, res = response) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const asignarProcedimiento = await AsignarProcedimiento.findByPk(id);
  
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
  
  const deleteAsignarProcedimiento = async (req, res = response) => {
    try {
      const { id } = req.params;
      const asignarProcedimiento = await AsignarProcedimiento.findByPk(id);
  
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
    getAsignarProcedimiento,
    getAsignarProcedimientos,
    postAsignarProcedimiento,
    putAsignarProcedimiento,
    deleteAsignarProcedimiento,
  };
  
  