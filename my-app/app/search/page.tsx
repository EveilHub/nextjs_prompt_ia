import { JSX, Suspense } from "react";
import BtnHome from "../ui/btn-home";
import SearchBar from "../ui/search-bar";
import Loading from "./loading";

const SearchPage = (): JSX.Element => {

    return (
        <div className="w-full h-full border border-cyan-400">

            <div className="flex justify-between text-3xl font-bold m-10">
                <h1>Search Page</h1>
                <BtnHome />
            </div>

            <div className="flex items-center justify-center border border-yellow-400">
                <Suspense fallback={<Loading />}>
                    <SearchBar placeholder="Search images..." />
                </Suspense>
            </div>

        </div>
    )
};
export default SearchPage;