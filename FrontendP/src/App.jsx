import React from "react";
import CodeEditorWindow from "./LineNumberedTextEditor/CodeEditorWindow";
import "./App.css";

const App = () => {

  return (
    <>
      <div className="container">
        <CodeEditorWindow />
      </div>
    </>
  );
};

export default App;