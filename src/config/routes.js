const Router = require('koa-router');
const express = require('express');

module.exports = function(app){
    
    const openApi = express.Router();
    app.use('/oapi', openApi);

    const ClienteSimulation = require('../api/clienteSimulation/clienteSimulationService');
    openApi.post('/cliente-simulation', ClienteSimulation.addClienteSimulation);
    openApi.get('/cliente-simulation', ClienteSimulation.getClientes);
    openApi.delete('/cliente-simulation/:id', ClienteSimulation.removeCliente);
    // ClienteSimulation.register(openApi, '/cliente-simulation');
}