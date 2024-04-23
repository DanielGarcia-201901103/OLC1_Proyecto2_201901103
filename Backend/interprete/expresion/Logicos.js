const {Instruccion, TInst} = require("../Instruccion.js");
const { addError } = require('../../analisisSem/manejoErrores');
const { getcont } = require('../../analisisSem/contador.js');

class Logico extends Instruccion {
    constructor(op1, op2, operador, fila, columna) {
        super();
        this.op1 = op1;
        this.op2 = op2;
        this.operador = operador;
        this.tipo = "Error";
        this.valor = "null";
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            let valor1 = this.op1.interpretar(entorno);
            let valor2 = this.op2.interpretar(entorno);
            switch (this.operador) {
                case '||':
                    if (this.op1.tipo == 'int' && this.op2.tipo == 'int') {
                        this.tipo = 'booleano';
                        if (valor1 || valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'double') {
                        this.tipo = 'booleano';
                        if (valor1 || valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'int') {
                        this.tipo = 'booleano';
                        if (valor1 || valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'double') {
                        this.tipo = 'booleano';
                        if (valor1 || valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'booleano' && this.op2.tipo == 'booleano') {
                        this.tipo = 'booleano';
                        if (valor1 || valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else {
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Logico incorrecto: ' + valor1 + ' o ' + valor2 + ' es de tipo: ' + this.op1.tipo + ' y ' + this.op2.tipo, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        //agregar a la lista de errores
                        return this.valor;
                    }
                case '&&':
                    if (this.op1.tipo == 'int' && this.op2.tipo == 'int') {
                        this.tipo = 'booleano';
                        if (valor1 && valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'double') {
                        this.tipo = 'booleano';
                        if (valor1 && valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'int') {
                        this.tipo = 'booleano';
                        if (valor1 && valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'double') {
                        this.tipo = 'booleano';
                        if (valor1 && valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'booleano' && this.op2.tipo == 'booleano') {
                        this.tipo = 'booleano';
                        if (valor1 && valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else {
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Logico incorrecto: ' + valor1 + ' o ' + valor2 + ' es de tipo: ' + this.op1.tipo + ' y ' + this.op2.tipo, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        //agregar a la lista de errores
                        return this.valor;
                    }
                case '!':
                    if (this.op1.tipo == 'int' && this.op2.tipo == 'int') {
                        this.tipo = 'booleano';
                        this.valor = !valor1;
                        return this.valor;
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'double') {
                        this.tipo = 'booleano';
                        if (valor1 < valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'int') {
                        this.tipo = 'booleano';
                        if (valor1 < valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'double') {
                        this.tipo = 'booleano';
                        if (valor1 < valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'booleano') {
                        this.tipo = 'booleano';
                        if (valor1) {
                            this.valor = false;
                        } else {
                            this.valor = true;
                        }
                        return this.valor;
                    } else {
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Logico incorrecto: ' + valor1 + ' es de tipo: ' + this.op1.tipo, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        //agregar a la lista de errores
                        return this.valor;
                    }
            }
        } catch (error) {
            addError('Error', 'Error al interpretar el logico' + error, this.fila, this.columna);
        }
    }

    
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let izq = this.op1.getAst();
        let der = this.op2.getAst();
        
        let op = getcont();
        let padre = getcont();

        nodo.padre = padre;
        nodo.cadena =
            izq.cadena+
            der.cadena+
            `${op}[label="${this.operador}"]\n`+
            `${padre}[label="Expresion"]\n`+
            `${padre}--${izq.padre}\n`+
            `${padre}--${op}\n`+
            `${padre}--${der.padre}\n`
            ;

        return nodo;
    }
}


module.exports = Logico;
