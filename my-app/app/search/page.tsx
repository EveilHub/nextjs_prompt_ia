import { JSX, Suspense } from "react";
import BtnHome from "../ui/btn-home";
import SearchBar from "../ui/search-bar";
import Loading from "./loading";

const SearchPage = (): JSX.Element => {

    return (
        <div className="w-full h-full">

            <div className="flex justify-between text-3xl font-bold p-10">
                <h1>Search Page</h1>
                <BtnHome />
            </div>

            <div className="flex items-center justify-center">
                <Suspense fallback={<Loading />}>
                    <SearchBar placeholder="Search images..." />
                </Suspense>
            </div>

        </div>
    )
};
export default SearchPage;