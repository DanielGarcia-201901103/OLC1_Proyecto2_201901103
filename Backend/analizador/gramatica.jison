%{
//const {Aritmetica,tipoArit} = require('./expresion/Aritmetica')
//const {Relacional,TipoRel} = require('./expresion/relaciones')
//const {tipo} = require('./expresion/retorno')
//const {Variable} = require('./expresion/variable')
//const {Nativo,tipoNat} = require('./expresion/nativo')
//const {Declarar} = require('./instrucciones/declarar')
//const {Print} = require('./instrucciones/print')
//const {Bloque} = require('./instrucciones/bloque')
//const {If} = require('./instrucciones/If')
%}

%lex

%options case-insensitive

%%

[ \s\r\n\t]                //espacios en blanco
"//".*		//comentario simple	

"+"                 return 'mas';
"-"                 return 'menos';
"/"                 return 'dividir';
"*"                 return 'por';
"%"                 return 'modulo';
"!"                 return 'notlogico';
"("                 return 'parentesisabre';
")"                 return 'parentesiscierra';
"{"                 return 'llaveabre';
"}"                 return 'llavecierra';
"["                 return 'corcheteabre';
"]"                 return 'corchetecierra';
","                 return 'signocoma';
";"                 return 'sigpuntoycoma';
"="                 return 'sigigual';
"."                 return 'sigpunto';
"?"                 return 'siginterrogacion';
":"                 return 'dospuntos';
"=="                return 'igualigual';
"!="                return 'negacionigual';
"<"                 return 'menorque';
">"                 return 'mayorque';
"<="                return 'menorigual';
">="                return 'mayorigual';
"||"                return 'orlogico';
"&&"                return 'andlogico';
"++"                return 'sigincremento';
"--"                return 'sigdecremento';
"<<"                return 'menormenor';
"int"               return 'resint';
"double"            return 'resdouble';
"bool"              return 'resbool';
"char"              return 'reschar';
"std::string"       return 'resstring';
"pow"               return 'respotencia';
"new"               return 'resnew';
"if"                return 'resif';
"else"              return 'reselse';
"switch"            return 'resswitch';
"case"              return 'rescase';
"default"           return 'resdefault';
"while"             return 'reswhile';
"for"               return 'resfor';
"do"                return 'resdo';
"break"             return 'resbreak';
"continue"          return 'rescontinue';
"return"            return 'resreturn';
"void"              return 'resvoid';
"cout"              return 'rescout';
"endl"              return 'resendl';
"tolower"           return 'restolower';
"toupper"           return 'restoupper';
"round"             return 'resround';
"length"            return 'reslength';
"typeof"            return 'restypeof';
"std::tostring"     return 'restostring';
"c_str"             return 'rescstr';
"execute"           return 'resexecute';


("true"|"false")\b      return 'bool';
[0-9]+[.][0-9]+\b    return 'decimal';
[0-9]+\b                return 'numero';
([a-zA-Z])[a-zA-Z0-9_]*	return 'id';
\'[^\']\'               return 'caracter';
\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; }

<<EOF>>             return 'EOF';
.                   {console.log(yylloc.first_line, yylloc.first_columm, 'Lexico', yytext)}
/lex

%left 'orlogico'
%left 'andlogico'
%left 'notlogico'
%left 'negacionigual' 'igualigual'
%left 'menorigual' 'mayorigual' 'mayorque' 'menorque'
%left 'mas', 'menos'
%left 'dividir', 'por','modulo' 
%left 'pow'
%left Umenos 

%start INI

%%

INI: CODIGO EOF {return $1;}
;

CODIGO: CODIGO INSTRUCCION     { $$ = $2;}
            |INSTRUCCION                     { $$ = $1;}
;

INSTRUCCION: DECLARACIONES            {console.log($1);$$=$1;}
        | SENTENCIAS       {console.log($1);$$=$1;}
        | INCREYDECRE                 {console.log($1);$$=$1;}   
        | FUNCIONES                 {console.log($1);$$=$1;}   
        | METODOS                  {console.log($1);$$=$1;}    
        | LLAMADAS sigpuntoycoma                 {console.log($1);$$=$1;}    
        | FCOUT                  {console.log($1);$$=$1;}    
        | FEXECUTE                  {console.log($1);$$=$1;} 
;

DECLARACIONES: TIPODATO LISTANVARIABLES sigpuntoycoma
        | TIPODATO LISTANVARIABLES sigigual ASIGNACIONES sigpuntoycoma
        | LISTANVARIABLES sigigual ASIGNACIONES sigpuntoycoma
;

TIPODATO: resint
        | resdouble
        | resbool
        | reschar
        | resstring
;

LISTANVARIABLES: id
        | id signocoma LISTANVARIABLES
;

ASIGNACIONES: id
        | caracter
        | cadena
        | bool
        | decimal
        | numero
        | OPERACIONES
        | OPERACIONESRELACIONAL
        | OPERADORTERNARIO
        | OPERADORESLOGICOS
        | AGRUPACION
        | CASTEAR
        | INCREYDECRE
        | LLAMADAS
        | FTOLOWER
        | FTOUPPER
        | FROUND
        | FLENGTH
        | FTYPEOF
        | FTOSTRING
        | FCSTR
