import { auth } from "./firebase";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/v1';


// Helper function to check if error is due to invalid token
const isTokenError = (response: Response): boolean => {
  return response.status === 401 || response.status === 403;
};

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const token = await user.getIdToken();
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        'Authorization': `Bearer ${token}`,
      },
    });
    
    // If we get a token error, don't try to refresh - just throw error
    if (isTokenError(response)) {
      console.log('Token error detected, user needs to re-authenticate');
      throw new Error('Authentication failed - please log in again');
    }
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    return response.json();
  }