"use client";

import { Editor } from "@monaco-editor/react";
import React from "react";
import { useState } from "react";

const Page = () => {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "file1",
      content: "asdf",
    },
  ]);

  const [activeFile, setActiveFile] = useState(1);

  const findMinAvailableId = () => {
    for (let i = 1; i <= 3; i++) {
      if (!files.some((f) => f.id === i)) {
        return i;
      }
    }
    return null;
  };

  const addFile = () => {
    if (files.length < 3) {
      const newId = findMinAvailableId();
      if (newId !== null) {
        setFiles([
          ...files,
          {
            id: newId,
            name: `file${newId}`,
            content: ";al",
          },
        ]);
        setActiveFile(newId);
      }
    }
  };

  const deleteFile = (e, id) => {
    e.stopPropagation();
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((f) => f.id !== id);
      if (updatedFiles.length > 0 && activeFile === id) {
        setActiveFile(Math.min(...updatedFiles.map(f => f.id)));
      } 
      return updatedFiles;
    });
  };

  return (
    <div className="relative top-20 left-10">
      <div className="relative top-0 left-0 w-[50%] h-[32rem] border">
        <div className="flex">
          <button
            className="p-3 border disabled:bg-red-700 hover:bg-green-400"
            onClick={addFile}
            disabled={files.length >= 3}
          >
            +
          </button>
          {files.map((f) => (
            <div
              key={f.id}
              className={`hover:bg-blue-400 cursor-pointer p-3 border ${
                activeFile === f.id ? "bg-blue-500 font-bold underline" : ""
              }`}
              onClick={() => setActiveFile(f.id)}
            >
              {f.name}
              <button className="ml-2" onClick={(e) => deleteFile(e, f.id)}>
                x
              </button>
            </div>
          ))}
        </div>
        <div className="w-full h-full">
          {files.map((f, index) => (
            <div
              key={f.id}
              className={`h-full w-full ${
                activeFile === f.id ? "block" : "hidden"
              }`}
            >
              <Editor
                theme="vs-dark"
                height="100%"
                onChange={(value) => {
                  const newFile = [...files];
                  newFile[index].content = value;
                  setFiles(newFile);
                }}
                language="cpp"
                value={f.content}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
