const Simbolo = require('./simbolos.js')
const Funcion = require('./funcion.js')
class Entorno{
    constructor(nombreentorno, anterior){
        this.tablasimbolos = {};
        this.tablafunciones = {};
        this.anterior = anterior;
        this.nombreentorno = nombreentorno;
    }
    
    addSimbolo(id, valor, tipo, tipodato, entorno, linea, columna){
        let simbolo = new Simbolo(id, valor ,tipo, tipodato, entorno, linea, columna);
        this.tablasimbolos[id] = simbolo;
    }

    getSimbolos(id){
        let entorno = this;
        let valor =  entorno.tablasimbolos[id];
        while (valor == undefined && this.anterior != null){
            entorno = entorno.anterior;
            valor = entorno.tablasimbolos[id];
        }
        return valor;
    }

    addFuncion(nombre, parametros, instrucciones){
        let simbolo = new Funcion(nombre, parametros, instrucciones);
        this.tablafunciones[nombre] = simbolo;
    }

    getFuncion(nombre){
        let entorno = this;
        let valor =  entorno.tablafunciones[id];
        while (valor == undefined && this.anterior != null){
            entorno = entorno.anterior;
            valor = entorno.tablafunciones[id];
        }
        return valor;
    }
}

module.exports = Entorno;