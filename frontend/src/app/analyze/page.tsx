"use client";

import Header from "@/app/components/Header";
import { useAuth } from "@/context/AuthContext";
import { fetchWithAuth } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type StatusType = 'completed' | 'processing' | 'pending' | 'failed';

interface StatusBadgeProps {
  status: StatusType;
}

export default function Analyze() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState('');
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [submissionsLoading, setSubmissionsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    // on page load get list of user analyze submissions with pagination 10 items per page
    const getUserAnalyzeSubmissions = async (page: number = currentPage) => {
        try {
            debugger;
            setSubmissionsLoading(true);
            const offset = (page - 1) * itemsPerPage;
            const response = await fetchWithAuth(`/user/analyze?offset=${offset}&limit=${itemsPerPage}`, {
                method: 'GET',
            });
            console.log('Submissions response:', response);
            
            // Extract pagination metadata from response
            const requests = response.data.requests || [];
            const total = response.data.total || requests.length;
            const totalPagesCount = Math.ceil(total / itemsPerPage);
            
            setSubmissions(requests);
            setTotalItems(total);
            setTotalPages(totalPagesCount);
            setCurrentPage(page);
        } catch (err: any) {
            console.error('Error fetching submissions:', err);
            setError(err.message);
        } finally {
            setSubmissionsLoading(false);
        }
    }
    useEffect(() => {
        console.log('Analyze page useEffect - authLoading:', authLoading, 'user:', user);
        
        // Wait for auth to finish loading before checking user
        if (authLoading) {
            console.log('Still loading auth, waiting...');
            return;
        }
        
        if (!user) {
            console.log('No user found, redirecting to login');
            router.push('/auth/login');
            return;
        }
        
        console.log('User found, loading submissions');
        getUserAnalyzeSubmissions();
    }, [user, authLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) {
            setError('Please enter some text to analyze');
            return;
        }
        
        setLoading(true);
        setError('');
        setResult('');
        
        try {
            const response = await fetchWithAuth('/user/analyze', {
                method: 'POST',
                body: JSON.stringify({ text }),
            });
            console.log('Analysis response:', response);
            setResult(response.data);
            
            // Refresh submissions after successful analysis
            await getUserAnalyzeSubmissions();
            
            // Clear text after successful submission
            setText('');
        } catch (err: any) {
            console.error('Error analyzing text:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    const StatusBadge = ({ status }: StatusBadgeProps) => {
        const statusConfig: Record<StatusType, { bg: string; text: string; dot: string; label: string; animate?: boolean }> = {
          completed: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-400', label: 'Completed' },
          processing: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-400', label: 'Processing', animate: true },
          pending: { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-400', label: 'Pending' },
          failed: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-400', label: 'Failed' }
        };
        
        const config = statusConfig[status] || statusConfig.pending;
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
            <div className={`w-1.5 h-1.5 ${config.dot} rounded-full mr-1.5 ${config.animate ? 'animate-pulse' : ''}`}></div>
            {config.label}
          </span>
        );
      };

    // Show loading state while checking authentication
    if (authLoading) {
        return (
            <div className="min-h-screen bg-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return <div className="bg-blue-50">
        <Header buttons={[
            { text: "Sign out", href: "/auth/login", variant: "primary" },
        ]} userInfo={true}></Header>

        <div className="flex justify-center h-full">
            <div className="p-8 h-screen w-1/2">
                <div className="bg-white rounded-lg shadow-lg p-8 ">
                    <div className="text-center mb-8">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Paste your text here..."
                                className="min-h-[200px] resize-none flex min-h-[80px] w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-gray-300 focus:ring-2 focus:ring-gray-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                required
                                disabled={loading}
                            />
                            
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                                    <p className="text-sm font-medium">{error}</p>
                                </div>
                            )}
                            
                            <button 
                                type="submit" 
                                disabled={loading || !text.trim()}
                                className="w-full bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Analyzing...' : 'Analyze Text'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="p-8 h-full w-1/2">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-2xl font-bold text-gray-900">Recent Submissions</h3>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {totalItems} total items
                            </span>
                        </div>
                        {/* <p className="text-sm text-gray-600">Track the status of your text analyses</p> */}
                    </div>

                    <div className="space-y-4">
                        {submissionsLoading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                                <p className="text-sm text-gray-500 mt-2">Loading submissions...</p>
                            </div>
                        ) : submissions.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No submissions yet. Submit some text to analyze!</p>
                            </div>
                        ) : (
                            submissions.map((submission, index) => (
                                <div key={submission.id || index} className="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm shadow-lg p-6">
                                    <div className="flex items-start justify-between gap-4 p-3 pt-0">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-muted-foreground truncate mb-2">
                                                {submission.text}
                                            </p>
                                            {submission.status === 'failed' && (
                                                <p className="text-sm text-red-500 mb-2">
                                                    {submission.error_message}
                                                </p>
                                            )}
                                            <p className="text-xs text-muted-foreground">
                                                {submission.created_at ? new Date(submission.created_at).toLocaleString() : 'Unknown date'}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <StatusBadge status={submission.status || 'pending'} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => getUserAnalyzeSubmissions(currentPage - 1)}
                                    disabled={currentPage === 1 || submissionsLoading}
                                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                
                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }
                                        
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => getUserAnalyzeSubmissions(pageNum)}
                                                disabled={submissionsLoading}
                                                className={`px-3 py-2 text-sm font-medium rounded-md ${
                                                    currentPage === pageNum
                                                        ? 'bg-blue-500 text-white'
                                                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>
                                
                                <button
                                    onClick={() => getUserAnalyzeSubmissions(currentPage + 1)}
                                    disabled={currentPage === totalPages || submissionsLoading}
                                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>;
}   