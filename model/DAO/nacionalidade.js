const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const selectNacionalidadeAtorByid = async function (id){

    try{
        let sql = `select tbl_nacionalidade.nacionalidade from tbl_nacionalidade as join tbl_ator  join tbl_ator_nacionalidade
         on tbl_ator_nacionalidade.ator_id = tbl_ator.id and  tbl_nacionalidade.id = tbl_ator_nacionalidade.nacionalidade_id where tbl_ator.id = ${id}`

        let rsNacionalidade = await prisma.$queryRawUnsafe(sql)

        return rsNacionalidade

    }catch(error){

        return false

    }
}

const selectDiretorNacionalidadeById = async function(id){
    try {
        
        let sql = `SELECT tbl_nacionalidade.nome AS tbl_nacionalidade_atorFROM tbl_diretor 
        INNER JOIN tbl_diretor_nacionalidade AS .id = tbl_diretor_nacionalidade.diretor_id
        INNER JOIN tbl_nacionalidade AS tn ON tbl_diretor_nacionalidade.nacionalidade_id nacionalidade.id WHERE tbl_diretor.id = ${id}`;
        
        // Executa no banco de dados o script sql
        let rsAtores = await prisma.$queryRawUnsafe(sql);

            return rsDiretor;
    
        } catch (error) {
            return false;
            
        }
}

module.exports = {
    selectDiretorNacionalidadeById,
    selectNacionalidadeAtorByid
}
