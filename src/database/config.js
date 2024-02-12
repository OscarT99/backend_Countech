const Sequelize = require('sequelize');

const sequelize = new Sequelize('db_project_v1', 'root', 'password', {
    host: 'localhost',
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