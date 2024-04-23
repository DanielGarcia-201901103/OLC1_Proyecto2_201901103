const {Instruccion, TInst} = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores.js');
class BFor extends Instruccion {
    constructor(decl, condicion, actualizacion, instruccionesfor, linea, columna) {
        super();
        this.decl = decl;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.instruccionesfor = instruccionesfor;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            /* */
            let entornofor = new Entorno(TInst.FOR, entorno);
            this.decl.interpretar(entornofor);
            this.condicion.interpretar(entornofor);

            if (this.condicion.tipo != 'booleano') {
                addError('Error Semantico', 'La condición del For  debe ser de tipo bool ', this.linea, this.columna);
                //error semantico la condicion no es de tipo boolean
                return this;
            }
            while(this.condicion.valor == true){
                let resultado = 'WHILE';
                for (let i = 0; i < this.instruccionesfor.length; i++) {
                    let instruccion = this.instruccionesfor[i]
                    instruccion.interpretar(entornofor);
                    if(instruccion.tipo == 'break'){
                        resultado = 'break';
                        break;
                    }else if(instruccion.tipo == 'continue'){
                        resultado = 'continue';
                        break;
                    }
                }
    
                if(resultado == 'break'){
                    break;
                }else if(resultado == 'continue'){
                    continue;
                }
                this.actualizacion.interpretar(entornofor);
                this.condicion.interpretar(entornofor);
            }
            return this;
        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del For ' + error, this.linea, this.columna);
        }
    }
}

module.exports = BFor;