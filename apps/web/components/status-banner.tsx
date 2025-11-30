'use client';
import { useState, useEffect } from 'react';
import { getSystemStatus } from '../../web/app/actions/status';

export function StatusBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      const online = await getSystemStatus();
      setIsOnline(online);
      setLoading(false);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading || isOnline) return null;

  return (
    <div className="fixed bottom-0 right-0 m-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="bg-red-950/90 border border-red-500 text-red-200 px-4 py-3 rounded-lg shadow-2xl backdrop-blur-md flex items-center gap-3 max-w-sm">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </div>
        <div>
          <p className="font-bold text-sm">System Sleeping</p>
          <p className="text-xs opacity-80">
            The AI Worker is offline. Your requests will be queued.
          </p>
        </div>
      </div>
    </div>
  );
}
