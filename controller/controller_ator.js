/*********************************************************************************** 
 * Objetivo: arquivo responsável pelas validações e consistencias de dados do ator *
 * Data: 25/04/2024                                                                *
 * Autor: Pietra Volpato                                                           *
 * Versão: 1.0                                                                     *
 **********************************************************************************/

const message = require('../modulo/config.js');

const atorDAO = require('../model/DAO/ator.js');
const nacionalidadeDAO = require('../model/DAO/nacionalidade.js');
const sexoDAO = require('../model/DAO/sexo.js')

const setInserirNovoAtor = async function(dadosAtor, contentType){
    try{
        if(String(contentType).toLowerCase() == 'application/json'){
            let novoAtorJSON = {}

            if(dadosAtor.nome == ''                    || dadosAtor.nome == undefined             ||   dadosAtor.nome == null                 || dadosAtor.nome.length >   80                   ||
               dadosAtor.nome_artistico == ''          || dadosAtor.nome_artistico == undefined   ||   dadosAtor.nome_artistico == null       || dadosAtor.nome_artistico.length >   100        ||
               dadosAtor.data_nascimento == ''         || dadosAtor.data_nascimento == undefined  ||   dadosAtor.data_nascimento == null      || dadosAtor.data_nascimento.length !=   10       ||
               dadosAtor.biografia == ''               || dadosAtor.biografia   == undefined      || dadosAtor.biografia  == null             || dadosAtor.biografia  > 65000                   ||
               dadosAtor.foto_ator == ''               || dadosAtor.foto_ator   == undefined      || dadosAtor.foto_ator  == null             || dadosAtor.foto_ator > 1000                     ||
               dadosAtor.sexo_id == ''                 || dadosAtor.sexo_id    == undefined       || dadosAtor.sexo_id == null                || dadosAtor.sexo_id > 3                          

            ){
                return message.ERROR_REQUIRED_FIELDS//400
            }else{
                let validateStatus = false

                if(dadosAtor.data_falecimento != null &&
                   dadosAtor.data_falecimento != '' &&
                   dadosAtor.data_falecimento != undefined ){

                    if(dadosAtor.data_falecimento.length != 10){
                        return message.ERROR_REQUIRED_FIELDS //400
                    }else{
                        validateStatus = true
                    }
                   }else{
                    validateStatus = true
                   }


                if(validateStatus = true){
                    let novoAtor = await atorDAO.insertAtor(dadosAtor);
                   
                   
                


                    if(novoAtor){
                        let ultimoId = await atorDAO.insertById()
                        dadosAtor.id = Number(ultimoId[0].id)

                        // let ultimoId = await atorDAO.insertNacionalidadeAtor(ultimoId, dadosAtor.nacionalidade)

                        novoAtorJSON.ator            = dadosAtor;
                        novoAtorJSON.status          = message.SUCCESS_CREATED_ITEM.status;
                        novoAtorJSON.status_code     = message.SUCCESS_CREATED_ITEM.status_code;
                        novoAtorJSON.message         = message.SUCCESS_CREATED_ITEM.message;
                        

                        
                        return novoAtorJSON;//201
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



const setAtualizarAtor = async function (dadosAtor, contentType, id) {
    let idAtor = id

    if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let atorId = await atorDAO.selectByIdAtor(idAtor);
        let verificarId = atorId.length
        if (verificarId > 0) {
        
            try {


                if (String(contentType).toLowerCase() == 'application/json') {



                    let updateAtorJson = {}

                  
                    if (dadosAtor.nome == ''                    || dadosAtor.nome == undefined             ||   dadosAtor.nome == null                 || dadosAtor.nome.length >   80                   ||
                        dadosAtor.nome_artistico == ''          || dadosAtor.nome_artistico == undefined   ||   dadosAtor.nome_artistico == null       || dadosAtor.nome_artistico.length >   100        ||
                        dadosAtor.data_nascimento == ''         || dadosAtor.data_nascimento == undefined  ||   dadosAtor.data_nascimento == null      || dadosAtor.data_nascimento.length !=   10       ||
                        dadosAtor.biografia == ''               || dadosAtor.biografia   == undefined      || dadosAtor.biografia  == null             || dadosAtor.biografia  > 65000                   ||
                        dadosAtor.foto_ator == ''               || dadosAtor.foto_ator   == undefined      || dadosAtor.foto_ator  == null             || dadosAtor.foto_ator > 1000                     ||
                        dadosAtor.sexo_id == ''                 || dadosAtor.sexo_id    == undefined       || dadosAtor.sexo_id == null                || dadosAtor.sexo_id > 3                           

     
                        

                    ) {

                        return message.ERROR_REQUIRED_FIELDS //400


                    } else {

                        let validateStatus = false
                        // VAlidação da data de relançamento, já que ela não obrigatória no BD
                        if (dadosAtor.data_falecimento != null &&
                            dadosAtor.data_falecimento != '' &&
                            dadosAtor.data_falecimento != undefined

                        ) {

                            
                            //validação para verificar se a data esta com a qntidade de digitos corretos

                            if (dadosAtor.data_falecimento.length != 10) {

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
                            let AtorAtualizado = await atorDAO.updateAtor(dadosAtor,id)

                            //Validação para verificar se o DAO inseriu os dados no BD
                            if (AtorAtualizado) {

                                

                                //Cria o JSON de retorno dos dados (201)
                                updateAtorJson.ator = dadosAtor
                                updateAtorJson.status = message.SUCCESS_UPDATE.status
                                updateAtorJson.status_code = message.SUCCESS_UPDATE.status_code
                                updateAtorJson.message = message.SUCCESS_UPDATE.message

                                return updateAtorJson

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

const setExcluirAtor =  async function(id){
    let idAtor = id;


    if(idAtor == '' || idAtor == undefined || isNaN(idAtor) || idAtor == null) {
        return message.ERROR_INVALID_ID;//400
    }else{
        let dadosAtor = await atorDAO.deleteAtor(idAtor);
        
        if(dadosAtor){
            return message.SUCCESS_DELETE//200


            }else{
                return message.ERROR_NOT_FOUD;//404

            }

        }
}

const getListarAtor = async function(){

        //Cria um objeto JSON
        let atorJSON = {};
    
        //chama a função do DAO que retorna os filmes do banco de dados
        let dadosAtor = await atorDAO.selectAllAtor();


        if(dadosAtor.length > 0){

            for (let ator of dadosAtor){

                let sexoAtor = await sexoDAO.selectByIdSexo(ator.sexo_id)
                delete ator.sexo_id
                ator.sexo = sexoAtor
            }

            for (let ator of dadosAtor){
                
                let nacionalidadeAtor = await nacionalidadeDAO.selectNacionalidadeAtorByid(ator.id)
                
                    ator.nacionalidade = nacionalidadeAtor
            
      

      }
      /*  if(dadosAtor.length>0){
        for (let ator of dadosAtor){
            let sexo = await sexoDAO.selectByIdSexo(ator.sexo_id)
            if(sexo.length > 0){
                ator.sexo = sexo
            }

        if(dadosAtor.length>0){
        
            for (let ator of dadosAtor){
                let nacionalidade = await nacionalidadeDAO.selectNacionalidadeAtorByid(ator.id)
                if(nacionalidade.length > 0){
                    ator.nacionalidade = nacionalidade
                }
            }
        }
    }
    */
            //cria o JSON para retornar para o app
            atorJSON.ator = dadosAtor;
            atorJSON.quantidade = dadosAtor.length;
            atorJSON.status_code = 200;
    
            return atorJSON 
        }else{
            return false;
        }
    }
   

const getBuscarAtor = async function(id){

        let idAtor = id;
        let atorJSON = {};
    
        if(idAtor == '' || idAtor == undefined || isNaN(idAtor)){
            return message.ERROR_INVALID_ID;//400
        }else{
            let dadosAtor= await atorDAO.selectByIdAtor(idAtor);

            if(dadosAtor.length > 0){

                for (let ator of dadosAtor){
    
                    let sexoAtor = await sexoDAO.selectByIdSexo(ator.sexo_id)
                    delete ator.sexo_id
                    ator.sexo = sexoAtor
                }
    
                for (let ator of dadosAtor){
                    
                    let nacionalidadeAtor = await nacionalidadeDAO.selectNacionalidadeAtorByid(ator.id)
                    
                        ator.nacionalidade = nacionalidadeAtor
                
          
    
          }
          
    
    
            if(dadosAtor){
                if(dadosAtor.length > 0){
                    atorJSON.ator = dadosAtor;
                    atorJSON.status_code = 200;
    
                    return atorJSON;
                }else{
                    return message.ERROR_NOT_FOUD;//404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_DB;//500
            }
        }
    }
}  


const getBuscarNomeAtor = async function(nome){
    try {
        let nomeAtor = nome 
        let atorJSON = {}
        if (nomeAtor == '' ||nomeAtor==undefined||!isNaN(nomeAtor))
        return message.ERROR_INVALID_ID//400
        else {
            let dadosAtor = await atorDAO.selectByNomeAtor (nomeAtor)
            if (dadosAtor){
                if (dadosAtor.length>0){
                    atorJSON.ator = dadosAtor
                    atorJSON.status_code = 200 
                    return atorJSON
                } else 
                return message.ERROR_NOT_FOUD
            }
            else 
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    setInserirNovoAtor,
    setAtualizarAtor,
    setExcluirAtor,
    getBuscarAtor,
    getListarAtor,
    getBuscarNomeAtor
}
    