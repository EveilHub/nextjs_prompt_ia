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

    // Appel API MyMemory pour traduction FR -> ZH (simplifié)
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=fr|zh-TW`
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Translation API failed" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();

    let translatedText = String(data.responseData?.translatedText) || "";

    // Cherche la meilleure suggestion dans matches
    if (data.matches && data.matches.length > 0) {
      const bestMatch = data.matches.reduce((prev: {match: number}, curr: {match: number}) =>
        curr.match > prev.match ? curr : prev
      , { match: -1, translation: "" });

      // Si la meilleure suggestion est assez fiable (>0.8), on l'utilise
      if (bestMatch.match > 0.8) {
        translatedText = bestMatch.translation;
      }
    }

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