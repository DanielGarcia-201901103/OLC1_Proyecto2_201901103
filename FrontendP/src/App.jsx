import { useState } from 'react'
import './App.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaTimes } from 'react-icons/fa';
//import TabComponent from './tabsComponent/tab';
//import TextAreaComponent2 from './component/numeroLineaD';

function App() {
  const [tabs, setTabs] = useState([{ title: 'Tab 1', content: '' }]);
  const [activeTab, setActiveTab] = useState(0);
  const [text2, setText] = useState('');
  /*
  const enviarDatosAlServidor = async () => {
    const tabContent = tabs[activeTab].content;
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contenido: tabContent }),
    };
  
    try {
      const response = await fetch('http://localhost:4000/analizar', requestOptions);
      if (response.ok) {
        // Realiza acciones después de una respuesta exitosa
        console.log('Datos enviados correctamente.');
      } else {
        // Maneja errores de respuesta aquí
        console.error('Error al enviar datos.');
      }
    } catch (error) {
      // Maneja errores de red o solicitud aquí
      console.error('Error de red o solicitud:', error);
    }
  };*/
  



  const enviarDatosAlServidor = async (e) => {
    const tabContent = tabs[activeTab].content;
    e.preventDefault();
    await fetch('http://localhost:4000/analizar', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            contenido: tabContent
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => enviarconsolas(data));
}
const enviarconsolas = (data) => {
      console.log(data.entrada);
      setText(data.entrada);
}

  const addTab = () => {
    setTabs([...tabs, { title: `Tab ${tabs.length + 1}`, content: '' }]);
  };

  const closeTab = (index) => {
    const newTabs = tabs.filter((_, i) => i !== index);
    setTabs(newTabs);

    // Adjust activeTab index if the closed tab was the active one
    if (index === activeTab) {
      setActiveTab(Math.min(index, newTabs.length - 1));
    }
  };

  const handleContentChange = (index, newContent) => {
    const newTabs = [...tabs];
    newTabs[index].content = newContent;
    setTabs(newTabs);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        setTabs([...tabs, { title: file.name, content: fileContent }]);
      };
      reader.readAsText(file);
    }
  };

  const handleTextChange2 = (e) => {
    setText(e.target.value);
  };

  // Generar números de línea
  const lineNumbers2 = text2.split('\n').map((_, index) => (
    <div key={index} className="line-number">
      {index + 1}
    </div>
  ));
//<button onClick={addTab}>Nuevo Archivo</button>

  return (
    <>
      <div>
      <Navbar expand="lg" className="bg-body-tertiary" style={{ background: 'linear-gradient(to right, #fdc830, #f37335)' }}>
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Archivo" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={addTab}>Nuevo Archivo</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Guardar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Ejecutar" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={enviarDatosAlServidor}>Analizar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Reportes" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Reporte de Tokens</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Reporte de Errores</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Reporte de Tabla de Símbolos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Generar Árbol de Análisis Sintáctico</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </div>
      <div className='titulo'>
        <h3>Entrada:</h3>
      </div>
      <div className="card">
      <input type="file" accept=".qc" onChange={handleFileInputChange} />
      <div>
        <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
          <TabList>
            {tabs.map((tab, index) => (
              <Tab key={index}>
                {tab.title}
                <span onClick={() => closeTab(index)}><FaTimes /></span>
              </Tab>
            ))}
          </TabList>
          {tabs.map((tab, index) => (
            <TabPanel key={index}>
              <div className="numbered-text-area-container">
                <div className="line-numbers">
                  {tab.content.split('\n').map((_, lineIndex) => (
                    <div key={lineIndex} className="line-number">
                      {lineIndex + 1}
                    </div>
                  ))}
                </div>
                <textarea
                  rows="4"
                  cols="50"
                  className="text-area"
                  value={tab.content}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                />
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
      </div>
      <div className='titulo'>
        <h3>Consola Salida:</h3>
      </div>
      <div className="card">
        <div className="numbered-text-area-container">
        <div className="line-numbers">{lineNumbers2}</div>
        <textarea
          rows="4"
          cols="50"
          value={text2}
          onChange={handleTextChange2}
          className="text-area2"
          disabled
        />
    </div>
      </div>
    </>
  )
}

export default App