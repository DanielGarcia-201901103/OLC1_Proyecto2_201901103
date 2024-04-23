const {Instruccion, TInst} = require("../Instruccion.js");
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');

class AsignacionV2 extends Instruccion{
    constructor(tipodec, id, tipoasig, expresionf, expresionc, linea, columna){
        super();
        this.tipodec = tipodec;
        this.id = id;
        this.tipoasig = tipoasig;
        this.expresionf = expresionf;
        this.expresionc = expresionc;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno){
        try{    
            let valorf = this.expresionf.interpretar(entorno);
            let valorc = this.expresionc.interpretar(entorno);
            if(this.tipodec != this.tipoasig){
                addError('Error Semantico', 'Los tipos deben ser iguales en la declaración de vectores: ' + this.tipodec + ' y ' + this.tipoasig, this.linea, this.columna);
                //error semantico
                return this;
            }
            if(this.expresionf.tipo != 'int' && this.expresionc.tipo != 'int'){
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
            for(let i = 0 ; i < valorc; i++){
                lista.push(defecto);
            }
            let matriz = [];
            for(let i = 0 ; i < valorf; i++){
                matriz.push(lista);
            }

            for(let i = 0; i < this.id.length; i++){
                entorno.addSimboloVec2(this.id[i], matriz ,this.tipodec, entorno.nombreentorno, this.linea, this.columna);
            }

        return this;
    }catch(error){
        addError('Error', 'Ha ocurrido un error en la declaración de vectores', this.linea, this.columna);
    }
    }
}

module.exports = AsignacionV2;