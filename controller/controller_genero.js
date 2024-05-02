/************************************************************************************ 
 * Objetivo: arquivo responsável pelas validações e consistencias de dados de genero *
 * Data: 18/04/2024                                                                 *
 * Autor: Pietra Volpato                                                            *
 * Versão: 1.0                                                                      *
 *                                                                                  *
 ***********************************************************************************/
const message = require('../modulo/config.js');

const generoDAO = require('../model/DAO/genero.js')

const setInserirNovoGenero = async function(dadosGenero, contentType){
    try{
        if (String(contentType).toLowerCase() == 'application/json'){

            let novoGeneroJSON = {}

            if(dadosGenero.nome == ''    || dadosGenero.nome == undefined    || dadosGenero.nome == null    || dadosGenero.nome.length >200
            
             ) {
                return message.ERROR_REQUIRED_FIELDS;//400
             }else{
            

                
                    let novoGenero = await generoDAO.insertGenero(dadosGenero);

                    if(novoGenero){
                        let ultimoId = await generoDAO.insertById()
                        dadosGenero.id = Number(ultimoId[0].id)
                    

                        novoGeneroJSON.genero           = dadosGenero;
                        novoGeneroJSON.status           = message.SUCCESS_CREATED_ITEM.status;
                        novoGeneroJSON.status_code      = message.SUCCESS_CREATED_ITEM.status_code;
                        novoGeneroJSON.message          = message.SUCCESS_CREATED_ITEM.message;

                        return novoGeneroJSON;//201
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

const setexcluirGenero = async function(id){
    let idGenero = id;

   

    if(idGenero == '' || idGenero == undefined || isNaN(idGenero) || idGenero == null){
    return message.ERROR_INVALID_ID;//400
    }else{
        let dadosGenero = await generoDAO.deleteGenero(idGenero);

        if (dadosGenero){

            return message.SUCCESS_DELETE//200
        }else{
            return message.ERROR_NOT_FOUD;//404
        }
    }
}

const setAtualizarGenero = async function (dadosGenero, contentType, id){
    let idGenero= id

    if (idGenero== '' || idGenero == undefined || isNaN(idGenero)) {
        return message.ERROR_INVALID_ID; //400
    }else{
        let generoid = await generoDAO.selectByIdGenero(idGenero);
        let verificarId = generoid.length
        if (verificarId > 0) {

            try {
                if (String(contentType). toLowerCase() == 'application/json') {
                    
                    let updateGeneroJson = {}

                    if(dadosGenero.nome == ''    || dadosGenero.nome == undefined    || dadosGenero.nome == null    || dadosGenero.nome.length >200    
                      
                       ){
                        return message.ERROR_REQUIRED_FIELDS//400
                       }else {

                        let generoAtualizada = await generoDAO.updateGenero(dadosGenero,id)

                    if (generoAtualizada){
                       updateGeneroJson.nome = dadosGenero
                       updateGeneroJson.status = message.SUCCESS_UPDATE.status
                       updateGeneroJson.status_code = message.SUCCESS_UPDATE.status_code
                       updateGeneroJson.message = message.SUCCESS_UPDATE.message

                       return updateGeneroJson
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

const getBuscarGenero = async function(id){
    let idGenero = id;
    let generoJSON = {};

    if(idGenero == '' || idGenero == undefined || isNaN(idGenero)){
        return message.ERROR_INVALID_ID;//400
    }else{
        let dadosGenero = await generoDAO.selectByIdGenero(idGenero);


        if(dadosGenero){
            if(dadosGenero.length > 0){
                generoJSON.genero = dadosGenero;
                generoJSON.status_code = 200;

                return  generoJSON;
            }else{
                return message.ERROR_NOT_FOUD;//404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB;//500
        }
    }
}
const getListarGenero = async function(){

    let generoJSON = {};

    let dadosGenero = await generoDAO.selectAllGenero();

    if(dadosGenero){

        generoJSON.genero = dadosGenero;
        generoJSON.quantidade = dadosGenero.length;
        generoJSON.status_code = 200;

        return generoJSON
    }else{
        return false
    }
}




module.exports = {
    setInserirNovoGenero,
    setexcluirGenero,
    setAtualizarGenero,
    getBuscarGenero,
    getListarGenero
  

}