/***********************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados no Banco de Dados Msql,
 *          aqui realizaremos o CRUD (Create, Read, Update, Delete) utilizando a linguagem SQL
 * Data: 18/04/2024
 * Autor: Pietra Volpato
 * Versão: 1.0
 * 
 *********************************************************************************************/

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const insertClassificacao = async function(dadosClassificacao){

    let sql;


        sql= `insert into tbl_classificacao(
            faixa_etaria,
            classificacao,
            caracteristicas,
            icone
            )values(
            '${dadosClassificacao.faixa_etaria}',
            '${dadosClassificacao.classificacao}',
            '${dadosClassificacao.caracteristicas}',
            '${dadosClassificacao.icone}'
        )`;
        
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
        return true
    else
       return false
   
}

const insertById = async function(){

    try{
        let sql = `select cast(last_insert_id()as DECIMAL) as id from tbl_classificacao limit 1`;
        let rsClassificacao = await prisma.$queryRawUnsafe(sql);
        return rsClassificacao;
    }catch (error) {
        return false
    }
}

const updateClassificacao = async function(dadosClassificacao, id){
    let sql 

    sql = `update tbl_classificacao set
           faixa_etaria = '${dadosClassificacao.faixa_etaria}',
           classificacao = '${dadosClassificacao.classificacao}',
           caracteristicas = '${dadosClassificacao.caracteristicas}',
           icone = '${dadosClassificacao.icone}'
           where tbl_classificacao.id = ${id}
           `;
           let rsClassificacao = await prisma.$executeRawUnsafe(sql);
           if(rsClassificacao)
        return true;
    else
        return false

   

}

async function deleteClassificacao(id){

    try{
        let sql = `delete from tbl_classificacao where id = ${id}`;

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)

        return rsClassificacao;
    }catch(error){
        return false
    }
    
}

const selectAllClassificacao = async function(){

    let sql = 'select * from tbl_classificacao';

    let rsClassificacao = await prisma.$queryRawUnsafe(sql);

    if(rsClassificacao.length > 0)
      return rsClassificacao;
    else
      return false;

}

const selectByIdClassificacao = async function(id){
    try{
        let sql = `select * from tbl_classificacao where id = ${id}`;

        let rsClassificacao = await prisma.$queryRawUnsafe(sql);

        return rsClassificacao;
    }catch(error){
        return false
    }
}




module.exports = {
    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao,
    insertById
}