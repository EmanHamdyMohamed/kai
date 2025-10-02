"use client";

import Header from "@/app/components/Header";

export default function Home() {
  return (
    <div className="h-full bg-blue-50">
      <Header 
        buttons={[
          { text: "Sign in", href: "/auth/login", variant: "primary" },
          { text: "Sign up", href: "/auth/register", variant: "primary" }
        ]} 
      />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <div className="text-center max-w-4xl mx-auto">

            
            <h1 className="text-6xl md:text-7xl pt-12 font-bold mb-8 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent leading-tight">
              Analyze Your Text with AI
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Get deep insights into sentiment, readability, and key themes from your text content using advanced AI analysis
            </p>
        </div>
      </main>

    </div>
  );
}
