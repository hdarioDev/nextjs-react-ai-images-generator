export async function GET(request: Request) {
  //Connect Microsoft Azure Cognitive Services
  console.log("GET");

  const response = await fetch(
    // "http://localhost:7071/api/getChatGPTSuggestion",
    "https://hdariodevtest.azurewebsites.net/api/getchatgptsuggestion",
    {
      cache: "no-store",
    }
  );

  const textData = await response.text();
  console.log("textData ", textData);

  return new Response(JSON.stringify(textData.trim()), {
    status: 200,
  });
}
