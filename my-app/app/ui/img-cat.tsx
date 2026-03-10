"use client";

import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import callApiCats from "@/lib/callApiCats";

const ImgCat = (): JSX.Element => {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [catImage, setCatImage] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [displayId, setDisplayId] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchCat = async () => {
            try {
                setLoading(true);
                const imageUrl: string[] = await callApiCats();
                setCatImage(imageUrl);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Erreur inconnue');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchCat();
    }, []);

    const handleCat = (id: string): void => {
        const mappingCat: string | undefined = catImage.find((cat: string) => cat === id);
        if (mappingCat) {
            setDisplayId(mappingCat);
            const splitCat = mappingCat.split("/").pop();
            console.log("splitCat", splitCat);
            router.push(`/cat/${splitCat}`);
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div className="grid grid-cols-5 grid-rows-5 gap-4 ">

            {catImage.map((cat: string, index: number) => (
                <span 
                    key={index} 
                    onClick={() => handleCat(cat)} 
                    className="flex items-center justify-center border border-cyan-400"
                >
                    
                    {displayId === cat ? (
                        <div className="absolute w-auto border border-red-400 m-auto">
                            {displayId}
                        </div>
                    ) : null}

                    <Image
                        src={cat}
                        width={250}
                        height={250}
                        loading="eager"
                        className="w-50 h-60"
                        alt="random cat"
                    />
                </span>
            ))}

        </div>
    );
};
export default ImgCat;