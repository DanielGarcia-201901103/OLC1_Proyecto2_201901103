const Instruccion = require("../Instruccion.js");

class Relacional extends Instruccion {
    constructor(op1, op2, operador) {
        super();
        this.op1 = op1;
        this.op2 = op2;
        this.operador = operador;
        this.tipo = "Error";
        this.valor = "null";
    }

    interpretar(entorno) {
        let valor1 = this.op1.interpretar(entorno);
        let valor2 = this.op2.interpretar(entorno);
        switch (this.operador) {
            case '==':
                if(this.op1.tipo == 'int' && this.op2.tipo == 'int'){
                    this.tipo = 'booleano';
                    if (valor1 == valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else if(this.op1.tipo == 'int' && this.op2.tipo == 'double'){
                    this.tipo = 'booleano';
                    if (valor1 == valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else if(this.op1.tipo == 'double' && this.op2.tipo == 'int'){
                    this.tipo = 'booleano';
                    if (valor1 == valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else if(this.op1.tipo == 'double' && this.op2.tipo == 'double'){
                    this.tipo = 'booleano';
                    if (valor1 == valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else{
                    this.tipo = 'Error';
                    //este es un error semantico : error de tipo de dato
                    //agregar a la lista de errores
                    return this.valor;
                }
            case '!=':
                if(this.op1.tipo == 'int' && this.op2.tipo == 'int'){
                    this.tipo = 'booleano';
                    if (valor1 != valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                }  else if(this.op1.tipo == 'int' && this.op2.tipo == 'double'){
                    this.tipo = 'booleano';
                    if (valor1 != valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else if(this.op1.tipo == 'double' && this.op2.tipo == 'int'){
                    this.tipo = 'booleano';
                    if (valor1 != valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else if(this.op1.tipo == 'double' && this.op2.tipo == 'double'){
                    this.tipo = 'booleano';
                    if (valor1 != valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else{
                    this.tipo = 'Error';
                    //este es un error semantico : error de tipo de dato
                    //agregar a la lista de errores
                    return this.valor;
                }
            case '<':
                if(this.op1.tipo == 'int' && this.op2.tipo == 'int'){
                    this.tipo = 'booleano';
                    if (valor1 < valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                }  else if(this.op1.tipo == 'int' && this.op2.tipo == 'double'){
                    this.tipo = 'booleano';
                    if (valor1 < valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else if(this.op1.tipo == 'double' && this.op2.tipo == 'int'){
                    this.tipo = 'booleano';
                    if (valor1 < valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else if(this.op1.tipo == 'double' && this.op2.tipo == 'double'){
                    this.tipo = 'booleano';
                    if (valor1 < valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else{
                    this.tipo = 'Error';
                    //este es un error semantico : error de tipo de dato
                    //agregar a la lista de errores
                    return this.valor;
                }
            case '<=':
                if(this.op1.tipo == 'int' && this.op2.tipo == 'int'){
                    this.tipo = 'booleano';
                    if (valor1 <= valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                }  else if(this.op1.tipo == 'int' && this.op2.tipo == 'double'){
                    this.tipo = 'booleano';
                    if (valor1 <= valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else if(this.op1.tipo == 'double' && this.op2.tipo == 'int'){
                    this.tipo = 'booleano';
                    if (valor1 <= valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else if(this.op1.tipo == 'double' && this.op2.tipo == 'double'){
                    this.tipo = 'booleano';
                    if (valor1 <= valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else{
                    this.tipo = 'Error';
                    //este es un error semantico : error de tipo de dato
                    //agregar a la lista de errores
                    return this.valor;
                }
            case '>':
                if(this.op1.tipo == 'int' && this.op2.tipo == 'int'){
                    this.tipo = 'booleano';
                    if (valor1 > valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                }  else if(this.op1.tipo == 'int' && this.op2.tipo == 'double'){
                    this.tipo = 'booleano';
                    if (valor1 > valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else if(this.op1.tipo == 'double' && this.op2.tipo == 'int'){
                    this.tipo = 'booleano';
                    if (valor1 > valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else if(this.op1.tipo == 'double' && this.op2.tipo == 'double'){
                    this.tipo = 'booleano';
                    if (valor1 > valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else{
                    this.tipo = 'Error';
                    //este es un error semantico : error de tipo de dato
                    //agregar a la lista de errores
                    return this.valor;
                }
            case '>=':
                if(this.op1.tipo == 'int' && this.op2.tipo == 'int'){
                    this.tipo = 'booleano';
                    if (valor1 >= valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                }  else if(this.op1.tipo == 'int' && this.op2.tipo == 'double'){
                    this.tipo = 'booleano';
                    if (valor1 >= valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else if(this.op1.tipo == 'double' && this.op2.tipo == 'int'){
                    this.tipo = 'booleano';
                    if (valor1 >= valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else if(this.op1.tipo == 'double' && this.op2.tipo == 'double'){
                    this.tipo = 'booleano';
                    if (valor1 >= valor2) {
                        this.valor = true;
                    } else {
                        this.valor = false;
                    }
                    return this.valor;
                } else{
                    this.tipo = 'Error';
                    //este es un error semantico : error de tipo de dato
                    //agregar a la lista de errores
                    return this.valor;
                }
        }
    }
}


module.exports = Relacional;
