/***********************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados no Banco de Dados Msql,
 *          aqui realizaremos o CRUD (Create, Read, Update, Delete) utilizando a linguagem SQL
 * Data: 25/04/2024
 * Autor: Pietra Volpato
 * Versão: 1.0
 * 
 *********************************************************************************************/

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const insertAtor = async function(dadosAtor){
    
    let sql;

    try{
        if(dadosAtor.data_falecimento != '' &&
        dadosAtor.data_falecimento != null &&
        dadosAtor.data_falecimento != undefined
        ){
            sql = `insert into tbl_ator(
                nome,
                nome_artistico,
                data_nascimento,
                data_falecimento,
                biografia,
                foto_ator,
                sexo_id
                ) values (
                '${dadosAtor.nome}',
                '${dadosAtor.nome_artistico}',
                '${dadosAtor.data_nascimento}',
                '${dadosAtor.data_falecimento}',
                '${dadosAtor.biografia}',
                '${dadosAtor.foto_ator}',
                '${dadosAtor.sexo_id}'

                )`;

        }else{
            sql = `insert into tbl_ator(
                nome,
                nome_artistico,
                data_nascimento,
                data_falecimento,
                biografia,
                foto_ator,
                sexo_id
                ) values (
                '${dadosAtor.nome}',
                '${dadosAtor.nome_artistico}',
                '${dadosAtor.data_nascimento}',
                null,
                '${dadosAtor.biografia}',
                '${dadosAtor.foto_ator}',
                '${dadosAtor.sexo_id}'

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

const insertById = async function(){
    try{
        let sql = `select cast(last_insert_id()as DECIMAL) as id from tbl_ator limit 1`;
        let rsAtor = await prisma.$queryRawUnsafe(sql)

        return rsAtor
    }catch (error) {
        return false
    }
}

const updateAtor = async function(dadosAtor, id){

    let sql

      try{
        if(dadosAtor.data_falecimento != '' &&
           dadosAtor.data_falecimento != null &&
           dadosAtor.data_falecimento != undefined
           ){

            sql = `update tbl_ator set
                   nome = replace("${dadosAtor.nome}","'", "#"),
                   nome_artistico = replace("${dadosAtor.nome_artistico}","'", "#"),
                   data_nascimento = '${dadosAtor.data_nascimento}',
                   data_falecimento = '${dadosAtor.data_falecimento}',
                   biografia = '${dadosAtor.biografia}',
                   foto_ator = '${dadosAtor.foto_ator}',
                   sexo_id = '${dadosAtor.sexo_id}'
                   where tbl_ator.id = ${id}`;
           }else{

            sql = `update tbl_ator set
                   nome = replace("${dadosAtor.nome}","'", "#"),
                   nome_artistico = replace("${dadosAtor.nome_artistico}","'", "#"),
                   data_nascimento = '${dadosAtor.data_nascimento}',
                   data_falecimento = null,
                   biografia = '${dadosAtor.biografia}',
                   foto_ator = '${dadosAtor.foto_ator}',
                   sexo_id = '${dadosAtor.sexo_id}'
                   where tbl_ator.id = ${id}`;

           }

           let rsAtor = await prisma.$executeRawUnsafe(sql);

           if(rsAtor)
        return true;
    else  
        return false;
      }catch (error) {
        return false;
      }
}

async function deleteAtor(id) {
    try{
        let sql = `delete from tbl_ator where id = ${id}`;

        let rsAtor = await prisma.$queryRawUnsafe(sql);

        return rsAtor;
    } catch (error){
        return false;
    }
}

const selectAllAtor  = async function(){

    let sql = 'select * from tbl_ator';

    //$queryRawUnsafe(sql)
    //$queryRaw('select * from tbl_filme')

    let rsAtor = await prisma.$queryRawUnsafe(sql);

    if(rsAtor.length > 0)
        return rsAtor;
    else  
        return false;
}

const selectByIdAtor = async function(id){

    try{
        let sql = `select * from tbl_ator where id = ${id}`;
    
        let rsAtor = await prisma.$queryRawUnsafe(sql);
    
        
            return rsAtor;

    }catch(error){

        return false

    }

}

const selectByNomeAtor = async function(nome){
    
        try {
    
            let sql = `select * from tbl_ator where nome LIKE "%${nome}%"`
            let rsAtor = await prisma.$queryRawUnsafe(sql);
        
                return rsAtor;
            } catch (error) {
                return false
            }
  
}


module.exports = {
    insertAtor,
    insertById,
    updateAtor,
    deleteAtor,
    selectAllAtor,
    selectByIdAtor,
    selectByNomeAtor
}