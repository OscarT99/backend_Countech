const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');

const AsignarProcesoEmpleado = require('../produccionModel/asignarProcesoEmpleado');
// const PedidoProceso = require('../produccionModel/pedidoProceso');
// const AvanceProcesoEmpleado = require('../produccionModel/avanceProcesoEmpleado');

const Empleado = sequelize.define("empleados", {

  // tipoIdentidad: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   isIn: {
  //     args: [[
  //     'Cédula de ciudadanía', 
  //     'Tarjeta de extranjería', 
  //     'Cédula de extranjería', 
  //     'Pasaporte'
  //     ]],
  //     msg: 'Tipo de identificación no válido.',
  //   }
  // },

  numIdentidad: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
    validate: {
      notEmpty:{
        args: true,
        msg: 'El número de identidad no puede estar vacío.'
      },
      notNull: {
        args: true,
        msg: 'El número de identidad no puede ser nulo.'
      },
      isNumeric: {
        args: true,
        msg: 'Solo se permiten números.'
      },

      len: {
        args: [6, 12],
        msg: 'Cantidad de caracteres no válida. [>= 6 && <= 12]'
      },
      
    }
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty:{
        args: true,
        msg: 'El nombre no puede estar vacío.'
      },
      notNull: {
        msg: 'El nombre no puede ser nulo.',
      },
      is:{
        args: /^[A-Za-záéíóúüÜÁÉÍÓÚÑñ ]+$/,
        msg: 'Solo se permiten letras.',      
      }
    }
  },

  // apellido: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   validate: {
  //     notEmpty:{
  //       args: true,
  //       msg: 'El apellido no puede estar vacío.'
  //     },
  //     notNull: {
  //       args: true,
  //       msg: 'El apellido no puede ser nulo.',
  //     },
  //     is:{
  //       args: /^[A-Za-záéíóúüÜÁÉÍÓÚÑñ ]+$/,
  //       msg: 'Solo se permiten letras.',      
  //     }
  //   }
  // },

  // correo: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   unique: true,
  //   validate: {
  //     notEmpty:{
  //       args: true,
  //       msg: 'El Correo no puede estar vacío.'
  //     },
  //     isEmail: {
  //       args: true,
  //       msg: 'El correo electrónico no es válido.',
  //     },
  //     notNull: {
  //       args: true,
  //       msg: 'El correo electrónico no puede ser nulo.',
  //     }
  //   }
  // },

  // telefono: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   validate:{
  //     notEmpty:{
  //       args: true,
  //       msg: 'El telefono no puede estar vacío.'
  //     },
  //     notNull: {
  //       args: true,
  //       msg: 'El número de teléfono no puede ser nulo.',
  //     },
  //     isNumeric: {
  //       args: true,
  //       msg: 'El número de teléfono debe ser numérico.',
  //     },
  //     len: {
  //       args: [10],
  //       msg: 'El número de teléfono debe tener 10 dígitos.'
  //     },
  //   }
  // },

  // ciudad: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   validate: {
  //     notEmpty:{
  //       args: true,
  //       msg: 'La ciudad no puede estar vacío.'
  //     },
  //     notNull: {
  //       args: true,
  //       msg: 'La ciudad no puede ser nula.',
  //     },
  //     is:{
  //       args: /^[A-Za-záéíóúüÜÁÉÍÓÚÑñ ]+$/,
  //       msg: 'Solo se permiten letras.',      
  //     }
  //   }
  // },

  // direccion: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   validate: {
  //     notEmpty:{
  //       args: true,
  //       msg: 'La dirección no puede estar vacío.'
  //     },
  //     notNull: {
  //       args: true,
  //       msg: 'La dirección no puede ser nula.',
  //     }
  //   }
  // },

  // fechaIngreso: {
  //   type: DataTypes.DATEONLY,
  //   allowNull: false,
  //   validate: {
  //     notEmpty:{
  //       args: true,
  //       msg: 'La fecha no puede estar vacío.'
  //     },
  //     notNull: {
  //       args: true,
  //       msg: 'La fecha de ingreso no puede ser nula.',
  //     }
  //   }
  // },

  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    // validate: {
    //   notNull: {
    //     args: true,
    //     msg: 'El estado no puede ser nulo.',
    //   }
    // }
  },

  estadoOcupado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    // validate: {
    //   notNull: {
    //     args: true,
    //     msg: 'El estado de ocupación no puede ser nulo.',
    //   }
    // }
  },

});

// Empleado.sync({ alter: true }).then(() => {

//   PedidoProceso.sync({ alter:true }).then(() => {

//     AsignarProcesoEmpleado.sync({ alter:true }).then(() => {
//       // console.log(`Table and model have been synced successfully`);
      
//       AvanceProcesoEmpleado.sync({ force:true }).then(() => {
//         console.log(`Table and model have been synced successfully`);
      
//       }).catch((err) => {
//         console.log("Error syncing the table and model", err);
//       });

//     }).catch((err) => {
//       console.log("Error syncing the table and model", err);
//     });
//     // console.log(`Table and model have been synced successfully`);
//   }).catch((err) => {
//     console.log("Error syncing the table and model", err);
//   });
  
//   // console.log("Table and model have been synced successfully");
// }).catch((err) => {
//   console.log("Error syncing the table and model", err);
// });

Empleado.hasMany(AsignarProcesoEmpleado, { foreignKey: 'empleadoId' });
// PedidoProceso.hasMany(AsignarProcesoEmpleado);
// AsignarProcesoEmpleado.hasMany(AvanceProcesoEmpleado);

module.exports = Empleado;