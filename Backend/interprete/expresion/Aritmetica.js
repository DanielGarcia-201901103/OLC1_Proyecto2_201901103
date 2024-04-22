const Instruccion = require('../Instruccion.js')
const { addError } = require('../../analisisSem/manejoErrores');
const { getcont } = require('../../analisisSem/contador.js');
class Aritmetica extends Instruccion {
    constructor(op1, op2, operador, fila, columna) {
        super();
        this.op1 = op1;
        this.op2 = op2;
        this.operador = operador;
        this.tipo = 'Error';
        this.valor = 'null';
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            let valor1 = this.op1.interpretar(entorno);
            let valor2 = this.op2.interpretar(entorno);

            switch (this.operador) {
                case '+':
                    if (this.op1.tipo == 'int' && this.op2.tipo == 'int') {
                        this.tipo = 'int';
                        this.valor = valor1 + valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'double') {
                        this.tipo = 'double';
                        this.valor = valor1 + valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'int') {
                        this.tipo = 'double';
                        this.valor = valor1 + valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'booleano') {
                        this.tipo = 'int';
                        if (valor2 == true) {
                            valor2 = 1;
                        } else {
                            valor2 = 0;
                        }
                        this.valor = valor1 + valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'booleano' && this.op2.tipo == 'int') {
                        this.tipo = 'int';
                        if (valor1 == true) {
                            valor1 = 1;
                        } else {
                            valor1 = 0;
                        }
                        this.valor = valor1 + valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'char') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'int';
                        this.valor = valor1 + valor2.charCodeAt(0);
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'char' && this.op2.tipo == 'int') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'int';
                        this.valor = valor1.charCodeAt(0) + valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'string') {
                        this.tipo = 'string';
                        this.valor = String(valor1) + String(valor2);
                        return this.valor;
                    } else if (this.op1.tipo == 'string' && this.op2.tipo == 'int') {
                        this.tipo = 'string';
                        this.valor = String(valor1) + String(valor2);
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'double') {
                        this.tipo = 'double';
                        this.valor = valor1 + valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'booleano') {
                        this.tipo = 'double';
                        if (valor2 == true) {
                            valor2 = 1;
                        } else {
                            valor2 = 0;
                        }
                        this.valor = valor1 + valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'booleano' && this.op2.tipo == 'double') {
                        this.tipo = 'double';
                        if (valor1 == true) {
                            valor1 = 1;
                        } else {
                            valor1 = 0;
                        }
                        this.valor = valor1 + valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'string') {
                        this.tipo = 'string';
                        this.valor = String(valor1) + String(valor2);
                        return this.valor;
                    } else if (this.op1.tipo == 'string' && this.op2.tipo == 'double') {
                        this.tipo = 'string';
                        this.valor = String(valor1) + String(valor2);
                        return this.valor;
                    } else if (this.op1.tipo == 'booleano' && this.op2.tipo == 'string') {
                        this.tipo = 'string';
                        if (valor1 == true) {
                            valor1 = 'true';
                        } else {
                            valor1 = 'false';
                        }
                        this.valor = valor1 + valor2;
                        return this.valor;
                    } else if (this.op1.tipo == 'string' && this.op2.tipo == 'booleano') {
                        this.tipo = 'string';
                        if (valor2 == true) {
                            valor2 = 'true';
                        } else {
                            valor2 = 'false';
                        }
                        this.valor = valor1 + valor2;
                        return this.valor;
                    } else if (this.op1.tipo == 'string' && this.op2.tipo == 'string') {
                        this.tipo = 'string';
                        this.valor = String(valor1) + String(valor2);
                        return this.valor;
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'char') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'double';
                        this.valor = valor1 + valor2.charCodeAt(0);
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'char' && this.op2.tipo == 'double') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'double';
                        this.valor = valor1.charCodeAt(0) + valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'char' && this.op2.tipo == 'char') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'string';
                        this.valor = valor1 + valor2;
                        return this.valor;
                    } else if (this.op1.tipo == 'char' && this.op2.tipo == 'string') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'string';
                        this.valor = valor1 + valor2;
                        return this.valor;
                    } else if (this.op1.tipo == 'string' && this.op2.tipo == 'char') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'string';
                        this.valor = valor1 + valor2;
                        return this.valor;
                    }   //queda pendiente los que llevan caracter char
                    else {
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Operación de tipo incorrecta ' + this.valor, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        //agregar a la lista de errores
                        return this.valor;
                    }

                case '-':
                    if (this.op1.tipo == 'int' && this.op2.tipo == 'int') {
                        this.tipo = 'int';
                        this.valor = valor1 - valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'double') {
                        this.tipo = 'double';
                        this.valor = valor1 - valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'int') {
                        this.tipo = 'double';
                        this.valor = valor1 - valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'booleano') {
                        this.tipo = 'int';
                        if (valor2 == true) {
                            valor2 = 1;
                        } else {
                            valor2 = 0;
                        }
                        this.valor = valor1 - valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'double') {
                        this.tipo = 'double';
                        this.valor = valor1 - valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'booleano') {
                        this.tipo = 'double';
                        if (valor2 == true) {
                            valor2 = 1;
                        } else {
                            valor2 = 0;
                        }
                        this.valor = valor1 - valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'booleano' && this.op2.tipo == 'int') {
                        this.tipo = 'int';
                        if (valor1 == true) {
                            valor1 = 1;
                        } else {
                            valor1 = 0;
                        }
                        this.valor = valor1 - valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'booleano' && this.op2.tipo == 'double') {
                        this.tipo = 'double';
                        if (valor1 == true) {
                            valor1 = 1;
                        } else {
                            valor1 = 0;
                        }
                        this.valor = valor1 - valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'char' && this.op2.tipo == 'double') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'double';
                        this.valor = valor1.charCodeAt(0) - valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'char' && this.op2.tipo == 'int') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'int';
                        this.valor = valor1.charCodeAt(0) - valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'char') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'int';
                        this.valor = valor1 - valor2.charCodeAt(0);
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'char') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'int';
                        this.valor = valor1 - valor2.charCodeAt(0);
                        return Number(this.valor);
                    } else {
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Operación de tipo incorrecta ' + this.valor, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        return this.valor;
                    }
                case '*':
                    if (this.op1.tipo == 'int' && this.op2.tipo == 'int') {
                        this.tipo = 'int';
                        this.valor = valor1 * valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'double') {
                        this.tipo = 'double';
                        this.valor = valor1 * valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'int') {
                        this.tipo = 'double';
                        this.valor = valor1 * valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'double') {
                        this.tipo = 'double';
                        this.valor = valor1 * valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'char' && this.op2.tipo == 'double') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'double';
                        this.valor = valor1.charCodeAt(0) * valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'char' && this.op2.tipo == 'int') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'int';
                        this.valor = valor1.charCodeAt(0) * valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'char') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'int';
                        this.valor = valor1 * valor2.charCodeAt(0);
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'char') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'int';
                        this.valor = valor1 * valor2.charCodeAt(0);
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == null) {
                        this.tipo = 'int';
                        this.valor = valor1 * -1;
                        return Number(this.valor);
                    } // Faltan las validaciones para caracter
                    else {
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Operación de tipo incorrecta ' + this.valor, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        return this.valor;
                    }
                case '/':
                    if (this.op1.tipo == 'int' && this.op2.tipo == 'int') {
                        this.tipo = 'double';
                        this.valor = valor1 / valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'double') {
                        this.tipo = 'double';
                        this.valor = valor1 / valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'int') {
                        this.tipo = 'double';
                        this.valor = valor1 / valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'double') {
                        this.tipo = 'double';
                        this.valor = valor1 / valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'char' && this.op2.tipo == 'double') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'double';
                        this.valor = valor1.charCodeAt(0) / valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'char' && this.op2.tipo == 'int') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'int';
                        this.valor = valor1.charCodeAt(0) / valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'char') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'int';
                        this.valor = valor1 / valor2.charCodeAt(0);
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'char') {
                        // ME quedé aquí, hay que convertir el char a int y sumar, tiene que tomar el valor ascii y devolver un int
                        this.tipo = 'int';
                        this.valor = valor1 / valor2.charCodeAt(0);
                        return Number(this.valor);
                    } else {
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Operación de tipo incorrecta ' + this.valor, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        return this.valor;
                    }
                case '%':
                    if (this.op1.tipo == 'int' && this.op2.tipo == 'int') {
                        this.tipo = 'double';
                        this.valor = valor1 % valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'double') {
                        this.tipo = 'double';
                        this.valor = valor1 % valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'int') {
                        this.tipo = 'double';
                        this.valor = valor1 % valor2;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'double') {
                        this.tipo = 'double';
                        this.valor = valor1 % valor2;
                        return Number(this.valor);
                    }
                    else {
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Operación de tipo incorrecta ' + this.valor, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        return this.valor;
                    }
                case 'pow':
                    if (this.op1.tipo == 'int' && this.op2.tipo == 'int') {
                        this.tipo = 'int';
                        this.valor = Math.pow(valor1, valor2); // ó valor1 ** valor2
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'int' && this.op2.tipo == 'double') {
                        this.tipo = 'double';
                        this.valor = Math.pow(valor1, valor2); // ó valor1 ** valor2
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'int') {
                        this.tipo = 'double';
                        this.valor = Math.pow(valor1, valor2); // ó valor1 ** valor2
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double' && this.op2.tipo == 'double') {
                        this.tipo = 'double';
                        this.valor = Math.pow(valor1, valor2); // ó valor1 ** valor2
                        return Number(this.valor);
                    }
                    else {
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Operación de tipo incorrecta ' + this.valor, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        return this.valor;
                    }
                case '-unario':
                    if (this.op1.tipo == 'int') {
                        this.tipo = 'int';
                        this.valor = valor1 * -1;
                        return Number(this.valor);
                    } else if (this.op1.tipo == 'double') {
                        this.tipo = 'double';
                        this.valor = valor1 * -1;
                        return Number(this.valor);
                    } else {
                        this.tipo = 'Error';
                        addError('Error Semantico', 'Operación de tipo incorrecta ' + this.valor, this.fila, this.columna);
                        //este es un error semantico : error de tipo de dato
                        return this.valor;
                    }
                default:
                    this.tipo = 'Error';
                    addError('Error Semantico', 'Operación de tipo incorrecta ' + this.valor, this.fila, this.columna);
                    //este es un error semantico : error de tipo de dato
                    return this.valor;
            }
        } catch (error) {
            addError('Error', 'Error al realizar la operación aritmética ' + error, this.fila, this.columna);

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
            `${padre}[label="expresion"]\n`+
            `${padre}--${izq.padre}\n`+
            `${padre}--${op}\n`+
            `${padre}--${der.padre}\n`
            ;

        return nodo;
    }
}
module.exports = Aritmetica;

// Me quedé en el minuto 1:05:54
//comenzando el else
//la clase es la del 11/03/2024
//https://drive.google.com/drive/u/0/search?q=laboratorio%20compiladores