const { Router } = require("express")
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const{ getProveedores, getProveedor, postProveedor, putProveedor, deleteProveedor, buscarProveedores } = require('../../controllers/proveedorController/proveedorController')

route.get('/proveedor', [
    validarJWT
],getProveedores)
route.get('/proveedor/:id', [
    validarJWT
],getProveedor)
route.post('/proveedor', [
    validarJWT
],postProveedor)
route.put('/proveedor/:id', [
    validarJWT
],putProveedor)
route.delete('/proveedor/buscar', [
    validarJWT
],buscarProveedores)


/*
route.get('/proveedor',getProveedores)
route.get('/proveedor/:id',getProveedor)
route.post('/proveedor',postProveedor)
route.put('/proveedor/:id',putProveedor)
route.get('/proveedor/buscar',buscarProveedores)
*/

module.exports = route

