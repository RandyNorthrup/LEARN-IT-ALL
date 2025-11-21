'use client';

import { useState } from 'react';

interface UsernameModalProps {
  onComplete: () => void;
}

export default function UsernameModal({ onComplete }: UsernameModalProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: username.trim() }),
      });

      if (response.ok) {
        onComplete();
      } else {
        setError('Failed to save username');
        setLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      setError('Failed to save username');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h2 className="mb-2 text-3xl font-bold text-gray-900">Welcome to LEARN-IT-ALL</h2>
        <p className="mb-6 text-gray-600">Choose a username to get started</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="mb-4 w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:outline-none"
            autoFocus
          />
          
          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-bold text-white transition-all hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Get Started'}
          </button>
        </form>
      </div>
    </div>
  );
}
