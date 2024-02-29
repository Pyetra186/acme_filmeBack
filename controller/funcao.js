var acmeFilmes = require ('../modulo/filmes.js')

const listarFilmes = () => {
    let TodosFilmes = acmeFilmes.listaDefilmes.filmes
    let status = false 
    let filmesAray = []
    let filmesJson = {}
    
    TodosFilmes.forEach((filme) => {

        let infoFilmes = {
            id: filme.id,
            nome: filme.nome,
            sinopse: filme.sinopse,
            duracao: filme.duracao,
            dataLancamento: filme.data_lancamento,
            dataRelancamento: filme.data_relancamento,
            fotoCapa: filme.foto_capa,
            valor: filme.valor_unitario
        }
        
        status = true
        filmesAray.push(infoFilmes)
    })
    
    filmesJson.filmes = filmesAray
    
    if(status){
        return filmesJson
    }else{
        return false
    }
}

const FilmeEspecifico = (id) => {
    let todosFilmes = acmeFilmes.listaDefilmes.filmes
    let filmesAray = []
    let filmesJson = {}
    let status = false 
    let idFilmes = id

    todosFilmes.forEach((filme) => {
        if(filme.id == idFilmes){

            filmesJson = {
                nome: filme.nome,
                sinopse: filme.sinopse,
                duracao: filme.duracao,
                dataLancamento: filme.data_lancamento,
                dataRelancamento: filme.data_relancamento,
                fotoCapa: filme.foto_capa,
                valor: filme.valor_unitario
    
            }

            filmesAray.push(filmesJson)
            status = true 
        }
         
    })
        
        filmesJson.filmes = filmesAray
        
        if(status){
            return filmesJson
        }else{
            return false
        }
        
    }
    

   
    //console.log(listarFilmes())
    //console.log(FilmeEspecifico(3))


    module.exports = {
        listarFilmes,
        FilmeEspecifico,
        

    }