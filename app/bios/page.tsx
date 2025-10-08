'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BiosPage() {
  const router = useRouter();
  const [bootLines, setBootLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [statusUpdates, setStatusUpdates] = useState<Record<number, string>>({});

  useEffect(() => {
    // Animate boot sequence lines
    const bootSequence = [0, 1, 2, 3, 4, 5];
    bootSequence.forEach((index, i) => {
      setTimeout(() => {
        setBootLines(prev => [...prev, index]);
      }, 1000 + i * 500);
    });

    // Update status indicators
    setTimeout(() => setStatusUpdates(prev => ({ ...prev, 3: 'ok' })), 4000);
    setTimeout(() => setStatusUpdates(prev => ({ ...prev, 4: 'ok' })), 5000);
    setTimeout(() => setStatusUpdates(prev => ({ ...prev, 5: 'ok' })), 6000);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 15;
        const newProgress = Math.min(prev + increment, 100);
        if (newProgress === 100) {
          clearInterval(progressInterval);
          // Redirect after boot complete
          setTimeout(() => {
            router.push('/');
          }, 3000);
        }
        return newProgress;
      });
    }, 300);

    // Start progress after 3.5 seconds
    const progressTimeout = setTimeout(() => {
      clearInterval(progressInterval);
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(progressTimeout);
    };
  }, [router]);

  const bootSequenceData = [
    { text: 'Initializing Bitcoin Core...', status: 'ok' },
    { text: 'Loading Blockchain Headers...', status: 'ok' },
    { text: 'Verifying Wallet Security...', status: 'ok' },
    { text: 'Establishing P2P Connections...', status: statusUpdates[3] || 'loading' },
    { text: 'Synchronizing Mempool...', status: statusUpdates[4] || 'waiting' },
    { text: 'Starting Mining Service...', status: statusUpdates[5] || 'waiting' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok': return 'text-green-400';
      case 'loading': return 'text-yellow-400';
      case 'waiting': return 'text-yellow-400';
      default: return 'text-red-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ok': return '[OK]';
      case 'loading': return '[LOADING]';
      case 'waiting': return '[WAITING]';
      default: return '[ERROR]';
    }
  };

  return (
    <div className="h-full overflow-auto bg-black text-green-400 font-mono text-sm flex flex-col p-5">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .fade-in {
          animation: fadeIn 0.5s forwards;
        }

        .cursor {
          display: inline-block;
          width: 10px;
          height: 16px;
          background: #00ff00;
          animation: blink 1s infinite;
          margin-left: 2px;
        }

        .loading-spinner {
          display: inline-block;
          animation: spin 1s linear infinite;
        }
      `}</style>

      {/* Header */}
      <div className="border-b-2 border-green-400 pb-2 mb-5">
        <div className="text-base font-bold" style={{ textShadow: '0 0 10px #00ff00' }}>
          Bitcoin OS BIOS
        </div>
        <div className="text-green-600 text-xs">
          Version 1.0.0 - Build 2025.01.26
        </div>
      </div>

      {/* System Info */}
      <div className="mb-8">
        {[
          'CPU: Bitcoin Core Processor @ 3.7 GHz',
          'RAM: 256 GB DDR5 Memory',
          'Storage: 1 TB NVMe SSD (Blockchain Ready)',
          'Network: P2P Protocol v2.0 Enabled',
          'Security: SHA-256 Hardware Acceleration'
        ].map((line, i) => (
          <div 
            key={i} 
            className="my-1 fade-in" 
            style={{ 
              opacity: 0,
              animation: `fadeIn 0.5s forwards`,
              animationDelay: `${0.2 + i * 0.2}s`
            }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Bitcoin ASCII Art */}
      <div 
        className="text-orange-500 my-5 text-xs leading-tight fade-in"
        style={{ 
          textShadow: '0 0 5px #f7931a',
          opacity: 0,
          animation: 'fadeIn 1s forwards',
          animationDelay: '2s'
        }}
      >
        <pre>
{`    ₿₿₿₿₿₿₿₿₿₿₿₿₿₿₿
   ₿₿₿          ₿₿₿
  ₿₿₿  ₿₿₿₿₿₿    ₿₿₿
  ₿₿₿  ₿₿    ₿₿  ₿₿₿
  ₿₿₿  ₿₿₿₿₿₿    ₿₿₿
  ₿₿₿  ₿₿    ₿₿  ₿₿₿
  ₿₿₿  ₿₿₿₿₿₿    ₿₿₿
   ₿₿₿          ₿₿₿
    ₿₿₿₿₿₿₿₿₿₿₿₿₿₿₿`}
        </pre>
      </div>

      {/* Boot Sequence */}
      <div className="mt-5">
        {bootSequenceData.map((item, index) => (
          <div 
            key={index} 
            className="my-2 flex justify-between items-center"
            style={{
              opacity: bootLines.includes(index) ? 1 : 0,
              transition: 'opacity 0.3s'
            }}
          >
            <span>{item.text}</span>
            <span className={getStatusColor(item.status)}>
              {getStatusText(item.status)}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div 
        className="mt-8 fade-in"
        style={{
          opacity: 0,
          animation: 'fadeIn 0.5s forwards',
          animationDelay: '3s'
        }}
      >
        <div>System Boot Progress:</div>
        <div className="w-full max-w-lg h-5 border border-green-400 bg-green-950 my-2">
          <div 
            className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-500"
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 10px #00ff00'
            }}
          />
        </div>
        <div>
          {progress < 100 ? (
            `${Math.floor(progress)}% Complete`
          ) : (
            <span>
              Boot Complete - Starting Bitcoin OS...
              <span className="loading-spinner">⟳</span>
            </span>
          )}
        </div>
      </div>

      {/* Bottom Info */}
      <div 
        className="mt-auto pt-5 border-t border-green-400 fade-in"
        style={{
          opacity: 0,
          animation: 'fadeIn 0.5s forwards',
          animationDelay: '4s'
        }}
      >
        <div className="text-green-600">
          Press DEL to enter BIOS Setup | F8 for Boot Menu | F12 for Network Boot
        </div>
        <div 
          className="text-green-600 mt-2"
          style={{ animation: 'blink 2s infinite' }}
        >
          Press any key to continue<span className="cursor"></span>
        </div>
      </div>
    </div>
  );
}