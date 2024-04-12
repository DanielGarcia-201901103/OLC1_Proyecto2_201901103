const Instruccion = require("../Instruccion.js");
const Entorno = require('../../analisisSem/Entorno.js');

class Reasignacion extends Instruccion {
    constructor(id, expresion, linea, columna) {
        super();
        this.id = id;
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno) {

        this.expresion.interpretar(entorno);
        /* 
        1. Obtener el id recorriendo la lista de variables
        2. buscar el id en la tabla de simbolos y obtener el objeto de simbolo
        3. Comparar tipos
        4. asignar el nuevo valor*/

        for (let i = 0; i < this.id.length; i++) {
            let simbolo = entorno.getSimbolo(this.id[i]);
            let data = simbolo.getTipo();
            
            if (this.expresion.tipo != data.tipo) {
                console.error('Error de tipos en la declaración de variable');
                //error semantico
                return this;
            }
            data = this.expresion;
            data.tipo = this.expresion.tipo;
            entorno.actualizarSimbolo(this.id[i], data);
        }
        


        //esto hay que corregirlo para que acepete el valor de la variable
        //entorno.addSimbolo(this.id,this.expresion ,this.tipo, this.tipodato, entorno.nombreentorno, this.linea, this.columna);
        return this;
    }
}

module.exports = Reasignacion;