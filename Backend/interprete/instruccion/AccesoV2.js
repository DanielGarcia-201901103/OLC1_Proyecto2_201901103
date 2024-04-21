const Instruccion = require("../Instruccion.js");
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');

class AccesoV2 extends Instruccion{
    constructor(id, expresionf, expresionc, linea, columna){
        super();
        this.valor = "";
        this.id = id;
        this.tipo = "";
        this.expresionf = expresionf;
        this.expresionc = expresionc;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno){
        try{
            /*
            1. Validar que la expresion de fila y columna sea un numero de tipo int
            2. Obtener la lista de valores 
            3. Validar que el valor de la expresion sea menor al tamaño de la lista
            4. Obtener el valor de la lista en la posicion de la expresion
            5. Retornar el valor
              */
            let posicionf = this.expresionf.interpretar(entorno);
            let posicionc = this.expresionc.interpretar(entorno);

            if(this.expresionf.tipo != 'int' && this.expresionc.tipo != 'int'){
                addError('Error Semantico', 'El indice debe ser de tipo entero', this.linea, this.columna);
                return this;
            }

            let data = entorno.getSimboloVec2(this.id);
            let listavaloresMatriz = data.getTipo();
            //vaolida que la posicion sea menor al tamaño de la fila 
            if(posicionf < listavaloresMatriz.length && posicionf >= 0){
                let listavalorescolumna = listavaloresMatriz[posicionf];
                if(posicionc < listavalorescolumna.length && posicionc >= 0){
                    this.valor = listavaloresMatriz[posicionf][posicionc].interpretar(entorno);
                    this.tipo =  listavaloresMatriz[posicionf][posicionc].tipo;
                    return this.valor;
                }else{
                    addError('Error Semantico', 'El indice de columna está fuera de rango', this.linea, this.columna);
                    return this;
                }
            }else{
                addError('Error Semantico', 'El indice de fila está fuera de rango', this.linea, this.columna);
                return this;
            }

    }catch(error){
        addError('Error', 'Ha ocurrido un error ', this.linea, this.columna);
    }
    }
}

module.exports = AccesoV2;