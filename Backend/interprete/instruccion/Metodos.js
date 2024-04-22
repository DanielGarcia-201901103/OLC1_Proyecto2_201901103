const Instruccion = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores.js');
class Metodos extends Instruccion {
    constructor(id, parametros, instruccionesmet, linea, columna) {
        super();
        this.id = id;
        this.parametros = parametros;
        this.instruccionesmet = instruccionesmet;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            /* */
            let entornomet = new Entorno('METODO', entorno);
            //Manejando el metodo sin parametros 
            if(this.parametros.length === 0){
                for (let i = 0; i < this.instruccionesmet.length; i++) {
                    let instruccion = this.instruccionesmet[i]
                    instruccion.interpretar(entornomet);
                    /*
                    if(instruccion.tipo == 'break'){
                        addError('Error Semantico', 'Break no permitido dentro de' + error, this.linea, this.columna);
                        break;
                    }else if(instruccion.tipo == 'continue'){
                        addError('Error Semantico', 'continue no permitido dentro de' + error, this.linea, this.columna);
                        break;
                    }*/
                }
                entornomet.addSimboloMet(this.id, this.instruccionesmet, "void", entornomet, this.linea, this.columna);
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