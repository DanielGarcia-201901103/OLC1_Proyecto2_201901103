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

CODIGO: CODIGO INSTRUCCION                   { $$ = $1+ " " +$2;}
            |INSTRUCCION                     { $$ = $1;}
;

INSTRUCCION: DECLARACIONES            {console.log($1);$$=$1;}
        | SENTENCIAS                  {console.log($1); $$=$1;}  
        | FUNCIONES                   {console.log($1); $$=$1;}    
        | METODOS                     {console.log($1); $$=$1;}    
        | LLAMADAS sigpuntoycoma      {console.log($1); $$=$1;}    
        | FCOUT                       {console.log($1); $$=$1;}    
        | FEXECUTE                    {console.log($1); $$=$1;} 
;

DECLARACIONES: TIPODATO LISTANVARIABLES sigpuntoycoma            {$$=$1 + " "+ $2 + $3;} 
        | TIPODATO LISTANVARIABLES sigigual ASIGNACIONES sigpuntoycoma    {$$=$1 + " "+ $2 + $3 + " "+$4+$5;} 
        | LISTANVARIABLES sigigual ASIGNACIONES sigpuntoycoma { $$=$1 + " "+ $2 + " "+ $3 +$4;}  
        | id sigincremento sigpuntoycoma  { $$= $1 + " "+ $2 + " "+ $3;} 
        | id sigdecremento sigpuntoycoma  {$$=$1 + " "+ $2 + " "+ $3;} 
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

SENTENCIAS: SENTIF    {$$=$1;} 
        | SENTSWITCH   {$$=$1;} 
        | SENTWHILE   {$$=$1;}  
        | SENTFOR    {$$=$1;} 
        | SENTDOWHILE   {$$=$1;}  
;

SENTIF: resif parentesisabre EXPRESIONES parentesiscierra llaveabre CONTENIDOS FINIF    {$$=$1 +" "+ $2 + $3 +$4 + $5 + " " +$6 + " " + $7;} 
;

CONTENIDOS: resbreak sigpuntoycoma    {$$=$1 + $2;} 
        | rescontinue sigpuntoycoma    {$$=$1 + $2;} 
        | RETORNOS    {$$=$1;} 
        | CODIGO    {$$=$1;} 
;

FINIF: llavecierra    {$$=$1;} 
        | llavecierra reselse SENTIF    {$$=$1 + $2 +" " +$3;} 
        | llavecierra reselse llaveabre CONTENIDOS llavecierra     {$$=$1 + $2 +$3 +" " + $4 + " " + $5;} 
;

SENTSWITCH: resswitch parentesisabre EXPRESIONES parentesiscierra llaveabre SWCASOS llavecierra    {$$=$1 +" "+$2 + " " + $3 + " " +$4+" "+$5+" "+$6+" " + $7;} 
;

SWCASOS: SWCASE    {$$=$1;} 
        | SWCASE SWCASOS    {$$=$1 + " " +$2;} 
;

SWCASE: rescase ASIGNACIONES dospuntos CONTENIDOS    {$$=$1 + " " + $2 + " " + $3 + " " + $4;} 
        | resdefault dospuntos CONTENIDOS    {$$=$1+ " " + $2 +" " + $3;} 
;

SENTWHILE: reswhile parentesisabre EXPRESIONES parentesiscierra llaveabre CONTENIDOSCICLOS llavecierra   {$$=$1 + " "+ $2 + $3+$4+" "+$5+" "+ $6+ " " +$7;} 
;

SENTFOR: resfor parentesisabre DECLARACIONES EXPRESIONES sigpuntoycoma INCREYDECRE parentesiscierra llaveabre CONTENIDOSCICLOS llavecierra {$$=$1+$2+" "+$3+" "+$4+" "+$5+" "+$6+" "+$7+" " +$8+$9+" "+$10;} 
;

