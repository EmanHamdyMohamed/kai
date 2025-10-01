"use client";

import Header from "@/app/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50">
      <Header 
        buttons={[
          { text: "Sign in", href: "/auth/login", variant: "primary" },
          { text: "Sign up", href: "/auth/register", variant: "primary" }
        ]} 
      />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <div className="flex gap-4 items-center flex-col sm:flex-row">

        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">


      </footer>
    </div>
  );
}
