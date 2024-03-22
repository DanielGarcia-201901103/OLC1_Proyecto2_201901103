import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function BasicExample({handleRunCode}) {
  return (
    <ButtonGroup aria-label="Basic example">
      <Button variant="outline-primary" >Crear Archivo</Button>{' '}
      <Button variant="outline-primary">Abrir Archivo</Button>{' '}
      <Button variant="outline-primary">Guardar Archivo</Button>{' '}
      <Button variant="outline-primary">Reporte Errores</Button>{' '}
      <Button variant="outline-primary">Reporte Tabla Simbolos</Button>{' '}
      <Button variant="outline-primary">Generar Arbol AST</Button>{' '}
      <Button variant="outline-primary" onClick={handleRunCode}>Ejecutar</Button>{' '}
    </ButtonGroup>
  );
}

export default BasicExample;
