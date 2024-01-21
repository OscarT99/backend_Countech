const {response} = require('express')
const Proveedor = require('../../models/proveedorModel/proveedorModel')
const Compra = require('../../models/compraModel/compraModel')
const DetalleEnCompra = require('../../models/compraModel/detalleCompraModel')
const Insumo = require('../../models/insumoModel/insumoModel')

const { validarCompra } = require('./validacionesCompraCompleto/validacionesCompra')

const getAllComprasConRelaciones = async (req, res = response) => {
    try{
        const listaCompras = await Compra.findAll({
            include: [
                {
                    model: Proveedor,
                },
                {
                    model:DetalleEnCompra,
                    include: [
                        {
                            model: Insumo
                        }
                    ]
                }
            ]
        })

        res.json({listaCompras})

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener la lista de compras con sus respectivas relaciones',
        });
    }
}

const getCompraConRelacionesPorId = async (req, res = response) => {
    const { id } = req.params;
    
    try{
        const compra = await Compra.findByPk(id,{
            include:[
                {
                    model:Proveedor,
                },
                {
                    model:DetalleEnCompra,
                    include:[
                        {
                            model:Insumo
                        }
                    ]
                }
            ]
        });

        if(!compra){
            return res.status(404).json({ success: false, error: 'Compra no encontrada.' });
        }

        res.json( compra )

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener la compra con sus respectivas relaciones',
        });
    }
}

const postCompraCompleta = async (req, res = response,next) => {
    try{
        const compraData = req.body

        const validationResponse = await validarCompra(compraData,res)

        if(!validationResponse.success){
            return next(res.status(400).json({success:false, error:validationResponse.error }))
        }

        let estadoPago = '';
        if (compraData.formaPago == 'Contado') {
            estadoPago = 'Pago';
        } else {
            estadoPago = 'Pendiente';
        }

        const compra = await Compra.create({
            proveedor: compraData.proveedor,
            fechaCompra: compraData.fechaCompra,
            numeroFactura: compraData.numeroFactura,
            totalBruto: compraData.totalBruto,
            iva: compraData.iva,
            totalNeto: compraData.totalNeto,
            formaPago : compraData.formaPago,
            estadoPago:estadoPago
        })

        for(const detalleCompraData of compraData.DetalleEnCompras){
             await DetalleEnCompra.create({
                compra: compra.id,
                insumo: detalleCompraData.insumo,
                cantidad: detalleCompraData.cantidad,
                valorUnitario: detalleCompraData.valorUnitario,
                impuestoIva: detalleCompraData.impuestoIva,
                valorTotal: detalleCompraData.valorTotal
            })
        }

        res.status(201).json({
            success: true,
            message: 'Compra completa creada exitosamente.',
        });
    }catch(error){
        console.error(error);
        next({ success: false, error: 'Ocurrió un error al crear la compra completa' });
    }
}

const putCompraCompleta = async (req, res = response, next) => {
    try {
        const { id } = req.params; // Asumiendo que el ID de la compra se encuentra en los parámetros de la ruta
        const compraData = req.body;

        const validationResponse = await validarCompra(compraData, res);

        if (!validationResponse.success) {
            return next(res.status(400).json({ success: false, error: validationResponse.error }));
        }

        // Actualizar la compra existente
        const existingCompra = await Compra.findByPk(id);

        if (!existingCompra) {
            return next(res.status(404).json({ success: false, error: 'Compra no encontrada.' }));
        }

        let estadoPago = '';
        if (compraData.formaPago == 'Contado') {
            estadoPago = 'Pago';
        } else {
            estadoPago = 'Pendiente';
        }

        await existingCompra.update({
            proveedor: compraData.proveedor,
            fechaCompra: compraData.fechaCompra,
            numeroFactura: compraData.numeroFactura,
            totalBruto: compraData.totalBruto,
            iva: compraData.iva,
            totalNeto: compraData.totalNeto,
            formaPago: compraData.formaPago,
            estadoPago: estadoPago
        });

        // Actualizar detalles de compra existentes o agregar nuevos detalles
        for (const detalleCompraData of compraData.DetalleEnCompras) {
            console.log('Detalle a actualizar:', detalleCompraData);

            const existingDetalle = await DetalleEnCompra.findOne({
                where: {
                    compra: existingCompra.id,
                    insumo: detalleCompraData.insumo
                }
            });

            console.log('Buscando detalle existente:', existingCompra.id, detalleCompraData.insumo);

            if (existingDetalle) {
                // Si el detalle ya existe, actualizarlo
                await existingDetalle.update({
                    cantidad: detalleCompraData.cantidad,
                    valorUnitario: detalleCompraData.valorUnitario,
                    impuestoIva: detalleCompraData.impuestoIva,
                    valorTotal: detalleCompraData.valorTotal
                });
            } else {
                // Si el detalle no existe, crear uno nuevo
                await DetalleEnCompra.create({
                    compra: existingCompra.id,
                    insumo: detalleCompraData.insumo,
                    cantidad: detalleCompraData.cantidad,
                    valorUnitario: detalleCompraData.valorUnitario,
                    impuestoIva: detalleCompraData.impuestoIva,
                    valorTotal: detalleCompraData.valorTotal
                });
            }
        }

        res.status(200).json({
            success: true,
            message: 'Compra actualizada exitosamente.',
        });
    } catch (error) {
        console.error(error);
        next({ success: false, error: 'Ocurrió un error al actualizar la compra completa' });
    }
};


const anularCompra = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { estadoCompra, motivoDeAnulacion } = req.body; // Modificado para recibir el motivo de anulación

        const compra = await Compra.findByPk(id);

        if (compra) {
            if (compra.estadoCompra) {
                compra.estadoCompra = false;
                compra.motivoDeAnulacion = motivoDeAnulacion; 
                await compra.save();
                res.json({
                    success: true,
                    message: `La compra con número de factura ${compra.numeroFactura} fue anulada correctamente.`,
                });
            } else {
                res.json({
                    success: false,
                    error: `La compra con número de factura ${compra.numeroFactura} ya está anulada.`,
                });
            }
        } else {
            res.status(404).json({
                success: false,
                error: `No existe una compra con el id ${id}`,
            });
        }
    } catch (error) {
        console.error('Error al anular la compra:', error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un problema al anular la compra',
        });
    }
};


module.exports = {
    getAllComprasConRelaciones,
    getCompraConRelacionesPorId,
    postCompraCompleta,
    putCompraCompleta,
    anularCompra
}