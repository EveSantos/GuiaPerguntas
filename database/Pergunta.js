const Sequelize = require("sequelize");
const connection = require("./database");
require("dotenv").config();

// Definição do model
const Pergunta = connection.Sequelize.define('pergunta', {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }

});

// Caso a tabela ja exista, não será criada outra
Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta;