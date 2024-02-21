const { response } = require('express');
const Pedido = require('../../models/pedidoModel/pedidoModel');
const Cliente = require('../../models/clienteModel/clienteModel');
const ProcesoReferenciaPedido = require('../../models/pedidoModel/procesoReferenciaPedidoModel');
const ColorProcesoReferenciaPedido = require('../../models/pedidoModel/colorProcesoReferenciaPedidoModel');
const AsignarProcesoEmpleado = require('../../models/produccionModel/asignarProcesoEmpleado');
const AvanceProcesoEmpleado = require('../../models/produccionModel/avanceProcesoEmpleado');

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
                        {
                            model: AsignarProcesoEmpleado,
                                include: [
                                    {
                                     model: AvanceProcesoEmpleado,
                                    }
                            ],                                    
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

const getPedidoInfo = async (req, res = response) => {
    try{
        const listaPedidoInfo = await Pedido.findAll();

        res.json({ listaPedidoInfo });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener la lista de pedidos',
        });
}
}

// NUEVO MÉTODO PARA TOKEN
const getPedidoProcesos = async (req, res = response) => {
    try {
        const listaProcesos = await ProcesoReferenciaPedido.findAll({
            include: [
                {
                    model: ColorProcesoReferenciaPedido,                                    
                },
            ],
        });

        res.json({ listaProcesos });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener la lista de procesos con sus respectivas relaciones',
        });
    }

}

const getPedidoProcesoById = async (req, res = response) => {
    const { id } = req.params;

    try{
        const pedidoProceso = await ProcesoReferenciaPedido.findByPk(id);

        if (!pedidoProceso) {
            return res.status(404).json({ success: false, error: 'Proceso no encontrado.' });
        }else{
            res.json(pedidoProceso);
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener el proceso',
        });
    
    }
}

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
                            {
                                model: AsignarProcesoEmpleado,
                                    include: [
                                        {
                                         model: AvanceProcesoEmpleado,
                                        }
                                ],                                    
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

const postPedidoCompleto = async (req, res = response, next) => {
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
                        cantidadPendiente: procesoData.cantidadTotal
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

const deletePedidoCompleto = async (req, res = response) => {
    const { id } = req.params;

    try {
        // Buscar el pedido por su ID con todas las relaciones
        const pedido = await Pedido.findByPk(id, {
            include: [
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

        // Eliminar el pedido y todas sus relaciones en cascada
        await Pedido.destroy({
            where: { id: pedido.id },
            cascade: true, // Esto es ficticio, debes implementar esto en tu modelo
        });

        res.json({
            success: true,
            message: 'Pedido y sus relaciones eliminados exitosamente.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al eliminar el pedido y sus relaciones.',
        });
    }
};


module.exports = {
    getAllPedidosConRelaciones,
    getPedidoConRelacionesPorId,
    getPedidoProcesos,
    getPedidoInfo,
    getPedidoProcesoById,
    postPedidoCompleto,
    deletePedidoCompleto
}
