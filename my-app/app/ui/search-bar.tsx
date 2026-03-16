"use client";

import { SubmitEvent, JSX, useState, ChangeEvent, useEffect, SyntheticEvent } from "react";
import Link from "next/link";

const SearchBar = ({ placeholder }: { placeholder: string }): JSX.Element => {

    const pages: string[] = ["home", "images", "search", "contact"];

    const [word, setWord] = useState<string>("");
    const [words, setWords] = useState<string[]>([]);

    const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<string | undefined>(undefined);

    const [translations, setTranslations] = useState<{ [key: string]: string }>({});

    const translateText = async (text: string, targetLang: string = "en") => {
        try {
            const res = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text, targetLang }),
            });
            const data = await res.json();
            return data.translation || text;
        } catch (err) {
            console.error("Translation error:", err);
        return text;
        }
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        setWord(value);
    };

    // Loading FILE
    const handleUpload = async (e: SyntheticEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        console.log("Clicked !");
        if (!file) return;
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        try {
        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "Upload failed");
        }

        const data = await res.json();
            setText(data.text);
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>): void | JSX.Element => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const value = formData.get("query");
        if (value) {
            setWords((prev: string[]) => [...prev, String(value)]);
            setWord("");
        };
    };

    useEffect(() => {
        const translateWords = async (): Promise<void> => {
            for (const link of words) {
                if (pages.includes(link)) continue;
                if (translations[link]) continue;
                const translated = await translateText(link, "en");
                setTranslations(prev => ({
                    ...prev,
                    [link]: translated
                }));
            }
        };
        translateWords();
    }, [words]);

    if (error) {
        return (
            <>
                <p style={{color: "red"}}>{error}</p>
                <button 
                    type="button" 
                    onClick={() => setError("")} 
                    className="bg-blue-500 mx-4 rounded-md hover:bg-blue-600 active:bg-blue-400 mx-4 px-4 py-2"
                >
                    Refresh
                </button>
            </>
        );
    };

    return (
        <div className="flex flex-col items-center w-full">

            <form onSubmit={(e) => handleSubmit(e)} className="w-1/2 flex flex-row justify-between">

                <input
                    name="query"
                    value={word}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder={placeholder}
                    onChange={handleSearch}
                />
                
                <button type="submit" className="w-[10%] font-bold bg-blue-500 rounded-md 
                    hover:bg-blue-600 active:bg-blue-400 ml-4">
                    Enter
                </button>

            </form>

            {/* Loading FILE */}
            <form onSubmit={(e) => handleUpload(e)} className="mt-4">
                <button type="submit" disabled={!file || loading} className="bg-blue-500 px-4 py-2 rounded cursor-pointer">
                    {loading ? "Scanning..." : "Upload & Scan File"}
                </button>
            </form>

            <div className="flex flex-col items-center justify-center w-1/2 h-auto mt-4 pt-10 pb-5 
                bg-slate-800/80 border border-slate-500 rounded-lg">
                
                {words.slice(0).reverse().map((link: string, index: number) => (
                    <div key={index} className="text-slate-100 mb-4">

                        {pages.includes(link) ? (
                            <Link href={link}>{link}</Link>
                        ) : (
                            <p>{translations[link] ?? "translating..."} - {link}</p>
                        )}
                        
                    </div>
                ))}

            </div>
        </div>
    )
};
export default SearchBar;