const { response } = require('express');
const SalidaInsumo = require('../../models/salidaInsumoModel/salidaInsumoModel')

const getSalidasDeInsumo = async(req, res = response) => {
    try{
        const listSalidasDeInsumo = await SalidaInsumo.findAll()
        res.json({ listSalidasDeInsumo })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener la salida de los insumos',
        });
    }
} 

const postSalidaDeInsumo = async(req, res = response) => {
    try{
        const { body } = req;
        
        if(!body.insumo){
            return res.status(400).json({ success: false, error: 'El campo insumo es obligatorio.' });
        }

        if(!body.cantidad){
            return res.status(400).json({ success: false, error: 'El campo cantidad es obligatorio.' });
        }
        if (!body.tipoDeMaquina) {
            return res.status(400).json({ error: 'El campo tipoDeMaquina es obligatorio.' });
        } else if (!['Fileteadora', 'Plana', 'Presilladora', 'Recubridora', 'Manual'].includes(body.tipoDeMaquina)) {
            return res.status(400).json({ error: 'Tipo de máquina no válido. Debe ser uno de los siguientes valores: Fileteadora, Plana, Presilladora, Recubridora, Manual.' });
        }

        await SalidaInsumo.create(body);
        res.status(201).json({
            success: true,
            message: 'Salida de insumo registrada con éxito.',
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al crear la salida del insumo',
        });
    }
}

module.exports = {
    getSalidasDeInsumo,
    postSalidaDeInsumo    
}