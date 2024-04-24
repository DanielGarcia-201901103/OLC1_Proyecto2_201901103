const {Instruccion, TInst} = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');
const { getcont } = require('../../analisisSem/contador.js');

class Switchh extends Instruccion {
    constructor(condicion, casos, linea, columna) {
        super();
        this.condicion = condicion;
        this.casos = casos;
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno) {
        try {
            /*PARA VALIDACIONES DEL SWITCH, 
            1. OBTENER LA CONDICION DEL SWITCH
            2. INTERPRETAR LA CONDICION
            3. OBTENER LA LISTA DE CASOS [CASO1{}, CASO2, ETC....] 
            4. Recorrer la lista de casos con un for
            5. Obtener la condicion de la lista de casos
            6. comparar con un if las condiciones de los casos con la condicion del switch
            7. Sí se cumple la condicion interpretar las instrucciones del caso
            8. Sí no se cumple la condición se realiza un break, 
            9. Sí se valida que en la lista de casos es igual a default se interpreta las instrucciones de default*/
            let entornoswitch = new Entorno(TInst.SWITCH, entorno);
            this.condicion.interpretar(entornoswitch);
            //console.log("ESTE VA ANTES DE IMPRIMIR LOS CASOS DEL SWITCH, SOLO PARA VER EL ORDEN DE LLEGADA DE LOS CASOS")
            //console.log(this.casos)
            //console.log("**************************************************************************************************************************")
            if (this.casos[0].nombrecaso == 'default') {
                
                //let instruc = this.casos[0];
                //instruc.interpretar(entornoswitch);

                for (let i = 0; i < this.casos.length; i++) {
                    //si el caso es igual a default se ejecuta el default, de lo contrario se ejecuta el caso
                        let instruc = this.casos[i];
                        instruc.interpretar(entornoswitch);
                        if (instruc.tipo == 'break') {
                            this.tipo = 'break';
                            break;
                        } else if (instruc.tipo == 'continue') {
                            this.tipo = 'continue';
                            break;
                        }
                    }
            } else {
                let listaauxiliardefault = [];
                for (let i = 0; i < this.casos.length; i++) {
                    //si el caso es igual a default se ejecuta el default, de lo contrario se ejecuta el caso

                    if (this.casos[i].nombrecaso == 'case') {
                        let instruc = this.casos[i];
                        instruc.condicion.interpretar(entornoswitch);
                    
                        if (this.condicion.valor == instruc.condicion.valor) {
                            for (let j = 0; j < instruc.instruccionescas.length; j++) {
                                let instruc1 = instruc.instruccionescas[j];
                                instruc1.interpretar(entornoswitch);
                                if (instruc1.tipo == 'break') {
                                    this.tipo = 'break';
                                    break;
                                } else if (instruc1.tipo == 'continue') {
                                    this.tipo = 'continue';
                                    break;
                                }
                            }
                            return this;
                        }
                        
                    }else{
                        listaauxiliardefault.push(this.casos[i]);
                    }
                }

                for (let i = 0; i < listaauxiliardefault.length; i++) {
                    //si el caso es igual a default se ejecuta el default, de lo contrario se ejecuta el caso
                    if (listaauxiliardefault[i].nombrecaso == 'default') {
                        let instruc = listaauxiliardefault[i];
                        instruc.interpretar(entornoswitch);
                        if (instruc.tipo == 'break') {
                            this.tipo = 'break';
                            break;
                        } else if (instruc.tipo == 'continue') {
                            this.tipo = 'continue';
                            break;
                        }
                    }

                }
                /*
                for (let i = 0; i < this.casos.length; i++) {
                    //si el caso es igual a default se ejecuta el default, de lo contrario se ejecuta el caso
                    if (this.casos[i].nombrecaso == 'default') {
                        let instruc = this.casos[i];
                        instruc.interpretar(entornoswitch);
                        if (instruc.tipo == 'break') {
                            this.tipo = 'break';
                            break;
                        } else if (instruc.tipo == 'continue') {
                            this.tipo = 'continue';
                            break;
                        }
                    }

                } */
                
            }
            //guardar el entorno
            return this;

        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del switch ' + error, this.linea, this.columna);
        }
    }
    getAst() {
        let nodo = {
            padre: -1,
            cadena: ""
        };
    
        let condicionAst = this.condicion.getAst();
        let casosAst = this.casos.map(caso => caso.getAst());
    
        let padre = getcont();
        let cont = getcont();
    
        nodo.padre = padre;
        nodo.cadena =
            condicionAst.cadena +
            casosAst.map(ast => `${cont}--${ast.padre}\n${ast.cadena}`).join('') +
            `${padre}[label="SWITCH"]\n` +
            `${cont}[label="Casos"]\n` +
            `${padre}--${condicionAst.padre}\n` +
            `${cont}--${condicionAst.padre}\n`;
    
        return nodo;
    }
}
module.exports = Switchh;