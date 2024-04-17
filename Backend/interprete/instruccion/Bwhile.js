const Instruccion = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores.js');
class Bwhile extends Instruccion {
    constructor(condicion, instruccioneswhile, linea, columna) {
        super();
        this.condicion = condicion;
        this.instruccioneswhile = instruccioneswhile;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            let entornowhile = new Entorno('WHILE', entorno);
            this.condicion.interpretar(entornowhile);
            console.log("probando id "+ this.condicion.op1.id)
            if (this.condicion.tipo != 'booleano') {
                addError('Error Semantico', 'La condición debe ser de tipo bool ', this.linea, this.columna);
                //error semantico la condicion no es de tipo boolean
                return this;
            }
            //this.instruccioneswhile.interpretar(entornowhile);
            while(this.condicion.valor== true){
                this.instruccioneswhile.forEach(instruccion => {
                    instruccion.interpretar(entornowhile);
                });
                this.condicion.interpretar(entornowhile);
            }
            /*La condicion no se actualiza, basicamente obtiene el valor y lo actualiza dentro del while, pero en la condición se mantiene 
            el valor 0, como que solo se actualizase pero no guardara el valor correcto, por lo que se encicla el dato, agregué un id a la 
            clase de Dato para mantener el nombre del id dentro de la funcionalidad, falta corregir el if también   */
            return this;
        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del if ' + error, this.linea, this.columna);
        }
    }
}

module.exports = Bwhile;