class Simbolo{
    constructor(id, tipo, tipodato, entorno, linea, columna){
        this.id = id;
        this.tipo = tipo;
        this.tipodato = tipodato;
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
    getTipoDato(){
        return this.tipodato;
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
    setTipoDato(tipodato){
        this.tipodato = tipodato;
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

module.exports = Simbolo;