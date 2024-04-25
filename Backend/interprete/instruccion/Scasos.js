const {Instruccion, TInst} = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');
const { getcont } = require('../../analisisSem/contador.js');

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
    getAst() {
        let nodo = {
            padre: -1,
            cadena: ""
        };
    
        let condicionAst = this.condicion.getAst();
        let instruccionesAst = this.instruccionescas.map(instruccion => instruccion.getAst());
    
        let padre = getcont();
        let cont = getcont();
    
        nodo.padre = padre;
        nodo.cadena =
            condicionAst.cadena +
            instruccionesAst.map(ast => `${cont}--${ast.padre}\n${ast.cadena}`).join('') +
            `${padre}[label="CASO"]\n` +
            `${cont}[label="Instrucciones"]\n` +
            `${padre}--${cont}\n` +
            `${padre}--${condicionAst.padre}\n` ;
    
        return nodo;
    }
}
//https://github.com/AlexIngGuerra/OLC1-1S2024/blob/main/clase_12/server/interprete/instruccion/If.js
module.exports = Scasos;