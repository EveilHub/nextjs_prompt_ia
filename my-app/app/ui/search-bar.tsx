"use client";

import { TranslationType, WordsType, WordType } from "@/lib/type";
import { SubmitEvent, JSX, useState, ChangeEvent, useEffect, SyntheticEvent } from "react";
import Link from "next/link";
import FormTranslateEnglish from "./FormTranslate/FormTranslate_en";
import FormTranslateSpanish from "./FormTranslate/FormTranslate_es";
import FormTranslateGerman from "./FormTranslate/FormTranslate_de";
import FormTranslateChinese from "./FormTranslate/FormTranslate_zh";

const SearchBar = (): JSX.Element => {

    const pages: string[] = ["home", "images", "search", "contact"];

    const [searchWord, setSearchWord] = useState<WordType>({
        wordEn: "",
        wordEs: "",
        wordDe: "",
        wordZh: ""
    });

    const [searchWords, setSearchWords] = useState<WordsType>({
        wordsEn: [],
        wordsEs: [],
        wordsDe: [],
        wordsZh: []
    });

    const [translate, setTranslate] = useState<TranslationType>({
        translationsEn: {},
        translationsEs: {},
        translationsDe: {},
        translationsZh: {}
    });

    // Reusable API call translation
    const translateText = async (text: string, targetLang: "en" | "es" | "de" | "zh" = "en" ) => {
        try {
            let lang = "";

            targetLang === "en" ? lang = "english" : "";
            targetLang === "es" ? lang = "spanish" : "";
            targetLang === "de" ? lang = "german" : "";
            targetLang === "zh" ? lang = "chinese" : "";

            const res = await fetch(`/api/translate/${lang}`, {
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

    // Reusable onChange
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchWord((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitEn = (e: SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const value = formData.get("wordEn");
        if (value) {
            setSearchWords((prev: WordsType) => ({
                ...prev, 
                wordsEn: [...prev.wordsEn, String(value)]
            }));
            setSearchWord((prev: WordType) => ({
                ...prev, 
                wordEn: "" 
            }));
        };
    };

    const handleSubmitEs = (e: SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const value = formData.get("wordEs");
        if (value) {
            setSearchWords((prev: WordsType) => ({
                ...prev, 
                wordsEs: [...prev.wordsEs, String(value)]
            }));
            setSearchWord((prev: WordType) => ({
                ...prev, 
                wordEs: "" 
            }));
        };
    };

    const handleSubmitDe = (e: SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const value = formData.get("wordDe");
        if (value) {
            setSearchWords((prev: WordsType) => ({
                ...prev, 
                wordsDe: [...prev.wordsDe, String(value)]
            }));
            setSearchWord((prev: WordType) => ({
                ...prev, 
                wordDe: "" 
            }));
        };
    };

    const handleSubmitZh = (e: SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const value = formData.get("wordZh");
        if (value) {
            setSearchWords((prev: WordsType) => ({
                ...prev, 
                wordsZh: [...prev.wordsZh, String(value)]
            }));
            setSearchWord((prev: WordType) => ({
                ...prev, 
                wordZh: "" 
            }));
        };
    };

    useEffect(() => {
        const translateWordsEn = async (): Promise<void> => {
            for (const link of searchWords.wordsEn) {
                if (pages.includes(link)) continue;
                if (translate.translationsEn[link]) continue;
                const translated = await translateText(link, "en");
                setTranslate(prev => ({
                    ...prev,
                    translationsEn: {
                        ...prev.translationsEn,
                        [link]: translated
                    }
                }));
            }
        };
        translateWordsEn();
    }, [searchWords.wordsEn]);

    useEffect(() => {
        const translateWordsEs = async (): Promise<void> => {
            for (const link of searchWords.wordsEs) {
                if (pages.includes(link)) continue;
                if (translate.translationsEs[link]) continue;
                const translated = await translateText(link, "es");
                setTranslate(prev => ({
                    ...prev,
                    translationsEs: {
                        ...prev.translationsEs,
                        [link]: translated
                    }
                }));
            }
        };
        translateWordsEs();
    }, [searchWords.wordsEs]);

    useEffect(() => {
        const translateWordsDe = async (): Promise<void> => {
            for (const link of searchWords.wordsDe) {
                if (pages.includes(link)) continue;
                if (translate.translationsDe[link]) continue;
                const translated = await translateText(link, "de");
                setTranslate(prev => ({
                    ...prev,
                    translationsDe: {
                        ...prev.translationsDe,
                        [link]: translated
                    }
                }));
            }
        };
        translateWordsDe();
    }, [searchWords.wordsDe]);

    useEffect(() => {
        const translateWordsZh = async (): Promise<void> => {
            for (const link of searchWords.wordsZh) {
                if (pages.includes(link)) continue;
                if (translate.translationsZh[link]) continue;
                const translated = await translateText(link, "zh");
                setTranslate(prev => ({
                    ...prev,
                    translationsZh: {
                        ...prev.translationsZh,
                        [link]: translated
                    }
                }));
            }
        };
        translateWordsZh();
    }, [searchWords.wordsZh]);

    return (
        <div className="flex flex-col items-center w-full">

            {/* Translate word & sentences in EN */}
            <h3>FR to EN</h3>
            <FormTranslateEnglish
                name={"wordEn"}
                value={searchWord.wordEn}
                placeholder={"Fr => En"}
                onChange={handleSearch}
                onSubmit={(e) => handleSubmitEn(e)}
            />

            {/* Translate word & sentences in ES */}
            <h3>FR to ES</h3>
            <FormTranslateSpanish
                name={"wordEs"}
                value={searchWord.wordEs}
                placeholder={"Fr => Es"}
                onChange={handleSearch}
                onSubmit={(e) => handleSubmitEs(e)}
            />

            {/* Translate word & sentences in DE */}
            <h3>FR to DE</h3>
            <FormTranslateGerman
                name={"wordDe"}
                value={searchWord.wordDe}
                placeholder={"Fr => De"}
                onChange={handleSearch}
                onSubmit={(e) => handleSubmitDe(e)}
            />

            {/* Translate word & sentences in ZH */}
            <h3>FR to ZH</h3>
            <FormTranslateChinese
                name={"wordZh"}
                value={searchWord.wordZh}
                placeholder={"Fr => Zh"}
                onChange={handleSearch}
                onSubmit={(e) => handleSubmitZh(e)}
            />

            <div className="flex flex-col items-center justify-center w-1/2 h-auto mt-4 pt-10 pb-5 
                bg-slate-800/80 border border-slate-500 rounded-lg">
                
                {[...searchWords.wordsEn].slice(0).reverse().map((link: string, index: number) => (
                    <div key={index} className="text-slate-100 mb-4">

                        {pages.includes(link) ? (
                            <Link href={link}>{link}</Link>
                        ) : (
                            <>
                                <p>{translate.translationsEn[link] ?? "translation..."} - {link}</p>
                            </>
                        )}
                        
                    </div>
                ))}

                {[...searchWords.wordsEs].slice(0).reverse().map((link: string, index: number) => (
                    <div key={index} className="text-slate-100 mb-4">

                        {pages.includes(link) ? (
                            <Link href={link}>{link}</Link>
                        ) : (
                            <>
                                <p>{translate.translationsEs[link] ?? "traducción..."} - {link}</p>
                            </>
                        )}
                        
                    </div>
                ))}

                {[...searchWords.wordsDe].slice(0).reverse().map((link: string, index: number) => (
                    <div key={index} className="text-slate-100 mb-4">

                        {pages.includes(link) ? (
                            <Link href={link}>{link}</Link>
                        ) : (
                            <>
                                <p>{translate.translationsDe[link] ?? "Übersetzung..."} - {link}</p>
                            </>
                        )}
                        
                    </div>
                ))}

                {[...searchWords.wordsZh].slice(0).reverse().map((link: string, index: number) => (
                    <div key={index} className="text-slate-100 mb-4">

                        {pages.includes(link) ? (
                            <Link href={link}>{link}</Link>
                        ) : (
                            <>
                                <p>{translate.translationsZh[link] ?? "Chine trad..."} - {link}</p>
                            </>
                        )}
                        
                    </div>
                ))}

            </div>
        </div>
    )
};
export default SearchBar;