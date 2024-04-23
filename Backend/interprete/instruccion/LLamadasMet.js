const {Instruccion, TInst} = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores.js');
class LLamadasMet extends Instruccion {
    constructor(id, parametros, linea, columna) {
        super();
        this.id = id;
        this.parametros = parametros;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            /* Para hacer la llamada a metodos, va a recibir el nombre o id del metodo, y la lista de parametros
                y buscar el id del metodo
            */
            console.log("Viendo entorno en metodo "+this.id+ "  " + entorno.nombreentorno)
            let entornomet = new Entorno(TInst.METODO, entorno);
            //obteniendo el simbolo del metodo
            let metod = entorno.getSimboloMet(this.id);
            let instruccionesmett= metod.getTipo();
            if(this.parametros.length === 0){
                for(let i=0; i< instruccionesmett.length; i++){
                    let instruccion = instruccionesmett[i]
                    instruccion.interpretar(entornomet);
                }
            }
        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del la llamada a metodo ' + error, this.linea, this.columna);
        }
    }
}

module.exports = LLamadasMet;