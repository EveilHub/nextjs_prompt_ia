import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { text, targetLang } = await req.json();

        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=fr|${targetLang || "en"}`
        );

        const data = await response.json();

        return NextResponse.json({
            translation: data.responseData.translatedText ?? text,
        });

    } catch (error: unknown) {
        console.error("Translation error:", error);

        return NextResponse.json(
            { error: "Translation failed" },
            { status: 500 }
        );
    }
}