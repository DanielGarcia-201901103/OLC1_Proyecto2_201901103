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
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  //comentario vlineas


"++"                return 'sigincremento';
"--"                return 'sigdecremento';
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
"=="                return 'igualigual';
"="                 return 'sigigual';
"."                 return 'sigpunto';
"?"                 return 'siginterrogacion';
":"                 return 'dospuntos';
"!="                return 'negacionigual';
"<="                return 'menorigual';
">="                return 'mayorigual';
"<<"                return 'menormenor';
"<"                 return 'menorque';
">"                 return 'mayorque';
"||"                return 'orlogico';
"&&"                return 'andlogico';
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

INI: CODIGO EOF                              {return $1;}
;

CODIGO: CODIGO INSTRUCCION                   { $$ = $2;}
            |INSTRUCCION                     { $$ = $1;}
;

INSTRUCCION: DECLARACIONES            {$$=$1;}
        | SENTENCIAS                  {$$=$1;}  
        | FUNCIONES                   {$$=$1;}    
        | METODOS                     {$$=$1;}    
        | LLAMADAS sigpuntoycoma      {$$=$1;}    
        | FCOUT                       {$$=$1;}    
        | FEXECUTE                    {$$=$1;} 
;

DECLARACIONES: TIPODATO LISTANVARIABLES sigpuntoycoma            {console.log($1 + " "+ $2 + $3); $$=$1;} 
        | TIPODATO LISTANVARIABLES sigigual ASIGNACIONES sigpuntoycoma    {console.log($1 + " "+ $2 + $3 + " "+$4+$5);$$=$1;} 
        | LISTANVARIABLES sigigual ASIGNACIONES sigpuntoycoma {console.log($1 + " "+ $2 + " "+ $3 +$4); $$=$1;}  
        | id sigincremento sigpuntoycoma  {console.log($1 + " "+ $2 + " "+ $3); $$=$1;} 
        | id sigdecremento sigpuntoycoma  {console.log($1 + " "+ $2 + " "+ $3); $$=$1;} 
;
 
TIPODATO: resint       {$$=$1;} 
        | resdouble    {$$=$1;} 
        | resbool    {$$=$1;} 
        | reschar    {$$=$1;} 
        | resstring    {$$=$1;} 
;

LISTANVARIABLES: id    {$$=$1;} 
        | id signocoma LISTANVARIABLES    {$$=$1 + " "+ $2 + " " + $3;} 
;

ASIGNACIONES: OTRASEXPRESIONES {$$=$1;}  
        | EXPRESIONES  {$$=$1;} 
;

EXPRESIONES: OPERACIONES    {$$=$1;} 
        | OPERACIONESRELACIONAL    {$$=$1;} 
        | OPERADORESLOGICOS    {$$=$1;} 
        | id    {$$=$1;} 
        | caracter    {$$=$1;} 
        | cadena    {$$=$1;} 
        | bool    {$$=$1;} 
        | decimal    {$$=$1;} 
        | numero    {$$=$1;} 
;
OTRASEXPRESIONES: CASTEAR    {$$=$1;} 
        | OPERADORTERNARIO    {$$=$1;}  
        | INCREYDECRE    {$$=$1;}  
        | LLAMADAS    {$$=$1;} 
        | FTOLOWER    {$$=$1;}  
        | FTOUPPER    {$$=$1;}  
        | FROUND    {$$=$1;} 
        | FLENGTH    {$$=$1;}  
        | FTYPEOF    {$$=$1;}  
        | FTOSTRING   {$$=$1;} 
        | FCSTR   {$$=$1;} 
; 

