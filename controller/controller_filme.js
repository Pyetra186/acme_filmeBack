/************************************************************************************ 
 * Objetivo: arquivo responsável pelas validações e consistencias de dados de filme *
 * Data: 01/02/2024                                                                 *
 * Autor: Pietra Volpato                                                            *
 * Versão: 1.0                                                                      *
 *                                                                                  *
 ***********************************************************************************/

const message = require('../modulo/config.js');

//Import do arquivo responsavel pela interação com banco de dados (model)
const filmesDAO = require('../model/DAO/filme.js');

//Função para inserir novo filme
const setInserirNovoFilme = async function(dadosFilme, contentType){

    try{
        if( String(contentType).toLowerCase() == 'application/json' ){


            let novoFilmeJSON = {}
    
        //validação de campos obrigatórios ou com digitação invalida
        if( dadosFilme.nome == ''                      || dadosFilme.nome == undefined              || dadosFilme.nome == null            || dadosFilme.nome.length > 80               || 
            dadosFilme.sinopse == ''                   || dadosFilme.sinopse == undefined           || dadosFilme.sinopse == null         || dadosFilme.sinopse.length > 65000         ||
            dadosFilme.duracao == ''                   || dadosFilme.duracao == undefined           || dadosFilme.duracao == null         || dadosFilme.duracao.length > 8             ||
            dadosFilme.data_lancamento == ''           || dadosFilme.data_lancamento == undefined   || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10   ||
            dadosFilme.foto_capa == ''                 || dadosFilme.foto_capa == undefined         || dadosFilme.foto_capa == null       || dadosFilme.foto_capa.length > 1000        ||
            dadosFilme.valor_unitario.length > 6         
        ){
    
            return message.ERROR_REQUIRED_FIELDS;//400
    
        
        }else{
    
            let validateStatus = false
    
        //Validação da data de relançamento já que ela não é obrigatória no BANCO DE DADOS
            if(  dadosFilme.data_relancamento != null &&
                 dadosFilme.data_relancamento != '' &&
                 dadosFilme.data_relancamento != undefined ){
    
        //Valiação pra verificar se a data esta com a quantidade de digitos corretos
    
                   if(dadosFilme.data_relancamento.length != 10){
                   return message.ERROR_REQUIRED_FIELDS //400
                   }else{ 
                   validateStatus = true
                   }
                }else{
                  validateStatus = true
                }
    
           // Validação para verificar uma variavel boolena é verdadeiraa
            if(validateStatus = true){
    
            //encaminha os dados do filme para o DAO inserir no BD
            let novoFilme = await filmesDAO.insertFilme(dadosFilme);
    
    
           //Validação para verificar o DAO inseriu os dados do banco de dados
            if(novoFilme){
    
                let ultimoId = await filmesDAO.InsertById()
                dadosFilme.id = Number(ultimoId[0].id)
    
           //Cria o JSON de retorno dos dados (201)
                novoFilmeJSON.filme         = dadosFilme;
                novoFilmeJSON.status        = message.SUCCESS_CREATED_ITEM.status;
                novoFilmeJSON.status_code   = message.SUCCESS_CREATED_ITEM.status_code;
                novoFilmeJSON.message       = message.SUCCESS_CREATED_ITEM.message;
    
    
                return novoFilmeJSON;//201
            }else{
                return message.ERROR_INTERNAL_SERVER_DB; //500
            }
          }
        }
      }else{
           return message.ERROR_CONTENT_TYPE; //415
      }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER; //500 - erro na controller 
    }
    
}
//validação de content-type (apenas application/json)
    

