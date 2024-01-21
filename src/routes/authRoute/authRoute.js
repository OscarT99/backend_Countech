const { Router } = require("express");
//const { check } = require("express-validator");


const route = Router()

const{login} = require('../../controllers/authController/authController')

route.post('/auth/login',login)

module.exports = route

