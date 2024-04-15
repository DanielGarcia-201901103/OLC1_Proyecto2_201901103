const Instruccion = require("../Instruccion.js");
const { addError } = require('../../analisisSem/manejoErrores.js');

class Flength extends Instruccion {
    constructor(op1, fila, columna) {
        super();
        this.op1 = op1;
        this.tipo = "Error";
        this.valor = "null";
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            let valor1 = this.op1.interpretar(entorno);
            if (this.op1.tipo == 'string') {
                this.tipo = 'int';
                this.valor = Number(valor1.length);
                return this.valor;
            } else {
                this.tipo = 'Error';
                addError('Error Semantico', 'length: se esperaba un tipo std::string o vectores en vez de ' + valor1 + ' es de tipo: ' + this.op1.tipo, this.fila, this.columna);
                return this.valor;
            }
        } catch (error) {
            addError('Error', 'Error al interpretar la funcion length' + error, this.fila, this.columna);
        }
    }
}


module.exports = Flength;
