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

  // change lang
  // const handleLang = (option: string): void => {
  //   setChooseLang((prev: string) => prev = option);
  // };

  const handleLang = (e: ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value;
    setChooseLang(value);
  };

  console.log("!!! CHOOSE LANG !!!", chooseLang);


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
          const err = JSON.parse(textOrHtml);
          throw new Error(err.error || "Translation failed");
        } catch {
          throw new Error(`Translation failed: ${textOrHtml}`);
        }
      }

      const data = JSON.parse(textOrHtml);
      setTranslatedText(data.translatedText);
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

  return (
    <div className="w-full flex flex-col items-center justify-center mt-4">
      <form onSubmit={handleUpload} className="w-full flex flex-col items-center">

        <div className="w-[380px] flex flex-row items-center justify-between">
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-400 px-4 py-2 rounded cursor-pointer my-4 ml-6"
          />

          <div className="ml-4">{file ? (<span>✅</span>) : (<span>❌</span>)}</div>
        </div>

        <button
          type="submit"
          disabled={!file || loading}
          className={`bg-blue-500 hover:bg-blue-600 active:bg-blue-400 px-4 py-2 rounded cursor-pointer`}
        >
          {loading ? "Scanning..." : "Upload & Extract Text"}
        </button>
      </form>

      {originalText && (
        <>
          <div className="mt-4 p-2 border rounded bg-fuchsia-100 text-slate-600/70 w-[80%]">
            <h3 className="font-bold text-red-400 mb-4">Original Text:</h3>
            <pre>{originalText}</pre>
          </div>

            <select 
              id="optionLang"
              name="lang"
              value={chooseLang}
              onChange={(e) => handleLang(e)}
              className=""
            >
              <option value="FR">🇫🇷</option>
              <option value="EN">🇺🇸</option>
              <option value="DE">🇩🇪</option>
              <option value="ES">🇪🇸</option>
            </select>

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
          <h3 className="font-bold text-red-400 mb-4">Translated Text:</h3>
          <pre>{translatedText}</pre>
        </div>
      )}

      {error && <p style={{ color: "red" }} className="mt-2">{error}</p>}
    </div>
  );
};
export default TranslateFilePage;