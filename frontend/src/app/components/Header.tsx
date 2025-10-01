import Link from "next/link";
import HeaderTitle from "./HeaderTitle";

interface HeaderProps {
    buttons?: Array<{
      text: string;
      href: string;
      variant?: 'primary' | 'secondary';
      onClick?: () => void;
    }>;
}

export default function Header({ buttons }: HeaderProps) {
    return (
        <header className="bg-white">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <HeaderTitle ></HeaderTitle>
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
      </header>
        
    );
}