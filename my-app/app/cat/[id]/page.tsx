import { JSX } from "react";
import Image from "next/image";

const CatRetrieve = async ({params}: {params: Promise<{ id: string }>}): Promise<JSX.Element> => {

    const { id } = await params;
    
    const imageUrl: string = `https://cataas.com/cat/${id}`;

    let caption: string = "Chat mignon !";

    try {
        const res = await fetch("https://catfact.ninja/fact");
        const data = await res.json();
        caption = data.fact || caption;
    } catch (err: unknown) {
        console.error("Erreur Cat Facts API :", err);
    };

    if (!caption) {
        return (
            <div>
                <p>Error loading AI !</p>
            </div>
        )
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-auto m-auto mt-20">
            <Image 
                src={`https://cataas.com/cat/${id}`}
                width={500}
                height={500}
                loading="eager"
                alt={caption}
                className="rounded-lg"
                unoptimized
            />
            <p className="mt-4 text-slate-200/90">{caption}</p>
        </div>
    )
};
export default CatRetrieve;