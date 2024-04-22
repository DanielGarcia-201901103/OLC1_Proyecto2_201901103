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
            this.condicion.interpretar(entorno);

            if (this.condicion.tipo != 'booleano') {
                addError('Error Semantico', 'La condición no es de tipo bool', this.linea, this.columna);
                return this;
            }
            if (this.condicion.valor == true) {

                console.log(this.instruccionesif.length)
                for (let i = 0; i < this.instruccionesif.length; i++) {
                    let instruc = this.instruccionesif[i];
                    instruc.interpretar(entornoif);
                    if (instruc.tipo == 'break') {
                        this.tipo = 'break';
                        break;
                    } else if (instruc.tipo == 'continue') {
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


                if (this.otrasinstruccionesif[0] == '}') {
                    return this
                } else {

                    if (this.otrasinstruccionesif[0].nombreelse == 'else') {
                        
                        let resultado = this.otrasinstruccionesif[0].instruccioneselse.forEach(instruccion => {
                            instruccion.interpretar(entornoif);
                            if (instruccion.tipo == 'break') {
                                this.tipo = 'break';
                                return 'break';
                            }
                        });
                        if (resultado == 'break') {
                            this.tipo = 'break';
                            return this;
                        }
                    } else {

                        for (let i = 0; i < this.otrasinstruccionesif.length; i++) {
                            let instruc = this.otrasinstruccionesif[i];
                            instruc.condicion.interpretar(entorno);
                            if (instruc.condicion.valor == true) {
                                instruc.instruccionesif.forEach(instruccion => {
                                    instruccion.interpretar(entornoif);
                                });
                                if (instruc.tipo == 'break') {
                                    this.tipo = 'break';
                                    break;
                                } else if (instruc.tipo == 'continue') {
                                    this.tipo = 'continue';
                                    break;
                                }
                                break;
                            }
                            if (instruc.otrasinstruccionesif[0] == '}') {
                                return this
                            } else {
                                if (instruc.otrasinstruccionesif[0].nombreelse == 'else') {
                                    let resultado = instruc.otrasinstruccionesif[0].instruccioneselse.forEach(instruccion => {
                                        instruccion.interpretar(entornoif);
                                        if (instruccion.tipo == 'break') {
                                            this.tipo = 'break';
                                            return 'break';
                                        }
                                    });
                                    if (resultado == 'break') {
                                        this.tipo = 'break';
                                        return this;
                                    }
                                    break;
                                }
                            }

                        }
                    }

                }

                //this.otrasinstruccionesif.condicion.interpretar(entornoif);


                /*
                console.log("probando en if para interpretar el else if ", this.otrasinstruccionesif.condicion.valor)
                if(this.otrasinstruccionesif.condicion.valor == true){
                    console.log("estoy dentro del else if")
                    this.otrasinstruccionesif.instruccionesif.forEach(instruccion => {
                        instruccion.interpretar(entornoif);
                    });
                }else{
                    console.log("estoy dentro del else if")
                    this.otrasinstruccionesif.otrasinstruccionesif.forEach(instruccion => {
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