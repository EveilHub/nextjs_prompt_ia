"use client";

import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import callApiCats from "@/lib/callApiCats";

const ImgCat = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);
    const [catImage, setCatImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCat = async () => {
            try {
                setLoading(true);
                const imageUrl = await callApiCats();
                setCatImage(imageUrl);
            } catch (error) {
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

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div>
            {catImage ? (
                <Image
                    src={catImage}
                    width={250}
                    height={250}
                    loading="eager"
                    alt="Chat aléatoire"
                />
            ) : (
                <p>Aucune image disponible.</p>
            )}
        </div>
    );
};

export default ImgCat;