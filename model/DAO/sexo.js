/***********************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados no Banco de Dados Msql,
 *          aqui realizaremos o CRUD utilizando a linguagem SQL
 * Data: 25/04/2024
 * Autor: Pietra Volpato
 * Versão: 1.0
 *********************************************************************************************/

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

    const selectAllSexo = async function(){
        let sql = 'select * from tbl_sexo';

        let rsSexo = await prisma.$queryRawUnsafe(sql);

        if(rsSexo.length > 0)
          return rsSexo;
        else
          return false
    }


    const selectByIdSexo = async function(id){
        try{
            let sql = `select * from tbl_sexo where id = ${id}`;

            let rsSexo = await prisma.$queryRawUnsafe(sql);

            return rsSexo;
        }catch(error){
            return false
        }
    }


module.exports = {
    selectAllSexo,
    selectByIdSexo
}