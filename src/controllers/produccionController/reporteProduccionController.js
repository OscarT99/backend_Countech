const {response} = require('express')
const ReporteProduccion = require('../../models/produccionModel/reporteProcedimiento')

const getReporteProducciones = async (req, res = response) => {
    try {
      const listReporteProducciones = await ReporteProduccion.findAll();
      res.json({ listReporteProducciones });
    } catch (error) {
      console.log(error);
      res.json({
        msg: '¡Uy! Ha ocurrido un error',
      });
    }
  };
  
  const getReporteProduccion = async (req, res = response) => {
    try {
      const { id } = req.params;
      const reporteProduccion = await ReporteProduccion.findByPk(id);
  
      if (reporteProduccion) {
        res.json(reporteProduccion);
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
  
  const postReporteProduccion = async (req, res = response) => {
    try {
      const { body } = req;
      await ReporteProduccion.create(body);
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
  
  const putReporteProduccion = async (req, res = response) => {
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
  
  const deleteReporteProduccion = async (req, res = response) => {
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
    getReporteProduccion,
    getReporteProducciones,
    postReporteProduccion,
    putReporteProduccion,
    deleteReporteProduccion,
  };
  