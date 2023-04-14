"use client";

import { FormEvent, useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import fetchImages from "@/lib/fetchImages";
// import { useImages } from "@/app/context";

const PromptInput = () => {
  const [input, setInput] = useState("");
  // const { refreshImages } = useImages();

  const {
    data: suggestion,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(
    "/api/suggestion",
    async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    },
    {
      revalidateOnFocus: false,
    }
  );

  const { mutate: updateImages } = useSWR("images", fetchImages, {
    revalidateOnFocus: false,
  });

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    setInput("");

    const notificationPrompt = inputPrompt || suggestion;
    const notificationPromptShort = notificationPrompt.slice(0, 20);

    const notification = toast.loading(
      `DALL·E is creating: ${notificationPromptShort}...`
    );

    const p = useSuggestion
      ? suggestion
      : inputPrompt || (!isLoading && !isValidating && suggestion);

    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        prompt: p,
      }),
    });

    const data = await res.json();

    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(`Your AI Art has been Generated!`, {
        id: notification,
      });
    }
    updateImages();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submint ... ");
    await submitPrompt();
  };

  const loading = isLoading || isValidating;

  return (
    <div className="m-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            (loading && "Loading...") || suggestion || "Enter a prompt here..."
          }
          className="flex-1 p-4 outline-none rounded-md text-gray-600"
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
          className="p-2 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
          type="button"
          onClick={() => submitPrompt(true)}
        >
          Use Suggestion
        </button>
        <button
          className="p-2 bg-white text-blue-700 transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
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
