const {Instruccion, TInst} = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');
const { getcont } = require('../../analisisSem/contador.js');

class Sdefault extends Instruccion {
    constructor(instrucciondefault, linea, columna) {
        super();
        this.instrucciondefault = instrucciondefault;
        this.linea = linea;
        this.columna = columna;
        this.nombrecaso = 'default';
    }

    interpretar(entorno) {
        try {
            let entornodefault = new Entorno('DEFAULTSWITCH', entorno);
            for (let i = 0; i < this.instrucciondefault.length; i++) {
                let instruc = this.instrucciondefault[i];
                instruc.interpretar(entornodefault);
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
    
        let instruccionesDefaultAst = this.instrucciondefault.map(instruccion => instruccion.getAst());
    
        let padre = getcont();
        let cont = getcont();
    
        nodo.padre = padre;
        nodo.cadena =
            instruccionesDefaultAst.map(ast => `${cont}--${ast.padre}\n${ast.cadena}`).join('') +
            `${padre}[label="DEFAULT"]\n` +
            `${cont}[label="Instrucciones"]\n`+
            `${padre}--${cont}\n` ;
    
        return nodo;
    }
}
module.exports = Sdefault;