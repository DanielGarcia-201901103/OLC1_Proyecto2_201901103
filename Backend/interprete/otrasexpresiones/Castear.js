const Instruccion = require('../Instruccion.js');
const { addError } = require('../../analisisSem/manejoErrores');

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
                        this.valor = parseFloat(valor1).toFixed(2);
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
                case 'id':
                    //validar en obtener del entorno
                    /* */
                    console.log("Estoy en id para castear: ", this.valor1);
                    this.valor = entorno.getSimbolo(this.valor1);
                    let data = this.valor.getTipo();
                    this.valor = data.valor;
                    this.tipo = data.tipo;
                    console.log("Estoy en id para castear: ", this.valor);
                    console.log("Estoy en id para castear: ", this.tipo);
                    if (this.tipo == 'int' || this.tipo == 'double') {
                        this.valor = Number(this.valor);
                    } else if (this.tipo == 'string') {
                        this.valor = this.valor.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\'/g, "'").replace(/\\\\/g, '\\');
                    } else if (this.tipo == 'char') {
                        this.valor = this.valor;
                    }
                    return this.valor;
                case 'Error':
                    addError('Error Semantico', 'Error de casteo incorrecto: ' + this.expresion.tipo + " a "+this.tipo, this.fila, this.columna);
                    return;
            }
        } catch (error) {
            addError('Error', 'Error al interpretar el dato' + error, this.fila, this.columna);
        }
    }
}

module.exports = Castear;