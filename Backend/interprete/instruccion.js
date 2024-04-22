class Instruccion{
    constructor(){}
    interpretar(entorno){
        
    }

    getAst(){ 
        let nodo = {
            padre: -1,
            cadena: ""
        }
        return nodo;
    }
}

module.exports = Instruccion;