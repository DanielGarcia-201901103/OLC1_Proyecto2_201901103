const Instruccion = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
class If extends Instruccion{
    constructor(condicion, instruccionesif, linea, columna){
        super();
        this.condicion = condicion;
        this.instruccionesif = instruccionesif;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno){
        let entornoif = new Entorno('IF', entorno);
        this.condicion.interpretar(entornoif);
        if(this.condicion.tipo != 'booleano'){
            console.error('La condicion no es de tipo boolean');
            //error semantico la condicion no es de tipo boolean
            return this;
        }
        if(Boolean(this.condicion.valor)){
            this.instruccionesif.forEach(instruccion => {
                instruccion.interpretar(entornoif);
            });
        }
        else{
            // ejecución del else if o else
        }
        //guardar el entorno
        return this;
    }
}

module.exports = If;