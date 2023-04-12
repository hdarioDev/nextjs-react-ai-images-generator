"use client";

import fetchSuggestionChatGPT from "../lib/fetchSuggestionChatGPT";
import { useState } from "react";
import useSWR from "swr";

const PromptInput = () => {
  const [input, setInput] = useState("");

  // const { data, isLoading } = useSWR(
  //   "/api/suggestion",
  //   fetchSuggestionChatGPT,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );
  const {
    data: suggestion,
    isLoading,
    isValidating,
    mutate,
  } = useSWR("/api/suggestion", async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log("🚀 ~ file: PromptInput.tsx:20 ~ PromptInput ~ data:", data);
    return data;
  });

  const loading = isLoading || isValidating;

  console.log("data suggestion siiii  ", suggestion);
  console.log("isLoading ", isLoading);

  return (
    <div className="m-10">
      <form className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            (loading && "Loading...") || suggestion || "Enter a prompt here..."
          }
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
          onClick={mutate}
        >
          New Suggestion
        </button>
      </form>
      {input && (
        <p className="italic pt-2 pl-2 font-light">
          Suggestion:{" "}
          <span className="text-blue-500">
            {loading ? "ChatGPT is thinking..." : suggestion}
          </span>
        </p>
      )}
    </div>
  );
};

export default PromptInput;
