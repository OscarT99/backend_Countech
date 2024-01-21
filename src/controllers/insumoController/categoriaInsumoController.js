const { response } = require('express');
const CategoriaInsumo = require('../../models/insumoModel/categoriaInsumoModel');

const getCategoriasInsumo = async (req, res = response) => {
    try {
        const categoriasInsumo = await CategoriaInsumo.findAll();
        res.json({ categoriasInsumo });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener las categorías de insumo',
        });
    }
}

const getCategoriaInsumo = async (req, res = response) => {
    try {
        const { id } = req.params;
        const categoria = await CategoriaInsumo.findByPk(id);

        if (categoria) {
            res.json(categoria);
        } else {
            res.status(404).json({
                success: false,
                error: `No existe una categoría de insumo con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener la categoría de insumo',
        });
    }
}

const postCategoriaInsumo = async (req, res = response) => {
    try {
        const { body } = req;

        if (!body.nombre) {
            return res.status(400).json({ success: false, error: 'El campo nombre es obligatorio.' });
        } else if (!/^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+$/.test(body.nombre)) {
            return res.status(400).json({ success: false, error: 'Nombre no válido. Solo se permiten letras, tildes y espacios.' });
        }
        
        const existingCategoriaInsumo = await CategoriaInsumo.findOne({ where: { nombre: body.nombre } });
        if (existingCategoriaInsumo) {
            return res.status(400).json({ success: false, error: 'El nombre de la categoria de insumo ya existe.' });
        }

        if (body.cantidad !== undefined && !/^\d+$/.test(body.cantidad)) {
            return res.status(400).json({ success: false, error: 'Cantidad no válida. Solo se permiten números.' });
        }
        
        await CategoriaInsumo.create(body);
        res.status(201).json({
            success: true,
            message: 'La categoría de insumo fue agregada con éxito.',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al agregar la categoría de insumo',
        });
    }
}

const putCategoriaInsumo = async (req, res = response) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const categoria = await CategoriaInsumo.findByPk(id);

        if (categoria) {
            if (!body.nombre) {
                return res.status(400).json({ success: false, error: 'El campo nombre es obligatorio.' });
            } else if (!/^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+$/.test(body.nombre)) {
                return res.status(400).json({ success: false, error: 'Nombre no válido. Solo se permiten letras, tildes y espacios.' });
            }

            if (body.cantidad !== undefined && !/^\d+$/.test(body.cantidad)) {
                return res.status(400).json({ success: false, error: 'Cantidad no válida. Solo se permiten números.' });
            }
        
            await categoria.update(body);
            res.json({
                success: true,
                message: 'La categoría de insumo fue actualizada correctamente.',
            });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe una categoría de insumo con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un problema al actualizar la categoría de insumo',
        });
    }
}

const deleteCategoriaInsumo = async (req, res = response) => {
    try {
        const { id } = req.params;
        const categoria = await CategoriaInsumo.findByPk(id);

        if (categoria) {
            await categoria.destroy();
            res.json({
                success: true,
                message: 'La categoría de insumo fue eliminada con éxito.',
            });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe una categoría de insumo con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un problema al eliminar la categoría de insumo',
        });
    }
}

const buscarCategoriasInsumo = async (req, res = response) => {
    try {
        const terminoBusqueda = req.query.termino;
        const CategoriasEncontradas = await CategoriaInsumo.buscarCategoriasInsumo(terminoBusqueda);
        res.json(CategoriasEncontradas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const actualizarEstadoCategoria = async (req, res = response) => {
    try {
        const { id } = req.params;
        const categoria = await CategoriaInsumo.findByPk(id);

        if (categoria) {
            categoria.estado = !categoria.estado;
            await categoria.save();
            res.json({
                success: true,
                message: `Estado de la categoria actualizado correctamente. Nuevo estado: ${categoria.estado ? 'activo' : 'inactivo'}`,
            });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe una categoria con el id ${id}`,
            });
        }
    } catch (error) {
        console.error('Error al actualizar el estado de la categoria:', error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un problema al actualizar el estado de la categoria',
        });
    }
};

module.exports = {
    getCategoriasInsumo,
    getCategoriaInsumo,
    postCategoriaInsumo,
    putCategoriaInsumo,
    deleteCategoriaInsumo,
    buscarCategoriasInsumo,
    actualizarEstadoCategoria
};
