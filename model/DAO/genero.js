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

const insertGenero = async function(dadosGenero){

    let sql;

        sql= `insert into tbl_genero(
            nome
            )values(
            '${dadosGenero.nome}'
            
        )`;
        
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
        return true
    else
       return false
   
}

const insertById = async function(){

    try{
        let sql = `select cast(last_insert_id()as DECIMAL) as id from tbl_genero limit 1`;
        let rsGenero = await prisma.$queryRawUnsafe(sql);
        return rsGenero;
    }catch (error) {
        return false
    }
}


const updateGenero = async function(dadosGenero, id){
    let sql 

    sql = `update tbl_genero set
           nome = '${dadosGenero.nome}'
           where tbl_genero.id = ${id}
           `;
           let rsGenero = await prisma.$executeRawUnsafe(sql);
           if(rsGenero)
        return true;
    else
        return false

   

}

async function deleteGenero(id){

    try{
        let sql = `delete from tbl_genero where id = ${id}`;

        let rsGenero = await prisma.$queryRawUnsafe(sql)

        return rsGenero;
    }catch(error){
        return false
    }
    
}

const selectAllGenero = async function(){

    let sql = 'select * from tbl_genero';

    let rsGenero = await prisma.$queryRawUnsafe(sql);

    if(rsGenero.length > 0)
      return rsGenero;
    else
      return false;

}

const selectByIdGenero = async function(id){
    try{
        let sql = `select * from tbl_genero where id = ${id}`;

        let rsGenero = await prisma.$queryRawUnsafe(sql);

        return rsGenero;
    }catch(error){
        return false
    }
}


module.exports = {
    insertGenero,
    insertById,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
    
}

