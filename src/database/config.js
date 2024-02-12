const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect:'mysql',
    host:'localhost',
    username:'root',
    password:'OscarT.99',
    database:'countech'
})

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