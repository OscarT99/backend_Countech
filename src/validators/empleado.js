const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');
const Empleado = require('../models/empleadoModel/empleadoModel');

const createValidator = [
    check('tipoIdentidad', 'El tipo de identidad es requerido').not().isEmpty(),
    check('tipoIdentidad', 'El tipo de identidad no es válido').isIn(['Cédula de ciudadanía', 'Tarjeta de extranjería', 'Cédula de extranjería', 'Pasaporte']),
    check('numIdentidad').custom(async (value) => {
        const existingNum = await Empleado.findOne({ where: { numIdentidad: value} });
        if (existingNum) {
            throw new Error('Número de identidad en uso');
        }
    }),
    check('numIdentidad', 'El número de identidad es requerido').not().isEmpty(),
    check('numIdentidad', 'Solo se permiten valores numéricos').isNumeric(),
    check('numIdentidad', 'Logitud permitida min 6 : max 12').isLength({ min: 6, max: 12 }),
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('nombre', 'El nombre no es válido').matches(/^[A-Za-záéíóúüÜÁÉÍÓÚÑñ ]+$/),
    check('apellido', 'El apellido es requerido').not().isEmpty(),
    check('apellido', 'El apellido no es válido').matches(/^[A-Za-záéíóúüÜÁÉÍÓÚÑñ ]+$/),
    check('correo', 'El correo ya está en uso').custom(async (value) => {
        const existingCorreo = await Empleado.findOne({ where: { correo: value} });
        if (existingCorreo) {
            throw new Error('Correo en uso');
        }
    }),
    check('correo', 'El correo es requerido').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('telefono', 'El teléfono es requerido').not().isEmpty(),
    check('telefono', 'El teléfono no es válido').isNumeric(),
    check('telefono', 'Logitud permitida min 10 : max 10').isLength({ min: 10, max: 10 }),
    check('ciudad', 'La ciudad es requerida').not().isEmpty(),
    check('ciudad', 'La ciudad no es válida').matches(/^[A-Za-záéíóúüÜÁÉÍÓÚÑñ ]+$/),
    check('direccion', 'La dirección es requerida').not().isEmpty(),
    check('fechaIngreso', 'La fecha de ingreso es requerida').not().isEmpty(),
    check('fechaIngreso', 'La fecha de ingreso no es válida').isISO8601(),
    check('fechaIngreso', 'La fecha de ingreso no puede ser mayor a la fecha actual').custom((value) => {
        const todayDate = new Date().toISOString().slice(0, 10);
        if (value > todayDate) {
            throw new Error('La fecha de ingreso no puede ser mayor a la fecha actual');
        }
        return true;
    }),
    
    (req, res, next) => { 
        validateResult(req, res, next)
    }
];

module.exports = { createValidator };