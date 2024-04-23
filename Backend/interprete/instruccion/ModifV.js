const {Instruccion, TInst} = require("../Instruccion.js");
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');

class ModifV extends Instruccion{
    constructor(id, expresion, nexpresion, linea, columna){
        super();
        this.id = id;
        this.expresion = expresion;
        this.nexpresion = nexpresion;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno){
        try{
            /*
            1. Validar que la expresion sea un numero de tipo int, si no lo es mostrar error semantico
            2. Obtener el objeto simbolo de la tabla de simbolos
            3. Obtener la lista de valores del simbolo
            4. Validar que el valor de la expresion sea menor al tamaño de la lista
            5. Obtener el valor de la lista en la posicion de la expresion
            6. cambiar el valor del simbolo por el valor obtenido en nexpresion despues de haberlo interpretado
            7. Actualizar el simbolo en la tabla de simbolos
              */

            let posicion = this.expresion.interpretar(entorno);
            if(this.expresion.tipo != 'int'){
                addError('Error Semantico', 'El indice debe ser de tipo entero', this.linea, this.columna);
                return this;
            }
            //data tiene el objeto simbolo
            let data = entorno.getSimboloVec(this.id); 
            // listavalores tiene el arreglo de valores en objeto Data
            let listavalores = data.getTipo();
            //hay que validar que el tipo de nexpresion sea igual al tipo del simbolo
            let tipodatoAux = data.getTipoDato();
            
            if(this.nexpresion.tipo != tipodatoAux){
                addError('Error Semantico', 'El tipo de dato a asignar no coincide con el tipo del arreglo', this.linea, this.columna);
                return this;
            }
            if(posicion < listavalores.length && posicion >= 0){
                //almacenando en la posicion de la lista el objeto Data actualizado
                listavalores[posicion] =  this.nexpresion;
                entorno.actualizarSimboloVec(this.id, listavalores);
                return this;
            }else{
                addError('Error Semantico', 'El indice esta fuera de rango', this.linea, this.columna);
            }

            
            return this
    }catch(error){
        addError('Error', 'Ha ocurrido un error ', this.linea, this.columna);
    }
    }
}

module.exports = ModifV;