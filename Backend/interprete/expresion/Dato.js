const Instruccion = require('../Instruccion.js')

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
            case 'booleano':
                if(this.valor == 'true'){
                    this.valor = true;
                    return this.valor;
                } else {
                    this.valor = false;
                    return this.valor;
                }
            case 'char':
                return this.valor;
            case 'double':
                return Number(this.valor);
            case 'Error':
                console.log('Error semantico: No se puede interpretar un dato con error. ', this.valor);
                return;
        }
    }
}

module.exports = Dato;