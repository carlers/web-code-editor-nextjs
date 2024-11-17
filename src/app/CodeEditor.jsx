"use client";

import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";

const CodeEditor = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(["cpp", "10.2.0"]);
  const [language, version] = selectedLanguage;
  const monacoLanguage = language === "c++" ? "cpp" : language;
  const [value, setValue] = useState("");
  const editorRef = useRef();
  

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  return (
    <>
      <div className="flex">
        <div className="mx-4 w-[50%]">
          Language
          <LanguageSelector
            selectedLanguage={[language, version]}
            setSelectedLanguage={setSelectedLanguage}
            setValue={setValue}
          />
          <Editor
            ref={editorRef}
            height="75vh"
            theme="vs-dark"
            language={monacoLanguage}
            defaultValue="hello world"
            value={value}
            onChange={(value) => setValue(value)}
            onMount={onMount}
          />
        </div>
        <div className="w-[50%]">
          Output
          <Output editorRef={editorRef} language={language} version={version} />
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
