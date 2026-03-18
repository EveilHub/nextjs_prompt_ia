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
    <div className="w-full">

      <h1 className="flex justify-between text-3xl font-bold p-10">Translate File</h1>

      <form onSubmit={handleUpload} className="w-full flex flex-col items-center">

        <div className="w-[380px] flex flex-row items-center justify-center">
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-400 px-4 py-2 rounded cursor-pointer -mt-28 mb-6"
          />

          <div className="-mt-34 ml-2">{file ? (<span style={{fontSize: "1.8rem"}}>✅</span>) : (null)}</div>
        </div>

        {file ? (
          <button
            type="submit"
            disabled={!file || loading}
            className={`bg-blue-500 hover:bg-blue-600 active:bg-blue-400 px-4 py-2 rounded cursor-pointer`}
          >
            {loading ? "Scanning..." : "Upload & Extract Text"}
          </button>
        ):(
          null
        )}
      </form>

      <div className={`${translatedText ? "w-full justify-around" : "w-[50%] justify-between"} absolute flex flex-row items-center mt-10 border border-orange-400`}>

        {originalText && (
          <>
            <div className="w-[40%] flex flex-row">
              <div className="w-full p-2 border rounded bg-blue-100 text-slate-600/70">
                <h3 className="font-bold text-red-500 mb-4">Original Text:</h3>
                <pre>{originalText}</pre>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <select 
                id="optionLang"
                name="lang"
                value={chooseLang}
                onChange={(e) => handleLang(e)}
                style={{fontSize: "2rem"}}
                className="mt-4"
              >
                
                <option value="FR" style={{fontSize: "2rem"}}>🇫🇷</option>
                <option value="NL" style={{fontSize: "2rem"}}>🇳🇱</option>

                <option value="DE" style={{fontSize: "2rem"}}>🇩🇪</option>
                <option value="ES" style={{fontSize: "2rem"}}>🇪🇸</option>

                <option value="SV" style={{fontSize: "2rem"}}>🇸🇪</option>
                <option value="NO" style={{fontSize: "2rem"}}>🇳🇴</option>

                <option value="EN" style={{fontSize: "2rem"}}>🇺🇸</option>

                <option value="SK" style={{fontSize: "2rem"}}>🇸🇰</option>
                <option value="CS" style={{fontSize: "2rem"}}>🇨🇿</option>

                <option value="AR" style={{fontSize: "2rem"}}>🇦🇪</option>
                <option value="ZH" style={{fontSize: "2rem"}}>🇨🇳</option>
                <option value="JA" style={{fontSize: "2rem"}}>🇯🇵</option>

              </select>

              <button
                type="button"
                onClick={handleTranslate}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 active:bg-green-500 px-4 py-2 rounded mt-4"
              >
                {loading ? "Translating..." : "Translate"}
              </button>
            </div>
          </>
        )}

          {translatedText && (
            <div className="w-[40%] flex flex-col items-center justify-center">
              <div className="w-full p-2 border rounded bg-green-100 text-slate-600/70">
                <h3 className="font-bold text-red-500 mb-4">Translated Text:</h3>
                <pre>{translatedText}</pre>
              </div>

              <div className="relative w-full flex justify-center">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="absolute bg-green-600 hover:bg-green-700 active:bg-green-500 px-4 py-2 rounded mt-4"
                >
                  Download
                </button>
              </div>
            </div>
          )}

      </div>

      {error && (
        <p style={{ color: "red" }} className="mx-2 mt-2">{error}</p>
      )}
    </div>
  );
};
export default TranslateFilePage;