"use client";

import { JSX } from "react";
import { useRouter } from "next/navigation";

const BtnHome = (): JSX.Element => {

    const router = useRouter();

    return (
        <button type="button" onClick={() => router.push('/')}
            className="px-4 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-500 
                scale-100 hover:scale-105 active:scale-95 border-radius rounded-md cursor-pointer"        
        >
            Home
        </button>
    )
};
export default BtnHome;