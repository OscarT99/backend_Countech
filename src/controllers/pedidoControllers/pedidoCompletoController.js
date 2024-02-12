const { response } = require('express');
const Pedido = require('../../models/pedidoModel/pedidoModel');
const Cliente = require('../../models/clienteModel/clienteModel');
const ProcesoReferenciaPedido = require('../../models/pedidoModel/procesoReferenciaPedidoModel');
const ColorProcesoReferenciaPedido = require('../../models/pedidoModel/colorProcesoReferenciaPedidoModel');

const { validarPedido } = require('./validacionesPedidoCompleto/validacionesPedido')

const getAllPedidosConRelaciones = async (req, res = response) => {
    try {
        const listaPedidos = await Pedido.findAll({
            include: [
                {
                    model: Cliente,                    
                },
                {                    
                    model: ProcesoReferenciaPedido,
                    include: [                                
                        {
                            model: ColorProcesoReferenciaPedido,                                    
                        },
                    ],                    
                },
            ],
        });        
        res.json({ listaPedidos });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener la lista de pedidos con sus respectivas relaciones',
        });
    }
};

const getPedidoConRelacionesPorId = async (req, res = response) => {
    const { id } = req.params;

    try {
        const pedido = await Pedido.findByPk(id, {
            include: [
                {
                    model: Cliente,
                },                
                    {
                        model: ProcesoReferenciaPedido,
                        include: [
                            {
                                model: ColorProcesoReferenciaPedido,                                    
                            },
                        ],
                    },                
            ],
        });

        if (!pedido) {
            return res.status(404).json({ success: false, error: 'Pedido no encontrado.' });
        }

        res.json(pedido);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener el pedido con sus respectivas relaciones',
        });
    }
};

const postPedidoCompleto = async (req, res = response,next) => {
    try {
        const pedidoData = req.body;

        const validationResponse = await validarPedido(pedidoData, res);

        if (!validationResponse.success) {
            // Si las validaciones fallan, envía un error al cliente
            return next(res.status(400).json({ success: false, error: validationResponse.error }));
        }
    
        const pedido = await Pedido.create({
            cliente: pedidoData.cliente,
            ordenTrabajo: pedidoData.ordenTrabajo,
            fechaOrdenTrabajo: pedidoData.fechaOrdenTrabajo,
            fechaEntregaOrden: pedidoData.fechaEntregaOrden,
            formaPago: pedidoData.formaPago,
            observaciones: pedidoData.observaciones,

            referencia: pedidoData.referencia,
            descripcion: pedidoData.descripcion,
            valorUnitario: pedidoData.valorUnitario,
            cantidadTotal: pedidoData.cantidadTotal,
            valorTotal: pedidoData.valorUnitario * pedidoData.cantidadTotal
        });
                        
            // Crea los procesos en referencia
            if (pedidoData.ProcesoEnReferenciaEnPedidos) {
                for (const procesoData of pedidoData.ProcesoEnReferenciaEnPedidos) {
                    const procesoEnReferencia = await ProcesoReferenciaPedido.create({
                        pedido: pedido.id,
                        proceso: procesoData.proceso,
                        tipoDeMaquina: procesoData.tipoDeMaquina,
                        cantidadTotal: procesoData.cantidadTotal,
                        cantidadPendiente:procesoData.cantidadTotal
                        // ... otras propiedades de ProcesoReferenciaPedido
                    });

                    // Crea los colores en proceso
                    if (procesoData.ColorEnProcesoEnReferenciaEnPedidos) {
                        for (const colorData of procesoData.ColorEnProcesoEnReferenciaEnPedidos) {
                            const colorEnProceso = await ColorProcesoReferenciaPedido.create({
                                proceso: procesoEnReferencia.id,
                                color: colorData.color,
                                tallaS:colorData.tallaS,
                                tallaM:colorData.tallaM,
                                tallaL:colorData.tallaL,    
                                tallaXL:colorData.tallaXL,
                                cantidadTotal: colorData.cantidadTotal,
                                // ... otras propiedades de ColorProcesoReferenciaPedido
                            });                            
                        }
                    }
                }
            }
        
        // Devuelve una respuesta si todo fue exitoso
        res.status(201).json({
            success: true,
            message: 'Pedido completo creado exitosamente.',
        });
    } catch (error) {
        console.error(error);
        next({ success: false, error: 'Ocurrió un error al crear el pedido completo' });
    }
};

