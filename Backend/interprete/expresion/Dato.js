const Instruccion = require('../Instruccion.js')

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
            case 'Error':
                console.log('Error semantico: No se puede interpretar un dato con error. ', this.valor);
                return;
        }
    }
}

module.exports = Dato;