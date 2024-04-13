const Instruccion = require("../Instruccion.js");
const { addError } = require('../../analisisSem/manejoErrores');

class Relacional extends Instruccion {
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
                case '==':
                    if (this.op1.tipo == 'int' && this.op2.tipo == 'int') {
                        this.tipo = 'booleano';
                        if (valor1 == valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'double') {
                        this.tipo = 'booleano';
                        if (valor1 == valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'int') {
                        this.tipo = 'booleano';
                        if (valor1 == valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'double') {
                        this.tipo = 'booleano';
                        if (valor1 == valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else {
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Relacional incorrecto: ' + valor1 + ' o ' + valor2 + ' es de tipo: ' + this.op1.tipo + ' y ' + this.op2.tipo, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        //agregar a la lista de errores
                        return this.valor;
                    }
                case '!=':
                    if (this.op1.tipo == 'int' && this.op2.tipo == 'int') {
                        this.tipo = 'booleano';
                        if (valor1 != valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'double') {
                        this.tipo = 'booleano';
                        if (valor1 != valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'int') {
                        this.tipo = 'booleano';
                        if (valor1 != valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'double') {
                        this.tipo = 'booleano';
                        if (valor1 != valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else {
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Relacional incorrecto: ' + valor1 + ' o ' + valor2 + ' es de tipo: ' + this.op1.tipo + ' y ' + this.op2.tipo, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        //agregar a la lista de errores
                        return this.valor;
                    }
                case '<':
                    if (this.op1.tipo == 'int' && this.op2.tipo == 'int') {
                        this.tipo = 'booleano';
                        if (valor1 < valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
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
                    } else {
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Relacional incorrecto: ' + valor1 + ' o ' + valor2 + ' es de tipo: ' + this.op1.tipo + ' y ' + this.op2.tipo, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        //agregar a la lista de errores
                        return this.valor;
                    }
                case '<=':
                    if (this.op1.tipo == 'int' && this.op2.tipo == 'int') {
                        this.tipo = 'booleano';
                        if (valor1 <= valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'double') {
                        this.tipo = 'booleano';
                        if (valor1 <= valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'int') {
                        this.tipo = 'booleano';
                        if (valor1 <= valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'double') {
                        this.tipo = 'booleano';
                        if (valor1 <= valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else {
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Relacional incorrecto: ' + valor1 + ' o ' + valor2 + ' es de tipo: ' + this.op1.tipo + ' y ' + this.op2.tipo, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        //agregar a la lista de errores
                        return this.valor;
                    }
                case '>':
                    if (this.op1.tipo == 'int' && this.op2.tipo == 'int') {
                        this.tipo = 'booleano';
                        if (valor1 > valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'double') {
                        this.tipo = 'booleano';
                        if (valor1 > valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'int') {
                        this.tipo = 'booleano';
                        if (valor1 > valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'double') {
                        this.tipo = 'booleano';
                        if (valor1 > valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else {
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Relacional incorrecto: ' + valor1 + ' o ' + valor2 + ' es de tipo: ' + this.op1.tipo + ' y ' + this.op2.tipo, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        //agregar a la lista de errores
                        return this.valor;
                    }
                case '>=':
                    if (this.op1.tipo == 'int' && this.op2.tipo == 'int') {
                        this.tipo = 'booleano';
                        if (valor1 >= valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'double') {
                        this.tipo = 'booleano';
                        if (valor1 >= valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'int') {
                        this.tipo = 'booleano';
                        if (valor1 >= valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'double') {
                        this.tipo = 'booleano';
                        if (valor1 >= valor2) {
                            this.valor = true;
                        } else {
                            this.valor = false;
                        }
                        return this.valor;
                    } else {
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Relacional incorrecto: ' + valor1 + ' o ' + valor2 + ' es de tipo: ' + this.op1.tipo + ' y ' + this.op2.tipo, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        //agregar a la lista de errores
                        return this.valor;
                    }
            }
        } catch (error) {
            addError('Error', 'Error al interpretar la expresion relacional', this.fila, this.columna);
        }
    }
}


module.exports = Relacional;
