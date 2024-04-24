const {Instruccion, TInst} = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores.js');
const { getcont } = require('../../analisisSem/contador.js');
class MFuncion extends Instruccion {
    constructor(tipofuncion, id, parametros, instruccionesfun, linea, columna) {
        super();
        this.tipofuncion = tipofuncion
        this.id = id;
        this.parametros = parametros;
        this.instruccionesfun = instruccionesfun;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            /* */
            let entornomet = new Entorno(TInst.FUNCION, entorno);
            //Manejando la funcion sin parametros 
            if(this.parametros.length === 0){
                let lsInstyParams = [this.parametros,this.instruccionesfun];
                entorno.addSimboloMet(this.id, lsInstyParams, this.tipofuncion, entornomet.nombreentorno, this.linea, this.columna);
                return this;
            }else{

            }
            return this;
        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación de la Funcion ' + error, this.linea, this.columna);
        }
    }

    getAst(){
        let nodo = {
            padre: -1,
            cadena: ""
        }
    
        let id = getcont();
        let tipo = getcont();
        let params = getcont();
        let instrucciones = getcont();
        let padre = getcont();
    
        nodo.padre = padre;
        nodo.cadena =
            `${id}[label="${this.id}"]\n`+
            `${tipo}[label="${this.tipofuncion}"]\n`+
            `${padre}[label="Funcion"]\n`+
            `${padre}--${tipo}\n`+
            `${padre}--${id}\n`
            ;
    
        if(this.parametros.length > 0){
            nodo.cadena += `${params}[label="Parametros"]\n`;
            this.parametros.forEach(param => {
                let paramNode = param.getAst();
                nodo.cadena += `${params}--${paramNode.padre}\n${paramNode.cadena}`;
            });
            nodo.cadena += `${padre}--${params}\n`;
        }
    
        if(this.instruccionesfun.length > 0){
            nodo.cadena += `${instrucciones}[label="Instrucciones"]\n`;
            this.instruccionesfun.forEach(instruccion => {
                let instrNode = instruccion.getAst();
                nodo.cadena += `${instrucciones}--${instrNode.padre}\n${instrNode.cadena}`;
            });
            nodo.cadena += `${padre}--${instrucciones}\n`;
        }
    
        return nodo;
    }
}

module.exports = MFuncion;