/***********************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados no Banco de Dados Msql,
 *          aqui realizaremos o CRUD (Create, Read, Update, Delete) utilizando a linguagem SQL
 * Data: 18/04/2024
 * Autor: Pietra Volpato
 * Versão: 1.0
 * 
 *********************************************************************************************/

const {PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient

const insertDiretor = async function(dadosDiretor){

}

const InsertById = async function(){
}

const updateDiretor = async function(dadosDiretor, id){

}

const deleteDiretor = async function deleteDiretor(id){

}

const selectAllDiretor = async function(){

    let sql = 'select * tbl_diretor';

    let rsDiretor = await prisma.$queryRawUnsafe(sql);

    if(rsDiretor.length > 0)
        return rsDiretor;
    else
        return false;

}

const selectByNomeDiretor = async function(nome){

}

module.exports = {
    insertDiretor,
    InsertById,
    updateDiretor,
    deleteDiretor,
    selectAllDiretor,
    selectByNomeDiretor
}