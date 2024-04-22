const Instruccion = require('../Instruccion.js');
const { addError } = require('../../analisisSem/manejoErrores');
const { getcont } = require('../../analisisSem/contador.js');
class Dato extends Instruccion {
    constructor(valor,tipo, fila, columna) {
        super();
        this.valor = valor;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
                switch (this.tipo) {
                    case 'int':
                        return Number(this.valor);
                    case 'string':
                        //this.valor = this.valor.replace(/\\"/g, '"');
                        //console.log('valor: ', this.valor); //    no  me sustituye el de las comillas
                        //.replace("\\\"","\"")
                        this.valor = this.valor.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\'/g, "'").replace(/\\\\/g, '\\');
                        return this.valor;
                    case 'booleano':
                        if (this.valor == 'true') {
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
                        addError('Error Semantico', 'Dato de tipo incorrecto ' + this.tipo + ' - ' + this.valor, this.fila, this.columna);
                        return;
                }
            
        } catch (error) {
            addError('Error', 'Error al interpretar el dato' + error, this.fila, this.columna);
        }
    }

    
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let nodoDato = getcont();
        let nodoPadre = getcont();

        let cadena = 
        `${nodoDato}[label="${this.valor}"]\n`+
        `${nodoPadre}[label="Expresion"]\n`+
        `${nodoPadre}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        return nodo;
    }
}

module.exports = Dato;