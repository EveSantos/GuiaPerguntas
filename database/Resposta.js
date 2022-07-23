const Sequelize = require("sequelize");
const connection = require("./database");

// Passando o nome da tabela (respoostas)
const Resposta = connection.Sequelize.define("/respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// Sincroniza com o banco de dados
Resposta.sync({force: false}).then(() => {});
// Poder utilizar o model fora do arquivo
module.exports = Resposta;