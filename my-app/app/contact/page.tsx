//"use client";

import { JSX } from "react";
import BtnHome from "../ui/btn-home";

const ContactPage = (): JSX.Element => {

    return (
        <div className="w-full h-full border border-cyan-400">

            <div className="flex justify-between text-3xl font-bold m-10">
                <h1>Contact Page</h1>
                <BtnHome />
            </div>

        </div>
    )
};
export default ContactPage;