SENTDOWHILE: resdo llaveabre CONTENIDOSCICLOS llavecierra reswhile parentesisabre EXPRESIONES parentesiscierra sigpuntoycoma {$$=$1 + $2 +" "+ $3 + " " + $4 + $5 + $6 + " " + $7 + " " + $8 + $9 ;} 
;

CONTENIDOSCICLOS: resbreak sigpuntoycoma    {$$=$1 + $2;} 
        | rescontinue sigpuntoycoma    {$$=$1 + $2;} 
        | RETORNOS    {$$=$1;} 
        | CODIGO    {$$=$1;} 
;

RETORNOS: resreturn sigpuntoycoma    {$$=$1 + $2;} 
        | resreturn ASIGNACIONES sigpuntoycoma    {$$=$1 + " " + $2 + " "+ $3;} 
;

FUNCIONES: TIPODATO id SNPARAMETROS llaveabre CONTENIDOSCICLOS llavecierra    {$$=$1 + " "+ $2 + " " + $3 +$4 + " " + $5 + $6;} 
;

SNPARAMETROS: parentesisabre PARAMETROS parentesiscierra    {$$=$1 + " " + $2 + " " + $3;} 
        | parentesisabre  parentesiscierra    {$$=$1 + $2;} 
;

PARAMETROS: TIPODATO EXPRESIONES    {$$=$1+ $2;} 
        | TIPODATO EXPRESIONES signocoma PARAMETROS    {$$=$1 + " " +  $2 +" " + $3 + " "  +  $4;} 
;

METODOS: resvoid id SNPARAMETROS llaveabre CONTENIDOSMETOD llavecierra    {$$=$1 + " " + $2 + " "+$3 + $4 + " " + $5+ " " + $6;} 
;

CONTENIDOSMETOD: resbreak sigpuntoycoma    {$$=$1 + $2;} 
        | rescontinue sigpuntoycoma    {$$=$1 + $2;} 
        | CODIGO    {$$=$1;} 
;

LLAMADAS: id SNPARAMETROS    {$$=$1 + " " + $2;} 
;

FCOUT: rescout menormenor ASIGNACIONES sigpuntoycoma    {$$=$1 + " " + $2 + " " + $3 + $4;} 
        | rescout menormenor ASIGNACIONES menormenor resendl sigpuntoycoma    {$$=$1 + " " + $2 + " " + $3 + " "+ $4 + " " + $5 + $6;} 
;

FTOLOWER: restolower parentesisabre ASIGNACIONES parentesiscierra   {$$=$1 + " " + $2 + " " + $3 + " " + $4;} 
;

FTOUPPER: restoupper parentesisabre ASIGNACIONES parentesiscierra   {$$=$1 + " " + $2 + " " + $3 + " " + $4;}  
;

FROUND: resround parentesisabre ASIGNACIONES parentesiscierra   {$$=$1 + " " + $2 + " " + $3 + " " + $4;} 
;

FLENGTH: EXPRESIONES sigpunto reslength parentesisabre parentesiscierra    {$$=$1 + " " + $2 + " " + $3 + " " + $4 + $5;} 
;

FTYPEOF: restypeof parentesisabre ASIGNACIONES parentesiscierra    {$$=$1 + " " + $2 + " " + $3 + " " + $4;} 
;

FTOSTRING: restostring parentesisabre ASIGNACIONES parentesiscierra    {$$=$1 + " " + $2 + " " + $3 + " " + $4;} 
;

FCSTR: EXPRESIONES sigpunto rescstr parentesisabre parentesiscierra    {$$=$1 + " " + $2 + " " + $3 + " " + $4 + $5;} 
;

FEXECUTE: resexecute id SNPARAMETROS sigpuntoycoma    {$$=$1 + " " + $2 + " " + $3 + " " + $4;} 
;



//FALTA AGREGAR ASIGNACIONES DE VECTORES YA QUE SE ME OLVIDO AGREGARLO A LA GRAMATICA
//cuando toda la gramatica ya no contenga errores, entonces actualizar el bnf
