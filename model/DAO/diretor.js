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

    let sql;

    try{
        if(dadosDiretor.data_falecimento != '' && 
           dadosDiretor.data_falecimento != null && 
           dadosDiretor.data_falecimento != undefined
           ){
            sql = `insert into tbl_diretor(
                nome,
                data_nascimento,
                data_falecimento,
                biografia,
                foto_diretor,
                sexo_id
                ) values (
                '${dadosDiretor.nome}',
                '${dadosDiretor.data_nascimento}',
                '${dadosDiretor.data_falecimento}',
                '${dadosDiretor.biografia}',
                '${dadosDiretor.foto_diretor}',
                '${dadosDiretor.sexo_id}'

                )`;

        }else{
            sql = `insert into tbl_diretor(
                nome,
                data_nascimento,
                data_falecimento,
                biografia,
                foto_diretor,
                sexo_id
                ) values (
                '${dadosDiretor.nome}',
                '${dadosDiretor.data_nascimento}',
                null,
                '${dadosDiretor.biografia}',
                '${dadosDiretor.foto_diretor}',
                '${dadosDiretor.sexo_id}'

                )`;     
    }
    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
    return true;
else
    return false;
}catch (error) {
    return false;
}

}

const InsertById = async function(){

    try{
        let sql = `select cast(last_insert_id()as DECIMAL) as id from tbl_diretor limit 1`;
        let rsDiretor = await prisma.$queryRawUnsafe(sql)

        return rsDiretor
    }catch (error) {
        return false
    }

}

const updateDiretor = async function(dadosDiretor, id){

    let sql

    try{
      if(dadosDiretor.data_falecimento != '' &&
         dadosDiretor.data_falecimento != null &&
         dadosDiretor.data_falecimento != undefined
         ){

          sql = `update tbl_diretor set
                 nome = replace("${dadosDiretor.nome}","'", "#"),
                 data_nascimento = '${dadosDiretor.data_nascimento}',
                 data_falecimento = '${dadosDiretor.data_falecimento}',
                 biografia = '${dadosDiretor.biografia}',
                 foto_ator = '${dadosDiretor.foto_ator}',
                 sexo_id = '${dadosDiretor.sexo_id}'
                 where tbl_diretor.id = ${id}`;
         }else{

          sql = `update tbl_diretor set
                 nome = replace("${dadosDiretor.nome}","'", "#"),
                 data_nascimento = '${dadosDiretor.data_nascimento}',
                 data_falecimento = null,
                 biografia = '${dadosDiretor.biografia}',
                 foto_diretor = '${dadosDiretor.foto_diretor}',
                 sexo_id = '${dadosDiretor.sexo_id}'
                 where tbl_diretor.id = ${id}`;

         }

         let rsDiretor = await prisma.$executeRawUnsafe(sql);

         if(rsDiretor)
      return true;
  else  
      return false;
    }catch (error) {
      return false;
    }
}


const deleteDiretor = async function deleteDiretor(id){
    try{
        let sql = `delete from tbl_diretor where id = ${id}`;

        let rsDiretor = await prisma.$queryRawUnsafe(sql);

        return rsDiretor;
    } catch (error){
        return false;
    }
}

const selectAllDiretor = async function(){

    let sql = 'select * from tbl_diretor';

    let rsDiretor = await prisma.$queryRawUnsafe(sql);

    if(rsDiretor.length > 0)
        return rsDiretor;
    else
        return false;

}

const selectByIdDiretor = async function(id){
    try{
        let sql = `select * from tbl_diretor where id = ${id}`;
    
        let rsDiretor = await prisma.$queryRawUnsafe(sql);
    
        
            return rsDiretor;

    }catch(error){

        return false

    }

}

/*const selectNomeDiretor = async function (nome){
      try {
    
        let sql = `select * from tbl_ator where nome LIKE "%${nome}%"`
        let rsAtor = await prisma.$queryRawUnsafe(sql);
    
            return rsAtor;
        } catch (error) {
            return false
        }
        
}*/
module.exports = {
    updateDiretor,
    deleteDiretor,
    selectAllDiretor,
    selectByIdDiretor,
    insertDiretor,
    InsertById
    //selectNomeDiretor,
}