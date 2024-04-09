const Instruccion = require('../Instruccion.js');
global.obimpresiones = [];

class Print extends Instruccion{
    constructor(expresion,salto, fila, columna){
        super();
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.salto = salto;
    }

    interpretar(entorno){
        let valor = this.expresion.interpretar(entorno);
        if(this.expresion.tipo == 'Error'){
            console.log('Error semantico: No se puede imprimir con error. ', this.expresion.valor);
            return;
        }
        //console.log(valor);
        if (this.salto = 'true'){
            this.valor = valor.toString();
            obimpresiones.push(valor + '\n');
        }else{
            this.valor = valor
            obimpresiones.push(valor);
        }
    }
}

module.exports = Print;