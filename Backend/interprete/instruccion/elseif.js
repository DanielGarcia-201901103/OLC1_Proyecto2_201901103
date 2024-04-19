const Instruccion = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');

class elseif extends Instruccion {
    constructor(condicion, instruccionesif, otrasinstruccionesif, linea, columna) {
        super();
        this.condicion = condicion;
        this.instruccionesif = instruccionesif;
        this.otrasinstruccionesif = otrasinstruccionesif;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            let entornoif = new Entorno('ELSEIF', entorno);
            this.condicion.interpretar(entornoif);
            console.log("estoy en else if nueva clase " + this.condicion.tipo)
            if (this.condicion.tipo != 'booleano') {
                addError('Error Semantico', 'La condición no es de tipo bool', this.linea, this.columna);
                return this;
            }
            console.log("estoy en else if nueva clase " + this.condicion.valor)
            if (this.condicion.valor == true) {
                
                console.log(this.instruccionesif.length)
                for(let i=0; i< this.instruccionesif.length;i++){
                    let instruc = this.instruccionesif[i];
                    instruc.interpretar(entornoif);
                    if(instruc.tipo == 'break'){
                        this.tipo = 'break';
                        break;
                    } else if(instruc.tipo == 'continue'){
                        this.tipo = 'continue';
                        break;
                    }
                }
                /*
                let resultado = this.instruccionesif.forEach(instruccion => {
                    instruccion.interpretar(entornoif);
                    console.log("validando en if"+ instruccion.tipo);
                    if(instruccion.tipo == 'break'){
                        this.tipo = 'break';
                        return 'break';
                    }
                });
                if(resultado == 'break'){
                    this.tipo = 'break';
                    return this;
                }
*/
            } else {
                
                console.log("probando en el else if " + this.otrasinstruccionesif);
                if(this.otrasinstruccionesif == '}'){
                    console.log("estoy dentro de if con }")
                    return this
                }
                this.otrasinstruccionesif.interpretar(entornoif);
                
                console.log("probnado ", this.otrasinstruccionesif)
                if(String(this.otrasinstruccionesif.condicion.valor).toLowerCase() == 'true'){
                    console.log("estoy dentro del else if")
                    this.otrasinstruccionesif.instruccionesif.forEach(instruccion => {
                        instruccion.interpretar(entornoif);
                    });
                }
                
            }
        //guardar el entorno
            return this;
    
        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del else if ' + error, this.linea, this.columna);
        }
    }
}
//https://github.com/AlexIngGuerra/OLC1-1S2024/blob/main/clase_12/server/interprete/instruccion/If.js
module.exports = elseif;