const putPedidoCompleto = async (req, res = response, next) => {
    try {
        const { id } = req.params;
        const pedidoData = req.body;

        // Validar los datos del pedido
        const validationResponse = await validarPedido(pedidoData, res);

        if (!validationResponse.success) {
            return next(res.status(400).json({ success: false, error: validationResponse.error }));
        }

        // Buscar el pedido por su ID con todas las relaciones
        const pedido = await Pedido.findByPk(id, {
            include: [
                {
                    model: Cliente,
                },
                {
                    model: ProcesoReferenciaPedido,
                    include: [
                        {
                            model: ColorProcesoReferenciaPedido,
                        },
                    ],
                },
            ],
        });

        if (!pedido) {
            return res.status(404).json({ success: false, error: 'Pedido no encontrado.' });
        }

        // Actualizar los campos del pedido
        await pedido.update({
            cliente: pedidoData.cliente,
            ordenTrabajo: pedidoData.ordenTrabajo,
            fechaOrdenTrabajo: pedidoData.fechaOrdenTrabajo,
            fechaEntregaOrden: pedidoData.fechaEntregaOrden,
            formaPago: pedidoData.formaPago,
            observaciones: pedidoData.observaciones,
            referencia: pedidoData.referencia,
            descripcion: pedidoData.descripcion,
            valorUnitario: pedidoData.valorUnitario,
            cantidadTotal: pedidoData.cantidadTotal,
            valorTotal: pedidoData.valorUnitario * pedidoData.cantidadTotal,
        });

        // Eliminar los procesos existentes
        await ProcesoReferenciaPedido.destroy({
            where: {
                pedido: id,
            },
            cascade: true, // Si has implementado cascading en tu modelo
        });

        // Recrear los procesos con los nuevos datos
        if (pedidoData.ProcesoEnReferenciaEnPedidos) {
            for (const procesoData of pedidoData.ProcesoEnReferenciaEnPedidos) {
                const procesoEnReferencia = await ProcesoReferenciaPedido.create({
                    pedido: id,
                    proceso: procesoData.proceso,
                    tipoDeMaquina: procesoData.tipoDeMaquina,
                    cantidadTotal: procesoData.cantidadTotal,
                    cantidadPendiente: procesoData.cantidadTotal,
                });

                // Crea los colores en proceso
                if (procesoData.ColorEnProcesoEnReferenciaEnPedidos) {
                    for (const colorData of procesoData.ColorEnProcesoEnReferenciaEnPedidos) {
                        await ColorProcesoReferenciaPedido.create({
                            proceso: procesoEnReferencia.id,
                            color: colorData.color,
                            tallaS: colorData.tallaS,
                            tallaM: colorData.tallaM,
                            tallaL: colorData.tallaL,
                            tallaXL: colorData.tallaXL,
                            cantidadTotal: colorData.cantidadTotal,
                        });
                    }
                }
            }
        }

        // Devuelve una respuesta si todo fue exitoso
        res.json({
            success: true,
            message: 'Pedido completo editado exitosamente.',
        });
    } catch (error) {
        console.error(error);
        next({ success: false, error: 'Ocurrió un error al editar el pedido completo' });
    }
};

const anularPedido = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { estadoPedido, motivoDeAnulacion } = req.body; // Modificado para recibir el motivo de anulación

        const pedido = await Pedido.findByPk(id);

        if (pedido) {
            if (pedido.estadoPedido) {
                pedido.estadoPedido = false;
                pedido.motivoDeAnulacion = motivoDeAnulacion; 
                await pedido.save();
                res.json({
                    success: true,
                    message: `El pedido con orden de trabajo ${pedido.ordenTrabajo} fue anulada correctamente.`,
                });
            } else {
                res.json({
                    success: false,
                    error: `El pedido con orden de trabajo ${pedido.ordenTrabajo} ya está anulada.`,
                });
            }
        } else {
            res.status(404).json({
                success: false,
                error: `No existe un pedido con el id ${id}`,
            });
        }
    } catch (error) {
        console.error('Error al anular el pedido:', error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un problema al anular el pedido',
        });
    }
};

module.exports = {
    getAllPedidosConRelaciones,
    getPedidoConRelacionesPorId,
    postPedidoCompleto,
    putPedidoCompleto,
    anularPedido
}
