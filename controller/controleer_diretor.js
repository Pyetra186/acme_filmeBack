/************************************************************************************** 
 * Objetivo: arquivo responsável pelas validações e consistencias de dados do diretor *
 * Data: 18/04/2024                                                                   *
 * Autor: Pietra Volpato                                                              *
 * Versão: 1.0                                                                        *
 *************************************************************************************/

const message = require('../modulo/config.js');

const diretorDAO = require('../model/DAO/diretor.js');

const setInserirNovoDiretor = async function(dadosDiretor, contentType){


}

const setAtualizarDiretor = async function(dadosDiretor, contentType, id){

}

const setExcluirDiretor = async function(id){

}

const getListarDiretores = async function(){
     
    let diretorJSON = {};

    let dadosDiretor = await diretorDAO.selectAllFilmes();

    if(dadosDiretor){
        diretorJSON.diretores = dadosDiretor;
        diretorJSON.quantidade = dadosDiretor.length;
        diretorJSON.status_code = 200;

        return diretorJSON
    }else{
        return false;
    }
}

const getBuscarDiretor = async function(id){

}

const getBuscarNomeDiretor = async function(nome){

}

module.exports = {
    setInserirNovoDiretor,
    setAtualizarDiretor,
    setExcluirDiretor,
    getListarDiretores,
    getBuscarNomeDiretor,
    getBuscarDiretor
}