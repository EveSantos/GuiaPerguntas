const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// Importa objeto de conexão
const connection = require("./database/database");

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
    res.render("index.ejs");
});

app.get("/perguntar", function(req,res){
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("Form recebido! titulo " + titulo + " " + "descricao " + descricao);
});

app.listen(8080, ()=>{
    console.log("Aplicação rodando!");
});