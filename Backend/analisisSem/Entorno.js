const Simbolo = require('./simbolos.js').Simbolo;
const Funcion = require('./funcion.js').Funcion;

class Entorno{
    constructor(nombreentorno, anterior){
        this.tablasimbolos = {};
        this.tablafunciones = {};
        this.anterior = anterior;
        this.nombreentorno = nombreentorno;
    }
    
    addSimbolo(id, valor, tipo, entorno, linea, columna){
        if (id in this.tablasimbolos){
            //error semantico de variable ya declarada
            return;
        }
        let simbolo = new Simbolo(id, valor ,tipo, entorno, linea, columna);
        this.tablasimbolos[id] = simbolo;
    }

    getSimbolo(id){
        let ent = this;
        while (ent != null){
            if(!(id in ent.tablasimbolos)){
                ent = ent.anterior
            }
            return ent.tablasimbolos[id];
        }
        return ;
        //error semantico variable no existe
        //return tipo de dato error
    }
    actualizarSimbolo(id, act){
        let ent = this;
        while (ent != null){
            if(!(id in ent.tablasimbolos)){
                ent = ent.anterior
            }
            ent.tablasimbolos[id].setTipo(act);
            return ;
        }
        //error semantico variable no existe
        //return tipo de dato error
        
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