const {Instruccion, TInst} = require("../Instruccion.js");
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');
const { getcont } = require('../../analisisSem/contador.js');

class AsignacionV extends Instruccion{
    constructor(tipodec, id, tipoasig, expresion, linea, columna){
        super();
        this.tipodec = tipodec;
        this.id = id;
        this.tipoasig = tipoasig;
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno){
        try{    
            let valor = this.expresion.interpretar(entorno);
            if(this.tipodec != this.tipoasig){
                addError('Error Semantico', 'Los tipos deben ser iguales en la declaración de vectores: ' + this.tipodec + ' y ' + this.tipoasig, this.linea, this.columna);
                //error semantico
                return this;
            }
            if(this.expresion.tipo != 'int'){
                addError('Error Semantico', 'El tamaño del vector debe ser de tipo entero - int', this.linea, this.columna);
                //error semantico
                return this;
            }

            let defecto = null;
            if(this.tipodec == 'int'){
                defecto = 0;
            } else if(this.tipodec == 'double'){
                defecto = parseFloat(0).toFixed(2);
            } else if(this.tipodec == 'booleano'){
                defecto = true;
            } else if(this.tipodec == 'char' || this.tipodec == 'string'){
                defecto = "";
            }
            let lista = [];
            for(let i = 0 ; i < valor; i++){
                lista.push(defecto);
            }

            for(let i = 0; i < this.id.length; i++){
                entorno.addSimboloVec(this.id[i], lista ,this.tipodec, entorno.nombreentorno, this.linea, this.columna);
            }
        return this;
    }catch(error){
        addError('Error', 'Ha ocurrido un error en la declaración de vectores', this.linea, this.columna);
    }
    }
    getAst() {
        let nodo = {
            padre: -1,
            cadena: ""
        }

        let asig = this.expresion.getAst();
        //let id = this.id.getAst();

        let op = getcont();
        let padre = getcont();
        let oc = getcont();
        let occ = getcont();
        nodo.padre = padre;
        nodo.cadena =
            asig.cadena +
            `${op}[label="${this.id}"]\n` +
            `${padre}[label="Asignación"]\n` +
            `${oc}[label="${this.tipo}"]\n` +
            `${occ}[label="="]\n` +
            `${padre}--${oc}\n` +
            `${padre}--${op}\n` +
            `${padre}--${occ}\n` +
            `${padre}--${asig.padre}\n`
            ;

        return nodo;
    }
}

module.exports = AsignacionV;