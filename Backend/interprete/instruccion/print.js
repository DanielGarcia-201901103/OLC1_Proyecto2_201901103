const Instruccion = require('../Instruccion.js');
global.obimpresiones = [];

class Print extends Instruccion{
    constructor(expresion){
        super();
        this.expresion = expresion;
    }

    interpretar(entorno){
        let valor = this.expresion.interpretar(entorno);
        if(this.expresion.tipo == 'Error'){
            console.log('Error semantico: No se puede imprimir con error. ', this.expresion.valor);
            return;
        }
        //console.log(valor);
        obimpresiones.push(valor);
    }
}

module.exports = Print;