const Instruccion = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');

class soloelse extends Instruccion {
    constructor(instruccioneselse, linea, columna) {
        super();
        this.instruccioneselse = instruccioneselse;
        this.linea = linea;
        this.columna = columna;
        this.nombreelse = 'else';
    }

    interpretar(entorno) {
        try {
            let entornoelse = new Entorno('ELSE', entorno);
            console.log("en el else:  " + this.instruccioneselse.length)
            for (let i = 0; i < this.instruccioneselse.length; i++) {
                let instruc = this.instruccioneselse[i];
                instruc.interpretar(entornoelse);
                if (instruc.tipo == 'break') {
                    this.tipo = 'break';
                    break;
                } else if (instruc.tipo == 'continue') {
                    this.tipo = 'continue';
                    break;
                }
            }
            return this;

        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del else ' + error, this.linea, this.columna);
        }
    }
}
//https://github.com/AlexIngGuerra/OLC1-1S2024/blob/main/clase_12/server/interprete/instruccion/If.js
module.exports = soloelse;