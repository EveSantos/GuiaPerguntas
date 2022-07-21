const express = require("express");
const app = express();

// Definindo para o Express que usará o ejs como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", function(req,res){
    res.render("index.ejs");
});

app.get("/perguntar", function(req,res){
    res.render("perguntar");
});

app.listen(8080, ()=>{
    console.log("Aplicação rodando!");
});