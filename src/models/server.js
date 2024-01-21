const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {sequelize} = require('../database/config')

const configureRoutes = require('../routes/routesContructor'); 


class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.path = '/api'
        this.middlewares()  
        this.routes()
        
    }

    async synchronizeModels() {
        await Cliente.sync();
        await PedidoModel.sync();
        await ReferenciaPedidoModel.sync();
      }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Escuchando el puerto ${this.port}`)
        })
    }

    middlewares(){
        this.app.use(express.static(__dirname + "/public"))
        this.app.use(cors())
        this.app.use(bodyParser.json())
    }

    routes(){
        configureRoutes(this.app, this.path);
    }
}

module.exports = Server