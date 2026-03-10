import { JSX } from "react";
import Image from "next/image";

const CatRetrieve = async ({params}: {params: Promise<{ id: string }>}) => {

  const { id } = await params;

    return (
        <div className="flex items-center justify-center w-full h-screen bg-slate-400 m-auto">
            <Image 
                src={`https://cataas.com/cat/${id}`}
                width={250}
                height={250}
                loading="eager"
                className="w-50 h-60"
                alt="random cat"
            />
        </div>
    )
}
export default CatRetrieve;