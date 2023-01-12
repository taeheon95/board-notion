import React, { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import EditorJs from "./EditorJs";
import Layout from "./Layout";
import Editor from "./Editor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="editorJs" element={<EditorJs />} />
        <Route path="editor" element={<Editor />} />
      </Route>
    </Routes>
  );
}

export default App;
