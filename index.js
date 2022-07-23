const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
// Importa objeto de conexão
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta")

if(process.env.ENVIROMENT = 'develop'){

    // DATABASE
    connection
        .authenticate()
        .then(()=>{
            console.log("Conexão feita com sucesso");
        })
        .catch((msgErro) => {
            console.log(msgErro);
        });
}
else{
    connection.connect((err)=>{
        if(err){
            throw err;
        }
        console.log("Conexao feita com sucesso!")
    });
}


// Definindo para o Express que usará o ejs como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas
app.get("/", function(req,res){
    // Equivalente a Select * from
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
        res.render("index.ejs",{
            perguntas:perguntas
        });
    });    
});

app.get("/perguntar", function(req,res){
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    // Pra salvar um dado dentro de uma table precisa pegar o model 
    // dessa tabela e atraves dele chamar o metodo create
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta achada

            Resposta.findAll({
                where:{perguntaid: pergunta.id}, order: [['id','DESC']]
            }).then(respostas => {
                // Exibir a pagina pergunta e passar para o render
                // a pergunta que está sendo exibida
                // Manda a pergunta encontrada para a view
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });                
            });
        }
        else{ // Não encontrada
            res.redirect("/");
        }
    });
});

app.post("/responder", (req,res) => {
    var corpo = req.body.corpo;
    // nome do input para pegar o id da pergunta
    var perguntaId = req.body.pergunta

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
       res.redirect("/pergunta/"+perguntaId); 
    });
});

app.listen(8080, ()=>{
    console.log("Aplicação rodando!");
});