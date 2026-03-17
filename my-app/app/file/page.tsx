"use client";

import { JSX, SyntheticEvent, useState } from "react";

const TranslateFilePage = (): JSX.Element => {

    const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

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
        <form onSubmit={(e) => handleUpload(e)} className="mt-4">

            <button type="submit" disabled={!file || loading} className="bg-blue-500 px-4 py-2 rounded cursor-pointer">
                {loading ? "Scanning..." : "Upload & Scan File"}
            </button>

        </form>
    )
}
export default TranslateFilePage;