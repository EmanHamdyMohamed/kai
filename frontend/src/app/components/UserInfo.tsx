import { useAuth } from "@/context/AuthContext";

export default function UserInfo() {
    const { user } = useAuth();
    
    if (!user) return null;
    
    // Get display name or fallback to email
    const displayName = user.displayName || user.email?.split('@')[0] || 'User';
    const email = user.email;
    
    return (
        <div className="flex items-center justify-end space-x-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Avatar Circle */}
            <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {displayName.charAt(0).toUpperCase()}
                </div>
            </div>
            
            {/* User Info */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                    {displayName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                    {email}
                </p>
            </div>
        </div>
    );
}