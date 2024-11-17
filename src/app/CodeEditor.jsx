"use client";

import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";

const CodeEditor = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(["c++", "10.2.0"]);
  const [language, version] = selectedLanguage;
  const [value, setValue] = useState("");
  const editorRef = useRef();
  

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  return (
    <>
      <div className="flex">
        <div className="m-4 w-[50%]">
          <LanguageSelector
            selectedLanguage={[language, version]}
            setSelectedLanguage={setSelectedLanguage}
            setValue={setValue}
          />
          <Editor
            ref={editorRef}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue="hello world"
            value={value}
            onChange={(value) => setValue(value)}
            onMount={onMount}
          />
        </div>
        <Output />
      </div>
    </>
  );
};

export default CodeEditor;
