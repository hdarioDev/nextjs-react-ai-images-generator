const { app } = require("@azure/functions");
const openai = require("../../lib/openai");
const axios = require("axios");
const generateSASToken = require("../../lib/generateSASToken");

const { BlobServiceClient } = require("@azure/storage-blob");

const accountName = process.env.accountName || "accountName";

const containerName = "images";

app.http("generateImage", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request) => {
    const { prompt } = await request.json();
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });

    image_url = response.data.data[0].url;
    const res = await axios.get(image_url, {
      responseType: "arraybuffer",
    });

    const arrayBuffer = res.data;
    sasToken = await generateSASToken();
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${sasToken}`
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const timestamp = new Date().getTime();
    const blobName = `${prompt}_${timestamp}.png`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    try {
      await blockBlobClient.uploadData(arrayBuffer);
      console.log("File uploaded successfully");
    } catch (error) {
      console.log("Error uploading file ", error.message);
    }

    return { body: "Successfully Uploaded Image" };
  },
});
