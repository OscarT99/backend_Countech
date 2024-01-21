const { response } = require('express');
const Insumo = require('../../models/insumoModel/insumoModel');
const categoriaInsumo = require('../../models/insumoModel/categoriaInsumoModel')

const getInsumos = async (req, res = response) => {
    try {
        const listInsumos = await Insumo.findAll();
        res.json({ listInsumos });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener los insumos',
        });
    }
}

const getInsumo = async (req, res = response) => {
    try {
        const { id } = req.params;
        const insumo = await Insumo.findByPk(id);

        if (insumo) {
            res.json(insumo);
        } else {
            res.status(404).json({
                success: false,
                error: `No existe un insumo con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener el insumo',
        });
    }
}

const postInsumo = async (req, res = response) => {
    try {
        const { body } = req;

        if (!body.categoria) {
            return res.status(400).json({ success: false, error: 'El campo categoria es obligatorio.' });
        } else if (!/^\d+$/.test(body.categoria)) {
            return res.status(400).json({ success: false, error: 'Categoría no válida. Solo se permiten números.' });
        }
        
        const categoria = await categoriaInsumo.findByPk(body.categoria);
        if (!categoria) {
            return res.status(400).json({ success: false, error: 'La categoría de insumo especificada no existe.' });
        }

        if (!body.nombre) {
            return res.status(400).json({ success: false, error: 'El campo nombre es obligatorio.' });
        } else if (!/^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+$/.test(body.nombre)) {
            return res.status(400).json({ success: false, error: 'Nombre no válido. Solo se permiten letras, tildes y espacios.' });
        }
        
        const existingInsumo = await Insumo.findOne({ where: { nombre: body.nombre } });
        if (existingInsumo) {
            return res.status(400).json({ success: false, error: 'El nombre del insumo ya existe.' });
        }

        if (body.cantidad !== undefined && !/^\d+$/.test(body.cantidad)) {
            return res.status(400).json({ success: false, error: 'Cantidad no válida. Solo se permiten números.' });
        }
                        
        await Insumo.create(body);
        res.status(201).json({
            success: true,
            message: 'El insumo fue agregado con éxito.',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al agregar el insumo',
        });
    }
}

const putInsumo = async (req, res = response) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const insumo = await Insumo.findByPk(id);

        if (insumo) {
            if (!body.categoria) {
                return res.status(400).json({ success: false, error: 'El campo categoria es obligatorio.' });
            } else if (!/^\d+$/.test(body.categoria)) {
                return res.status(400).json({ success: false, error: 'Categoría no válida. Solo se permiten números.' });
            }
            
            const categoria = await categoriaInsumo.findByPk(body.categoria);
            if (!categoria) {
                return res.status(400).json({ success: false, error: 'La categoría de insumo especificada no existe.' });
            }
    
            if (!body.nombre) {
                return res.status(400).json({ success: false, error: 'El campo nombre es obligatorio.' });
            } else if (!/^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+$/.test(body.nombre)) {
                return res.status(400).json({ success: false, error: 'Nombre no válido. Solo se permiten letras, tildes y espacios.' });
            }
            
            
            if (body.cantidad !== undefined && !/^\d+$/.test(body.cantidad)) {
                return res.status(400).json({ success: false, error: 'Cantidad no válida. Solo se permiten números.' });
            }                

            await insumo.update(body);
            res.json({
                success: true,
                message: 'El insumo fue actualizado correctamente.',
            });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe un insumo con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un problema al actualizar el insumo',
        });
    }
}

const deleteInsumo = async (req, res = response) => {
    try {
        const { id } = req.params;
        const insumo = await Insumo.findByPk(id);

        if (insumo) {
            await insumo.destroy();
            res.json({
                success: true,
                message: 'El insumo fue eliminado con éxito.',
            });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe un insumo con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un problema al eliminar el insumo',
        });
    }
}

const buscarInsumos = async (req, res = response) => {
    try {
        const terminoBusqueda = req.query.termino;
        const InsumosEncontrados = await Insumo.buscarInsumos(terminoBusqueda);
        res.json(InsumosEncontrados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const sumarCantidadInsumo = async (req, res = response) => {
    try {
      const { id } = req.params;
      const { nuevaCantidad } = req.body;
      const insumo = await Insumo.findByPk(id);
  
      if (insumo) {
            insumo.cantidad += nuevaCantidad;
            await insumo.save();
  
          res.json({
            success: true,
            message: 'Cantidad de insumo actualizada correctamente.',
          });
        
      } else {
        res.status(404).json({
          success: false,
          error: `No existe un insumo con el id ${id}`,
        });
      }
    } catch (error) {
      console.error('Error al actualizar la cantidad del insumo:', error);
      res.status(500).json({
        success: false,
        error: 'Ocurrió un problema al actualizar la cantidad del insumo',
      });
    }
};

const restarCantidadInsumo = async (req, res = response) => {
    try {
      const { id } = req.params;
      const { nuevaCantidad } = req.body;
      const insumo = await Insumo.findByPk(id);
  
      if (insumo) {
            insumo.cantidad -= nuevaCantidad;
            await insumo.save();
  
          res.json({
            success: true,
            message: 'Cantidad de insumo actualizada correctamente.',
          });
        
      } else {
        res.status(404).json({
          success: false,
          error: `No existe un insumo con el id ${id}`,
        });
      }
    } catch (error) {
      console.error('Error al actualizar la cantidad del insumo:', error);
      res.status(500).json({
        success: false,
        error: 'Ocurrió un problema al actualizar la cantidad del insumo',
      });
    }
};

const actualizarEstadoInsumo = async (req, res = response) => {
    try {
        const { id } = req.params;
        const insumo = await Insumo.findByPk(id);

        if (insumo) {
            insumo.estado = !insumo.estado;
            await insumo.save();
            res.json({
                success: true,
                message: `Estado del insumo actualizado correctamente. Nuevo estado: ${insumo.estado ? 'activo' : 'inactivo'}`,
            });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe un insumo con el id ${id}`,
            });
        }
    } catch (error) {
        console.error('Error al actualizar el estado del insumo:', error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un problema al actualizar el estado del insumo',
        });
    }
};
  
module.exports = {
    getInsumos,
    getInsumo,
    postInsumo,
    putInsumo,
    deleteInsumo,
    buscarInsumos,
    sumarCantidadInsumo,
    restarCantidadInsumo,
    actualizarEstadoInsumo
};
