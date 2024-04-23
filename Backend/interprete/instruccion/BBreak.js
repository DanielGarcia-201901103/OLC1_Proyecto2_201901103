const {Instruccion, TInst} = require('../Instruccion.js');
const { addError } = require('../../analisisSem/manejoErrores.js');

class BBreak extends Instruccion {
    constructor(fila, columna) {
        super();
        this.tipo = 'break';
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            return this;
        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del break', this.fila, this.columna);
        }
    }
}

module.exports = BBreak;