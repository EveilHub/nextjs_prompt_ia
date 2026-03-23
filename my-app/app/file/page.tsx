"use client";

import { ChangeEvent, JSX, SyntheticEvent, useState } from "react";

const TranslateFilePage = (): JSX.Element => {

  const [file, setFile] = useState<File | null>(null);
  const [originalText, setOriginalText] = useState<string | null>(null);

  const [chooseLang, setChooseLang] = useState<string>("options1");

  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // Upload et extraction de texte
  const handleUpload = async (e: SyntheticEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(undefined);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const textOrHtml: string = await res.text();

      if (!res.ok) {
        try {
            const err = JSON.parse(textOrHtml) as { error?: string };
            throw new Error(err.error ?? "Upload failed");
        } catch {
            throw new Error(`Upload failed: ${textOrHtml}`);
        }
      }

      const data = JSON.parse(textOrHtml);
      setOriginalText(data.text);
      setTranslatedText(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
          setError(err.message);
      } else {
          setError("Une erreur inconnue est survenue");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLang = (e: ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value;
    setChooseLang(value);
  };

  // Traduction via MyMemory
  const handleTranslate = async (): Promise<void> => {
    if (!originalText) return;

    setLoading(true);
    setError(undefined);

    try {
      const res = await fetch(`/api/translatefile_${chooseLang}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: originalText }),
      });

      const textOrHtml: string = await res.text();

      if (!res.ok) {
        try {
          const err = JSON.parse(textOrHtml) as {error: string};
          throw new Error(err.error || "Translation failed");
        } catch {
          throw new Error(`Translation failed: ${textOrHtml}`);
        }
      }

      const data = JSON.parse(textOrHtml);
      setTranslatedText(String(data.translatedText));
    } catch (err: unknown) {
      if (err instanceof Error) {
          setError(err.message);
      } else {
          setError("Une erreur inconnue est survenue");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([translatedText || ""], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "translated.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Header */}
      <h1 className="text-3xl font-bold py-8 text-center">Translate File</h1>

      {/* Upload Section */}
      <form onSubmit={handleUpload} className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-3 mb-4">
          <input
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-400 px-4 py-2 rounded cursor-pointer text-white"
          />
          {file && <span className="text-3xl">✅</span>}
        </div>

        {file && (
          <button
            type="submit"
            disabled={!file || loading}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-400 px-4 py-2 rounded cursor-pointer text-white disabled:opacity-50"
          >
            {loading ? "Scanning..." : "Upload & Extract Text"}
          </button>
        )}
      </form>

      {/* Translation Section */}
      {(originalText || translatedText) && (
        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          
          {/* Original Text Column */}
          {originalText && (
            <div className="flex-1 min-w-0">
              <div className="bg-blue-100 rounded-lg p-4 h-full">
                <h3 className="font-bold text-red-500 mb-4">Original Text:</h3>
                <pre className="whitespace-pre-wrap break-words text-slate-600/70 font-sans">
                  {originalText}
                </pre>
              </div>
            </div>
          )}

          {/* Controls Column - Only show when original text exists */}
          {originalText && (
            <div className="lg:w-48 flex flex-col items-center justify-evenly gap-4 border border-gray-700 rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.3),0_0_5px_rgba(0,255,255,0.2)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] transition-shadow duration-300">
              <select
                value={chooseLang}
                onChange={handleLang}
                className="text-4xl py-2 rounded bg-slate-950 cursor-pointer w-3/5 text-center"
              >
                <option value="FR">🇫🇷</option>
                <option value="NL">🇳🇱</option>
                <option value="DE">🇩🇪</option>
                <option value="ES">🇪🇸</option>
                <option value="SV">🇸🇪</option>
                <option value="NO">🇳🇴</option>
                <option value="EN">🇺🇸</option>
                <option value="SK">🇸🇰</option>
                <option value="CS">🇨🇿</option>
                <option value="AR">🇦🇪</option>
                <option value="ZH">🇨🇳</option>
                <option value="JA">🇯🇵</option>
              </select>

              <button
                type="button"
                onClick={handleTranslate}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 active:bg-green-500 px-6 py-2 rounded text-white disabled:opacity-50 whitespace-nowrap hover:scale-105 active:scale-95 transition-transform duration-200"
              >
                {loading ? "Translating..." : "Translate"}
              </button>
            </div>
          )}

          {/* Translated Text Column */}
          {translatedText && (
            <div className="flex-1 min-w-0">
              <div className="bg-green-100 rounded-lg p-4 h-full">
                <h3 className="font-bold text-red-500 mb-4">Translated Text:</h3>
                <pre className="whitespace-pre-wrap break-words text-slate-600/70 font-sans">
                  {translatedText}
                </pre>
              </div>
              
              {/* Download Button */}
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700 active:bg-green-500 px-6 py-2 rounded text-white whitespace-nowrap hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-500 mt-4 text-center">{error}</p>
      )}
    </div>
  );
};
export default TranslateFilePage;