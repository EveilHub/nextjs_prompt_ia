"use server";

import { JSX } from "react";
import BtnHome from "../ui/btn-home";
import ImgCat from "../ui/img-cat";

const ImagesPage = async (): Promise<JSX.Element> => {
    return (
        <div className="w-full h-full">

            <div className="flex justify-between text-3xl font-bold m-10">
                <h1>Images Page</h1>
                <BtnHome />
            </div>

            <div className="w-full flex justify-center">
                <ImgCat />
            </div>
        </div>
    )
};
export default ImagesPage;