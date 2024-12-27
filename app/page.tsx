"use client"; // This is a client component

import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <div className="flex gap-16 items-center flex-col sm:flex-row">
          <Link href="/pen-planner">
            <button className="flex rounded-md bg-gradient-to-b from-signpost-top to-signpost-bottom border-8 border-signpost-back text-amber-900 w-96 h-56 text-3xl font-bold place-content-center place-items-center">
              Pen Planner
            </button>
          </Link>
          <Link href="/ranch-planner">
            <button className="flex rounded-md bg-gradient-to-b from-signpost-top to-signpost-bottom border-8 border-signpost-back text-amber-900 w-96 h-56 text-3xl font-bold place-content-center place-items-center" disabled>
              Ranch Planner
            </button>
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <span className="cursor-default">
          Created by Discord user surgeFlare
        </span>
      </footer>
    </div>
  );
}
