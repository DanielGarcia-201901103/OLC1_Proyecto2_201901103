import React from "react";
import CodeEditorWindow from "./LineNumberedTextEditor/CodeEditorWindow";
import BasicExample from "./LineNumberedTextEditor/Botones";
import "./App.css";

const App = () => {

  return (
    <>
      <BasicExample/>
      <div className="container">
        <CodeEditorWindow />
      </div>
      <footer>
      Josué Daniel Rojché García <br/>
      201901103
    </footer>
    </>
  );
};

export default App;