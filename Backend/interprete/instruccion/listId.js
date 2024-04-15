
let lvariables = [];
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

module.exports = {addVariables, limpiarlistVariables, getLVariables, concatenarlista};