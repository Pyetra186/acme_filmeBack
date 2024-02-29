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
const setInserirNovoFilme = async function(){

}

// Função para atualizar um filme
const setAtializarFilme = async function(){

}

//Função para deletar um filme
const setExcluirFilme =  async function(){

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
    setAtializarFilme,
    setExcluirFilme,
    getBuscarFilme,
    getListarFilmes,
    getBuscarNomeFilme
}