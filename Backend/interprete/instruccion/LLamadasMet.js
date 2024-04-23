const { Instruccion, TInst } = require('../Instruccion.js');
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
            console.log("Viendo entorno en metodo " + this.id + "  " + entorno.nombreentorno)
            
            //obteniendo el simbolo del metodo
            let metod = entorno.getSimboloMet(this.id);
            let vtipo = metod.getTipoDato();
            if (vtipo === "void") {
                let entornomet = new Entorno(TInst.METODO, entorno);
                let instruccionesmett = metod.getTipo();
                if (this.parametros.length === 0) {
                    for (let i = 0; i < instruccionesmett.length; i++) {
                        let instruccion = instruccionesmett[i]
                        instruccion.interpretar(entornomet);
                    }
                }else{
                    
                    //Con parametros
                }
            }else{
                let entornofun = new Entorno(TInst.FUNCION, entorno);
                let instruccionesfun = metod.getTipo();
                let obpara = instruccionesfun[0];
                let obinstru = instruccionesfun[1];
                //Sin parametros
                if (this.parametros.length === 0) {
                    for (let i = 0; i < obinstru.length; i++) {
                        let instruccion = obinstru[i]
                        instruccion.interpretar(entornofun);
                    }
                }else{
                    //Con parametros
                }
            }

        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del la llamada a metodo o funcion ' + error, this.linea, this.columna);
        }
    }
}

module.exports = LLamadasMet;