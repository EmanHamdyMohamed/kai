"use client";

import Header from "@/app/components/Header";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isTokenValid } = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user && isTokenValid) {
      // User is authenticated and token is valid, go to analyze page
      router.push('/analyze');
    } else {
      // User is not authenticated or token is invalid, go to login page
      router.push('/auth/login');
    }
  };

  return (
    <div className="h-full bg-blue-50">
      <Header 
        buttons={[
          { text: "Sign in", href: "/auth/login", variant: "primary" },
          { text: "Sign up", href: "/auth/register", variant: "primary" }
        ]} 
        enableAuthRedirect={false} // Disable automatic redirect, use manual button instead
      />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <div className="text-center max-w-4xl mx-auto">

            
            <h1 className="text-6xl md:text-7xl pt-12 font-bold mb-8 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent leading-tight">
              Analyze Your Text with AI
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Get deep insights into sentiment, readability, and key themes from your text content using advanced AI analysis
            </p>

            {/* Call-to-Action Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {user ? "Go to Analysis" : "Get Started"}
              </button>
              
              {!user && (
                <button
                  onClick={() => router.push('/auth/register')}
                  className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg border-2 border-blue-500 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Sign Up Free
                </button>
              )}
            </div>
        </div>
      </main>

    </div>
  );
}
