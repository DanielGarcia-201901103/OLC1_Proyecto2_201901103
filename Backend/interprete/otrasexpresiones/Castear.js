const {Instruccion, TInst} = require('../Instruccion.js');
const { addError } = require('../../analisisSem/manejoErrores');
const { getcont } = require('../../analisisSem/contador.js');

class Castear extends Instruccion {
    constructor(expresion, tipo, fila, columna) {
        super();
        this.expresion = expresion;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        this.valor = 'null';
    }

    interpretar(entorno) {
        try {
            let valor1 = this.expresion.interpretar(entorno);
            switch (this.tipo) {
                case 'int':
                    if(this.expresion.tipo == 'double'){
                        this.expresion.tipo = 'int';
                        this.valor = parseInt(valor1);
                        return this.valor;
                    } else if(this.expresion.tipo == 'char'){
                        this.expresion.tipo = 'int';
                        this.valor = parseInt(valor1.charCodeAt(0));
                        return this.valor;
                    }
                case 'double':
                    if(this.expresion.tipo == 'int'){
                        this.expresion.tipo = 'double';
                        this.valor = parseFloat(valor1);
                        return this.valor;
                    }else if(this.expresion.tipo == 'char'){
                        this.expresion.tipo = 'double';
                        this.valor = parseFloat(valor1.charCodeAt(0));
                        return this.valor;
                    }
                case 'string':
                    if(this.expresion.tipo == 'int'){
                        this.expresion.tipo = 'string';
                        this.valor = String.fromCharCode(valor1);
                        return this.valor;
                    } else if(this.expresion.tipo == 'double'){
                        this.expresion.tipo = 'string';
                        this.valor = String.fromCharCode(valor1);
                        return this.valor;
                    }
                case 'char':
                    if(this.expresion.tipo == 'int'){
                        this.expresion.tipo = 'char';
                        console.log('antes de castear: ', valor1);
                        this.valor = String.fromCharCode(valor1);
                        console.log('valor: ', this.valor);
                        return this.valor;
                    }
                case 'Error':
                    addError('Error Semantico', 'Error de casteo incorrecto: ' + this.expresion.tipo + " a "+this.tipo, this.fila, this.columna);
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

        let asig = this.expresion.getAst();
        //let id = this.id.getAst();
        
        let padre = getcont();
        let op = getcont();
        let paa = getcont();
        let pac = getcont();

        nodo.padre = padre;
        nodo.cadena =
            asig.cadena+
            `${padre}[label="Castear"]\n`+
            `${op}[label="${this.tipo}"]\n`+
            `${paa}[label="("]\n`+
            `${pac}[label=")"]\n`+
            `${padre}--${paa}\n`+
            `${padre}--${op}\n`+
            `${padre}--${pac}\n`+
            `${padre}--${asig.padre}\n`
            ;

        return nodo;
    }
}

module.exports = Castear;