import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import "./CodeEditorWindow.css";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const CodeEditorWindow = ({ onChange, code }) => {
  const [inputValue, setInputValue] = useState(code || "");
  const [outputValue, setOutputValue] = useState("");

  const handleEditorChange = (value) => {
    setInputValue(value);
    onChange("code", value);
  };

  const handleRunCode = () => {
    // Aquí puedes implementar la lógica para ejecutar el código y actualizar la salida
    setOutputValue(inputValue); // Ejemplo: establecer la salida como el valor de entrada
  };

  return (
    <>
      <div>
      <ButtonGroup aria-label="Basic example">
      <Button variant="outline-primary" >Crear Archivo</Button>{' '}
      <Button variant="outline-primary">Abrir Archivo</Button>{' '}
      <Button variant="outline-primary">Guardar Archivo</Button>{' '}
      <Button variant="outline-primary">Reporte Errores</Button>{' '}
      <Button variant="outline-primary">Reporte Tabla Simbolos</Button>{' '}
      <Button variant="outline-primary">Generar Arbol AST</Button>{' '}
      <Button variant="outline-primary" onClick={handleRunCode}>Ejecutar</Button>{' '}
      </ButtonGroup>
      </div>
    <div className="code-editor-container">
      <div className="code-editor-left">
        <h2>Entrada</h2>
        <Editor
          height="50vh"
          width={`100%`}
          value={inputValue}
          theme="vs-dark"
          defaultValue="// some comment"
          onChange={handleEditorChange}
        />
      </div>
      <div className="code-editor-right">
        <h2>Consola</h2>
        <textarea
          className="output-console"
          value={outputValue}
          readOnly
          rows={inputValue.split("\n").length}
          cols={50}
          placeholder="Output"
        />
      </div>
    </div>
    </>
  );
};

export default CodeEditorWindow;