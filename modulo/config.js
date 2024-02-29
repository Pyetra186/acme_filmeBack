/***********************************************************************************************
 * Objetivo: Arquivo responsavel pela padronização de variáveis e constantes globais do projeto
 * Data; 22/02/2024 
 * auto: Pietra
 * Versão: 1.0
 ***********************************************************************************************/

/*****************************MENSAGENS DE ERRO DO ROJETO********************************* */
const ERROR_INVALID_ID   =       {status: false, status_code: 400, message: 'O ID encaminhado nessa requisição não é válido!!'}
const ERROR_NOT_FOUD     =       {status: false, status_code: 404, message: 'Não foi encontrado nenhum item!'}
const ERROR_INTERNAL_SERVER_DB = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, devido a um erro ao acesso ao Banco de Dados. Contate o administrador da API!!'}

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUD,
    ERROR_INTERNAL_SERVER_DB
}