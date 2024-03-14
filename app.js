/****************************************
 * autor: Pietra Paula Volpato
 * data: 25/01/2024
 * versão: 1.0
 * objetivo:
 ****************************************/

/***
 *  Para realizar a integração com banco de dados devemos utilizar uma das seguintes bibliotecas:
 *      - SEQUELIZE    - é a biblioteca mais antiga
 *      - PRISMA ORM   - é a biblioteca mais atual (utilizaremos no projeto)
 *      - FASTFY ORM   - é a biblioteca mais atual
 * 
 *   Para a instalação do PRISMA ORM:
 *      npm install prisma --save              (é responsavel pela conexão do banco de dados)
 *      npm install @prisma/client --save      (é responsavel por executar scripts SQL no banco de dados)
 * 
 *   Para iniciar o prisma no projeto devemos:
 *      npx prisma init
 * 
 *   ----Adicionar as pastas do prisma, CASO TENHA MUDADO DE COMPUTADOR
 *      npm i
 * 
 *   ----Reconecta a conexão do banco com o prisma, CASO TENHA MUDADO DE COMPUTADOR
 *     npx prisma generate
 * 
 *   -POSTMAN
 *   adicionar http://localhost:8080/ ou http://localhost:3030/ (caso o 8080 não funcione) sempre antes das requicições exem:http://localhost:8080/v2/acmefilmes/filme/2
 ***/



    const express = require('express')
    const cors = require ('cors')
    const bodyParser = require('body-parser')
    const {request} = require('http')
    const {access} = require('fs')
  
  
    const app = express()

    app.use((request, response, next) => {
    
    response.header('Access-Control-Allow-Origin', "*") 
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()
})

//import dos arquivos da controller do projeto
const controllerFilmes = require('./controller/controller_filme.js')

//criando um objeto para controlar a chegada dos dados da requisição em formato JSON 
const bodyParserJSON = bodyParser.json();

//EndPoints: Versão 1.0 que retorna os dados de um arquivo de filmes
//Período de utilização 01/2024 até 02/2024
app.get('v1/acmefilmes/filmes', cors(), async function(request, response, next){

    let controllerDados = require('./controller/funcao.js')
    
    let filmes = await controllerDados.getFilmes()

    if (filmes){
        response.json(filmes)
        response.status(200)
    } else {
        response.status(400)
    }
})

//endpoint versão 2.0 - retorna dados de filme do banco de dados
app.get('/v2/acmeFilmes/filmes', cors(), async function(request, response){

    
    let dadosFilmes = await controllerFilmes.getListarFilmes();

    if(dadosFilmes){
        response.json(dadosFilmes);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'});
        response.status(404);
    }
});

app.get('/v2/acmeFilmes/filmes/filtro', cors(), async function(request,response){

    
    let dadosFilmes = await controllerFilmes.getBuscarNomeFilme();

    if(dadosFilmes){
        response.json(dadosFilmes);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'});
        response.status(404);
    }
});

//End Point: Retorna daados filtrando pelo ID
app.get('/v2/acmefilmes/filme/:id', cors(), async function(request, response){

    let idFilme = request.params.id;

    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme);

    response.status(dadosFilme.status_code);
    response.json(dadosFilme);

})

app.delete('/v2/acmefilmes/filme/:id', cors(), async function (request, response,  next){

     let idFilme = request.params.id;

     let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme);

     response.json(dadosFilme);
})

app.post('/v2/acmefilmes/filme', cors(), bodyParserJSON, async function(request, response){

    //recebe o content-type da requicição
    let contentType = request.headers['content-type'];

    //recebe todos oss dados encaminhados na requicisão body
    let dadosBody = request.body;

    //encaminha os dados para o controller enviar para o DAO
    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType);
    
    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)

})

//Executa a API e faz ela ficar aguardando requisições
app.listen(3030, function(){
    console.log('API funcionando e aguardando requisições');
})