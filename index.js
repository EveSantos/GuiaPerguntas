const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// Importa objeto de conexão
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

// DATABAE
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com sucesso");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });


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

app.listen(8080, ()=>{
    console.log("Aplicação rodando!");
});