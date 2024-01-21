const {response} = require('express')
const bcrypt = require('bcryptjs')//Encriptar contraseñas
const Usuario = require('../../models/usuarioModel/usuarioModel')


const getUsuarios = async(req, res = response) => {
    try{
        const listUsuarios = await Usuario.findAll()
        res.json({listUsuarios})
    }catch(error){
        console.log(error)
        res.json({
            msg:`Upps ocurrio un error`
        })
    }
}


const getUsuario = async (req, res = response) => {
    try{
        const { id } = req.params
        const usuario = await Usuario.findByPk(id)

        if(usuario){
            res.json(usuario)
        }else{
            res.json({
                msg: `No existe un usuario con el id ${id}`
            })
        }
    }catch(error){
        console.log(error)
        res.json({
            msg:`Upps ocurrio un error`
        })
    }    
}


// Número de rondas de sal para el hash
const saltRounds = 10; 

const postUsuario = async (req, res = response) => {
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

