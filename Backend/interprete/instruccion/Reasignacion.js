const {Instruccion, TInst} = require("../Instruccion.js");
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');
const { getcont } = require('../../analisisSem/contador.js');

class Reasignacion extends Instruccion {
    constructor(id, expresion, linea, columna) {
        super();
        this.id = id;
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            this.expresion.interpretar(entorno);
            for (let i = 0; i < this.id.length; i++) {
                let simbolo = entorno.getSimbolo(this.id[i]);
                let data = simbolo.getTipo();
                if (this.expresion.tipo != data.tipo) {
                    addError('Error Semantico', 'Error de tipos en la declaración de variable ' + this.expresion.tipo, this.fila, this.columna);
                    //error semantico
                    return this;
                }
                data = this.expresion;
                data.tipo = this.expresion.tipo;
                entorno.actualizarSimbolo(this.id[i], data);
            }
            //esto hay que corregirlo para que acepete el valor de la variable
            //entorno.addSimbolo(this.id,this.expresion ,this.tipo, this.tipodato, entorno.nombreentorno, this.linea, this.columna);
            return this;
        } catch (error) {
            addError('Error', 'Ha ocurrido un error en reasignación de variable ', this.linea, this.columna);
        }
    }
    getAst() {
        let nodo = {
            padre: -1,
            cadena: ""
        };
    
        let expresionAst = this.expresion.getAst();
    
        let padre = getcont();
        let cont = getcont();
    
        nodo.padre = padre;
        nodo.cadena =
            expresionAst.cadena +
            `${padre}[label="Reasignacion"]\n` +
            `${cont}[label="Variable"]\n` +
            `${padre}--${cont}\n`+
            `${cont}--${expresionAst.padre}\n`;;
    
        return nodo;
    }
}

module.exports = Reasignacion;