const { response } = require('express');
const AbonoVenta = require('../../models/abonoVentaModel/abonoVentaModel');
const Pedido = require('../../models/pedidoModel/pedidoModel');




const getAbonoVentas = async (req, res = response) => {
    try {
        const listAbonoVentas = await AbonoVenta.findAll()
        res.json({ listAbonoVentas })
    } catch (err) {
        console.log(err)
        res.json({
            msg: `Error en la lista de abonos a ventas`
        })
    }

}

const getAbonoVenta = async (req, res = response) => {
    const { id } = req.params
    const venta = await AbonoVenta.findByPk(id)

    if (venta) {
        res.json(venta)
    } else {
        res.status(404).json({
            msg: `No existe un abono con el id ${id}`
        })
    }
}


const postAbonoVenta = async (req, res) => {
    const { body } = req;

    try {
        // Busca la venta asociada al abono
        const venta = await Pedido.findByPk(body.venta);

        if (venta) {
            // Verifica las condiciones antes de crear el abono
            if (venta.formaPago === 'Crédito' && venta.estado === 'Terminado' && venta.estadoPago === 'Pendiente') {
                // Crea el abono y asocia automáticamente la venta a través de la clave foránea
                const nuevoAbono = await AbonoVenta.create(body);

                res.json({
                    msg: `El abono fue agregado con éxito`,
                });
            } else {
                res.status(400).json({
                    msg: `No es posible realizar un abono para esta venta, no cumple con las condiciones necesarias.`
                });
            }
        } else {
            res.status(404).json({
                msg: `La venta asociada no existe.`
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: `Upps, ocurrió un error al agregar el abono.`
        });
    }
};



//Solo modificar el campo estado
const putAbonoVenta = async (req, res = response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const abonoVenta = await AbonoVenta.findByPk(id);

        if (abonoVenta) {
            if (body.estado !== undefined) {
                await abonoVenta.update({
                    estado: body.estado
                });
                res.json({
                    msg: `El abono de venta fue actualizado con éxito`
                });
            } else {
                res.status(400).json({
                    msg: `El campo 'estado' es el único campo que se puede actualizar.`
                });
            }
        } else {
            res.status(404).json({
                msg: `No existe un abono de venta con el id ${id}`
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
    getAbonoVentas,
    getAbonoVenta,
    postAbonoVenta,
    putAbonoVenta
}
