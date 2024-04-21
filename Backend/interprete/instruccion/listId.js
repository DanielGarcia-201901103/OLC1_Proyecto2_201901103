
let lvariables = [];
let listaelseif = [];
let listacasosswitch = [];
let listaexpresionesv = [];

function addVariables(id){
    lvariables.push(id);
}
function getLVariables(){
    lvariables.reverse();
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
    listaexpresionesv.push(id);
}
function getExp(){
    listaexpresionesv.reverse();
    return listaexpresionesv;
}
function concatenarlistaExp(ls){
    listaexpresionesv.concat(ls);
}
function limpiarlistExp(){
    listaexpresionesv = [];
}

module.exports = {addVariables, limpiarlistVariables, getLVariables, concatenarlista , 
    addELSEif, getElSEIF, limpiarElSEIF, 
    addCasos, getCasos, concatenarlistaCasos, limpiarlistCasos,
    addExp, getExp, concatenarlistaExp, limpiarlistExp};