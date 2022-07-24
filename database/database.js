// Importando sequilize
const Sequelize = require("sequelize");
require("dotenv").config();
let connection;
if(process.env.ENVIROMENT == 'develop'){

    // Criando conexão com sequelize
    connection = new Sequelize('guiaperguntas', 'root', 'Borys@02',{
        // onde esta rodando
        host: 'localhost',
        
        // tipo de banco
        dialect: 'mysql'
    });
}
else{

    sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      }
    );
}

module.exports = connection;