const Sequelize = require('sequelize');

// const sequelize = new Sequelize('db_project_v1', 'root', 'admin', {
//     host: 'localhost',
//     dialect: 'mysql'
//   });

  const sequelize = new Sequelize('badpemy6pvkpispmud7x', 'ufp3tu02c71vgclc', 'rHh2aYVRSyTPcYsPVCrK', {
    host: 'badpemy6pvkpispmud7x-mysql.services.clever-cloud.com',
    dialect: 'mysql'
  });

// const sequelize = new Sequelize('sqlite::memory:')

 sequelize
    .authenticate()
    .then(() =>{
        console.log('Connection has been established successfully.')
    })
    .catch((err) =>{
        console.error('Unable to connect to the database:',err)
    })

sequelize.sync({ alter: true })
    .then(() =>{
        console.log('All models were synchronized successfully.')
    })
    .catch((err) =>{
        console.error('Error synchronizing the models:',err)
    })


module.exports = {
    sequelize,
}