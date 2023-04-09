"use client";

import { useState } from "react";

const PromptInput = () => {
  const [input, setInput] = useState("");

  return (
    <div className="m-10">
      <form className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a prompt here..."
          className="flex-1 p-4 outline-none rounded-md"
        />
        <button
          className={`p-2 ${
            input
              ? "bg-blue-500 text-white transition-colors duration-200 font-bold"
              : "text-gray-300 cursor-not-allowed  bg-gray-50"
          }`}
          disabled={!input}
          type="submit"
        >
          Generate
        </button>
        <button
          className="p-2 bg-blue-300 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
          type="button"
        >
          Use Suggestion
        </button>
        <button
          className="p-2 bg-white text-blue-300 transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
          type="button"
        >
          New Suggestion
        </button>
      </form>
    </div>
  );
};

export default PromptInput;
