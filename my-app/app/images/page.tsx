"use server";

import { JSX } from "react";
import Image from "next/image";
import BtnHome from "../ui/btn-home";
import ImgCat from "../ui/img-cat";

const ImagesPage = async (): Promise<JSX.Element> => {
    return (
        <div className="w-full h-full border border-cyan-400">

            <div className="flex justify-between text-3xl font-bold m-10">
                <h1>Images Page</h1>
                <BtnHome />
            </div>

            <div className="flex flex-row items-center justify-center border border-yellow-300">

                <div>

                    <ImgCat />

                </div>

                {/* <div>

                    <Image
                        src="/sunset.jpg"
                        width={250}
                        height={250}
                        loading="eager"
                        alt="Picture of the author"
                        className="border border-yellow-300"
                    />

                </div>

                <div>

                    <Image
                        src="/sunset.jpg"
                        width={250}
                        height={250}
                        loading="eager"
                        alt="Picture of the author"
                        className="border border-yellow-300"
                    />

                </div>

                <div>

                    <Image
                        src="/sunset.jpg"
                        width={250}
                        height={250}
                        loading="eager"
                        alt="Picture of the author"
                        className="border border-yellow-300"
                    />

                </div>

                <div>

                    <Image
                        src="/sunset.jpg"
                        width={250}
                        height={250}
                        loading="eager"
                        alt="Picture of the author"
                        className="border border-yellow-300"
                    />

                </div>

                <div>

                    <Image
                        src="/sunset.jpg"
                        width={250}
                        height={250}
                        loading="eager"
                        alt="Picture of the author"
                        className="border border-yellow-300"
                    />

                </div>


            </div>


            <div className="flex flex-row items-center justify-center border border-yellow-300">

                <div>

                    <Image
                        src="/sunset.jpg"
                        width={250}
                        height={250}
                        loading="eager"
                        alt="Picture of the author"
                        className="border border-yellow-300"
                    />

                </div>

                <div>

                    <Image
                        src="/sunset.jpg"
                        width={250}
                        height={250}
                        loading="eager"
                        alt="Picture of the author"
                        className="border border-yellow-300"
                    />

                </div>

                <div>

                    <Image
                        src="/sunset.jpg"
                        width={250}
                        height={250}
                        loading="eager"
                        alt="Picture of the author"
                        className="border border-yellow-300"
                    />

                </div>

                <div>

                    <Image
                        src="/sunset.jpg"
                        width={250}
                        height={250}
                        loading="eager"
                        alt="Picture of the author"
                        className="border border-yellow-300"
                    />

                </div>

                <div>

                    <Image
                        src="/sunset.jpg"
                        width={250}
                        height={250}
                        loading="eager"
                        alt="Picture of the author"
                        className="border border-yellow-300"
                    />

                </div>

                <div>

                    <Image
                        src="/sunset.jpg"
                        width={250}
                        height={250}
                        loading="eager"
                        alt="Picture of the author"
                        className="border border-yellow-300"
                    />

                </div> */}


            </div>

        </div>
    )
};
export default ImagesPage;