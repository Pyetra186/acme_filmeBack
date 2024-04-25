/**********************************************************************************************
 * Objetivo: arquivo responsável pelas validações e consistencias de dados de classificaÇões  *
 * Data: 25/04/2024                                                                           *
 * Autor: Pietra Volpato                                                                      *
 * Versão: 1.0                                                                                *
 *                                                                                            *
 *********************************************************************************************/
const message = require('../modulo/config.js');

const sexoDAO = require('../model/DAO/sexo.js');

const getListarSexo = async function(){

    let sexoJSON = {};

    let dadosSexo = await sexoDAO.selectAllSexo();

    if(dadosSexo){

        sexoJSON.sexo = dadosSexo;
        sexoJSON.quantidade = dadosSexo.length;
        sexoDAO.status_code = 200;

        return sexoJSON
    }else{
        return false
    }
}

const getBuscarSexo = async function(id){
    let idSexo = id;
    let sexoJSON = {};

    if(idSexo == '' || idSexo == undefined || isNaN(idSexo)){
        return message.ERROR_INVALID_ID;//400
    }else{
        let dadosSexo = await sexoDAO.selectByIdSexo(idSexo);


        if(dadosSexo){
            if(dadosSexo.length > 0){
                sexoJSON.sexo = dadosSexo;
                sexoJSON.status_code = 200;

                return  sexoJSON;
            }else{
                return message.ERROR_NOT_FOUD;//404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB;//500
        }
    }
}

module.exports = {
    getListarSexo,
    getBuscarSexo
}