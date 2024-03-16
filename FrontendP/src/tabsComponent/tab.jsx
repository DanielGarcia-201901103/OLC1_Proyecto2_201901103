import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaTimes } from 'react-icons/fa';
import 'react-tabs/style/react-tabs.css';

function TabsComponent() {
  const [tabs, setTabs] = useState([{ title: 'Tab 1', content: '' }]);
  const [activeTab, setActiveTab] = useState(0);
  
  const enviarDatosAlServidor = async () => {
    const tabContent = tabs[activeTab].content;
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contenido: tabContent }),
    };
  
    try {
      const response = await fetch('http://localhost:5000/tuEndpoint', requestOptions);
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
  };
  


/*
  const enviaranalizar = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/cargarPedidos', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            Ruta: rutaPedidos
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => validar(data));
}
*/
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

  return (
    <>
      <input type="file" accept=".qc" onChange={handleFileInputChange} />
      <button onClick={addTab}>Nuevo Archivo</button>
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
    </>
  );
}

export default TabsComponent;