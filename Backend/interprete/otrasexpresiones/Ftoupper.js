const Instruccion = require("../Instruccion.js");
const { addError } = require('../../analisisSem/manejoErrores');
const { getcont } = require('../../analisisSem/contador.js');

class Ftoupper extends Instruccion {
    constructor(op1, fila, columna) {
        super();
        this.op1 = op1;
        this.tipo = "Error";
        this.valor = "null";
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            let valor1 = this.op1.interpretar(entorno);
            if (this.op1.tipo == 'string') {
                this.tipo = 'string';
                this.valor = valor1.toUpperCase();
                return this.valor;
            } else {
                this.tipo = 'Error';
                addError('Error Semantico', 'toupper incorrecto: se esperaba un tipo std::string en vez de ' + valor1 + ' es de tipo: ' + this.op1.tipo, this.fila, this.columna);
                return this.valor;
            }
        } catch (error) {
            addError('Error', 'Error al interpretar la funcion toupper' + error, this.fila, this.columna);
        }
    }

    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let asig = this.op1.getAst();
        //let id = this.id.getAst();
        
        let padre = getcont();
        let op = getcont();
        let paa = getcont();
        let pac = getcont();
        nodo.padre = padre;
        nodo.cadena =
            asig.cadena+
            `${padre}[label=" Toupper \n${this.valor}"]\n`+
            `${op}[label=" toupper"]\n`+
            `${paa}[label="("]\n`+
            `${pac}[label=")"]\n`+
            `${padre}--${op}\n`+
            `${padre}--${paa}\n`+
            `${padre}--${asig.padre}\n`+
            `${padre}--${pac}\n`
            ;

        return nodo;
    }
}


module.exports = Ftoupper;
