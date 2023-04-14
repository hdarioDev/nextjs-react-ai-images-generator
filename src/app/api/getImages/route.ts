export async function GET(request: Request) {
  //   const response = await fetch("http://localhost:7071/api/getImages", {
  //     cache: "no-store",
  //   });

  const responseData = await fetch(
    `https://hdariodevtest.azurewebsites.net/api/getimages?${Date.now()}`,
    {
      cache: "no-store",
    }
  );

  const blob = await responseData.blob();
  const textData = await blob.text();

  const data = JSON.parse(textData);

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
