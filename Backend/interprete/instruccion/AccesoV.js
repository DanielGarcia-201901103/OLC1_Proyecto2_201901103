const Instruccion = require("../Instruccion.js");
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');

class AccesoV extends Instruccion{
    constructor(id, expresion, linea, columna){
        super();
        this.valor = "";
        this.id = id;
        this.tipo = "";
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno){
        try{
            /*
            1. Validar que la expresion sea un numero de tipo int
            2. Obtener la lista de valores 
            3. Validar que el valor de la expresion sea menor al tamaño de la lista
            4. Obtener el valor de la lista en la posicion de la expresion
            5. Retornar el valor
              */
            let posicion = this.expresion.interpretar(entorno);
            if(this.expresion.tipo != 'int'){
                addError('Error Semantico', 'El indice debe ser de tipo entero', this.linea, this.columna);
                return this;
            }
            let data = entorno.getSimboloVec(this.id);
            let listavalores = data.getTipo();
            if(posicion < listavalores.length && posicion >= 0){
                this.valor = listavalores[posicion].interpretar(entorno);
                this.tipo = listavalores[posicion].tipo;
                console.log(this.valor + ' ' + this.tipoid);
                return this.valor;
            }else{
                addError('Error Semantico', 'El indice esta fuera de rango', this.linea, this.columna);
                return this;
            }

            

    }catch(error){
        addError('Error', 'Ha ocurrido un error ', this.linea, this.columna);
    }
    }
}

module.exports = AccesoV;