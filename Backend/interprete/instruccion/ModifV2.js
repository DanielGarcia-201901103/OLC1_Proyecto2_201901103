const Instruccion = require("../Instruccion.js");
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');

class ModifV2 extends Instruccion{
    constructor(id, expresionf, expresionc, nexpresion,linea, columna){
        super();
        this.id = id;
        this.expresionf = expresionf;
        this.expresionc = expresionc;
        this.nexpresion = nexpresion;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno){
        try{
            /*
            1. Validar que la expresion sea un numero de tipo int, si no lo es mostrar error semantico
            2. Obtener el objeto simbolo de la tabla de simbolos
            3. Obtener la matriz de valores del simbolo
            4. Validar que el valor de la expresionf sea menor al tamaño de la matriz 
            5. Obtener el valor de la lista en la posicion de la expresion
            6. cambiar el valor del simbolo por el valor obtenido en nexpresion despues de haberlo interpretado
            7. Actualizar el simbolo en la tabla de simbolos
              */
            let posicionf = this.expresionf.interpretar(entorno);
            let posicionc = this.expresionc.interpretar(entorno);

            if(this.expresionf.tipo != 'int' && this.expresionc.tipo != 'int'){
                addError('Error Semantico', 'El indice debe ser de tipo entero', this.linea, this.columna);
                return this;
            }

            //data tiene el objeto simbolo
            let data = entorno.getSimboloVec2(this.id); 
            // listavalores tiene el arreglo de valores en objeto Data
            let listavaloresMatriz = data.getTipo();
            //hay que validar que el tipo de nexpresion sea igual al tipo del simbolo
            let tipodatoAux = data.getTipoDato();
            if(this.nexpresion.tipo != tipodatoAux){
                addError('Error Semantico', 'El tipo de dato a asignar no coincide con el tipo del arreglo', this.linea, this.columna);
                return this;
            }
            //valida la posicion de la fila está dentro del rango
            if(posicionf < listavaloresMatriz.length && posicionf >= 0){
                //almacenando en la posicion de la lista el objeto Data actualizado
                let tamcolumna = listavaloresMatriz[0].length;
                if(posicionc < tamcolumna && posicionc >= 0){
                    let listafilaAux = listavaloresMatriz[posicionf];
                    listafilaAux[posicionc] = this.nexpresion;
                    listavaloresMatriz[posicionf] = listafilaAux;
                    entorno.actualizarSimboloVec2(this.id, listavaloresMatriz);
                    return this;
                }else{
                    addError('Error Semantico', 'El indice de columna esta fuera de rango', this.linea, this.columna);
                }
            }else{
                addError('Error Semantico', 'El indice de fila esta fuera de rango', this.linea, this.columna);
            }
    }catch(error){
        addError('Error', 'Ha ocurrido un error ', this.linea, this.columna);
    }
    }
}

module.exports = ModifV2;