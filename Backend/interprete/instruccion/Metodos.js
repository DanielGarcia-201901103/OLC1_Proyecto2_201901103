const {Instruccion, TInst} = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores.js');
class Metodos extends Instruccion {
    constructor(id, parametros, instruccionesmet, linea, columna) {
        super();
        this.tipofuncion = "void"
        this.id = id;
        this.parametros = parametros;
        this.instruccionesmet = instruccionesmet;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            /* */
            let entornomet = new Entorno(TInst.METODO, entorno);
            //Manejando el metodo sin parametros 
            if(this.parametros.length === 0){
                /*for (let i = 0; i < this.instruccionesmet.length; i++) {
                    let instruccion = this.instruccionesmet[i]
                    instruccion.interpretar(entornomet);
                }*/
                entorno.addSimboloMet(this.id, this.instruccionesmet, this.tipofuncion , entornomet.nombreentorno, this.linea, this.columna);
                return this;
            }else{

            }
            return this;
        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del For ' + error, this.linea, this.columna);
        }
    }
}

module.exports = Metodos;