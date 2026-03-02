import { JSX } from "react";
import Link from "next/link";

const Menu = (): JSX.Element => {
    return (
        <div className="w-full flex flex-row items-center justify-around text-lg font-bold border border-cyan-400 py-4">
            <Link href="/" className="text-cyan-400 hover:text-cyan-500 active:text-cyan-300">Home</Link>
            <Link href="/images" className="text-cyan-400 hover:text-cyan-500 active:text-cyan-300">Images</Link>
            <Link href="/search" className="text-cyan-400 hover:text-cyan-500 active:text-cyan-300">Search</Link>
            <Link href="/contact" className="text-cyan-400 hover:text-cyan-500 active:text-cyan-300">Contact</Link>
        </div>
    )
};
export default Menu;