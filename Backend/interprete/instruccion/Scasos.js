const Instruccion = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');

class Scasos extends Instruccion {
    constructor(condicion, instruccionescas, linea, columna) {
        super();
        this.condicion = condicion;
        this.instruccionescas = instruccionescas;
        this.linea = linea;
        this.columna = columna;
        this.nombrecaso = 'case';
    }

    interpretar(entorno) {
        try {
            
            return this;

        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del caso switch ' + error, this.linea, this.columna);
        }
    }
}
//https://github.com/AlexIngGuerra/OLC1-1S2024/blob/main/clase_12/server/interprete/instruccion/If.js
module.exports = Scasos;