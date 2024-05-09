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
const controllerDiretor = require('./controller/controller_diretor.js')
const controllerClassificacao = require('./controller/controller_classificacao.js')
const controllerGenero = require('./controller/controller_genero.js')
const controlleSexo = require('./controller/controller_sexo.js')
const controlleAtor = require('./controller/controller_ator.js')

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

app.get('v2/acmefilmes/filmeNome', cors(), async function(request,response,next){
    
    let nomeFilme = request.query.nome
    let filmeNome = await controllerFilmes.getBuscarNomeFilme(nomeFilme)

        response.json(filmeNome);
        response.status(filmeNome.status_code)
 
})

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

app.put('/v2/acmefilmes/filme/:id', cors(), bodyParserJSON, async function(request,response){
    let contentType = request.headers['content-type']
    let idFilme = request.params.id

    let dadosBody = request.body
    let resultadoNovosDadosFilme = await controllerFilmes.setAtualizarFilme(dadosBody,contentType, idFilme)

    response.status(resultadoNovosDadosFilme.status_code)
    response.json(resultadoNovosDadosFilme)
})

/********************************************CLASSIFICACAO******************************************************* */

app.post('/v2/acmefilmes/classificacao', cors(), bodyParserJSON,async function(request, response){
    let contentType = request.headers['content-type'];

    let dadosBody = request.body;

    let resultNovosDadosClassificacao= await controllerClassificacao.setInserirNovaClassificacao(dadosBody, contentType);

    response.status(resultNovosDadosClassificacao.status_code)
    response.json(resultNovosDadosClassificacao)
})

app.delete('/v2/acmefilmes/classificacao/:id', cors(), async function (request, response, next){
    let idClassificacao = request.params.id;

    let dadosClassificacao = await controllerClassificacao.setexcluirClassificacao(idClassificacao);

    response.json(dadosClassificacao);
})

app.put('/v2/acmefilmes/classificacao/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idClassificacao = request.params.id

    let dadosBody = request.body
    let resultadoNovosDadosClassificacao = await controllerClassificacao.setAtualizarClassificacao(dadosBody, contentType, idClassificacao)

    response.status(resultadoNovosDadosClassificacao.status_code)
    response.json(resultadoNovosDadosClassificacao)
   
})

app.get('/v2/acmefilmes/classificacao/:id', cors(), async function(request, response){

    let idClassificacao = request.params.id;
    let dadosClassificacao = await controllerClassificacao.getBuscarClassificacao(idClassificacao);

    response.status(dadosClassificacao.status_code);
    response.json(dadosClassificacao);

})

app.get('/v2/acmefilmes/classificacoes', cors(), async function(request, response){
    
    let dadosClassificacao = await controllerClassificacao.getListarClassificacao();
    
    if(dadosClassificacao){
        response.json(dadosClassificacao);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'});
        response.status(404);
    }
})

/******************************************GENERO********************************************************* */

app.post('/v2/acmefilmes/genero', cors(), bodyParserJSON,async function(request, response){
    let contentType = request.headers['content-type'];

    let dadosBody = request.body;

    let resultNovosDadosGenero = await controllerGenero.setInserirNovoGenero(dadosBody, contentType);
    response.status(resultNovosDadosGenero.status_code)
    response.json(resultNovosDadosGenero)
})

app.delete('/v2/acmefilmes/genero/:id', cors(), async function (request, response, next){
    let idGenero = request.params.id;

    let dadosGenero = await controllerGenero.setexcluirGenero(idGenero);

    response.json(dadosGenero);
})

app.put('/v2/acmefilmes/genero/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idGenero = request.params.id

    let dadosBody = request.body
    let resultadoNovosDadosGenero = await controllerGenero.setAtualizarGenero(dadosBody, contentType, idGenero)

    response.status(resultadoNovosDadosGenero.status_code)
    response.json(resultadoNovosDadosGenero)
   
})


app.get('/v2/acmefilmes/genero', cors(), async function(request, response){
    
    let dadosGenero = await controllerGenero.getListarGenero();
    
    if(dadosGenero){
        response.json(dadosGenero);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'});
        response.status(404);
    }
})

app.get ('/v2/acmefilmes/genero/:id', cors(), async function(request, response){

    let idGenero = request.params.id;
    let dadosGenero = await controllerGenero.getBuscarGenero(idGenero);

    response.status(dadosGenero.status_code);
    response.json(dadosGenero);

})



/******************************************SEXO******************************************************** */

