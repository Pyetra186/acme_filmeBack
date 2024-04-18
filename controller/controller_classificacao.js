/**********************************************************************************************
 * Objetivo: arquivo responsável pelas validações e consistencias de dados de classificaÇões  *
 * Data: 18/04/2024                                                                           *
 * Autor: Pietra Volpato                                                                      *
 * Versão: 1.0                                                                                *
 *                                                                                            *
 *********************************************************************************************/
const message = require('../modulo/config.js');

const classificacaoDAO = require('../model/DAO/classificacao.js');

const setInserirNovaClassificacao = async function(dadosClassificacao, contentType){
    try{
        if (String(contentType).toLowerCase() == 'application/json'){

            let novaClassificacaoJSON = {}

            if(dadosClassificacao.faixa_etaria == ''    || dadosClassificacao.faixa_etaria == undefined    || dadosClassificacao.faixa_etaria == null    || dadosClassificacao.faixa_etaria.length >200   || 
            dadosClassificacao.classificacao == ''   || dadosClassificacao.classificacao == undefined   || dadosClassificacao.classificacao == null   || dadosClassificacao.classificacao.length>80    ||
            dadosClassificacao.caracteristicas == '' || dadosClassificacao.caracteristicas == undefined || dadosClassificacao.caracteristicas == null || dadosClassificacao.caracteristicas.length>200 ||
            dadosClassificacao.icone == ''           || dadosClassificacao.icone == undefined           || dadosClassificacao.icone == null           || dadosClassificacao.icone.length>200 
             ) {
                return message.ERROR_REQUIRED_FIELDS;//400
             }else{
            

                
                    let novaClassificacao = await classificacaoDAO.insertClassificacao(dadosClassificacao);

                    if(novaClassificacao){
                        let ultimoId = await classificacaoDAO.insertById()
                        dadosClassificacao.id = Number(ultimoId[0].id)
                    

                        novaClassificacaoJSON.classificacao    = dadosClassificacao;
                        novaClassificacaoJSON.status           = message.SUCCESS_CREATED_ITEM.status;
                        novaClassificacaoJSON.status_code      = message.SUCCESS_CREATED_ITEM.status_code;
                        novaClassificacaoJSON.message          = message.SUCCESS_CREATED_ITEM.message;

                        return novaClassificacaoJSON;//201
                     }else{
                        return message.ERROR_INTERNAL_SERVER_DB;//500
                    }
        }
     }else{ return message.ERROR_CONTENT_TYPE;//415
    }
        }catch(error){
            return message.ERROR_INTERNAL_SERVER;//500
        }
    }


const setexcluirClassificacao = async function(id){
    let idClassificacao = id;

   

    if(idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao) || idClassificacao == null){
    return message.ERROR_INVALID_ID;//400
    }else{
        let dadosClassificacao = await classificacaoDAO.deleteClassificacao(idClassificacao);

        if (dadosClassificacao){

            return message.SUCCESS_DELETE//200
        }else{
            return message.ERROR_NOT_FOUD;//404
        }
    }
}

const getListarClassificacao = async function(){

    let classificacaoJSON = {};

    let dadosClassificacao= await classificacaoDAO.selectAllClassificacao();

    if(dadosClassificacao){

        classificacaoJSON.classificacao = dadosClassificacao;
        classificacaoJSON.quantidade = dadosClassificacao.length;
        classificacaoDAO.status_code = 200;

        return classificacaoJSON
    }else{
        return false
    }
}

const setAtualizarClassificacao = async function (dadosClassificacao, contentType, id){
    let idClassificacao = id

    if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
        return message.ERROR_INVALID_ID; //400
    }else{
        let classificacaoid = await classificacaoDAO.selectByIdClassificacao(idClassificacao);
        let verificarId = classificacaoid.length
        if (verificarId > 0) {

            try {
               

                if (String(contentType). toLowerCase() == 'application/json') {
                    
                    let updateClassificacaoJson = {}

                    if(dadosClassificacao.faixa_etaria == ''    || dadosClassificacao.faixa_etaria == undefined    || dadosClassificacao.faixa_etaria == null    || dadosClassificacao.faixa_etaria.length >200   || 
                       dadosClassificacao.classificacao == ''   || dadosClassificacao.classificacao == undefined   || dadosClassificacao.classificacao == null   || dadosClassificacao.classificacao.length>80    ||
                       dadosClassificacao.caracteristicas == '' || dadosClassificacao.caracteristicas == undefined || dadosClassificacao.caracteristicas == null || dadosClassificacao.caracteristicas.length>200 ||
                       dadosClassificacao.icone == ''           || dadosClassificacao.icone == undefined           || dadosClassificacao.icone == null           || dadosClassificacao.icone.length>200           
                       ){
                        return message.ERROR_REQUIRED_FIELDS//400
                       }else {
                        
                      

                        let classificacaoAtualizada = await classificacaoDAO.updateClassificacao(dadosClassificacao,id)

                    if (classificacaoAtualizada){
                       updateClassificacaoJson.faixa_etaria = dadosClassificacao
                       updateClassificacaoJson.status = message.SUCCESS_UPDATE.status
                       updateClassificacaoJson.status_code = message.SUCCESS_UPDATE.status_code
                       updateClassificacaoJson.message = message.SUCCESS_UPDATE.message

                       return updateClassificacaoJson
                    }else{
                        return message.ERROR_INTERNAL_SERVER_DB//500
                    
                }
            }
                }else{
                    return message.ERROR_CONTENT_TYPE//415
                }
            }catch (error){
                return message.ERROR_INTERNAL_SERVER//500
            }

        }else {
            return message.ERROR_NOT_FOUD
        }
    }
}

const getBuscarClassificacao = async function(id){
    let idClassificacao = id;
    let classificacaoJSON = {};

    if(idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)){
        return message.ERROR_INVALID_ID;//400
    }else{
        let dadosClassificacao = await classificacaoDAO.selectByIdClassificacao(idClassificacao);


        if(dadosClassificacao){
            if(dadosClassificacao.length > 0){
                classificacaoJSON.classificacao = dadosClassificacao;
                classificacaoJSON.status_code = 200;

                return  classificacaoJSON;
            }else{
                return message.ERROR_NOT_FOUD;//404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB;//500
        }
    }
}

module.exports = {
    setexcluirClassificacao,
    getListarClassificacao,
    getBuscarClassificacao,
    setAtualizarClassificacao,
    setInserirNovaClassificacao
}