OPERACIONES: menos EXPRESIONES %prec Umenos    {$$=$1 + $2;} 
        | EXPRESIONES mas EXPRESIONES    {$$=$1 + " " + $2 + " " + $3 ;} 
        | EXPRESIONES menos EXPRESIONES   {$$=$1 + " " + $2 + " " + $3 ;} 
        | EXPRESIONES por EXPRESIONES   {$$=$1 + " " + $2 + " " + $3 ;} 
        | EXPRESIONES dividir EXPRESIONES   {$$=$1 + " " + $2 + " " + $3 ;} 
        | respotencia parentesisabre EXPRESIONES signocoma EXPRESIONES parentesiscierra  {$$=$1 + $2 + " " + $3 + " " + $4 +" " + $5 + $6;} 
        | EXPRESIONES modulo EXPRESIONES   {$$=$1 + " " + $2 + " " + $3 ;} 
        | AGRUPACION   {$$=$1;} 
;

OPERACIONESRELACIONAL: EXPRESIONES igualigual EXPRESIONES   {$$=$1 + " " + $2 + " " + $3 ;} 
        | EXPRESIONES negacionigual EXPRESIONES  {$$=$1 + " " + $2 + " " + $3 ;}  
        | EXPRESIONES menorigual EXPRESIONES   {$$=$1 + " " + $2 + " " + $3 ;}  
        | EXPRESIONES menorque EXPRESIONES    {$$=$1 + " " + $2 + " " + $3 ;} 
        | EXPRESIONES mayorigual EXPRESIONES   {$$=$1 + " " + $2 + " " + $3 ;} 
        | EXPRESIONES mayorque EXPRESIONES    {$$=$1 + " " + $2 + " " + $3 ;} 
;

OPERADORESLOGICOS:  notlogico EXPRESIONES    {$$=$1 + " " + $2 ;} 
        | EXPRESIONES andlogico EXPRESIONES    {$$=$1 + " " + $2 + " " + $3 ;} 
        | EXPRESIONES orlogico EXPRESIONES    {$$=$1 + " " + $2 + " " + $3 ;} 
;

OPERADORTERNARIO: OPERACIONESRELACIONAL siginterrogacion ASIGNACIONES dospuntos ASIGNACIONES    {$$=$1 +" "+ $2 +" "+ $3 +$4 + " " + $5;} 
;


AGRUPACION: parentesisabre EXPRESIONES parentesiscierra    {$$=$1 + " " + $2 + " " + $3;} 
;


CASTEAR: parentesisabre TIPODATO parentesiscierra EXPRESIONES    {$$=$1 + " " + $2 + " " + $3 + " " + $4;} 
;

INCREYDECRE: EXPRESIONES sigincremento    {$$=$1 + $2;} 
        | EXPRESIONES sigdecremento      {$$=$1 + $2;} 
;

SENTENCIAS: SENTIF    {console.log($1);$$=$1;} 
        | SENTSWITCH    {console.log($1);$$=$1;} 
        | SENTWHILE    {console.log($1);$$=$1;} 
        | SENTFOR    {console.log($1);$$=$1;} 
        | SENTDOWHILE    {console.log($1);$$=$1;} 
;

SENTIF: resif parentesisabre EXPRESIONES parentesiscierra llaveabre CONTENIDOS FINIF    {console.log($1);$$=$1;} 
;

CONTENIDOS: resbreak sigpuntoycoma    {console.log($1);$$=$1;} 
        | RETORNOS    {console.log($1);$$=$1;} 
        | CODIGO    {console.log($1);$$=$1;} 
;

FINIF: llavecierra    {console.log($1);$$=$1;} 
        | llavecierra reselse SENTIF    {console.log($1);$$=$1;} 
        | llavecierra reselse llaveabre CONTENIDOS llavecierra     {console.log($1);$$=$1;} 
;

SENTSWITCH: resswitch parentesisabre CONDICIONALIF parentesiscierra llaveabre SWCASOS llavecierra    {console.log($1);$$=$1;} 
;

SWCASOS: SWCASE    {console.log($1);$$=$1;} 
        | SWCASE SWCASOS    {console.log($1);$$=$1;} 
;