app.get('/v2/acmefilmes/sexo', cors(), async function(request, response){

    let dadosSexo = await controlleSexo.getListarSexo();

    if(dadosSexo){
        response.json(dadosSexo);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'});
        response.status(404)
    }
    
})

app.get ('/v2/acmefilmes/sexo/:id', cors(), async function(request, response){
    let idsexo = request.params.id;
    let dadosSexo = await controlleSexo.getBuscarSexo(idsexo);

    response.status(dadosSexo.status_code);
    response.json(dadosSexo);
})


/******************************************ATOR******************************************************** */

app.post('/v2/acmefilmes/ator', cors(), bodyParserJSON,async function(request, response){
    let contentType = request.headers['content-type'];

    let dadosBody = request.body;

    let resultNovosDadosAtor = await controlleAtor.setInserirNovoAtor(dadosBody, contentType);
    response.status(resultNovosDadosAtor.status_code)
    response.json(resultNovosDadosAtor)

})

app.delete('/v2/acmefilmes/ator/:id', cors(), async function (request, response, next){
    let idAtor = request.params.id;

    let dadosAtor = await controlleAtor.setExcluirAtor(idAtor);

    response.json(dadosAtor);
})

app.put('/v2/acmefilmes/ator/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idAtor = request.params.id

    let dadosBody = request.body
    let resultadoNovosDadosAtor = await controlleAtor.setAtualizarAtor(dadosBody, contentType, idAtor)

    response.status(resultadoNovosDadosAtor.status_code)
    response.json(resultadoNovosDadosAtor)
   
})


app.get('/v2/acmefilmes/ator', cors(), async function(request, response){
    
    let dadosAtor = await controlleAtor.getListarAtor();
    
    if(dadosAtor){
        response.json(dadosAtor);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'});
        response.status(404);
    }
})

app.get ('/v2/acmefilmes/ator/:id', cors(), async function(request, response){

    let idAtor = request.params.id;
    let dadosAtor = await controlleAtor.getBuscarAtor(idAtor);

    response.status(dadosAtor.status_code);
    response.json(dadosAtor);

})

app.get('/v2/acmefilmes/ator/nomeAtor', cors(), async function(response,){

    let nomeAtor = request.query.nome
    let atorNome = await controlleAtor.getBuscarNomeAtor(nomeAtor)

    response.status(atorNome.status_code);
        response.json(atorNome);
       

})

/*******************************************DIRETOR************************************ */

app.post('/v2/acmefilmes/diretor', cors(), bodyParserJSON,async function(request, response){
    let contentType = request.headers['content-type'];

    let dadosBody = request.body;

    let resultNovosDadosDiretor = await controllerDiretor.setInserirNovoDiretor(dadosBody, contentType);
    response.status(resultNovosDadosDiretor.status_code)
    response.json(resultNovosDadosDiretor)

})

app.delete('/v2/acmefilmes/diretor/:id', cors(), async function (request, response, next){
    let idDiretor = request.params.id;

    let dadosDiretor = await controllerDiretor.setExcluirDiretor(idDiretor);

    response.json(dadosDiretor);
})

app.put('/v2/acmefilmes/diretor/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idDiretor = request.params.id

    let dadosBody = request.body
    let resultadoNovosDadosDiretor = await controllerDiretor.setAtualizarDiretor(dadosBody, contentType, idDiretor)

    response.status(resultadoNovosDadosDiretor.status_code)
    response.json(resultadoNovosDadosDiretor)
   
})


app.get('/v2/acmefilmes/diretor', cors(), async function(request, response){
    
    let dadosDiretor = await controllerDiretor.getListarDiretor();
    
    if(dadosDiretor){
        response.json(dadosDiretor);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'});
        response.status(404);
    }
})

app.get ('/v2/acmefilmes/diretor/:id', cors(), async function(request, response){

    let idDiretor = request.params.id;
    let dadosDiretor = await controllerDiretor.getBuscarDiretor(idDiretor);

    response.status(dadosDiretor.status_code);
    response.json(dadosDiretor);

})

app.get ('/v2/acmefilmes/diretor/diretorNome', cors(), async function(request,response){

    let nomeDiretor = request.query.nome
    let diretorNome = await controllerDiretor.getBuscarNomeDiretor(nomeDiretor)

        response.json(diretorNome);
        response.status(diretorNome.status_code)

})
/************************************************************************************************************************ */

//Executa a API e faz ela ficar aguardando requisições
app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições');
})
