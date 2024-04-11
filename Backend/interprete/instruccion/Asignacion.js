const Instruccion = require("../Instruccion.js");

class Asignacion extends Instruccion{
    constructor(id, expresion, tipo, tipodato,linea, columna){
        super();
        this.id = id;
        this.expresion = expresion;
        this.tipo = tipo;
        this.tipodato = tipodato;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno){
        this.expresion.interpretar(entorno);
        if(this.expresion.tipo != this.tipo){
            console.error('Error de tipos en la declaración de variable');
            //error semantico
            return this;
        }

        //esto hay que corregirlo para que acepete el valor de la variable
        entorno.addSimbolo(this.id,this.expresion ,this.tipo, this.tipodato, entorno.nombreentorno, this.linea, this.columna);
        return this;
    }
}

module.exports = Asignacion;