const { response } = require('express');
const Proveedor = require('../../models/proveedorModel/proveedorModel');

const getProveedores = async (req, res = response) =>{
    try{
        const listProveedores = await Proveedor.findAll();
        res.json({ listProveedores });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener los proveedores'
        });
    }
}

const getProveedor = async (req, res = response) => {
    try{
        const { id } = req.params;
        const proveedor = await Proveedor.findByPk(id);

        if(proveedor){
            res.json(proveedor);
        }else{
            res.status(404).json({
                success: false,
                error: `No existe un proveedor con el id ${id}`
            });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener el proveedor'
        });
    }    
}

const postProveedor = async (req, res = response) => {    
    try{
        const { body } = req;

        if (!body.tipoProveedor) {
            return res.status(400).json({ error: 'El campo tipoProveedor es obligatorio.' });
        } else if (!['Persona jurídica', 'Persona natural'].includes(body.tipoProveedor)) {
            return res.status(400).json({ error: 'El tipo de proveedor debe ser "Persona jurídica" o "Persona natural".' });
        }

        if (!body.tipoIdentificacion) {
            return res.status(400).json({ error: 'El campo tipoIdentificacion es obligatorio.' });
        } else if (![
            'Tarjeta de identidad',
            'Cédula de ciudadanía',
            'Tarjeta de extranjería',
            'Cédula de extranjería',
            'NIT',
            'Pasaporte',
        ].includes(body.tipoIdentificacion)) {
            return res.status(400).json({ error: 'Tipo de identificación no válido.' });
        }

        if (!body.numeroIdentificacion) {
            return res.status(400).json({ error: 'El campo numeroIdentificacion es obligatorio.' });
        }

        if (body.tipoIdentificacion && !/^\d{6,12}$/.test(body.numeroIdentificacion)) {
            return res.status(400).json({ error: 'Número de identificación no válido. Debe tener entre 6 y 12 caracteres numéricos.' });
        }

        const existingProveedor = await Proveedor.findOne({ where: { numeroIdentificacion: body.numeroIdentificacion } });
        if (existingProveedor) {
            return res.status(400).json({ error: 'El proveedor con ese número de identificación ya existe.' });
        }


        if (!body.razonSocial) {
            return res.status(400).json({ error: 'El campo razonSocial es obligatorio.' });
        }

        if (!body.nombreComercial) {
            return res.status(400).json({ error: 'El campo nombreComercial es obligatorio.' });
        }

        if (!body.ciudad) {
            return res.status(400).json({ error: 'El campo ciudad es obligatorio.' });
        } else if (!/^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+$/.test(body.ciudad)) {
            return res.status(400).json({ error: 'Ciudad no válida.' });
        }

        await Proveedor.create(body);

        res.status(201).json({
            success: true,
            message: 'El proveedor fue agregado con éxito'
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al agregar el proveedor'
        });
    }
}

const putProveedor = async (req, res = response) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const proveedor = await Proveedor.findByPk(id);
        if (!proveedor) { 
            return res.status(404).json({ success: false, error: `No existe un proveedor con el id ${id}` });
        }

        if (!body.tipoProveedor) {
            return res.status(400).json({ error: 'El campo tipoProveedor es obligatorio.' });
        } else if (!['Persona jurídica', 'Persona natural'].includes(body.tipoProveedor)) {
            return res.status(400).json({ error: 'El tipo de proveedor debe ser "Persona jurídica" o "Persona natural".' });
        }

        if (!body.tipoIdentificacion) {
            return res.status(400).json({ error: 'El campo tipoIdentificacion es obligatorio.' });
        } else if (![
            'Tarjeta de identidad',
            'Cédula de ciudadanía',
            'Tarjeta de extranjería',
            'Cédula de extranjería',
            'NIT',
            'Pasaporte',
        ].includes(body.tipoIdentificacion)) {
            return res.status(400).json({ error: 'Tipo de identificación no válido.' });
        }

        if (!body.numeroIdentificacion) {
            return res.status(400).json({ error: 'El campo numeroIdentificacion es obligatorio.' });
        }

        if (body.tipoIdentificacion  && !/^\d{6,12}$/.test(body.numeroIdentificacion)) {
            return res.status(400).json({ error: 'Número de identificación no válido. Debe tener entre 6 y 12 caracteres numéricos.' });
        }
        
        if (!body.razonSocial) {
            return res.status(400).json({ error: 'El campo razonSocial es obligatorio.' });
        } 

        if (!body.nombreComercial) {
            return res.status(400).json({ error: 'El campo nombreComercial es obligatorio.' });
        } 

        if (!body.ciudad) {
            return res.status(400).json({ error: 'El campo ciudad es obligatorio.' });
        } else if (!/^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+$/.test(body.ciudad)) {
            return res.status(400).json({ error: 'Ciudad no válida.' });
        }

        await proveedor.update(body);

        res.status(200).json({
            success: true,
            message: 'El proveedor fue actualizado con éxito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al actualizar el proveedor'
        });
    }
}

const buscarProveedores = async (req, res = response) => {
    try {
        const terminoBusqueda = req.query.termino;
        const proveedoresEncontrados = await Proveedor.buscarProveedores(terminoBusqueda);
        res.json(proveedoresEncontrados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    getProveedores,
    getProveedor,
    postProveedor,
    putProveedor,
    buscarProveedores
}
