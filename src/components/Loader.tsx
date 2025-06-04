import React, { useEffect, useState } from 'react';
import { Shield, Lock, Terminal } from 'lucide-react';

const Loader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initiating secure environment...');

  useEffect(() => {
    const statuses = [
      'Initiating secure environment...',
      'Scanning for vulnerabilities...',
      'Establishing secure connection...',
      'Verifying digital signatures...',
      'Loading encrypted assets...',
      'Access granted. Welcome.'
    ];

    let currentStep = 0;
    
    const timer = setInterval(() => {
      if (progress >= 100) {
        clearInterval(timer);
        return;
      }
      
      const newProgress = progress + (Math.random() * 15);
      setProgress(Math.min(newProgress, 100));
      
      if (newProgress / 20 >= currentStep + 1 && currentStep < statuses.length - 1) {
        currentStep++;
        setStatus(statuses[currentStep]);
      }
    }, 400);
    
    return () => clearInterval(timer);
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-navy to-black flex flex-col items-center justify-center z-50">
      <div className="flex items-center mb-8">
        <Shield className="w-12 h-12 text-cyan mr-4 animate-pulse" />
        <Terminal className="w-12 h-12 text-yellow mr-4" />
        <Lock className="w-12 h-12 text-cyan" />
      </div>
      
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-cyan transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="text-gray font-mono text-sm mb-2">
        {status}
      </div>
      
      <div className="text-cyan font-mono text-xs">
        {Math.round(progress)}% complete
      </div>
    </div>
  );
};

export default Loader;