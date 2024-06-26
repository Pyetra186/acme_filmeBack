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
const insertFilme = async function(dadosFilme){
   

    let sql;

    try {

        if(dadosFilme.data_relancamento != '' &&
        dadosFilme.data_relancamento != null &&
        dadosFilme.data_relancamento!= undefined
        ){

            sql = `insert into tbl_filme(
                nome, 
                sinopse, 
                duracao, 
                data_lancamento, 
                data_relancamento, 
                foto_capa, 
                valor_unitario,
                classificacao_id
                ) values ( 
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.duracao}', 
                '${dadosFilme.data_lancamento}', 
                '${dadosFilme.data_relancamento}', 
                '${dadosFilme.foto_capa}', 
                '${dadosFilme.valor_unitario}',
                '${dadosFilme.classificacao_id}'
                
                )`;
    
                
        }else{
            sql = `insert into tbl_filme(
                nome, 
                sinopse, 
                duracao, 
                data_lancamento, 
                data_relancamento, 
                foto_capa, 
                valor_unitario,
                classificacao_id
                )
                        values ( 
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.duracao}', 
                '${dadosFilme.data_lancamento}', 
                null, 
                '${dadosFilme.foto_capa}', 
                '${dadosFilme.valor_unitario}',
               ' ${dadosFilme.classificacao_id}'
                )`;
            }


        
// $executeRawUnsafe() -  serve para EXECUTAR scripts sem retorno de dados
//(insert, update e delette) 
// $queryRawUnsafe() -   serve para executar(PESQUISAR) scripts com retorno de dados (select) 

let result = await prisma.$executeRawUnsafe(sql);
console.log(result);

 if(result)
    return true;
 else
    return false;

}catch  (error) {
    
        return false;
    }
    

}

const InsertById = async function(){
    try{
        let sql = `select cast(last_insert_id()as DECIMAL) as id from tbl_filme limit 1`;
        let rsFilme = await prisma.$queryRawUnsafe(sql);

        return rsFilme;
    }catch (error) {
        return false
    }
}
// Função para atualizar um filme no Banco de Dados
const updateFilme = async function(dadosFilme, id){

    
        let sql
    
                try{
             
                 if( dadosFilme.data_relancamento != '' &&
                     dadosFilme.data_relancamento != null &&
                     dadosFilme.data_relancamento!= undefined
                     ){
                 
                         sql = `update tbl_filme set
                             nome = replace("${dadosFilme.nome}","'","#"),
                             sinopse = replace("${dadosFilme.sinopse}", "'", "#"),
                             duracao = '${dadosFilme.duracao}', 
                             data_lancamento = '${dadosFilme.data_lancamento}', 
                             data_relancamento = '${dadosFilme.data_relancamento}', 
                             foto_capa = '${dadosFilme.foto_capa}', 
                             valor_unitario = '${dadosFilme.valor_unitario},'
                             classificacao_id = '${dadosFilme.classificacao_id}'
                             where tbl_filme.id = ${id}
                             `;

                     }else{
                         sql = `update tbl_filme set
                            nome = replace("${dadosFilme.nome}","'","#"),
                             sinopse =  replace("${dadosFilme.sinopse}", "'", "#"),
                             duracao = '${dadosFilme.duracao}', 
                             data_lancamento = '${dadosFilme.data_lancamento}', 
                             data_relancamento = null, 
                             foto_capa = '${dadosFilme.foto_capa}', 
                             valor_unitario = '${dadosFilme.valor_unitario}',
                             classificacao_id = '${dadosFilme.classificacao_id}'
                             where tbl_filme.id = ${id}
                             `;
                     }
                     
             
                     let rsFilme = await prisma.$executeRawUnsafe(sql);
             
                     if(rsFilme)
                 return true;
              else
                 return false;
             
             }catch  (error) {
                 
                return false;
                 }
             
}
// Funçao para excluir um filme no Banco de Dados
async function deleteFilme(id) {

    try {
        let sql = `delete from tbl_filme where id = ${id}`;

        let rsFilme = await prisma.$queryRawUnsafe(sql);

        return rsFilme;

    } catch (error) {

        return false;

    }

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

    try {

        let sql = `select * from tbl_filme where nome LIKE "%${nome}%"`
        let rsFilmes = await prisma.$queryRawUnsafe(sql);
    
            return rsFilmes;
        } catch (error) {
            return false
        }
        
}

module.exports = {
    insertFilme, 
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNomeFilme,
    InsertById
}