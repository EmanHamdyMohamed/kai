"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import HeaderTitle from "./HeaderTitle";
import UserInfo from "./UserInfo";
import { useEffect } from "react";

interface HeaderProps {
    buttons?: Array<{
      text: string;
      href: string;
      variant?: 'primary' | 'secondary';
      onClick?: () => void;
    }>;
    userInfo?: boolean;
    enableAuthRedirect?: boolean; // New prop to enable auth-based redirect
}

export default function Header({ buttons, userInfo, enableAuthRedirect = false }: HeaderProps) {
    const { user, loading, isTokenValid } = useAuth();
    const router = useRouter();

    // Handle authentication-based redirect
    useEffect(() => {
        if (enableAuthRedirect && !loading) {
            if (user && isTokenValid) {
                // User is authenticated and token is valid, redirect to analyze page
                router.push('/analyze');
            } else {
                // User is not authenticated or token is invalid, redirect to login page
                router.push('/auth/login');
            }
        }
    }, [user, loading, isTokenValid, enableAuthRedirect, router]);

    // Show loading state while checking authentication
    if (enableAuthRedirect && loading) {
        return (
            <header className="bg-white">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <HeaderTitle />
                    <div className="flex items-center gap-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                        <span className="text-sm text-gray-600">Loading...</span>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="bg-white">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <HeaderTitle ></HeaderTitle>
                <div className="flex items-center gap-4">
                    {userInfo && <UserInfo />}
                    <div className="flex gap-2">
                    {
                        buttons?.map((button, index) => (
                            <Link
                            key={index}
                            href={button.href}
                            className={`inline-block px-4 py-2 rounded transition-colors duration-200 ${
                                button.variant === 'secondary' 
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                : 'bg-blue-400 text-white hover:bg-blue-600'
                            }`}
                            onClick={button.onClick}
                            >
                            {button.text}
                            </Link>
                        ))
                    }
                    </div>
                </div>
            </div>
      </header>
        
    );
}