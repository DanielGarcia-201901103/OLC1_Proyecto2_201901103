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

const TInst = {
    PRINT: 'COUT',
    IF: 'IF',
    SWITCH: 'SWITCH',
    DECLARAR: 'DECLARAR',
    WHILE: 'WHILE',
    DOWHILE: 'DOWHILE',
    FOR: 'FOR',
    BREAK: 'BREAK',
    FUNCION: 'FUNCION',
    METODO: 'METODO',
    GLOBAL: 'GLOBAL',
    RETURN: 'RETURN'
}

module.exports = {Instruccion, TInst};