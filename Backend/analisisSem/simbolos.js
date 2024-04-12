class Simbolo{
    constructor(id, tipo, entorno, linea, columna){
        this.id = id;
        this.tipo = tipo;
        this.entorno = entorno;
        this.linea = linea;
        this.columna = columna;
    }

    getId(){
        return this.id;
    }
    getTipo(){
        return this.tipo;
    }
    getEntorno(){
        return this.entorno;
    }
    getLinea(){
        return this.linea;
    }
    getColumna(){
        return this.columna;
    }
    setId(id){
        this.id = id;
    }
    setTipo(tipo){
        this.tipo = tipo;
    }
    setEntorno(entorno){
        this.entorno = entorno;
    }
    setLinea(linea){
        this.linea = linea;
    }
    setColumna(columna){
        this.columna = columna;
    }
    
}
const TipoSimbolo = {
    VARIABLE: 'VARIABLE',
    ARREGLO: 'ARREGLO',
    FUNCION: 'FUNCION',
    CLASE: 'CLASE'
}

module.exports = {Simbolo,
    TipoSimbolo};