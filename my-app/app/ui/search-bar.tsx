"use client";

import { SubmitEvent, JSX } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchBar = ({ placeholder }: { placeholder: string }): JSX.Element => {

    const pathname: string = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();

    const handleSearch = (term: string): void => {
        console.log(term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const validateSearch = (e: SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const value = e.target.value;
        console.log(value);
    };

    return (
        <form onSubmit={(e) => validateSearch(e)} className="w-2/3 flex flex-row border border-cyan-400">
            <input
                className="peer block w-[85%] rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
            <button type="submit" className="w-[15%] bg-blue-500 m-left">Enter</button>
        </form>
    )
}
export default SearchBar;