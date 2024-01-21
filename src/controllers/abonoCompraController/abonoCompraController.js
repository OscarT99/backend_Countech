const { response } = require('express');
const AbonoCompra = require('../../models/abonoCompraModel/abonoCompraModel');
const Compra = require('../../models/compraModel/compraModel');




const getAbonoCompras = async (req, res = response) => {
    try {
        const listAbonoCompras = await AbonoCompra.findAll()
        res.json({ listAbonoCompras })
    } catch (err) {
        console.log(err)
        res.json({
            msg: `Error en la lista de abonos a compras`
        })
    }

}

const getAbonoCompra = async (req, res = response) => {
    const { id } = req.params
    const compra = await AbonoCompra.findByPk(id)

    if (compra) {
        res.json(compra)
    } else {
        res.status(404).json({
            msg: `No existe un abono con el id ${id}`
        })
    }
}


const postAbonoCompra = async (req, res) => {
    const { body } = req;

    try {
        // Busca la compra asociada al abono
        const compra = await Compra.findByPk(body.compra);

        if (compra) {
            // Verifica las condiciones antes de crear el abono
            if (compra.formaPago === 'Crédito' && compra.estadoPago === 'Pendiente') {
                // Crea el abono y asocia automáticamente la compra a través de la clave foránea
                const nuevoAbono = await AbonoCompra.create(body);

                res.json({
                    msg: `El abono fue agregado con éxito`,
                });
            } else {
                res.status(400).json({
                    msg: `No es posible realizar un abono para esta compra, no cumple con las condiciones necesarias.`
                });
            }
        } else {
            res.status(404).json({
                msg: `La compra asociada no existe.`
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: `Upps, ocurrió un error al agregar el abono.`
        });
    }
};





module.exports = {
    getAbonoCompras,
    getAbonoCompra,
    postAbonoCompra,
}
