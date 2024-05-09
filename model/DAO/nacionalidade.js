const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const selectNacionalidadeAtorByid = async function (id){

    try{
        let sql = `
        SELECT tbl_nacionalidade.nome
        FROM tbl_nacionalidade 
        JOIN tbl_ator_nacionalidade ON tbl_nacionalidade.id = tbl_ator_nacionalidade.nacionalidade_id 
        JOIN tbl_ator ON tbl_ator_nacionalidade.ator_id = tbl_ator.id 
        WHERE tbl_ator.id = ${id}`

        let rsNacionalidade = await prisma.$queryRawUnsafe(sql)

        return rsNacionalidade

    }catch(error){

        return false

    }
}

const selectDiretorNacionalidadeById = async function(id){
    try {
        
        let sql = `
        SELECT tbl_nacionalidade.nome
        FROM tbl_nacionalidade 
        JOIN tbl_diretor_nacionalidade ON tbl_nacionalidade.id = tbl_diretor_nacionalidade.nacionalidade_id 
        JOIN tbl_diretor ON tbl_diretor_nacionalidade.diretor_id = tbl_diretor.id 
        WHERE tbl_diretor.id = ${id}`;
        
        // Executa no banco de dados o script sql
        let rsDiretor = await prisma.$queryRawUnsafe(sql);

            return rsDiretor;
    
        } catch (error) {
            return false;
            
        }
}

module.exports = {
    selectDiretorNacionalidadeById,
    selectNacionalidadeAtorByid
}
