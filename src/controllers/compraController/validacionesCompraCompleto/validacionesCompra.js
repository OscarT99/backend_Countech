const {response} = require('express')
const Proveedor = require('../../../models/proveedorModel/proveedorModel')
const Compra = require('../../../models/compraModel/compraModel');
const Insumo = require('../../../models/insumoModel/insumoModel')

const validarCompra = async(body, res = response) => {
    try{

        if (!body.proveedor) {
            return res.status(400).json({ error: 'El campo proveedor es obligatorio.' });
        }else {
            const proveedor = await Proveedor.findByPk(body.proveedor);
            if (!proveedor) {
                return res.status(400).json({ error: 'El proveedor especificado no existe.' });
            }
        }

        if (!body.numeroFactura) {
            return res.status(400).json({ error: 'El campo numeroFactura es obligatorio.' });
        } else {
            const existingCompra = await Compra.findOne({
                where: {
                    numeroFactura: body.numeroFactura,
                    proveedor: body.proveedor
                }
            });
    
            if (existingCompra && body.id == null) {
                return res.status(400).json({ error: 'Este número de factura ya está asociado al proveedor especificado.' });
            }
        }

        if (!body.fechaCompra) {
            return res.status(400).json({ error: 'El campo fechaCompra es obligatorio.' });
        }else {
            const fechaCompraDate = new Date(body.fechaCompra);
            const fechaActual = new Date();

            if (fechaCompraDate > fechaActual) {
                return res.status(400).json({ error: 'La fecha de compra no puede ser mayor que la fecha de registro.' });
            }
        }
            
        if (!body.DetalleEnCompras || body.DetalleEnCompras.length === 0){
            return res.status(400).json({ error: 'Debe ingresar al menos un insumo en la compra.' });
        }

        for(const detalleData of body.DetalleEnCompras || []){
                                
            if (!detalleData.insumo) {
                return res.status(400).json({ error: 'El campo insumo es obligatorio.' });
            }
            const insumo = await Insumo.findByPk(detalleData.insumo);
            if (!insumo) {
                return res.status(400).json({ error: 'El insumo especificado no existe.' });
            }

            if (isNaN(detalleData.cantidad) || detalleData.cantidad < 1) {
                return res.status(400).json({ error: 'El campo cantidad debe ser un número mayor o igual a 1.' });
            }

            if (isNaN(detalleData.valorUnitario) || detalleData.valorUnitario < 1) {
                return res.status(400).json({ error: 'El campo valorUnitario debe ser un número mayor o igual a 1.' });
            }

            if (isNaN(detalleData.valorTotal) || detalleData.valorTotal < 1) {
                return res.status(400).json({ error: 'El campo valorTotal debe ser un número mayor o igual a 1.' });
            }
        }

        if (!body.formaPago) {
            return res.status(400).json({ error: 'El campo formaPago es obligatorio.' });
        } else if (!['Contado', 'Crédito'].includes(body.formaPago)) {
            return res.status(400).json({ error: 'La forma de pago debe ser "Contado" o "Crédito".' });
        }

        if (isNaN(body.totalBruto) || body.totalBruto < 1) {
            return res.status(400).json({ error: 'El campo totalBruto debe ser un número mayor o igual a 1.' });
        }

        if (isNaN(body.totalNeto) || body.totalNeto < 1) {
            return res.status(400).json({ error: 'El campo totalNeto debe ser un número mayor o igual a 1.' });
        }

        return {success:true, error:null};

    }catch(error){
        console.error(error);        
        return { success: false, error: 'Ocurrió un error en la validación de la compra' };
    }
}

module.exports = {
    validarCompra
};