;

OPERACIONES: menos ASIGNACIONES %prec Umenos
        | ASIGNACIONES mas ASIGNACIONES
        | ASIGNACIONES menos ASIGNACIONES
        | ASIGNACIONES por ASIGNACIONES
        | ASIGNACIONES dividir ASIGNACIONES
        | respotencia parentesisabre ASIGNACIONES signocoma ASIGNACIONES parentesiscierra
        | ASIGNACIONES modulo ASIGNACIONES
;

OPERACIONESRELACIONAL: ASIGNACIONES igualigual ASIGNACIONES
        | ASIGNACIONES negacionigual ASIGNACIONES
        | ASIGNACIONES menorigual ASIGNACIONES
        | ASIGNACIONES menorque ASIGNACIONES
        | ASIGNACIONES mayorigual ASIGNACIONES
        | ASIGNACIONES mayorque ASIGNACIONES
;

OPERADORESLOGICOS: ASIGNACIONES andlogico ASIGNACIONES
        | ASIGNACIONES orlogico ASIGNACIONES
        | notlogico ASIGNACIONES
;

OPERADORTERNARIO: OPERACIONESRELACIONAL siginterrogacion ASIGNACIONES dospuntos ASIGNACIONES
;

AGRUPACION: parentesisabre ASIGNACIONES parentesiscierra
;

CASTEAR: parentesisabre TIPODATO parentesiscierra ASIGNACIONES
;

INCREYDECRE: ASIGNACIONES sigincremento
        | ASIGNACIONES sigdecremento
;

SENTENCIAS: SENTIF
        | SENTSWITCH
        | SENTWHILE
        | SENTFOR
        | SENTDOWHILE
;

SENTIF: resif parentesisabre CONDICIONALIF parentesiscierra llaveabre CONTENIDOS FINIF
;

CONDICIONALIF: id
        | OPERACIONESRELACIONAL
        | OPERADORESLOGICOS
;

CONTENIDOS: resbreak sigpuntoycoma
        | RETORNOS
        | CODIGO
;

FINIF: llavecierra
        | llavecierra reselse SENTIF
        | llavecierra reselse llaveabre CONTENIDOS llavecierra 
;

SENTSWITCH: resswitch parentesisabre CONDICIONALIF parentesiscierra llaveabre SWCASOS llavecierra
;

SWCASOS: SWCASE
        | SWCASE SWCASOS
;

SWCASE: rescase ASIGNACIONES dospuntos CONTENIDOS
        | resdefault dospuntos CONTENIDOS
;

SENTWHILE: reswhile parentesisabre CONDICIONALIF parentesiscierra llaveabre CONTENIDOSCICLOS llavecierra
;

SENTFOR: resfor parentesisabre DECLARACIONES sigpuntoycoma CONDICIONALIF sigpuntoycoma INCREYDECRE parentesiscierra llaveabre CONTENIDOSCICLOS llavecierra
;

SENTDOWHILE: resdo llaveabre CONTENIDOSCICLOS llavecierra reswhile parentesisabre CONDICIONALIF parentesiscierra sigpuntoycoma
;

CONTENIDOSCICLOS: resbreak sigpuntoycoma
        | rescontinue sigpuntoycoma
        | RETORNOS
        | CODIGO
;

RETORNOS: resreturn sigpuntoycoma
        | resreturn ASIGNACIONES sigpuntoycoma
;

FUNCIONES: TIPODATO id SNPARAMETROS llaveabre CONTENIDOSCICLOS llavecierra
;

SNPARAMETROS: parentesisabre PARAMETROS parentesiscierra
        | parentesisabre  parentesiscierra
;

PARAMETROS: TIPODATO id
        | TIPODATO id signocoma PARAMETROS
;

METODOS: resvoid id SNPARAMETROS llaveabre CONTENIDOSMETOD llavecierra
;

CONTENIDOSMETOD: resbreak sigpuntoycoma
        | rescontinue sigpuntoycoma
        | CODIGO
;

LLAMADAS: id SNPARAMETROS
;

FCOUT: rescout menormenor ASIGNACIONES sigpuntoycoma
        | rescout menormenor ASIGNACIONES menormenor resendl sigpuntoycoma
;

FTOLOWER: restolower parentesisabre ASIGNACIONES parentesiscierra
;

FTOUPPER: restoupper parentesisabre ASIGNACIONES parentesiscierra
;

FROUND: resround parentesisabre ASIGNACIONES parentesiscierra
;

FLENGTH: ASIGNACIONES sigpunto reslength parentesisabre parentesiscierra
;

FTYPEOF: restypeof parentesisabre ASIGNACIONES parentesiscierra
;

FTOSTRING: restostring parentesisabre ASIGNACIONES parentesiscierra
;

FCSTR: ASIGNACIONES sigpunto rescstr parentesisabre parentesiscierra
;

FEXECUTE: resexecute id SNPARAMETROS sigpuntoycoma
;