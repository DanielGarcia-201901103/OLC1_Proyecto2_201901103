const Instruccion = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');
class If extends Instruccion {
    constructor(condicion, instruccionesif, linea, columna) {
        super();
        this.condicion = condicion;
        this.instruccionesif = instruccionesif;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            let entornoif = new Entorno('IF', entorno);
            this.condicion.interpretar(entornoif);
            if (this.condicion.tipo != 'booleano') {
                addError('Error Semantico', 'La condición no es de tipo boolean', this.linea, this.columna);
                //error semantico la condicion no es de tipo boolean
                return this;
            }
            if (Boolean(this.condicion.valor)) {
                this.instruccionesif.forEach(instruccion => {
                    instruccion.interpretar(entornoif);
                });
            }
            else {
                // ejecución del else if o else
            }
            //guardar el entorno
            return this;
        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del if ' + error, this.linea, this.columna);
        }
    }
}

module.exports = If;