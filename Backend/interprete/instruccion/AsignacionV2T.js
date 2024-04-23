const {Instruccion, TInst} = require("../Instruccion.js");
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');

class AsignacionV2T extends Instruccion{
    constructor(tipodec, id, expresionm, linea, columna){
        super();
        this.tipodec = tipodec;
        this.id = id;
        this.expresionm = expresionm;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno){
        try{    /*
        int vector4 [][] = [ [1, 2], [3, 4] ];

// puede venir una cantidad enesima de listas dentro de la lista lo que son las filas
// puede venir una cantidad enesima de valores dentro de las listas que están dentro de la lista, todas las sublistas que son las filas deben tener la misma cantidad de longitud


int vector4 [][] = [ LISTASFILAS ];

LISTASFILAS: [ LISTANEXPR ] signocoma LISTASFILAS    {  addExp($1); concatenarlistaExp($3); $$=getExp();} 
        |  [ LISTANEXPR ]                          {addExp($1); $$=getExp();} 
;

LISTANEXPR:  EXPRESIONES signocoma LISTANEXPR    {  addExp($1); concatenarlistaExp($3); $$=getExp();} 
        |   EXPRESIONES                          { addExp($1); $$=getExp();} 
;
 */
            /* expresionf es la lista matriz y dentro tiene las listasfilas que son las filas de la matriz
            1. recorrer la lista matriz y obtener las listasfilas
            2. validar si las listasfilas tienen la misma longitud
            3. si no tienen la misma longitud entonces error semantico de tamaño de columnas incorrecto
            4. si tienen la misma longitud entonces recorrer las listasfilas y obtener las expresiones de valores
            5. interpretar cada expresion y verificar que los tipos de cada expresion coincida con el tipo de dato de la lista de declaracion 
            6. si no coinciden entonces error semantico de tipo de dato incorrecto
            7. si coinciden almacenar en una lista adicional, y a la matriz adicional los valores para enviarlos a la tabla de simbolos*/
            
            let longitudcolumnas = this.expresionm[0].length;
            let listasiguales = true;
            let listaAuxMatriz = [];

            for(let i = 0; i < this.expresionm.length; i++){
                let filals = this.expresionm[i];
                if (this.expresionm[i].length !== longitudcolumnas){
                    listasiguales = false;
                    break;
                }
                //recorriendo la lista fila de la matriz
                let listaAuxFila = [];
                for(let j = 0; j < filals.length; j++){
                    let auxvalor = filals[j].interpretar(entorno);
                    if(filals[j].tipo != this.tipodec){
                        addError('Error Semantico', 'El tipo del valor dentro de la lista no coincide con el tipo de la declaracion ' + auxvalor , this.linea, this.columna);
                        //error semantico
                        return this;
                    }
                    listaAuxFila.push(auxvalor);
                }
                listaAuxMatriz.push(listaAuxFila);
            }

            if(listasiguales === false){
                addError('Error Semantico', 'Las filas no tienen la misma cantidad de columnas', this.linea, this.columna);
                return this;
            }

            for(let i = 0; i < this.id.length; i++){
                entorno.addSimboloVec2T(this.id[i], this.expresionm  ,this.tipodec, entorno.nombreentorno, this.linea, this.columna, listaAuxMatriz);
            }

        return this;
    }catch(error){
        addError('Error', 'Ha ocurrido un error en la declaración de Matrices', this.linea, this.columna);
    }
    }
}

module.exports = AsignacionV2T;