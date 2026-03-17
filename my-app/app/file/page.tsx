"use client";

import { JSX, SyntheticEvent, useState } from "react";

const TranslateFilePage = (): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const [originalText, setOriginalText] = useState<string | null>(null);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // Upload et extraction de texte
  const handleUpload = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(undefined);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const textOrHtml = await res.text();

      if (!res.ok) {
        try {
          const err = JSON.parse(textOrHtml);
          throw new Error(err.error || "Upload failed");
        } catch {
          throw new Error(`Upload failed: ${textOrHtml}`);
        }
      }

      const data = JSON.parse(textOrHtml);
      setOriginalText(data.text);
      setTranslatedText(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Traduction via MyMemory
  const handleTranslate = async () => {
    if (!originalText) return;

    setLoading(true);
    setError(undefined);

    try {
      const res = await fetch("/api/translatefile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: originalText }),
      });

      const textOrHtml = await res.text();

      if (!res.ok) {
        try {
          const err = JSON.parse(textOrHtml);
          throw new Error(err.error || "Translation failed");
        } catch {
          throw new Error(`Translation failed: ${textOrHtml}`);
        }
      }

      const data = JSON.parse(textOrHtml);
      setTranslatedText(data.translatedText);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-4">
      <form onSubmit={handleUpload} className="w-full flex flex-col items-center">
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
            }
          }}
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-400 px-4 py-2 rounded cursor-pointer my-4"
        />

        <button
          type="submit"
          disabled={!file || loading}
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-400 px-4 py-2 rounded cursor-pointer"
        >
          {loading ? "Scanning..." : "Upload & Extract Text"}
        </button>
      </form>

      {originalText && (
        <>
          <div className="mt-4 p-2 border rounded bg-fuchsia-100 text-slate-600/70 w-[80%]">
            <h3 className="w-full font-bold">Original Text:</h3>
            <pre>{originalText}</pre>
          </div>

          <button
            type="button"
            onClick={handleTranslate}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 active:bg-green-500 px-4 py-2 rounded mt-4"
          >
            {loading ? "Translating..." : "Translate"}
          </button>
        </>
      )}

      {translatedText && (
        <div className="mt-4 p-2 border rounded bg-green-100 text-slate-600/70 w-[80%]">
          <h3 className="font-bold">Translated Text:</h3>
          <pre>{translatedText}</pre>
        </div>
      )}

      {error && <p style={{ color: "red" }} className="mt-2">{error}</p>}
    </div>
  );
};
export default TranslateFilePage;