
let lvariables = [];
let listaelseif = [];

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

module.exports = {addVariables, limpiarlistVariables, getLVariables, concatenarlista , addELSEif, getElSEIF, limpiarElSEIF};