const Instruccion = require('../Instruccion.js')
const { addError } = require('../../analisisSem/manejoErrores');
const { getcont } = require('../../analisisSem/contador.js');

class IncrementoDecremento2 extends Instruccion {
    constructor(op1, operador, fila, columna, validan, id) {
        super();
        this.op1 = op1;
        this.id = id;
        this.operador = operador;
        this.tipo = 'Error';
        this.valor = 'null';
        this.fila = fila;
        this.columna = columna;
        this.validan = validan;
    }
    /*1. Interpretar la expresion
    2. Si la expresion es un entero o double, se realiza la operacion de incremento o decremento
    3. Si la expresion es un id, se busca el valor en la tabla de simbolos y se realiza la operacion de incremento o decremento
    3. Se actualiza el valor de la variable en la tabla de simbolos
    */
    interpretar(entorno) {
        try {
            let valor1 = this.op1.interpretar(entorno);
            if (this.validan == "id") {
                switch (this.operador) {
                    case '++':
                        if (this.op1.tipo == 'int') {
                            this.tipo = 'int';
                            this.valor = valor1 + 1;
                            let simbolo = entorno.getSimbolo(this.id);
                            let data = simbolo.getTipo();
                            data.valor = Number(this.valor);
                            data.tipo = this.tipo;
                            entorno.actualizarSimbolo(this.id, data);

                            return Number(this.valor);
                        } else if (this.op1.tipo == 'double') {
                            this.tipo = 'double';
                            this.valor = valor1 + 1;
                            let simbolo = entorno.getSimbolo(this.id);
                            let data = simbolo.getTipo();
                            data.valor = Number(this.valor);
                            data.tipo = this.tipo;
                            entorno.actualizarSimbolo(this.id, data);

                            return Number(this.valor);
                        } else {
                            this.tipo = 'Error';
                            addError('Error Semantico', 'Operación de tipo incorrecta, no se puede incrementar ' + this.valor, this.fila, this.columna);
                            //este es un error semantico : error de tipo de dato
                            //agregar a la lista de errores
                            return this.valor;
                        }
                    case '--':
                        if (this.op1.tipo == 'int') {
                            this.tipo = 'int';
                            this.valor = valor1 - 1;
                            let simbolo = entorno.getSimbolo(this.id);
                            let data = simbolo.getTipo();
                            data.valor = Number(this.valor);
                            data.tipo = this.tipo;
                            entorno.actualizarSimbolo(this.id, data);

                            return Number(this.valor);
                        } else if (this.op1.tipo == 'double') {
                            this.tipo = 'double';
                            this.valor = valor1 - 1;
                            let simbolo = entorno.getSimbolo(this.id);
                            let data = simbolo.getTipo();
                            data.valor = Number(this.valor);
                            data.tipo = this.tipo;
                            entorno.actualizarSimbolo(this.id, data);

                            return Number(this.valor);
                        } else {
                            this.tipo = 'Error';
                            addError('Error Semantico', 'Operación de tipo incorrecta, no se puede hacer decremento ' + this.valor, this.fila, this.columna);
                            //este es un error semantico : error de tipo de dato
                            //agregar a la lista de errores
                            return this.valor;
                        }
                    default:
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Operación de tipo incorrecta ' + this.valor, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        return this.valor;
                }
            } else {
                switch (this.operador) {
                    case '++':
                        if (this.op1.tipo == 'int') {
                            this.tipo = 'int';
                            this.valor = valor1 + 1;
                            return Number(this.valor);
                        } else if (this.op1.tipo == 'double') {
                            this.tipo = 'double';
                            this.valor = valor1 + 1;
                            return Number(this.valor);
                        } else {
                            this.tipo = 'Error';
                            addError('Error Semantico', 'Operación de tipo incorrecta, no se puede incrementar ' + this.valor, this.fila, this.columna);
                            //este es un error semantico : error de tipo de dato
                            //agregar a la lista de errores
                            return this.valor;
                        }
                    case '--':
                        if (this.op1.tipo == 'int') {
                            this.tipo = 'int';
                            this.valor = valor1 - 1;
                            return Number(this.valor);
                        } else if (this.op1.tipo == 'double') {
                            this.tipo = 'double';
                            this.valor = valor1 - 1;
                            return Number(this.valor);
                        } else {
                            this.tipo = 'Error';
                            addError('Error Semantico', 'Operación de tipo incorrecta, no se puede hacer decremento ' + this.valor, this.fila, this.columna);
                            //este es un error semantico : error de tipo de dato
                            //agregar a la lista de errores
                            return this.valor;
                        }
                    default:
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Operación de tipo incorrecta ' + this.valor, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        return this.valor;
                }
            }
        } catch (error) {
            addError('Error', 'Error al realizar el incremento o decremento' + error, this.fila, this.columna);

        }
    }
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let der = this.op1.getAst();
        
        let op = getcont();
        let padre = getcont();

        nodo.padre = padre;
        nodo.cadena =
            der.cadena+
            `${op}[label="${this.operador}"]\n`+
            `${padre}[label="Expresion"]\n`+
            `${padre}--${this.id}\n`+
            `${padre}--${op}\n`
            ;

        return nodo;
    }
}
module.exports = IncrementoDecremento2;