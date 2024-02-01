const clienteRoutes = require('./clienteRoute/clienteRoute');
const proveedorRoutes = require('./proveedorRoute/proveedorRoute')
const categoriaInsumoRoute = require('../routes/insumoRoute/insumoCategoriaRoute') 
const insumoRoute = require('./insumoRoute/insumoRoute')
const usuarioRoute = require('./usuarioRoute/usuarioRoute')
const ventaRoute = require('../routes/ventaRoute/ventaRoute')
const abonoVentaRoute = require('./abonoVentaRoute/abonoVentaRoute')
const abonoCompraRoute = require('./abonoCompraRoute/abonoCompraRoute')
const empleadoRoutes = require('./empleadoRoute/empleadoRoutes');
const asignarProcesoEmpleadoRoutes = require('./produccionRoute/asignarProcesoEmpleadoRoutes');
const avanceProcesoEmpleadoRoutes = require('./produccionRoute/avanceProcesoEmpleadoRoutes');
const pedidoProdCompleto = require('./produccionRoute/pedidoProduccionRoutes');
// const pedidoProceso = require('./produccionRoute/pedidoProcesoRoutes');
const pedidoCompletoRoute = require('./pedidoRoutes/pedidoCompletoRoute')
const compraCompletoRoute = require('./compraRoute/compraCompletoRoute')
const authRoute = require('./authRoute/authRoute');
const salidaInsumoRoute = require('./salidaInsumoRoute/salidaInsumoRoute')

function configureRoutes(app, path) {
    app.use(path, clienteRoutes);
    app.use(path, proveedorRoutes);
    app.use(path, categoriaInsumoRoute),
    app.use(path, insumoRoute),
    app.use(path, usuarioRoute);
    app.use(path, ventaRoute);
    app.use(path, abonoVentaRoute);
    app.use(path, abonoCompraRoute);
    app.use(path, empleadoRoutes);
    app.use(path, asignarProcesoEmpleadoRoutes);
    app.use(path, avanceProcesoEmpleadoRoutes);
    app.use(path, pedidoProdCompleto);
    // app.use(path, pedidoProceso);
    app.use(path, pedidoCompletoRoute);
    app.use(path, compraCompletoRoute);
    app.use(path, authRoute);
    app.use(path, salidaInsumoRoute);
    }

module.exports = configureRoutes;
