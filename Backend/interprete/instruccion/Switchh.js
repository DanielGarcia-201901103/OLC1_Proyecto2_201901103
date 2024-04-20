const Instruccion = require('../Instruccion.js');
const Entorno = require('../../analisisSem/Entorno.js');
const { addError } = require('../../analisisSem/manejoErrores');

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
            let entornoswitch = new Entorno('SWITCH', entorno);
            this.condicion.interpretar(entornoswitch);

            for(let i = 0; i < this.casos.length; i++){
                //si el caso es igual a default se ejecuta el default, de lo contrario se ejecuta el caso
                if(this.casos[i].nombrecaso == 'default'){
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
                if(this.casos[i].nombrecaso == 'case'){
                    let instruc = this.casos[i];
                    instruc.condicion.interpretar(entornoswitch);

                    if(this.condicion.valor == instruc.condicion.valor){
                        for(let j = 0; j < instruc.instruccionescas.length; j++){
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
                        break;
                    }

                    
                    
                    console.log('ESTOY EN EL CASO DE SWITCH, ACA DEBERIA EJECUTAR EL DEFAULT')
                    /*acá colocar la validacion para que ejecute el default, si no funciona validar con el nombre */
                }
            }
            //guardar el entorno
            return this;

        } catch (error) {
            addError('Error', 'Ha ocurrido un error en la interpretación del switch ' + error, this.linea, this.columna);
        }
    }
}
//https://github.com/AlexIngGuerra/OLC1-1S2024/blob/main/clase_12/server/interprete/instruccion/If.js
module.exports = Switchh;