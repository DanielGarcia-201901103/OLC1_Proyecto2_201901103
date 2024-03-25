const Instruccion = require('../instruccion.js')

class Print extends Instruccion{
    constructor(expresion){
        super();
        this.expresion = expresion;
    }

    interpretar(entorno){
        let valor = this.expresion.interpretar(null);
        console.log(valor);
    }
}

module.exports = Print;