const { response } = require('express')
const bcrypt = require('bcryptjs')//Encriptar contraseñas
const Usuario = require('../../models/usuarioModel/usuarioModel')


const getUsuarios = async (req, res = response) => {
    try {
        const listUsuarios = await Usuario.findAll()
        res.json({ listUsuarios })
    } catch (error) {
        console.log(error)
        res.json({
            msg: `Upps ocurrio un error`
        })
    }
}


const getUsuario = async (req, res = response) => {
    try {
        const { id } = req.params
        const usuario = await Usuario.findByPk(id)

        if (usuario) {
            res.json(usuario)
        } else {
            res.json({
                msg: `No existe un usuario con el id ${id}`
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            msg: `Upps ocurrio un error`
        })
    }
}


// Número de rondas de sal para el hash
const saltRounds = 10;

const postUsuario = async (req, res = response) => {
    const { nombre, email, cedula, contrasena, estado } = req.body;

    const validacion = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
    const validacionCorreo = /^[a-zA-Z0-9._%-ñÑáéíóúÁÉÍÓÚ]+@[a-zA-Z0-9.-]+\.(com|co|org|net|edu)$/;
    const validacionCedula = /^[0-9]+$/;



    //trim() elimina los espacios en blanco al principio y al final de la cadena,
    //y verifica si la longitud resultante es igual a cero. 
    if (!nombre || !nombre.trim()) {
        return res.status(400).json({ error: 'El campo nombre es obligatorio.' });
    }
    
    if (!validacion.test(nombre)) {
        return res.status(400).json({ error: "El nombre solo puede contener letras." });
    }    
    if (nombre.length > 100) {
        return res.status(400).json({ error: "El nombre excede la longitud máxima permitida '100' " });
    }
    if (nombre.length < 6) {
        return res.status(400).json({ error: "Ingrese el nombre completo" });
    }


    if (!email || !email.trim()) {
        return res.status(400).json({ error: 'El campo email es obligatorio.' });
    }
    if (!validacionCorreo.test(email)) {
        return res.status(400).json({ error: "El email debe tener una estructura válida." });
    }


    if (!cedula || !cedula.trim()) {
        return res.status(400).json({ error: 'El campo cédula es obligatorio.' });
    }
    if (!validacionCedula.test(cedula)) {
        return res.status(400).json({ error: "La cédula solo puede contener números." });
    }    
    if (cedula.length > 10) {
        return res.status(400).json({ error: "La cédula debe ser máximo de 10 dígitos" });
    }
    if (cedula.length < 8) {
        return res.status(400).json({ error: "La cédula debe ser minimo de 8 dígitos" });
    }


    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
        return res.json({ status: 'error', message: 'El email ya está en uso por otro usuario.' });
    }

    try {
        const { body } = req;
        // Hashea la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(body.contrasena, saltRounds);

        // Reemplaza la contraseña original con la contraseña hasheada
        body.contrasena = hashedPassword;

        // Crea el usuario en la base de datos
        await Usuario.create(body);

        res.json({
            msg: `El usuario fue creado exitosamente`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: `Upps ocurrió un error`
        });
    }
};


//Modificar email, contraseña y estado
const putUsuario = async (req, res = response) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        const validacionCorreo = /^[a-zA-Z0-9._%-ñÑáéíóúÁÉÍÓÚ]+@[a-zA-Z0-9.-]+\.(com|co|org|net|edu)$/;

        if (!body.email || !body.email.trim()) {
            return res.status(400).json({ error: 'El campo email es obligatorio.' });
        }
        if (!validacionCorreo.test(body.email)) {
            return res.status(400).json({ error: "El email debe tener una estructura válida." });
        }

    
        if (usuario) {
            const { email, contrasena, estado } = body;
            await usuario.update({
                email,
                contrasena,
                estado
            });

            res.json({
                msg: `El usuario fue actualizado exitosamente`
            });
        } else {
            res.json({
                msg: `No existe un usuario con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrió un error`
        });
    }
};




module.exports = {
    getUsuarios,
    getUsuario,
    postUsuario,
    putUsuario
}

