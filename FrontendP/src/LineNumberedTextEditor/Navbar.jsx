import React from "react";

const Navbar = ({ handleRunCode, onCreateFile, onOpenFile, onSaveFile, onShowErrors, onGenerateAST }) => {
  return (
    <nav className="navbar">
      <button onClick={onCreateFile}>Crear Archivo</button>
      <button onClick={onOpenFile}>Abrir Archivo</button>
      <button onClick={onSaveFile}>Guardar Archivo</button>
      <button onClick={onShowErrors}>Reporte de Errores</button>
      <button onClick={onGenerateAST}>Generar Árbol AST</button>
      <button onClick={handleRunCode}>Ejecutar</button>
    </nav>
  );
};

export default Navbar;