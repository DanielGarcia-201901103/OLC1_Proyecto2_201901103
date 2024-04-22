
let lvariables = [];
let listaelseif = [];
let listacasosswitch = [];
let listaexpresionesv = [];
let listaMatriz = [];
let listaparametros = [];

function addVariables(id){
    lvariables.unshift(id);
}
function getLVariables(){
    return lvariables;
}
function concatenarlista(ls){
    lvariables.concat(ls);
}
function limpiarlistVariables(){
    lvariables = [];
}
// FUNCIONES PARA MANEJAR LAS LISTAS DE ELSE IF 
function addELSEif(id){
    listaelseif.push(id);
}
function getElSEIF(){
    listaelseif.reverse();
    return listaelseif;
}
function limpiarElSEIF(){
    listaelseif = [];
}

//FUNCIONES PARA MANEJAR LAS LISTAS DE CASOS DE LA SENTENCIA SWITCH
function addCasos(id){
    listacasosswitch.push(id);
}
function getCasos(){
    listacasosswitch.reverse();
    return listacasosswitch;
}
function concatenarlistaCasos(ls){
    listacasosswitch.concat(ls);
}
function limpiarlistCasos(){
    listacasosswitch = [];
}

//FUNCIONES PARA MANEJAR LAS LISTAS DE EXPRESIONES DE DECLARACION DE VECTORES
function addExp(id){
    listaexpresionesv.unshift(id);
}
function getExp(){
    return listaexpresionesv;
}
function concatenarlistaExp(ls){
    listaexpresionesv.concat(ls);
}
function limpiarlistExp(){
    listaexpresionesv = [];
}
//FUNCIONES PARA MANEJAR LAS LISTAS DE LISTASFILAS DE LA MATRIZ DE VECTORES
function addLSMA(id){
    listaMatriz.unshift(id);
}
function getLSMA(){
    return listaMatriz;
}
function concatenarLSMA(ls){
    listaMatriz.concat(ls);
}
function limpiarLSMA(){
    listaMatriz = [];
}
// FUNCIONES PARA MANEJAR LAS LISTAS DE PARAMETROS DE FUNCIONES Y METODOS

module.exports = {addVariables, limpiarlistVariables, getLVariables, concatenarlista , 
    addELSEif, getElSEIF, limpiarElSEIF, 
    addCasos, getCasos, concatenarlistaCasos, limpiarlistCasos,
    addExp, getExp, concatenarlistaExp, limpiarlistExp,
    addLSMA, getLSMA, concatenarLSMA, limpiarLSMA};