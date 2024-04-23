const {Instruccion, TInst} = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores.js');
class Bdowhile extends Instruccion {
    constructor(instruccionesdowhile, condicion, linea, columna) {
        super();
        this.condicion = condicion;
        this.instruccionesdowhile = instruccionesdowhile;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            
            let entornodowhile = new Entorno(TInst.DOWHILE, entorno);
            
            //Este do while ya funciona
            /*do{
                this.instruccioneswhile.forEach(instruccion => {
                    instruccion.interpretar(entornodowhile);
                });
                this.condicion.interpretar(entornodowhile);
                if (this.condicion.tipo != 'booleano') {
                    addError('Error Semantico', 'La condición debe ser de tipo bool ', this.linea, this.columna);
                    //error semantico la condicion no es de tipo boolean
                    break;
                }
            }while(this.condicion.valor == true);*/
            do{
                let resultado = 'DOWHILE';
                for (let i = 0; i < this.instruccionesdowhile.length; i++) {
                    let instruccion = this.instruccionesdowhile[i]
                    instruccion.interpretar(entornodowhile);
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
                this.condicion.interpretar(entornodowhile);
                if (this.condicion.tipo != 'booleano') {
                    addError('Error Semantico', 'La condición del do while debe ser de tipo bool ', this.linea, this.columna);
                    //error semantico la condicion no es de tipo boolean
                    break;
                }
            }while(this.condicion.valor == true);
            return this;
        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del do while ' + error, this.linea, this.columna);
        }
    }
}

module.exports = Bdowhile;