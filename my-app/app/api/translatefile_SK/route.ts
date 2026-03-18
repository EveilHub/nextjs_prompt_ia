export const runtime = "nodejs";

export async function POST(req: Request): Promise<Response> {
  try {
    const { text } = await req.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: "No text provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Appel API MyMemory pour traduction EN -> SK
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=fr|sk`
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Translation API failed" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();

    // MyMemory renvoie le texte traduit dans data.responseData.translatedText
    const translatedText = data.responseData?.translatedText || "";

    return new Response(
      JSON.stringify({ translatedText }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}