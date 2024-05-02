/************************************************************************************** 
 * Objetivo: arquivo responsável pelas validações e consistencias de dados do diretor *
 * Data: 25/04/2024                                                                   *
 * Autor: Pietra Volpato                                                              *
 * Versão: 1.0                                                                        *
 *************************************************************************************/

const message = require('../modulo/config.js');

const diretorDAO = require('../model/DAO/diretor.js');

const nacionalidadeDAO = require('../model/DAO/nacionalidade.js')

const setInserirNovoDiretor = async function(dadosDiretor, contentType){
    try{
        if(String(contentType).toLowerCase() == 'application/json'){
            let novoDiretorJSON = {}

            if(dadosDiretor.nome == ''                       || dadosDiretor.nome == undefined                || dadosDiretor.nome == null                      || dadosDiretor.nome.length >   80                   ||
               dadosDiretor.data_nascimento == ''            || dadosDiretor.data_nascimento == undefined     || dadosDiretor.data_nascimento == null           || dadosDiretor.data_nascimento.length !=   10       ||
               dadosDiretor.biografia == ''                  || dadosDiretor.biografia   == undefined         || dadosDiretor.biografia  == null                || dadosDiretor.biografia  > 65000                   ||
               dadosDiretor.foto_diretor == ''               || dadosDiretor.foto_diretor   == undefined      || dadosDiretor.foto_diretor  == null             || dadosDiretor.foto_diretor > 1000                  ||
               dadosDiretor.sexo_id == ''                    || dadosDiretor.sexo_id    == undefined          || dadosDiretor.sexo_id == null                   || dadosDiretor.sexo_id > 3                          

            ){
                return message.ERROR_REQUIRED_FIELDS//400
            }else{
                let validateStatus = false

                if(dadosDiretor.data_falecimento != null &&
                   dadosDiretor.data_falecimento != '' &&
                   dadosDiretor.data_falecimento != undefined ){

                    if(dadosDiretor.data_falecimento.length != 10){
                        return message.ERROR_REQUIRED_FIELDS //400
                    }else{
                        validateStatus = true
                    }
                   }else{
                    validateStatus = true
                   }


                if(validateStatus = true){
                    let novoDiretor = await diretorDAO.insertDiretor(dadosDiretor);


                    if(novoDiretor){
                        let ultimoId = await diretorDAO.InsertById()
                        dadosDiretor.id = Number(ultimoId[0].id)

                        novoDiretorJSON.ator            = dadosDiretor;
                        novoDiretorJSON.status          = message.SUCCESS_CREATED_ITEM.status;
                        novoDiretorJSON.status_code     = message.SUCCESS_CREATED_ITEM.status_code;
                        novoDiretorJSON.message         = message.SUCCESS_CREATED_ITEM.message;

                        
                        return novoDiretorJSON;//201
                    }else{
                        return message.ERROR_INTERNAL_SERVER_DB;//500
                    }
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE; //415
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER; // 500 - erro na controller
    }


}

const setAtualizarDiretor = async function(dadosDiretor, contentType, id){
    let idDiretor = id

    if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let diretorId = await diretorDAO.selectByIdDiretor(idDiretor);
        let verificarId = diretorId.length
        if (verificarId > 0) {
        
            try {


                if (String(contentType).toLowerCase() == 'application/json') {



                    let updateDiretorJson = {}

                  
                    if (dadosDiretor.nome == ''                       || dadosDiretor.nome == undefined                || dadosDiretor.nome == null                      || dadosDiretor.nome.length >   80                   ||
                    dadosDiretor.data_nascimento == ''            || dadosDiretor.data_nascimento == undefined     || dadosDiretor.data_nascimento == null           || dadosDiretor.data_nascimento.length !=   10       ||
                    dadosDiretor.biografia == ''                  || dadosDiretor.biografia   == undefined         || dadosDiretor.biografia  == null                || dadosDiretor.biografia  > 65000                   ||
                    dadosDiretor.foto_diretor == ''               || dadosDiretor.foto_diretor   == undefined      || dadosDiretor.foto_diretor  == null             || dadosDiretor.foto_diretor > 1000                  ||
                    dadosDiretor.sexo_id == ''                    || dadosDiretor.sexo_id    == undefined          || dadosDiretor.sexo_id == null                   || dadosDiretor.sexo_id > 3                          
     
                        

                    ) {

                        return message.ERROR_REQUIRED_FIELDS //400


                    } else {

                        let validateStatus = false
                        // VAlidação da data de relançamento, já que ela não obrigatória no BD
                        if (dadosDiretor.data_falecimento != null &&
                            dadosDiretor.data_falecimento != '' &&
                            dadosDiretor.data_falecimento != undefined

                        ) {

                            
                            //validação para verificar se a data esta com a qntidade de digitos corretos

                            if (dadosDiretor.data_falecimento.length != 10) {

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
                            let diretorAtualizado = await diretorDAO.updateDiretor(dadosDiretor,id)

                            //Validação para verificar se o DAO inseriu os dados no BD
                            if (diretorAtualizado) {

                                

                                //Cria o JSON de retorno dos dados (201)
                                updateDiretorJson.diretor = dadosDiretor
                                updateDiretorJson.status = message.SUCCESS_UPDATE.status
                                updateDiretorJson.status_code = message.SUCCESS_UPDATE.status_code
                                updateDiretorJson.message = message.SUCCESS_UPDATE.message

                                return updateDiretorJson

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

const setExcluirDiretor = async function(id){

    let idDiretor = id;


    if(idDiretor == '' || idDiretor == undefined || isNaN(idDiretor) || idDiretor == null) {
        return message.ERROR_INVALID_ID;//400
    }else{
        let dadosDiretor = await diretorDAO.deleteDiretor(idDiretor);
        
        if(dadosDiretor){
            return message.SUCCESS_DELETE//200


            }else{
                return message.ERROR_NOT_FOUD;//404

            }

        }
}

const getListarDiretor = async function(){
    let diretorJSON = {};
    
    //chama a função do DAO que retorna os filmes do banco de dados
    let dadosDiretor = await diretorDAO.selectAllDiretor();

    //validação para verificar se o DAO retornou os dados
    if(dadosDiretor){
        for (let diretor of dadosDiretor){
            let nacionalidadeDiretor = await nacionalidadeDAO.selectDiretorNacionalidadeById(diretor.id)
            if(nacionalidadeDiretor.length > 0){
                diretor.nacionalidade = nacionalidadeDiretor
            }
        }
        //cria o JSON para retornar para o app
        diretorJSON.diretor = dadosDiretor;
        diretorJSON.quantidade = dadosDiretor.length;
        diretorJSON.status_code = 200;

        return diretorJSON 
    }else{
        return false;
    }
}

const getBuscarDiretor = async function(id){
    let idDiretor = id;
    let diretorJSON = {};

    if(idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)){
        return message.ERROR_INVALID_ID;//400
    }else{
        let dadosDiretor= await diretorDAO.selectByIdDiretor(idDiretor);


        if(dadosDiretor){
            if(dadosDiretor.length > 0){
                diretorJSON.ator = dadosDiretor;
                diretorJSON.status_code = 200;

                return diretorJSON;
            }else{
                return message.ERROR_NOT_FOUD;//404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB;//500
        }
    }
}

const getBuscarNomeDiretor = async function(nome) {
    let nomeDiretor = nome;
    let diretorJSON = {};

    if(nomeDiretor == '' || nomeDiretor == undefined || isNaN(nomeDiretor)){
        return message.ERROR_INVALID_ID;//400
    }else{
        let dadosDiretor = await diretorDAO.selectNomeDiretor(nome);
 

    if(dadosDiretor){
        diretorJSON.diretor = dadosDiretor;
        diretorJSON.quantidade = dadosDiretor.length;
        diretorJSON.status_code = 200;

        return diretorJSON
    }else{
        return false;
    }
    
}
}


module.exports = {
    setInserirNovoDiretor,
    setAtualizarDiretor,
    setExcluirDiretor,
    getListarDiretor,
    getBuscarDiretor,
    getBuscarNomeDiretor
}