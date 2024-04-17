const Instruccion = require('../Instruccion.js');
const { addError } = require('../../analisisSem/manejoErrores');

class Continu extends Instruccion {
    constructor(fila, columna) {
        super();
        this.tipo = 'continue';
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            return this;
        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del continue', this.fila, this.columna);
        }
    }
}

module.exports = Continu;