SWCASE: rescase ASIGNACIONES dospuntos CONTENIDOS    {console.log($1);$$=$1;} 
        | resdefault dospuntos CONTENIDOS    {console.log($1);$$=$1;} 
;

SENTWHILE: reswhile parentesisabre CONDICIONALIF parentesiscierra llaveabre CONTENIDOSCICLOS llavecierra    {console.log($1);$$=$1;} 
;

SENTFOR: resfor parentesisabre DECLARACIONES sigpuntoycoma CONDICIONALIF sigpuntoycoma INCREYDECRE parentesiscierra llaveabre CONTENIDOSCICLOS llavecierra    {console.log($1);$$=$1;} 
;

SENTDOWHILE: resdo llaveabre CONTENIDOSCICLOS llavecierra reswhile parentesisabre CONDICIONALIF parentesiscierra sigpuntoycoma    {console.log($1);$$=$1;} 
;

CONTENIDOSCICLOS: resbreak sigpuntoycoma    {console.log($1);$$=$1;} 
        | rescontinue sigpuntoycoma    {console.log($1);$$=$1;} 
        | RETORNOS    {console.log($1);$$=$1;} 
        | CODIGO    {console.log($1);$$=$1;} 
;

RETORNOS: resreturn sigpuntoycoma    {console.log($1);$$=$1;} 
        | resreturn ASIGNACIONES sigpuntoycoma    {console.log($1);$$=$1;} 
;

FUNCIONES: TIPODATO id SNPARAMETROS llaveabre CONTENIDOSCICLOS llavecierra    {console.log($1);$$=$1;} 
;


SNPARAMETROS: parentesisabre PARAMETROS parentesiscierra    {console.log($1);$$=$1;} 
        | parentesisabre  parentesiscierra    {console.log($1);$$=$1;} 
;

PARAMETROS: TIPODATO id    {console.log($1);$$=$1;} 
        | TIPODATO id signocoma PARAMETROS    {console.log($1);$$=$1;} 
;


METODOS: resvoid id SNPARAMETROS llaveabre CONTENIDOSMETOD llavecierra    {console.log($1);$$=$1;} 
;

CONTENIDOSMETOD: resbreak sigpuntoycoma    {console.log($1);$$=$1;} 
        | rescontinue sigpuntoycoma    {console.log($1);$$=$1;} 
        | CODIGO    {console.log($1);$$=$1;} 
;

LLAMADAS: id SNPARAMETROS    {console.log($1);$$=$1;} 
;

FCOUT: rescout menormenor ASIGNACIONES sigpuntoycoma    {console.log($1);$$=$1;} 
        | rescout menormenor ASIGNACIONES menormenor resendl sigpuntoycoma    {console.log($1);$$=$1;} 
;

FTOLOWER: restolower parentesisabre ASIGNACIONES parentesiscierra    {console.log($1);$$=$1;} 
;

FTOUPPER: restoupper parentesisabre ASIGNACIONES parentesiscierra    {console.log($1);$$=$1;} 
;

FROUND: resround parentesisabre ASIGNACIONES parentesiscierra    {console.log($1);$$=$1;} 
;

FLENGTH: EXPRESIONES sigpunto reslength parentesisabre parentesiscierra    {console.log($1);$$=$1;} 
;

FTYPEOF: restypeof parentesisabre ASIGNACIONES parentesiscierra    {console.log($1);$$=$1;} 
;

FTOSTRING: restostring parentesisabre ASIGNACIONES parentesiscierra    {console.log($1);$$=$1;} 
;

FCSTR: EXPRESIONES sigpunto rescstr parentesisabre parentesiscierra    {console.log($1);$$=$1;} 
;

FEXECUTE: resexecute id SNPARAMETROS sigpuntoycoma    {console.log($1);$$=$1;} 
;



//FALTA AGREGAR ASIGNACIONES DE VECTORES YA QUE SE ME OLVIDO AGREGARLO A LA GRAMATICA
//cuando toda la gramatica ya no contenga errores, entonces actualizar el bnf
