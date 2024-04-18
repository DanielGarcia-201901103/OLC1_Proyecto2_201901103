const Instruccion = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');

class If extends Instruccion {
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
            let entornoif = new Entorno('IF', entorno);
            this.condicion.interpretar(entornoif);
            
            if (this.condicion.tipo != 'booleano') {
                addError('Error Semantico', 'La condición no es de tipo bool', this.linea, this.columna);
                return this;
            }
            console.log("probando en el ifffff " + this.condicion.valor)
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
            } else {
                /*
                console.log("probando en el else if " + this.otrasinstruccionesif);
                if(this.otrasinstruccionesif == '}'){
                    console.log("estoy dentro de if con }")
                    return this
                }
                console.log("probnado ",typeof this.otrasinstruccionesif.condicion.valor)
                if(String(this.otrasinstruccionesif.condicion.valor).toLowerCase() == 'true'){
                    console.log("estoy dentro del else if")
                    this.otrasinstruccionesif.instruccionesif.forEach(instruccion => {
                        instruccion.interpretar(entornoif);
                    });
                }*/
                
            }
        //guardar el entorno
            return this;
    
        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del if ' + error, this.linea, this.columna);
        }
    }
}
//https://github.com/AlexIngGuerra/OLC1-1S2024/blob/main/clase_12/server/interprete/instruccion/If.js
module.exports = If;