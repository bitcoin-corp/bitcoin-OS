'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GmailService } from '@/services/GmailService';

export default function GoogleAuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const gmailService = new GmailService();
        const success = await gmailService.handleCallback(window.location.href);
        
        if (success) {
          // Redirect to inbox after successful authentication
          router.push('/inbox?gmail=connected');
        } else {
          setError('Failed to authenticate with Google');
        }
      } catch (error) {
        console.error('Google auth callback error:', error);
        setError((error as Error).message || 'Authentication failed');
      } finally {
        setIsProcessing(false);
      }
    };

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-dark-200 rounded-2xl p-8 border border-border-color text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Gmail Authentication Failed</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-bitcoin-red-500 hover:bg-bitcoin-red-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-bitcoin-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Connecting Gmail...</h2>
          <p className="text-gray-400">Please wait while we connect your Gmail account</p>
        </div>
      </div>
    );
  }

  return null;
}