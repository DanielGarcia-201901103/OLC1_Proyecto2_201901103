const Simbolo = require('./simbolos.js').Simbolo;
const { addError } = require('./manejoErrores.js');
const {addSimboloDec} = require('./manejoSimbolos.js');

class Entorno{
    constructor(nombreentorno, anterior){
        this.nombreentorno = nombreentorno;
        this.anterior = anterior;
        this.tablasimbolos = {};
        this.tablavectores = {};
        this.tablavectores2 = {};
        this.tablametodos = {};
    }
    
    addSimbolo(id, valor, tipo, entorno, linea, columna){
        if (id in this.tablasimbolos){
            //error semantico de variable ya declarada
            addError("Semantico", "Variable ya declarada", linea, columna);
            return;
        }
        let simbolo = new Simbolo(id, valor ,tipo, entorno, linea, columna);
        let simbolo1 = new Simbolo(id, valor.valor ,tipo, entorno.nombreentorno, linea, columna);
        addSimboloDec(simbolo1);
        this.tablasimbolos[id] = simbolo;
    }

    getSimbolo(id){
        let ent = this;

        while (ent != null){
            if(!(id in ent.tablasimbolos)){
            console.log("entorno actual "+ ent.nombreentorno)
                ent = ent.anterior
            }
            console.log(ent.tablasimbolos[id]);
            return ent.tablasimbolos[id];
        }
        addError("Semantico", "Variable no existe" + id, 0, 0);
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
        addError("Semantico", "Variable no existe" + id, 0, 0);
        return;
        //error semantico variable no existe
        //return tipo de dato error
        
    }

    addSimboloVec(id, valor, tipo, entorno, linea, columna){
        if (id in this.tablavectores){
            //error semantico de variable ya declarada
            addError("Semantico", "Variable ya declarada", linea, columna);
            return;
        }
        let simbolo = new Simbolo(id, valor ,tipo, entorno, linea, columna);
        addSimboloDec(simbolo);
        this.tablavectores[id] = simbolo;
    }

    addSimboloVecT(id, valor, tipo, entorno, linea, columna, lsval){
        if (id in this.tablavectores){
            //error semantico de variable ya declarada
            addError("Semantico", "Variable ya declarada", linea, columna);
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
        addError("Semantico", "Variable no existe"+ id, 0, 0);
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
        addError("Semantico", "Variable no existe "+ id , 0, 0);
        return;
        //error semantico variable no existe
        //return tipo de dato error
        
    }

    addSimboloVec2(id, valor, tipo, entorno, linea, columna){
        if (id in this.tablavectores2){
            //error semantico de variable ya declarada
            addError("Semantico", "Variable ya declarada", linea, columna);
            return;
        }
        let simbolo = new Simbolo(id, valor ,tipo, entorno, linea, columna);
        addSimboloDec(simbolo);
        this.tablavectores2[id] = simbolo;
    }

    addSimboloVec2T(id, valor, tipo, entorno, linea, columna, lsval){
        if (id in this.tablavectores2){
            //error semantico de variable ya declarada
            addError("Semantico", "Variable ya declarada", linea, columna);
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
        addError("Semantico", "Variable no existe "+ id , 0, 0);
        return;
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
        addError("Semantico", "Variable no existe "+ id , 0, 0);
        return;
        //error semantico variable no existe
        //return tipo de dato error
        
    }

    addSimboloMet(id, valor, tipo, entorno, linea, columna){
        if (id in this.tablametodos){
            //error semantico de variable ya declarada
            addError("Semantico", "Variable ya declarada", linea, columna);
            return;
        }
        let simbolo = new Simbolo(id, valor ,tipo, entorno, linea, columna);
        let simbolo1 = new Simbolo(id, "instrucciones" ,tipo, entorno, linea, columna);
        addSimboloDec(simbolo1);
        this.tablametodos[id] = simbolo;
    }
    
    getSimboloMet(id){
        let ent = this;
        while (ent != null){
            if(!(id in ent.tablametodos)){
                ent = ent.anterior
            }
            return ent.tablametodos[id];
        }
        addError("Semantico", "Funcion no existe "+ id , 0, 0);
        return;
        //error semantico variable no existe
        //return tipo de dato error
    }
}

module.exports = Entorno;