const {Instruccion, TInst} = require('../Instruccion.js');
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
            
            let entornowhile = new Entorno(TInst.WHILE, entorno);
            this.condicion.interpretar(entorno);
            if (this.condicion.tipo != 'booleano') {
                addError('Error Semantico', 'La condición del while debe ser de tipo bool ', this.linea, this.columna);
                //error semantico la condicion no es de tipo boolean
                return this;
            }
            /*//Este while ya funciona
            while(this.condicion.valor == true){
                this.instruccioneswhile.forEach(instruccion => {
                    instruccion.interpretar(entornowhile);
                });
                this.condicion.interpretar(entornowhile);
            }*/
            
            while(this.condicion.valor == true){
                
                let resultado = 'WHILE';
                for (let i = 0; i < this.instruccioneswhile.length; i++) {
                    let instruccion = this.instruccioneswhile[i]
                    instruccion.interpretar(entornowhile);
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
    
                this.condicion.interpretar(entornowhile);
            }
            return this;
        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del while ' + error, this.linea, this.columna);
        }
    }
}

module.exports = Bwhile;