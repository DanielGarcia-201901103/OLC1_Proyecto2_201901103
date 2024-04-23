const {Instruccion, TInst} = require("../Instruccion.js");
const { addError } = require('../../analisisSem/manejoErrores');
const { getcont } = require('../../analisisSem/contador.js');

class Ftostring extends Instruccion {
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
            if (this.op1.tipo == 'int') {
                this.tipo = 'string';
                this.valor = String(valor1);
                return this.valor;
            } else if (this.op1.tipo == 'double') {
                this.tipo = 'string';
                this.valor = String(valor1);
                return this.valor;
            } else if (this.op1.tipo == 'booleano') {
                this.tipo = 'string';
                if (valor1 == true){
                    this.valor = 'true';
                    return this.valor;
                }
                if (valor1 == false){
                    this.valor = 'false';
                    return this.valor;
                }
            } else {
                this.tipo = 'Error';
                addError('Error Semantico', 'std::tostring incorrecto: se esperaba un tipo int, double o bool en vez de "' + valor1 + '" es de tipo: ' + this.op1.tipo, this.fila, this.columna);
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
            `${padre}[label=" ToString \n${this.valor}"]\n`+
            `${op}[label=" std::toString"]\n`+
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


module.exports = Ftostring;