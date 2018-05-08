const restful = require('node-restful');
const mongoose = restful.mongoose;

const clienteSimulationSchema = new mongoose.Schema({
    nome: { type: String },
    email: {type: String },
    telefone: { type: String },
    cep: {type: String }
});

module.exports = restful.model('ClienteSimulation', clienteSimulationSchema);