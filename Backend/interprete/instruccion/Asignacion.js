const Instruccion = require("../Instruccion.js");

class Asignacion extends Instruccion{
    constructor(id, expresion, tipodato, linea, columna){
        super();
        this.id = id;
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno){
        let expresion = this.expresion.interpretar(entorno);
        //esto hay que corregirlo para que acepete el valor de la variable
        entorno.addSimbolo(this.id,expresion ,"Variable", tipodato, entorno.nombreentorno, this.linea, this.columna);
    }
}

module.exports = Asignacion;