const Instruccion = require('../Instruccion.js');
const { addError } = require('../../analisisSem/manejoErrores');
const { getcont } = require('../../analisisSem/contador.js');

class Oid extends Instruccion {
    constructor(id, tipo, fila, columna, tipoid) {
        super();
        this.valor = "";
        this.id = id;
        this.tipo = tipo;
        this.tipoid = tipoid;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
                //validar en obtener del entorno
                this.valor = entorno.getSimbolo(this.id);
                let data = this.valor.getTipo();
                this.valor = data.valor;
                this.tipo = data.tipo;
                if (this.tipo == 'int') {
                    this.valor = Number(this.valor);
                } else if (this.tipo == 'double') {
                    this.valor = Number(this.valor);
                } else if (this.tipo == 'booleano') {
                    this.valor = Boolean(this.valor);
                } else if (this.tipo == 'string') {
                    this.valor = this.valor.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\'/g, "'").replace(/\\\\/g, '\\');
                } else if (this.tipo == 'char') {
                    this.valor = this.valor;
                }
                return this.valor;
            
        } catch (error) {
            addError('Error', 'Error al interpretar el dato' + error, this.fila, this.columna);
        }
    }

    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let nodoDato = getcont();
        let nodoPadre = getcont();
        let oi = getcont();

        let cadena = 
        `${nodoDato}[label="${this.valor}"]\n`+
        `${oi}[label="${this.id}"]\n`+
        `${nodoPadre}[label="Expresion"]\n`+
        `${nodoPadre}--${oi}\n`+
        `${oi}--${nodoDato}\n`;

        nodo.padre = nodoPadre;
        nodo.cadena = cadena;

        return nodo;
    }
}

module.exports = Oid;