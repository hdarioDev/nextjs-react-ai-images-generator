import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const prompt = res.prompt;

  //Connect Microsoft Azure Cognitive Services
  //   const response = await fetch("http://localhost:7071/api/generateImage", {
  const response = await fetch(
    "https://hdariodevtest.azurewebsites.net/api/generateimage",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    }
  );

  const textData = await response.text();

  return NextResponse.json(textData);
}