// Função para atualizar um filme
const setAtualizarFilme = async function (dadosFilme, contentType, id) {
    let idFilme = id

    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let filmeId = await filmeDAO.selectByIdFilme(idFilme);
        let verificarId = filmeId.length
        if (verificarId > 0) {
        
            try {


                if (String(contentType).toLowerCase() == 'application/json') {



                    let updateFilmeJson = {}

                    if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
                        dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 65000 ||
                        dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
                        dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                        dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa.length > 200 ||
                        dadosFilme.valor_unitario.length > 6

                    ) {

                        return message.ERROR_REQUIRED_FIELDS //400


                    } else {

                        let validateStatus = false
                        // VAlidação da data de relançamento, já que ela não obrigatória no BD
                        if (dadosFilme.data_relancamento != null &&
                            dadosFilme.data_relancamento != '' &&
                            dadosFilme.data_relancamento != undefined

                        ) {

                            //validação para verificar se a data esta com a qntidade de digitos corretos

                            if (dadosFilme.data_relancamento.length != 10) {

                                return message.ERROR_REQUIRED_FIELDS //400

                            } else {

                                validateStatus = true

                            }
                        } else {
                            validateStatus = true
                        }
                        //Validação para verificar se a variavel booleana é verdadeira 
                        if (validateStatus) {


                            //Encaminha os dados do Filme parao DAO inserir no BD 
                            let filmeAtualizado = await filmesDAO.updateFilme(dadosFilme,id)

                            //Validação para verificar se o DAO inseriu os dados no BD
                            if (filmeAtualizado) {

                                //Cria o JSON de retorno dos dados (201)
                                updateFilmeJson.filme = dadosFilme
                                updateFilmeJson.status = message.SUCCESS_UPDATE.status
                                updateFilmeJson.status_code = message.SUCCESS_UPDATE.status_code
                                updateFilmeJson.message = message.SUCCESS_UPDATE.message

                                return updateFilmeJson

                            } else {

                                return message.ERROR_INTERNAL_SERVER_DB//500

                            }
                        }
                    }
                } else {
                    return message.ERROR_CONTENT_TYPE//415
                }
            } catch (error) {
                return message.ERROR_INTERNAL_SERVER //500 erro na controller
            }
       
        } else {
            return message.ERROR_NOT_FOUD
        }
    }
    }

//Função para deletar um filme
const setExcluirFilme =  async function(id){
    let idFilme = id;


    if(idFilme == '' || idFilme == undefined || isNaN(idFilme) || idFilme == null) {
        return message.ERROR_INVALID_ID;//400
    }else{
        let dadosFilme = await filmesDAO.deleteFilme(idFilme);
        
        if(dadosFilme){
            return message.SUCCESS_DELETE//200


            }else{
                return message.ERROR_NOT_FOUD;//404

            }

        }
    }

//Função para listar filmes
const getListarFilmes = async function(){

    //Cria um objeto JSON
    let filmesJSON = {};

    //chama a função do DAO que retorna os filmes do banco de dados
    let dadosFilmes = await filmesDAO.selectAllFilmes();

    //validação para verificar se o DAO retornou os dados
    if(dadosFilmes){
        //cria o JSON para retornar para o app
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200;

        return filmesJSON 
    }else{
        return false;
    }
}

//Função para buscar filme
const getBuscarFilme = async function(id){

    let idFilme = id;
    let filmeJSON = {};

    if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID;//400
    }else{
        let dadosFilme = await filmesDAO.selectByIdFilme(idFilme);


        if(dadosFilme){
            if(dadosFilme.length > 0){
                filmeJSON.filme = dadosFilme;
                filmeJSON.status_code = 200;

                return filmeJSON;
            }else{
                return message.ERROR_NOT_FOUD;//404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB;//500
        }
    }
}

const getBuscarNomeFilme = async function(nome){

    let nomeFilme = nome;
    let filmesJSON = {};

    if(nomeFilme == '' || nomeFilme == undefined || isNaN(nomeFilme)){
        return message.ERROR_INVALID_ID;//400
    }else{
        let dadosFilmes = await filmesDAO.selectByNomeFilme();
 
    }

    if(dadosFilmes){
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200;

        return filmesJSON
    }else{
        return false;
    }
    
}


module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getBuscarFilme,
    getListarFilmes,
    getBuscarNomeFilme
}