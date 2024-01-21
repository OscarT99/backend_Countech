const { response } = require('express');
const Cliente = require('../../models/clienteModel/clienteModel');

const getClientes = async (req, res = response) => {
    try {
        const listClientes = await Cliente.findAll();
        res.json({ listClientes });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener los clientes'
        });
    }
}

const getCliente = async (req, res = response) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findByPk(id);

        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({
                success: false,
                error: `No existe un cliente con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener el cliente'
        });
    }
}

const postCliente = async (req, res = response) => {
    try {
        const { body } = req;

        if (!body.tipoCliente) {
            return res.status(400).json({ error: 'El campo tipoCliente es obligatorio.' });
        } else if (!['Empresa', 'Persona'].includes(body.tipoCliente)) {
            return res.status(400).json({ error: 'El tipo de cliente debe ser "Empresa" o "Persona".' });
        }

        if (!body.tipoIdentificacion) {
            return res.status(400).json({ error: 'El campo tipoIdentificacion es obligatorio.' });
        } else if (![
            'Registro civil',
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

        if (body.tipoIdentificacion === 'NIT' && !/^\d{9}-\d$/.test(body.numeroIdentificacion)) {
            return res.status(400).json({ error: 'Número de identificación no válido para NIT. Debe tener el formato "123456789-0".' });
        } else if (body.tipoIdentificacion !== 'NIT' && !/^\d{6,12}$/.test(body.numeroIdentificacion)) {
            return res.status(400).json({ error: 'Número de identificación no válido. Debe tener entre 6 y 12 caracteres numéricos.' });
        }

        const existingCliente = await Cliente.findOne({ where: { numeroIdentificacion: body.numeroIdentificacion } });
        if (existingCliente) {
            return res.status(400).json({ error: 'El cliente con ese número de identificación ya existe.' });
        }

        if (!body.razonSocial) {
            return res.status(400).json({ error: 'El campo razonSocial es obligatorio.' });
        } else if (!/^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+$/.test(body.razonSocial)) {
            return res.status(400).json({ error: 'Razón social no válida.' });
        }

        if (!body.nombreComercial) {
            return res.status(400).json({ error: 'El campo nombreComercial es obligatorio.' });
        } else if (!/^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+$/.test(body.nombreComercial)) {
            return res.status(400).json({ error: 'Nombre comercial no válido.' });
        }

        if (!body.ciudad) {
            return res.status(400).json({ error: 'El campo ciudad es obligatorio.' });
        } else if (!/^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+$/.test(body.ciudad)) {
            return res.status(400).json({ error: 'Ciudad no válida.' });
        }

        if (!/^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+$/.test(body.contacto)) {
            return res.status(400).json({ error: 'Contacto no válido.' });
        }

        // if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/.test(body.correo)) {
        //     return res.status(400).json({ error: 'Correo no válido.' });
        // }

        await Cliente.create(body);

        res.status(201).json({
            success: true,
            message: 'El cliente fue agregado con éxito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al agregar el cliente'
        });
    }
}

const putCliente = async (req, res = response) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const cliente = await Cliente.findByPk(id);
        if (!cliente) { 
            return res.status(404).json({ success: false, error: `No existe un cliente con el id ${id}` });
        }

        if (!body.tipoCliente) {
            return res.status(400).json({ error: 'El campo tipoCliente es obligatorio.' });
        } else if (!['Empresa', 'Persona'].includes(body.tipoCliente)) {
            return res.status(400).json({ error: 'El tipo de cliente debe ser "Empresa" o "Persona".' });
        }

        if (!body.tipoIdentificacion) {
            return res.status(400).json({ error: 'El campo tipoIdentificacion es obligatorio.' });
        } else if (![
            'Registro civil',
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

        if (body.tipoIdentificacion === 'NIT' && !/^\d{9}-\d$/.test(body.numeroIdentificacion)) {
            return res.status(400).json({ error: 'Número de identificación no válido para NIT. Debe tener el formato "123456789-0".' });
        } else if (body.tipoIdentificacion !== 'NIT' && !/^\d{6,12}$/.test(body.numeroIdentificacion)) {
            return res.status(400).json({ error: 'Número de identificación no válido. Debe tener entre 6 y 12 caracteres numéricos.' });
        }
        
        if (!body.razonSocial) {
            return res.status(400).json({ error: 'El campo razonSocial es obligatorio.' });
        } else if (!/^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+$/.test(body.razonSocial)) {
            return res.status(400).json({ error: 'Razón social no válida.' });
        }

        if (!body.nombreComercial) {
            return res.status(400).json({ error: 'El campo nombreComercial es obligatorio.' });
        } else if (!/^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+$/.test(body.nombreComercial)) {
            return res.status(400).json({ error: 'Nombre comercial no válido.' });
        }

        if (!body.ciudad) {
            return res.status(400).json({ error: 'El campo ciudad es obligatorio.' });
        } else if (!/^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+$/.test(body.ciudad)) {
            return res.status(400).json({ error: 'Ciudad no válida.' });
        }

        if (!/^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+$/.test(body.contacto)) {
            return res.status(400).json({ error: 'Contacto no válido.' });
        }

        // if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/.test(body.correo)) {
        //     return res.status(400).json({ error: 'Correo no válido.' });
        // }
        
        await cliente.update(body);

        res.status(200).json({
            success: true,
            message: 'El cliente fue actualizado con éxito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al actualizar el cliente'
        });
    }
}

const buscarClientes = async (req, res = response) => {
    try {
        const terminoBusqueda = req.query.termino;
        const clientesEncontrados = await Cliente.buscarClientes(terminoBusqueda);
        res.json(clientesEncontrados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    getClientes,
    getCliente,
    postCliente,
    putCliente,
    buscarClientes
}
