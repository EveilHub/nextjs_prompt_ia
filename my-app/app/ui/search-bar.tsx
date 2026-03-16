"use client";

import { SubmitEvent, JSX, useState, ChangeEvent, useEffect, SyntheticEvent } from "react";
import Link from "next/link";
import FormTranslateEnglish from "./FormTranslate/FormTranslate_en";
import FormTranslateSpanish from "./FormTranslate/FormTranslate_es";
import FormTranslateGerman from "./FormTranslate/FormTranslate_de";
import FormTranslateChinese from "./FormTranslate/FormTranslate_zh";

const SearchBar = (): JSX.Element => {

    const pages: string[] = ["home", "images", "search", "contact"];

    const [wordEn, setWordEn] = useState<string>("");
    const [wordEs, setWordEs] = useState<string>("");
    const [wordDe, setWordDe] = useState<string>("");
    const [wordZh, setWordZh] = useState<string>("");

    const [wordsEn, setWordsEn] = useState<string[]>([]);
    const [wordsEs, setWordsEs] = useState<string[]>([]);
    const [wordsDe, setWordsDe] = useState<string[]>([]);
    const [wordsZh, setWordsZh] = useState<string[]>([]);

    const [translationsEn, setTranslationsEn] = useState<{ [key: string]: string }>({});
    const [translationsEs, setTranslationsEs] = useState<{ [key: string]: string }>({});
    const [translationsDe, setTranslationsDe] = useState<{ [key: string]: string }>({});
    const [translationsZh, setTranslationsZh] = useState<{ [key: string]: string }>({});

    // A revoir !!!
    const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState<string | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<string | undefined>(undefined);

    const translateText_en = async (text: string, targetLang: string = "en") => {
        try {
            const res = await fetch("/api/translate/english", {
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

    const translateText_es = async (text: string, targetLang: string = "es") => {
        try {
            const res = await fetch("/api/translate/spanish", {
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

    const translateText_de = async (text: string, targetLang: string = "de") => {
        try {
            const res = await fetch("/api/translate/german", {
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

    const translateText_zh = async (text: string, targetLang: string = "zh") => {
        try {
            const res = await fetch("/api/translate/chinese", {
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


    const handleSearchEn = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        setWordEn(value);
    };

    const handleSearchEs = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        setWordEs(value);
    };

    const handleSearchDe = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        setWordDe(value);
    };

    const handleSearchZh = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        setWordZh(value);
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

    const handleSubmitEn = (e: SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const value = formData.get("query");
        if (value) {
            setWordsEn((prev: string[]) => [...prev, String(value)]);
            setWordEn("");
        };
    };

    const handleSubmitEs = (e: SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const value = formData.get("spain");
        if (value) {
            setWordsEs((prev: string[]) => [...prev, String(value)]);
            setWordEs("");
        };
    };

    const handleSubmitDe = (e: SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const value = formData.get("german");
        if (value) {
            setWordsDe((prev: string[]) => [...prev, String(value)]);
            setWordDe("");
        };
    };


    const handleSubmitZh = (e: SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const value = formData.get("chinese");
        if (value) {
            setWordsZh((prev: string[]) => [...prev, String(value)]);
            setWordZh("");
        };
    };

    useEffect(() => {
        const translateWordsEn = async (): Promise<void> => {
            for (const link of wordsEn) {
                if (pages.includes(link)) continue;
                if (translationsEn[link]) continue;
                const translated = await translateText_en(link, "en");
                setTranslationsEn(prev => ({
                    ...prev,
                    [link]: translated
                }));
            }
        };
        translateWordsEn();
    }, [wordsEn]);

    useEffect(() => {
        const translateWordsEs = async (): Promise<void> => {
            for (const link of wordsEs) {
                if (pages.includes(link)) continue;
                if (translationsEs[link]) continue;
                const translated = await translateText_es(link, "es");
                setTranslationsEs(prev => ({
                    ...prev,
                    [link]: translated
                }));
            }
        };
        translateWordsEs();
    }, [wordsEs]);

    useEffect(() => {
        const translateWordsDe = async (): Promise<void> => {
            for (const link of wordsDe) {
                if (pages.includes(link)) continue;
                if (translationsDe[link]) continue;
                const translated = await translateText_de(link, "de");
                setTranslationsDe(prev => ({
                    ...prev,
                    [link]: translated
                }));
            }
        };
        translateWordsDe();
    }, [wordsDe]);


    useEffect(() => {
        const translateWordsZh = async (): Promise<void> => {
            for (const link of wordsZh) {
                if (pages.includes(link)) continue;
                if (translationsZh[link]) continue;
                const translated = await translateText_zh(link, "zh");
                setTranslationsZh(prev => ({
                    ...prev,
                    [link]: translated
                }));
            }
        };
        translateWordsZh();
    }, [wordsZh]);

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

            {/* Translate word & sentences in EN */}
            <h3>FR to EN</h3>
            <FormTranslateEnglish
                name={"query"}
                value={wordEn}
                placeholder={"Fr => En"}
                onChange={handleSearchEn}
                onSubmit={(e) => handleSubmitEn(e)}
            />

            {/* Translate word & sentences in ES */}
            <h3>FR to ES</h3>
            <FormTranslateSpanish
                name={"spain"}
                value={wordEs}
                placeholder={"Fr => Es"}
                onChange={handleSearchEs}
                onSubmit={(e) => handleSubmitEs(e)}
            />

            {/* Translate word & sentences in ES */}
            <h3>FR to DE</h3>
            <FormTranslateGerman
                name={"german"}
                value={wordDe}
                placeholder={"Fr => De"}
                onChange={handleSearchDe}
                onSubmit={(e) => handleSubmitDe(e)}
            />

            {/* Translate word & sentences in ES */}
            <h3>FR to ZH</h3>
            <FormTranslateChinese
                name={"chinese"}
                value={wordZh}
                placeholder={"Fr => Zh"}
                onChange={handleSearchZh}
                onSubmit={(e) => handleSubmitZh(e)}
            />


            {/* Loading FILE */}
            <form onSubmit={(e) => handleUpload(e)} className="mt-4">

                <button type="submit" disabled={!file || loading} className="bg-blue-500 px-4 py-2 rounded cursor-pointer">
                    {loading ? "Scanning..." : "Upload & Scan File"}
                </button>

            </form>

            <div className="flex flex-col items-center justify-center w-1/2 h-auto mt-4 pt-10 pb-5 
                bg-slate-800/80 border border-slate-500 rounded-lg">
                
                {wordsEn.slice(0).reverse().map((link: string, index: number) => (
                    <div key={index} className="text-slate-100 mb-4">

                        {pages.includes(link) ? (
                            <Link href={link}>{link}</Link>
                        ) : (
                            <>
                                <p>{translationsEn[link] ?? "translating..."} - {link}</p>
                            </>
                        )}
                        
                    </div>
                ))}

                {wordsEs.slice(0).reverse().map((link: string, index: number) => (
                    <div key={index} className="text-slate-100 mb-4">

                        {pages.includes(link) ? (
                            <Link href={link}>{link}</Link>
                        ) : (
                            <>
                                <p>{translationsEs[link] ?? "traducción..."} - {link}</p>
                            </>
                        )}
                        
                    </div>
                ))}

                {wordsDe.slice(0).reverse().map((link: string, index: number) => (
                    <div key={index} className="text-slate-100 mb-4">

                        {pages.includes(link) ? (
                            <Link href={link}>{link}</Link>
                        ) : (
                            <>
                                <p>{translationsDe[link] ?? "Übersetzung..."} - {link}</p>
                            </>
                        )}
                        
                    </div>
                ))}

                {wordsZh.slice(0).reverse().map((link: string, index: number) => (
                    <div key={index} className="text-slate-100 mb-4">

                        {pages.includes(link) ? (
                            <Link href={link}>{link}</Link>
                        ) : (
                            <>
                                <p>{translationsZh[link] ?? "Chine trad..."} - {link}</p>
                            </>
                        )}
                        
                    </div>
                ))}



            </div>
        </div>
    )
};
export default SearchBar;