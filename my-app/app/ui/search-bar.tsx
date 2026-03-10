"use client";

import { SubmitEvent, JSX, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchBar = ({ placeholder }: { placeholder: string }): JSX.Element => {

    const pathname: string = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [error, setError] = useState<string | undefined>(undefined);

    const handleSearch = (term: string): void => {
        // console.log(term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const validateSearch = (e: SubmitEvent<HTMLFormElement>): void | JSX.Element => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const value = formData.get("query");

        if (value === "search" || value === "contact" || value === "images") {
            router.push(`/${value}`);
        } else {
            setError("! Erreur Page introuvable !");
        }
    };

    if (error) {
        return (<>
            <p style={{color: "red"}}>{error}</p>
            <button 
                type="button" 
                onClick={() => setError("")} 
                className="bg-blue-500 mx-4 rounded-md hover:bg-blue-600 active:bg-blue-400 mx-4 px-4 py-2"
            >
                    Refresh
            </button>
        </>);
    };

    return (
        <form onSubmit={(e) => validateSearch(e)} className="w-2/3 flex flex-row">
            <input
                name="query"
                className="peer block w-[90%] rounded-md py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
            <button type="submit" className="w-[10%] bg-blue-500 mx-4 rounded-md hover:bg-blue-600 active:bg-blue-400">
                Enter
            </button>
        </form>
    )
};
export default SearchBar;