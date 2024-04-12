const Instruccion = require("../Instruccion.js");
const Entorno = require('../../analisisSem/Entorno.js');

class Asignacion extends Instruccion{
    constructor(id, expresion, tipo, linea, columna){
        super();
        this.id = id;
        this.expresion = expresion;
        this.tipo = tipo;
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
        if (this.id != null){
            if(this.expresion.valor == "sindato"){
                if (this.expresion.tipo == "int"){
                    this.expresion.valor = 0;
                    for(let i = 0; i < this.id.length; i++){
                        entorno.addSimbolo(this.id[i], this.expresion ,this.tipo, entorno.nombreentorno, this.linea, this.columna);
                    }
                } else if (this.expresion.tipo == "double"){
                    this.expresion.valor = 0.0;
                    for(let i = 0; i < this.id.length; i++){
                        entorno.addSimbolo(this.id[i], this.expresion ,this.tipo, entorno.nombreentorno, this.linea, this.columna);
                    }
                } else if (this.expresion.tipo == "booleano"){
                    this.expresion.valor = true;
                    for(let i = 0; i < this.id.length; i++){
                        entorno.addSimbolo(this.id[i],this.expresion ,this.tipo, entorno.nombreentorno, this.linea, this.columna);
                    }
                } else if (this.expresion.tipo == "char" || this.tipo == "string"){
                    this.expresion.valor = "";
                    for(let i = 0; i < this.id.length; i++){
                        entorno.addSimbolo(this.id[i], this.expresion ,this.tipo, entorno.nombreentorno, this.linea, this.columna);
                    }
                }
            }else{
                for(let i = 0; i < this.id.length; i++){
                    entorno.addSimbolo(this.id[i],this.expresion ,this.tipo, entorno.nombreentorno, this.linea, this.columna);
                }
            }
        }
        //esto hay que corregirlo para que acepete el valor de la variable
        //entorno.addSimbolo(this.id,this.expresion ,this.tipo, this.tipodato, entorno.nombreentorno, this.linea, this.columna);
        return this;
    }
}

module.exports = Asignacion;