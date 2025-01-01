"use client"; // This is a client component

import Link from "next/link";

export default function Home() {
  return (
    <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-2 place-content-center pt-3">
        <div className="flex w-full text-3xl place-content-center">
            <h1>Paleo Planner</h1>
        </div>
        <div className="flex flex-col w-full text-xl">
            <p className="w-3/4 text-center m-auto">This is a fan-made planning app for Paleo Pines. The Pen Planner lets you plan out which dinos you&apos;d like to house together, and the Ranch Planner lets you plan out the placements of crops, pens, and other objects on your ranch.
            <br/>Note that the pen planner uses browser cookies to remember your pens.</p>
        </div>
      </div>
      <div className="flex flex-col row-start-2 place-content-center items-center sm:items-start">
        <div className="flex gap-16 items-center flex-col sm:flex-row">
          <Link href="/pen-planner">
            <button className="flex rounded-md bg-gradient-to-b from-signpost-top to-signpost-bottom border-8 border-signpost-back text-amber-900 w-96 h-56 text-3xl font-bold place-content-center place-items-center">
              Pen Planner
            </button>
          </Link>
          <Link href="/ranch-planner">
            <button className="flex rounded-md bg-gradient-to-b from-signpost-top to-signpost-bottom border-8 border-signpost-back text-amber-900 w-96 h-56 text-3xl font-bold place-content-center place-items-center">
              Ranch Planner
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col row-start-3 gap-6 flex-wrap items-center justify-center">
        <a className="text-xl" href="https://ko-fi.com/surgeflare">Donate if you&apos;d like!</a>
        <span className="cursor-default">
          Created by Discord user surgeFlare #7007
        </span>
      </div>
    </main>
  );
}
