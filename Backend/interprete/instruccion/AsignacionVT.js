const {Instruccion, TInst} = require("../Instruccion.js");
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');
const { getcont } = require('../../analisisSem/contador.js');

class AsignacionVT extends Instruccion{
    constructor(tipodec, id, expresion, linea, columna){
        super();
        this.tipodec = tipodec;
        this.id = id;
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno){
        try{    
            /*
            1. recorrer la lista expresion 
            2. interpretar cada expresion dentro de la lista 
            3. comparar el tipo de la expresion con el tipo de la declaracion
            4. si son iguales, no hacer nada, si son diferentes, error semantico
             */
            let lsval = [];
            for(let i = 0; i < this.expresion.length; i++){
                let auxvalor = this.expresion[i].interpretar(entorno);
                if(this.expresion[i].tipo != this.tipodec){
                    addError('Error Semantico', 'El tipo del valor dentro de la lista no coincide con el tipo de la declaracion ' + auxvalor , this.linea, this.columna);
                    //error semantico
                    return this;
                }
                lsval.push(auxvalor);
            }

            for(let i = 0; i < this.id.length; i++){
                entorno.addSimboloVecT(this.id[i], this.expresion  ,this.tipodec, entorno.nombreentorno, this.linea, this.columna, lsval);
            }
        return this;
    }catch(error){
        addError('Error', 'Ha ocurrido un error en la declaración de vectores', this.linea, this.columna);
    }
    }
    getAst() {
        let nodo = {
            padre: -1,
            cadena: ""
        }

       

        let op = getcont();
        let padre = getcont();
        let oc = getcont();
        let occ = getcont();
        let expresionAst = "";
        let extra = getcont();
        let adicional =`${extra}[label="Lista Expresiones"]\n`;
        for (let i = 0; i < this.expresion.length; i++) {
            let expAst = this.expresion[i].getAst();
            expresionAst += `${extra} --${expAst.padre}\n` + expAst.cadena ;
            nodo.padre = expAst.padre;
        }
        nodo.padre = padre;
        nodo.cadena = adicional+
            expresionAst +
            `${op}[label="${this.id}"]\n` +
            `${padre}[label="Asignación Vector"]\n` +
            `${oc}[label="${this.tipodec}"]\n` +
            `${occ}[label="="]\n` +
            `${padre}--${oc}\n` +
            `${padre}--${op}\n` +
            `${padre}--${occ}\n`+
            `${padre}--${extra}\n`
            ;

        return nodo;
    }
}

module.exports = AsignacionVT;