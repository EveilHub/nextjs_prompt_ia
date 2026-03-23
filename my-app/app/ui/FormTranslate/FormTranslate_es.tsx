import { PropsTranslate } from "@/lib/type";
import { JSX } from "react";
import Image from "next/image";

const FormTranslateSpanish = (
    {
        name,
        value,
        placeholder,
        onChange,
        onSubmit,
    }: PropsTranslate): JSX.Element => {
    return (
        <form onSubmit={onSubmit} className="w-1/2 flex flex-row justify-between">

            <input
                name={name}
                value={value}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder={placeholder}
                onChange={onChange}
            />
            
            <button type="submit" className="flex items-center justify-center w-10 font-bold bg-blue-500 rounded-md 
                hover:bg-blue-600 active:bg-blue-400 ml-4 whitespace-nowrap hover:scale-105 active:scale-95 transition-transform duration-200">
                <span><Image src={"/images/flags/spain.png"} width={32} height={32} alt="spain logo" /></span>
            </button>

        </form>
    )
}
export default FormTranslateSpanish;