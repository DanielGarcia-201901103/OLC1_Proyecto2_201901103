const {Instruccion, TInst} = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores.js');
const { getcont } = require('../../analisisSem/contador.js');
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
    
    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let izq = this.llamada.getAst();
        
        let op = getcont();
        let padre = getcont();

        nodo.padre = padre;
        nodo.cadena =
            izq.cadena+
            `${op}[label="execute"]\n`+
            `${padre}[label="Execute"]\n`+
            `${padre}--${op}\n`+
            `${padre}--${izq.padre}\n`
            ;

        return nodo;
    }
}

module.exports = Execute;