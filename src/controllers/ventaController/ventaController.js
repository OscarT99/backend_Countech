const { response } = require('express');
const Pedido = require('../../models/pedidoModel/pedidoModel');


const getVentas = async(req, res = response) => { 
    try{
        const listVentas = await Pedido.findAll({
            where: {
                estado: 'Terminado'
            }
        });

        res.json({listVentas})
    }catch(error){
        console.log(error)
        console.log(error)
        res.json({
            msg:`Upps ocurrio un error`
        })
    }       
}

const getVenta = async (req, res = response) => {
    const { id } = req.params
    const venta = await Pedido.findByPk(id)

    if (venta) {
        if (venta.estado === 'Terminado') {
            res.json(venta);
        } else {
            res.status(404).json({
                msg: `No existe una venta con el id ${id}`
            });
        }
    } else {
        res.status(404).json({
            msg: `No existe una venta con el id ${id}`
        })
    }
}


const putVenta = async (req, res = response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const venta = await Pedido.findByPk(id);

        if (venta) {
            if (body.estadoPago !== undefined) {
                await venta.update({
                    estadoPago: body.estadoPago
                });
                res.json({
                    msg: `La venta fue actualizada con éxito`
                });
            } else {
                res.status(400).json({
                    msg: `El campo 'estadoPago' es el único campo que se puede actualizar.`
                });
            }
        } else {
            res.status(404).json({
                msg: `No existe una venta con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Upps ocurrió un error`
        });
    }
};




module.exports = {
    getVentas,
    getVenta,
    putVenta
}
