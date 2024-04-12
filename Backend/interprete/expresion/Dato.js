const Instruccion = require('../Instruccion.js');
const {addError} = require('../../analisisSem/manejoErrores');

class Dato extends Instruccion{
    constructor(valor, tipo, fila, columna){
        super();
        this.valor = valor;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno){
        switch(this.tipo){
            case 'int':
                return Number(this.valor);
            case 'string':
                //this.valor = this.valor.replace(/\\"/g, '"');
                //console.log('valor: ', this.valor); //    no  me sustituye el de las comillas
                //.replace("\\\"","\"")
                this.valor = this.valor.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\'/g, "'").replace(/\\\\/g, '\\');
                return this.valor;
            case 'booleano':
                if(this.valor == 'true'){
                    this.valor = true;
                    return this.valor;
                } else {
                    this.valor = false;
                    return this.valor;
                }
            case 'char':
                return this.valor;
            case 'double':
                return Number(this.valor);
            case 'id':
                //validar en obtener del entorno
                this.valor = entorno.getSimbolo(this.valor);
                let data = this.valor.getTipo();
                this.valor = data.valor;
                this.tipo = data.tipo;
                console.log('valor: ', this.tipo, this.valor);
                return this.valor ;
            case 'Error':
                addError('Error Semantico', 'Dato de tipo incorrecto '+ this.tipo +' - '+ this.valor, this.fila, this.columna);
                return;
        }
    }
}

module.exports = Dato;