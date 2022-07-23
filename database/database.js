// Importando sequilize
const Sequelize = require("sequelize"); 
require("dotenv").config();
const {Client} = require("pg");
let connection;

if(process.env.ENVIROMENT = 'develop'){
    // Criando conexão com sequelize
    connection = new Sequelize('guiaperguntas', 'root', 'Borys@02',{
        // onde esta rodando
        host: 'localhost',
        // tipo de banco
        dialect: 'mysql'
    });   
}
else{
    console.log(process.env);
    connection = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}

module.exports = connection;