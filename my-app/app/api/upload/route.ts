export const runtime = "nodejs";

import { getDocument } from "pdfjs-dist";

export async function POST(req: Request): Promise<Response> {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
        return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const text = await extractPdfText(buffer);

    return Response.json({ text });
}

async function extractPdfText(buffer: Buffer): Promise<string> {
    const pdf = await getDocument({ data: buffer }).promise;

    let fullText: string = "";

    for (let i: number = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);

        const content = await page.getTextContent();

        const pageText: string = content.items
        .map((item: any) => item.str)
        .join(" ");

        fullText += pageText + "\n";
    }

    return fullText;
}