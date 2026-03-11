"use server";

import { JSX, Suspense } from "react";
import Loading from "./loading";
import BtnHome from "../ui/btn-home";
import ImgCat from "../ui/img-cat";

const ImagesPage = async (): Promise<JSX.Element> => {
    return (
        <div className="w-full h-full">

            <div className="flex justify-between text-3xl font-bold p-10">
                <h1>Images Page</h1>
                <BtnHome />
            </div>

            <div className="w-full flex justify-center">
                <Suspense fallback={<Loading />}>
                    <ImgCat />
                </Suspense>
            </div>
        </div>
    )
};
export default ImagesPage;