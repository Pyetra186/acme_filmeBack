/***********************************************************************************************
 * Objetivo: Arquivo responsavel pela padronização de variáveis e constantes globais do projeto
 * Data; 22/02/2024 
 * auto: Pietra
 * Versão: 1.0
 ***********************************************************************************************/

/*****************************MENSAGENS DE ERRO DO ROJETO********************************* */
const ERROR_INVALID_ID   =       {status: false, status_code: 400, message: 'O ID encaminhado nessa requisição não é válido!!'}
const ERROR_REQUIRED_FIELDS    = {status: false, status_code: 400, message: 'Exitem campos requeridos que não foram preenchidos, ou não atendem os critérios de digitação'}
const ERROR_NOT_FOUD     =       {status: false, status_code: 404, message: 'Não foi encontrado nenhum item!'}
const ERROR_CONTENT_TYPE       = {status: false, status_code: 415, message: 'O content-type encaminhado na requicição não é suportado. Deve-se encaminhar apenas requicições com applicaation/json'}
const ERROR_INTERNAL_SERVER_DB = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, devido a um erro ao acesso ao Banco de Dados. Contate o administrador da API!!'}
const ERROR_INTERNAL_SERVER    = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, devido a um problema na camada de negocio/ controle da aplicação. contate o administrador da API!'}

/*****************************MENSAGENS DE SUCESSO*************************************** */
const SUCCESS_CREATED_ITEM =     {status: true, status_code: 201, message: 'Item criado com sucesso!!'}
const SUCCESS_DELETE       =     {status: true, status_code: 200, message: 'Item deletado com sucesso!!'}

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUD,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER,
    SUCCESS_DELETE
}
