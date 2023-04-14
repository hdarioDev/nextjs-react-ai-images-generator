const { app } = require("@azure/functions");
const openai = require("../../lib/openai");

app.http("getChatGPTSuggestion", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const response = await openai.createCompletion({
      prompt:
        "Write a random text prompt for DALL-E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of pinting it should be, options can include: oil painting, watercolor, photo-realistic, abstract, modern, black and white, etc. Do not wrap the answer in quotes.",
      model: "text-davinci-003",
      max_tokens: 100,
      temperature: 0.9,
    });

    context.log(`Http function processed request for url "${request.url}"`);

    const responseText = response.data.choices[0].text;
    console.log(
      "🚀 ~ file: getChatGPTSuggestion.js:19 ~ handler: ~ responseText:",
      responseText
    );

    // const name = request.query.get("name") || (await request.text()) || "world";

    return { body: responseText };
  },
});
