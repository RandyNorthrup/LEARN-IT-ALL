'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UsernameModal from '@/components/UsernameModal';

export default function HomePage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          if (data.displayName && data.displayName !== 'Learner') {
            router.push('/dashboard');
          } else {
            setShowModal(true);
            setLoading(false);
          }
        } else {
          setShowModal(true);
          setLoading(false);
        }
      } catch (_error) {
        setShowModal(true);
        setLoading(false);
      }
    }

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-2xl font-bold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {showModal && <UsernameModal onComplete={() => router.push('/dashboard')} />}
    </>
  );
}
