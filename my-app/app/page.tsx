import { JSX } from "react";
import Link from "next/link";

const Home = (): JSX.Element => {

  return (
    <div className="w-full h-[92vh] bg-zinc-50 font-sans dark:bg-black">

      <main className="bg-white dark:bg-black">

        <div className="w-full text-center py-10">

          <h1 className="text-3xl font-bold">Prompt IA</h1>
        
        </div>
        
        <div className="w-full h-[60vh] flex flex-col items-start justify-center">

          <div className="w-2/5 h-3/5 flex flex-col items-start justify-center px-20 bg-gray-800/70 m-auto border border-slate-500 rounded-lg">

            <li className="text-md text-slate-300 my-10">
              <Link href="/search" className="text-lg font-bold text-cyan-400 hover:text-cyan-300 active:text-cyan-200">Search : </Link>
              AI translatation
            </li>

            <li className="text-md text-slate-300 my-10">
              <Link href="/images" className="text-lg font-bold text-cyan-400 hover:text-cyan-300 active:text-cyan-200">Images : </Link>
              All cats in img
            </li>
          
            <li className="text-md text-slate-300 my-10">
              <Link href="/contact" className="text-lg font-bold text-cyan-400 hover:text-cyan-300 active:text-cyan-200">Contact : </Link>
              Animation
            </li>

          </div>

        </div>
      
      </main>

    </div>
  );
}
export default Home;