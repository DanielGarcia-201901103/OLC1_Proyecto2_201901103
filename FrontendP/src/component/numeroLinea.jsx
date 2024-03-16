import React, { useState } from 'react';
import './NumberedTextArea.css';

function NumberedTextArea() {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Generar números de línea
  const lineNumbers = text.split('\n').map((_, index) => (
    <div key={index} className="line-number">
      {index + 1}
    </div>
  ));

  return (
    <div className="numbered-text-area-container">
      <div className="line-numbers">{lineNumbers}</div>
      <textarea
        rows="4"
        cols="50"
        value={text}
        onChange={handleTextChange}
        className="text-area"
      />
    </div>
  );
}

export default NumberedTextArea;