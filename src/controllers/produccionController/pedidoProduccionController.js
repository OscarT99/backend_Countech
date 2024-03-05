const { response } = require('express');
const Pedido = require('../../models/pedidoModel/pedidoModel');
const Cliente = require('../../models/clienteModel/clienteModel');
const ProcesoReferenciaPedido = require('../../models/pedidoModel/procesoReferenciaPedidoModel');
const ColorProcesoReferenciaPedido = require('../../models/pedidoModel/colorProcesoReferenciaPedidoModel');
const AvanceProcesoEmpleado = require('../../models/produccionModel/avanceProcesoEmpleado');
const AsignarProcesoEmpleado = require('../../models/produccionModel/asignarProcesoEmpleado');
const Empleado = require('../../models/empleadoModel/empleadoModel');

const getPedidoProdCompleto = async (req, res = response) => {
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
                            model: AsignarProcesoEmpleado,

                            include: [
                                // {
                                //     model: Empleado,
                                // },
                                {
                                    model: AvanceProcesoEmpleado,
                                }
                            ]
                        },
                        {
                            model: ColorProcesoReferenciaPedido,
                        }
                    ],
                    // include: [                                
                    //     {
                    //         model: ColorProcesoReferenciaPedido,                                    
                    //     },
                    // ],                    
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


const getPedidoProdMobile = async (req, res = response) => {
    try {
        const data = await Pedido.findAll({
            include: [
                {
                    model: Cliente,                    
                },
                {                    
                    model: ProcesoReferenciaPedido,
                    include: [
                        {
                            model: AsignarProcesoEmpleado,
                            include: [
                                // {
                                //     model: Empleado,
                                //     attributes: ['nombre', 'apellido'], // Seleccionar los campos nombre y apellido
                                // },
                                {
                                    model: AvanceProcesoEmpleado,
                                }
                            ]
                        },
                        {
                            model: ColorProcesoReferenciaPedido,
                        }
                    ],                
                },
            ],
        });

        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener la lista de pedidos con sus respectivas relaciones',
        });
    }
};


module.exports = {
    getPedidoProdCompleto,
    getPedidoProdMobile
};