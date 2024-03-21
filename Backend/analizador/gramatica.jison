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
"=="                return 'igualgiual';
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

%left 'or'
%left 'and'
%left 'not'
%left 'noigual' 'igualigual'
%left 'menorigual' 'mayorigual' 'mayor' 'menor'
%left 'mas', 'menos'
%left 'divid', 'por','mod' 
%left 'pot'
%left Umenos 

%start INI

%%

INI: INSTRUCCIONES EOF {return $1;}
;

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION     { $$ = $2;}
            |INSTRUCCION                     { $$ = $1;}
;

INSTRUCCION: decimal            {console.log($1);$$=$1;}
        | numero       {console.log($1);$$=$1;}
        | caracter                 {console.log($1);$$=$1;}   
        | cadena                 {console.log($1);$$=$1;}   
        | id                  {console.log($1);$$=$1;} 
;


