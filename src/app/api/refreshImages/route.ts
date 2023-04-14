export async function GET(request: Request) {
  const url = `https://hdariodevtest.azurewebsites.net/api/getimages`;
  const config = {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  };

  const response = await fetch(url, {
    cache: "no-store",
  });
  const data = await response.json();

  // Configuramos la revalidación para que ocurra cada 60 segundos

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
