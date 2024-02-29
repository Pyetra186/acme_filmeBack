/***********************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados no Banco de Dados Msql,
 *          aqui realizaremos o CRUD (Create, Read, Update, Delete) utilizando a linguagem SQL
 * Data: 01/02/2024
 * Autor: Pietra Volpato
 * Versão: 1.0
 * 
 *********************************************************************************************/

//Import da biblioteca do prisma/client
 const { PrismaClient } = require('@prisma/client');

//Instância da classe prisma client
 const prisma = new PrismaClient();



// Função para inserir um filme no Banco de Dados
const insertFilme = async function(){

}

// Função para atualizar um filme no Banco de Dados
const updateFilme = async function(){

}

// Funçao para excluir um filme no Banco de Dados
const deleteFilme = async function(){

}

// Função para listar todos os filmes do Banco de Dados
const selectAllFilmes = async function(){

    let sql = 'select * from tbl_filme';

    //$queryRawUnsafe(sql)
    //$queryRaw('select * from tbl_filme')

    let rsFilmes = await prisma.$queryRawUnsafe(sql);

    if(rsFilmes.length > 0)
        return rsFilmes;
    else  
        return false;
}

// Função para buscar um filme do Banco de Dados pelo Id
const selectByIdFilme = async function(id){

    try{
        let sql = `select * from tbl_filme where id = ${id}`;
    
        let rsFilme = await prisma.$queryRawUnsafe(sql);
    
        
            return rsFilme;

    }catch(error){

        return false

    }

}

const selectByNomeFilme = async function(nome){

    let sql = 'select nome from tbl_filme';

    let rsFilmes = await prisma.$queryRawUnsafe(sql);

    if(rsFilmes.length > 0)
      return rsFilmes;
    else
      return false;
}

module.exports = {
    insertFilme, 
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNomeFilme
}