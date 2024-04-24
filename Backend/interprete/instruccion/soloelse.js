const {Instruccion, TInst} = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');
const { getcont } = require('../../analisisSem/contador.js');

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
            for (let i = 0; i < this.instruccioneselse.length; i++) {
                let instruc = this.instruccioneselse[i];
                instruc.interpretar(entorno);
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
    getAst() {
        let nodo = {
            padre: -1,
            cadena: ""
        };
    
        let instruccionesElseAst = this.instruccioneselse.map(instruccion => instruccion.getAst());
    
        let padre = getcont();
        let cont = getcont();
    
        nodo.padre = padre;
        nodo.cadena =
            instruccionesElseAst.map(ast => `${cont}--${ast.padre}\n${ast.cadena}`).join('') +
            `${padre}[label="ELSE"]\n` +
            `${cont}[label="Instrucciones ELSE"]\n` +
            `${padre}--${cont}\n`;
    
        return nodo;
    }
}
//https://github.com/AlexIngGuerra/OLC1-1S2024/blob/main/clase_12/server/interprete/instruccion/If.js
module.exports = soloelse;