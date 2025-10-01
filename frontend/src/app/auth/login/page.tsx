"use client";

import Header from "@/app/components/Header";

export default function Login() {
  return <div className="min-h-screen bg-blue-50">
        <Header buttons={[]}></Header>

      <div className="flex items-center justify-center min-h-screen">
        <div className="p-8 h-screen w-1/2">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
                    <p className="text-gray-600">Sign in to your account to continue</p>
                </div>

                <form className="space-y-6 text-gray-600">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                        </label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                        placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
                    >
                        Sign in
                    </button>

                </form>
            </div>

            
        </div>
      </div>
  </div>;
}