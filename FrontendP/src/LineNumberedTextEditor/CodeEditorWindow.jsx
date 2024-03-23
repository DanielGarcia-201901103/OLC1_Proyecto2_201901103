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

  const handleRunCode = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:4000/analizar', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ texto: inputValue }),
    headers:{
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then(data => validar(data));

    // Aquí puedes implementar la lógica para ejecutar el código y actualizar la salida
     // Ejemplo: establecer la salida como el valor de entrada
  };
  const validar = (data) =>{
    console.log(data.salida);
    setOutputValue(data.salida);
  }

  return (
    <>
      <div className="conjuntoBotones">
      <ButtonGroup aria-label="Basic example">
      <Button className="gbotones" >Crear Archivo</Button>{' '}
      <Button className="gbotones">Abrir Archivo</Button>{' '}
      <Button className="gbotones">Guardar Archivo</Button>{' '}
      <Button className="botonE" onClick={handleRunCode}>Ejecutar</Button>{' '}
      <Button className="gbotonesR">Reporte Errores</Button>{' '}
      <Button className="gbotonesR">Reporte Tabla Simbolos</Button>{' '}
      <Button className="gbotonesR">Generar Arbol AST</Button>{' '}
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