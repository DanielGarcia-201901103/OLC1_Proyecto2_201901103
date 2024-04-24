const { Instruccion, TInst } = require('../Instruccion.js');
const { addError } = require('../../analisisSem/manejoErrores');
const { getcont } = require('../../analisisSem/contador.js');
global.obimpresiones = [];

class Print extends Instruccion {
    constructor(expresion, salto, fila, columna) {
        super();
        this.expresion = expresion;
        this.fila = fila;
        this.columna = columna;
        this.salto = salto;
    }

    interpretar(entorno) {
        try {
            let valor = this.expresion.interpretar(entorno);
            if (this.expresion.tipo == 'Error') {
                // console.log('Error semantico: No se puede imprimir con error. ', this.expresion.valor);
                addError('Error Semantico', 'No se puede imprimir con error' + this.expresion.valor, this.fila, this.columna);
                return;
            }
            //console.log(valor);
            if (this.salto == 'salto') {
                this.valor = valor.toString();
                obimpresiones.push(valor + '\n');
            } else {
                this.valor = valor.toString();
                obimpresiones.push(valor);
            }
        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del print', this.fila, this.columna);
        }
    }

    getAst() {
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let izq = this.expresion.getAst();

        let op = getcont();
        let op1 = getcont();
        let padre = getcont();

        if (this.salto == 'salto') {
            let op2 = getcont();
            let resss = getcont();
            nodo.padre = padre;
            nodo.cadena =
                izq.cadena +
                `${op}[label="cout"]\n` +
                `${padre}[label="Cout"]\n` +
                `${op1}[label="<<"]\n` +
                `${op2}[label="<<"]\n` +
                `${resss}[label="endl"]\n` +
                `${padre}--${op}\n` +
                `${padre}--${op1}\n` +
                `${padre}--${izq.padre}\n`+
                `${padre}--${op2}\n` +
                `${padre}--${resss}\n`
                ;
            return nodo;
        } else {
            nodo.padre = padre;
            nodo.cadena =
                izq.cadena +
                `${op}[label="cout"]\n` +
                `${padre}[label="Cout"]\n` +
                `${op1}[label="<<"]\n` +
                `${padre}--${op}\n` +
                `${padre}--${op1}\n` +
                `${padre}--${izq.padre}\n`
                ;
            return nodo;
        }
        
    }
}
function addLErr(recibiendo) {
    obimpresiones.push("-----> " + recibiendo + '\n');
}

module.exports = { Print, addLErr };