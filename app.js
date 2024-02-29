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
 ***/



    const express = require('express')
    const cors = require ('cors')
    const {request} = require('http')
    const {access} = require('fs')
  

    const app = express()

    app.use((request, response, next) => {
    
    response.header('Access-Control-Allow-Origin', "*") 
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())
    next()
})

const controllerFilmes = require('./controller/controller_filme.js')

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

//Executa a API e faz ela ficar aguardando requisições
app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições');
})