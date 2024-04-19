
let lvariables = [];
let listaelseif = [];

function addVariables(id){
    lvariables.push(id);
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
    lvariables.push(id);
}
function getElSEIF(){
    return lvariables;
}
function limpiarElSEIF(){
    lvariables = [];
}

module.exports = {addVariables, limpiarlistVariables, getLVariables, concatenarlista , addELSEif, getElSEIF, limpiarElSEIF};