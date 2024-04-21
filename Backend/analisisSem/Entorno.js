const Simbolo = require('./simbolos.js').Simbolo;
const Funcion = require('./funcion.js').Funcion;
const {addSimboloDec} = require('./manejoSimbolos.js');

class Entorno{
    constructor(nombreentorno, anterior){
        this.tablasimbolos = {};
        this.tablavectores = {};
        this.tablavectores2 = {};
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
        let simbolo1 = new Simbolo(id, valor.valor ,tipo, entorno, linea, columna);
        addSimboloDec(simbolo1);
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

    addSimboloVec(id, valor, tipo, entorno, linea, columna){
        if (id in this.tablavectores){
            //error semantico de variable ya declarada
            return;
        }
        let simbolo = new Simbolo(id, valor ,tipo, entorno, linea, columna);
        addSimboloDec(simbolo);
        this.tablavectores[id] = simbolo;
    }

    addSimboloVecT(id, valor, tipo, entorno, linea, columna, lsval){
        if (id in this.tablavectores){
            //error semantico de variable ya declarada
            return;
        }
        let simbolo = new Simbolo(id, valor ,tipo, entorno, linea, columna);
        let simbolo1 = new Simbolo(id, lsval ,tipo, entorno, linea, columna);
        addSimboloDec(simbolo1);
        this.tablavectores[id] = simbolo;
    }

    getSimboloVec(id){
        let ent = this;
        while (ent != null){
            if(!(id in ent.tablavectores)){
                ent = ent.anterior
            }
            return ent.tablavectores[id];
        }
        return ;
        //error semantico variable no existe
        //return tipo de dato error
    }

    actualizarSimboloVec(id, act){
        let ent = this;
        while (ent != null){
            if(!(id in ent.tablavectores)){
                ent = ent.anterior
            }
            ent.tablavectores[id].setTipo(act);
            return ;
        }
        //error semantico variable no existe
        //return tipo de dato error
        
    }

    addSimboloVec2(id, valor, tipo, entorno, linea, columna){
        if (id in this.tablavectores){
            //error semantico de variable ya declarada
            return;
        }
        let simbolo = new Simbolo(id, valor ,tipo, entorno, linea, columna);
        addSimboloDec(simbolo);
        this.tablavectores2[id] = simbolo;
    }

    addSimboloVec2T(id, valor, tipo, entorno, linea, columna, lsval){
        if (id in this.tablavectores){
            //error semantico de variable ya declarada
            return;
        }
        let simbolo = new Simbolo(id, valor ,tipo, entorno, linea, columna);
        let simbolo1 = new Simbolo(id, lsval ,tipo, entorno, linea, columna);
        addSimboloDec(simbolo1);
        this.tablavectores2[id] = simbolo;
    }

    getSimboloVec2(id){
        let ent = this;
        while (ent != null){
            if(!(id in ent.tablavectores2)){
                ent = ent.anterior
            }
            return ent.tablavectores2[id];
        }
        return ;
        //error semantico variable no existe
        //return tipo de dato error
    }

    actualizarSimboloVec2(id, act){
        let ent = this;
        while (ent != null){
            if(!(id in ent.tablavectores2)){
                ent = ent.anterior
            }
            ent.tablavectores2[id].setTipo(act);
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