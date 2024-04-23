const {Instruccion, TInst} = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores.js');
class MFuncion extends Instruccion {
    constructor(tipofuncion, id, parametros, instruccionesfun, linea, columna) {
        super();
        this.tipofuncion = tipofuncion
        this.id = id;
        this.parametros = parametros;
        this.instruccionesfun = instruccionesfun;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            /* */
            let entornomet = new Entorno(TInst.FUNCION, entorno);
            //Manejando la funcion sin parametros 
            if(this.parametros.length === 0){
                let lsInstyParams = [this.parametros,this.instruccionesfun];
                entorno.addSimboloMet(this.id, lsInstyParams, this.tipofuncion, entornomet.nombreentorno, this.linea, this.columna);
                return this;
            }else{

            }
            return this;
        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación de la Funcion ' + error, this.linea, this.columna);
        }
    }
}

module.exports = MFuncion;