const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const configureRoutes = require('../routes/routesContructor'); 


class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT || 3000
        this.path = '/api'
        this.middlewares()  
        this.routes()  
    }

    async synchronizeModels() {
        await Cliente.sync();
        await PedidoModel.sync();
        await ReferenciaPedidoModel.sync();
      }
      
    middlewares(){
        this.app.use(express.static(__dirname + "/public"))
        this.app.use(cors())
        this.app.use(bodyParser.json())
    }

    routes(){
        configureRoutes(this.app, this.path);
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Server is running on port ${this.port}`)
        })
    }

}

module.exports = Server