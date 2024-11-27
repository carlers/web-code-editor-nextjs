"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "../../public/constants";

const LanguageSelector = ({
  selectedLanguage: [name, version],
  setSelectedLanguage,
  editorRef
}) => {
  /*   const languages = Object.entries(LANGUAGE_VERSIONS); */
  const [isOpen, setIsOpen] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch compatible languages and versions
  const fetchLanguages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://emkc.org/api/v2/piston/runtimes"
      );
      setLanguages(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching languages");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  if (error) return <div>{error}</div>;

  const selectLanguage = (language, version) => {
    setSelectedLanguage([language, version]);
    editorRef.current.setValue(CODE_SNIPPETS[language] ? CODE_SNIPPETS[language] : "hello world");
    setIsOpen(false);
  };

  return (
    <div className="flex mb-8 mt-2 w-full">
      <div className="border border-gray-500 rounded-md h-10 relative flex-grow">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hover:bg-gray-600 w-full h-full"
        >
          {loading ? (
            "Loading languages..."
          ) : (
            <span>
              {name} {version}
            </span>
          )}
        </button>

        {isOpen && (
          <ul className="border boder-gray-400 absolute top-[100%] left-0 z-10 bg-black">
            {languages.map((lang) => (
              <li
                key={`${lang.language}-${lang.version}`}
                onClick={() => selectLanguage(lang.language, lang.version)}
                className="p-2 hover:bg-blue-400 border-b cursor-pointer"
              >
                <span>
                  {lang.language} &nbsp; {lang.version}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        className="border border-gray-500 rounded-md h-10 ml-2 p-2 hover:bg-gray-500"
        onClick={fetchLanguages}
      >
        Refresh
      </button>
    </div>
  );
};

export default LanguageSelector;
