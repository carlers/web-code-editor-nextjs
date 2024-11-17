import React, { useState } from "react";
import { executeCode } from "./api";

const Output = ({editorRef, language, version}) => {
const [output, setOutput] = useState(null);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if(!sourceCode) return;
    try {
      const {run:result} = await executeCode(language, version, sourceCode);
      setOutput(result.output);
    } catch (error) {
      
    }
  };
  return (
    <div className="mt-2">
      <button
        className="mb-4 p-4 border border-green-600 rounded-md hover:bg-green-600 ease-in-out duration-300"
        onClick={runCode}
      >
        Run Code
      </button>
      <div className="bg-gray-800 text-white p-4 h-[75vh]">
        {output ? output : "Output will be displayed here"}
      </div>
    </div>
  );
};

export default Output;
