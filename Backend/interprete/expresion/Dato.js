const Instruccion = require('../instruccion.js')

class Dato extends Instruccion{
    constructor(valor, tipo){
        super();
        this.valor = valor;
        this.tipo = tipo;
    }

    interpretar(entorno){
        switch(this.tipo){
            case 'int':
                return Number(this.valor);
            case 'string':
                return this.valor;
        }
        return this.valor;
    }
}

module.exports = Dato;