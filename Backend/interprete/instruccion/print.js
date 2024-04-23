const {Instruccion, TInst} = require('../Instruccion.js');
const { addError } = require('../../analisisSem/manejoErrores');
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
}
function addLErr(recibiendo){
    obimpresiones.push("-----> " + recibiendo + '\n');
    }

module.exports = {Print, addLErr};