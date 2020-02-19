const express = require('express');
const server  = express();
const nunjucks = require('nunjucks');

//mostrar todos os arquivos estáticos
server.use(express.static("public"));

//Habilitar o body da request
server.use(express.urlencoded({extended: true}));

//Configura conexao

const Pool = require('pg').Pool; //Pool mantem a conexao com o banco de dados ativa
const db = new Pool({
    user: "postgres",
    password: "pgdb",
    host: "localhost",
    port: 5432,
    database: "doe"
});

//Configurando a template engine
nunjucks.configure("./", {
    express: server,
    noCache: true
});

server.get("/", function(req, res){
    const query = "SELECT * FROM donors;"
    db.query(query, function(err, result){
        if(err){
            return res.send("Erro ao buscar dados do Banco");        
        }
        const donors = result.rows;
        return res.render("index.html", {donors});
    })
});

server.post("/", function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;    
    
    const query = `INSERT INTO donors ("name", "email", "blood") VALUES ($1, $2, $3)`;
    const values = [name, email, blood];

    if(name == "" || email == "" || blood == ""){
        return res.send("Todos os campos são obrigatórios")
    }

    db.query(query, values, function(err){
        if(err) return res.send("Erro no Banco de Dados");
        
        return res.redirect("/");
    });
})

//Servidor ficara ouvindo a porta 3000
server.listen(3000, function(){
    console.log(">>>>>> Servidor Iniciado <<<<<<<<<");
});
