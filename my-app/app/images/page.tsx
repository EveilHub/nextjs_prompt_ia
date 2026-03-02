"use client";

import { JSX } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


const ImagesPage = (): JSX.Element => {

    const router = useRouter();

    return (
        <div className="w-full h-screen border border-cyan-400">

            <div>
                <button type="button" onClick={() => router.push('/')}
                    className="absolute top-4 right-4 px-4 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-500 
                        scale-100 hover:scale-105 active:scale-95 border-radius rounded-md cursor-pointer"
                >
                    Home
                </button>
            </div>


            <div className="border border-cyan-400">
                <h1>Images Page</h1>
            </div>

            <div className="flex flex-row items-center justify-center border border-yellow-300">

                <div>

                    <Image
                        src="/profile.png"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                    />

                </div>

                <div>

                    <Image
                        src="/profile.png"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                    />

                </div>

                <div>

                    <Image
                        src="/profile.png"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                    />

                </div>

            </div>

        </div>
    )
};
export default ImagesPage;