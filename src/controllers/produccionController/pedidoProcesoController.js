const { response } = require('express');
// const PedidoProceso = require('../../models/produccionModel/pedidoProceso');

const getAllPedidoProcesos = async (req, res = response) => {
    try {
        const pedidoProcesos = await PedidoProceso.findAll();
        res.json({ pedidoProcesos });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener los procesos del pedido'
        });
    }
}

const postPedidoProceso = async (req, res = response) => {
    try {
      const { body } = req;
      await PedidoProceso.create(body);
      res.json({
        msg: 'El proceso del pedido fue agregado con éxito.',
      });
    } catch (error) {
      console.log(error);
      res.json({
        msg: '¡Uy! Ha ocurrido un error',
      });
    }
  };

  // const putCantPedidoProceso = async (req, res = response) => {
  //   try {
  //     const { id } = req.params;
  //     const { body } = req;
  //     const 

  //     await PedidoProceso.update(body, {
  //       where: {
  //         id: id,
  //       },
  //     });
  //     res.json({
  //       msg: 'El proceso del pedido fue actualizado con éxito.',
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.json({
  //       msg: '¡Uy! Ha ocurrido un error',
  //     });
  //   }
  // };

module.exports = {
    getAllPedidoProcesos,
    postPedidoProceso,
}