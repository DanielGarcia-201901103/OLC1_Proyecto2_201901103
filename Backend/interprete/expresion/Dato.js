const Instruccion = require('../Instruccion.js');
const { addError } = require('../../analisisSem/manejoErrores');

class Dato extends Instruccion {
    constructor(valor, tipo, fila, columna) {
        super();
        this.valor = valor;
        this.id = valor;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            switch (this.tipo) {
                case 'int':
                    return Number(this.valor);
                case 'string':
                    //this.valor = this.valor.replace(/\\"/g, '"');
                    //console.log('valor: ', this.valor); //    no  me sustituye el de las comillas
                    //.replace("\\\"","\"")
                    this.valor = this.valor.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\'/g, "'").replace(/\\\\/g, '\\');
                    return this.valor;
                case 'booleano':
                    if (this.valor == 'true') {
                        this.valor = true;
                        return this.valor;
                    } else {
                        this.valor = false;
                        return this.valor;
                    }
                case 'char':
                    return this.valor;
                case 'double':
                    return Number(this.valor);
                case 'id':
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
                case 'Error':
                    addError('Error Semantico', 'Dato de tipo incorrecto ' + this.tipo + ' - ' + this.valor, this.fila, this.columna);
                    return;
            }
        } catch (error) {
            addError('Error', 'Error al interpretar el dato' + error, this.fila, this.columna);
        }
    }
}

module.exports = Dato;