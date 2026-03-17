import * as pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const runtime = "nodejs";

export async function POST(req: Request): Promise<Response> {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = "";

    try {
        if (file.type === "application/pdf") {
            text = await extractPdfText(buffer);
        } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            text = await extractDocxText(buffer);
        } else if (file.type.startsWith("text/")) {
            text = buffer.toString("utf-8");
        } else {
            return new Response(JSON.stringify({ error: "Unsupported file type" }), { status: 400 });
        }
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message || "Error parsing file" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ text }), { status: 200, headers: { "Content-Type": "application/json" } });
}

async function extractPdfText(buffer: Buffer): Promise<string> {
    const data = await (pdfParse as any)(buffer); // ⚠️ pdf-parse v2 ESM
    return data.text;
}

async function extractDocxText(buffer: Buffer): Promise<string> {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
}