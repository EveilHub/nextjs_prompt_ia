"use client";

import { JSX } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchBar = ({ placeholder }: { placeholder: string }): JSX.Element => {

    const pathname = usePathname();
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

    return (
        <div className="w-2/3 border border-cyan-400">
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    )
}
export default SearchBar;