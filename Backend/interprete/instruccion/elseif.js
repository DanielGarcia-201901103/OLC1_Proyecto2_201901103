const {Instruccion, TInst} = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');
const { getcont } = require('../../analisisSem/contador.js');

class elseif extends Instruccion {
    constructor(condicion, instruccionesif, otrasinstruccionesif, linea, columna) {
        super();
        this.condicion = condicion;
        this.instruccionesif = instruccionesif;
        this.otrasinstruccionesif = otrasinstruccionesif;
        this.linea = linea;
        this.columna = columna;
        this.nombreelse = 'elseif';
    }

    interpretar(entorno) {
        try {
            this.condicion.interpretar(entorno);
            if (this.condicion.tipo != 'booleano') {
                addError('Error Semantico', 'La condición no es de tipo bool', this.linea, this.columna);
                return this;
            }
            if (this.condicion.valor == true) {
                
                console.log(this.instruccionesif.length)
                for(let i=0; i< this.instruccionesif.length;i++){
                    let instruc = this.instruccionesif[i];
                    instruc.interpretar(entorno);
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
                if(this.otrasinstruccionesif[0] == '}'){
                    return this
                }

                for(let i=0; i< this.otrasinstruccionesif.length;i++){
                    let instruc = this.otrasinstruccionesif[i];
                    instruc.interpretar(entorno);
                    if(instruc.tipo == 'break'){
                        this.tipo = 'break';
                        break;
                    } else if(instruc.tipo == 'continue'){
                        this.tipo = 'continue';
                        break;
                    }
                }
                /*
                console.log("probando en el else ppppppppppp " + this.otrasinstruccionesif.length);
                if(this.otrasinstruccionesif.instruccioneselse == 'else'){
                    for(let i=0; i< this.otrasinstruccionesif.length;i++){
                        let instruc = this.otrasinstruccionesif[i];
                        instruc.interpretar(entornoif);
                        if(instruc.tipo == 'break'){
                            this.tipo = 'break';
                            break;
                        } else if(instruc.tipo == 'continue'){
                            this.tipo = 'continue';
                            break;
                        }
                    }
                }*/
                    
                
                
            }
        //guardar el entorno
            return this;
    
        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del else if ' + error, this.linea, this.columna);
        }
    }
    getAst() {
        let nodo = {
            padre: -1,
            cadena: ""
        }
    
        let condicionAst = this.condicion.getAst();
        let instruccionesIfAst = this.instruccionesif.map(instruccion => instruccion.getAst());
        let otrasInstruccionesIfAst = this.otrasinstruccionesif.map(instruccion => instruccion.getAst());
    
        let padre = getcont();
        let contCondicion = getcont();
        let contInstruccionesIf = getcont();
        let contOtrasInstruccionesIf = getcont();
    
        nodo.padre = padre;
        nodo.cadena =
            condicionAst.cadena +
            instruccionesIfAst.map(ast => `${contInstruccionesIf}--${ast.padre}\n${ast.cadena}`).join('') +
            otrasInstruccionesIfAst.map(ast => `${contOtrasInstruccionesIf}--${ast.padre}\n${ast.cadena}`).join('') +
            `${padre}[label="ELSE IF"]\n` +
            `${contCondicion}[label="Condicion"]\n` +
            `${contInstruccionesIf}[label="Instrucciones IF"]\n` +
            `${contOtrasInstruccionesIf}[label="Otras Instrucciones IF"]\n` +
            `${padre}--${contCondicion}\n` +
            `${padre}--${contInstruccionesIf}\n` +
            `${padre}--${contOtrasInstruccionesIf}\n` +
            `${contCondicion}--${condicionAst.padre}\n`;
    
        return nodo;
    }
}
//https://github.com/AlexIngGuerra/OLC1-1S2024/blob/main/clase_12/server/interprete/instruccion/If.js
module.exports = elseif;