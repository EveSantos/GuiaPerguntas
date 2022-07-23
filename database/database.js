// Importando sequilize
const Sequelize = require("sequelize"); 

// Criando conexão com sequelize
const connection = new Sequelize('guiaperguntas', 'root', 'Borys@02',{
    // onde esta rodando
    host: 'localhost',
    // tipo de banco
    dialect: 'mysql'
});

module.exports = connection;