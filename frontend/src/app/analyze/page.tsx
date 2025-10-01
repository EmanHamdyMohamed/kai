"use client";

import Header from "@/app/components/Header";

type StatusType = 'completed' | 'processing' | 'pending' | 'error';

interface StatusBadgeProps {
  status: StatusType;
}

export default function Analyze() {
    const StatusBadge = ({ status }: StatusBadgeProps) => {
        const statusConfig: Record<StatusType, { bg: string; text: string; dot: string; label: string; animate?: boolean }> = {
          completed: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-400', label: 'Completed' },
          processing: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-400', label: 'Processing', animate: true },
          pending: { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-400', label: 'Pending' },
          error: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-400', label: 'Error' }
        };
        
        const config = statusConfig[status] || statusConfig.pending;
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
            <div className={`w-1.5 h-1.5 ${config.dot} rounded-full mr-1.5 ${config.animate ? 'animate-pulse' : ''}`}></div>
            {config.label}
          </span>
        );
      };
    return <div className="min-h-screen bg-blue-50">
        <Header buttons={[
            { text: "Sign out", href: "/auth/login", variant: "primary" },
        ]}></Header>

        <div className="flex items-center justify-center min-h-screen">
            <div className="p-8 h-screen w-1/2">
                <div className="bg-white rounded-lg shadow-lg p-8 ">
                    <div className="text-center mb-8">
                        <form className="space-y-4">
                        <textarea
                            placeholder="Paste your text here..."
                            className="min-h-[200px] resize-none flex min-h-[80px] w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-gray-300 focus:ring-2 focus:ring-gray-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            required
                        />
                        <button type="submit" className="w-full bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium">
                            Analyze Text
                        </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="p-8 h-screen w-1/2">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">Recent Submissions</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">3 items</span>
                </div>
                <p className="text-sm text-gray-600">Track the status of your text analyses</p>
                </div>

                    <div className="space-y-4">
                        <div className="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm shadow-lg p-8">
                            <div className="flex items-start justify-between gap-4 p-6 pt-0">
                                <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-medium truncate">title</h3>
                                </div>
                                <p className="text-sm text-muted-foreground truncate mb-2">
                                    text
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {new Date().toLocaleString()}
                                </p>
                                </div>
                                <div className="flex-shrink-0">
                                <StatusBadge status="completed" />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    </div>;
}   