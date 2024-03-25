const Instruccion = require('../instruccion.js')

class Aritmetica extends Instruccion{
    constructor(op1, op2, operador){
        super();
        this.op1 = op1;
        this.op2 = op2;
        this.operador = operador;
        this.tipo = 'NULL';
        this.valor = null;
    }

    interpretar(entorno){
        let valor1 = this.op1.interpretar(null);
        let valor2 = this.op2.interpretar(null);
        switch(this.operador){
            case '+':
                if(this.op1.tipo == 'int' && this.op2.tipo == 'int'){
                    this.tipo = 'int';
                    this.valor = valor1 + valor2;
                
                    return Number(valor);
                }
                else{

                }
            case '-':
                if(this.op1.tipo == 'int' && this.op2.tipo == 'int'){
                    this.tipo = 'int';
                    this.valor = valor1 - valor2;
                
                    return Number(valor);
                }
            case '*':
                if(this.op1.tipo == 'int' && this.op2.tipo == 'int'){
                    this.tipo = 'int';
                    this.valor = valor1 * valor2;
                
                    return Number(valor);
                }
            case '/':
                if(this.op1.tipo == 'int' && this.op2.tipo == 'int'){
                    this.tipo = 'int';
                    this.valor = valor1 / valor2;
                
                    return Number(valor);
                }
                else{

                }
            case '%':
                if(this.op1.tipo == 'int' && this.op2.tipo == 'int'){
                    this.tipo = 'int';
                    this.valor = valor1 % valor2;
                
                    return Number(valor);
                }
        }
    }
}

module.exports = Aritmetica;

// Me quedé en el minuto 1:05:54
//comenzando el else 
//la clase es la del 11/03/2024
//https://drive.google.com/drive/u/0/search?q=laboratorio%20compiladores