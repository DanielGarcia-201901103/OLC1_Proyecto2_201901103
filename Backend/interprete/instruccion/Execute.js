const {Instruccion, TInst} = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores.js');
class Execute extends Instruccion {
    constructor(llamada, linea, columna) {
        super();
        this.llamada = llamada;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            this.llamada.interpretar(entorno);
            return this;
        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del For ' + error, this.linea, this.columna);
        }
    }
}

module.exports = Execute;