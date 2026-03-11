import { JSX } from "react";
import Link from "next/link";

const Home = (): JSX.Element => {

  return (
    <div className="w-full bg-zinc-50 font-sans dark:bg-black">

      <main className="bg-white dark:bg-black">

        <div className="w-full text-center my-10">

          <h1 className="text-3xl font-bold">Prompt IA</h1>
        
        </div>
        
        <div className="w-full h-max flex flex-col items-start justify-center px-20
          bg-gray-800/70 font-bold">

          <li className="text-cyan-400 hover:text-cyan-300 active:text-cyan-200 my-10">
            <Link href="/search">Search</Link>
          </li>

          <li className="text-cyan-400 hover:text-cyan-300 active:text-cyan-200 my-10">
            <Link href="/images">Images</Link>
          </li>
        
          <li className="text-cyan-400 hover:text-cyan-300 active:text-cyan-200 my-10">
            <Link href="/contact">Contact</Link>
          </li>

        </div>
      
      </main>

    </div>
  );
}
export default Home;