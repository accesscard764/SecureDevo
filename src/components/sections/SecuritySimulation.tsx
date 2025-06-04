import React, { useContext, useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert, Shield, Clock, MoreHorizontal } from 'lucide-react';
import ThemeContext from '../../contexts/ThemeContext';

const SecuritySimulation: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);
  const [logs, setLogs] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Mock log generation
  useEffect(() => {
    const generateRandomLog = () => {
      const types = ['warning', 'critical', 'info', 'success'];
      const sources = ['firewall', 'ids', 'authentication', 'system', 'network'];
      const messages = [
        'Unusual login attempt detected',
        'Port scan from external IP',
        'Failed SSH login attempt',
        'Successful authentication',
        'System update completed',
        'DNS resolution failure',
        'Suspicious outbound connection',
        'Malformed packet detected',
        'Certificate validation error',
        'Brute force attack blocked'
      ];
      const ips = [
        '192.168.1.254',
        '10.0.0.15',
        '172.16.0.32',
        '45.33.21.94',
        '209.58.183.2'
      ];
      
      const type = types[Math.floor(Math.random() * types.length)];
      const source = sources[Math.floor(Math.random() * sources.length)];
      const message = messages[Math.floor(Math.random() * messages.length)];
      const ip = ips[Math.floor(Math.random() * ips.length)];
      
      return {
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        type,
        source,
        message,
        ip,
      };
    };
    
    // Initial logs
    const initialLogs = Array(10).fill(null).map(() => generateRandomLog());
    setLogs(initialLogs);
    
    // Add new logs periodically
    const interval = setInterval(() => {
      const newLog = generateRandomLog();
      setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 19)]);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow" />;
      case 'critical':
        return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return <Clock className="w-5 h-5 text-cyan" />;
    }
  };
  
  const filteredLogs = activeFilter === 'all' 
    ? logs 
    : logs.filter(log => log.type === activeFilter);

  return (
    <section
      id="simulation"
      className={`py-20 ${darkMode ? 'bg-navy text-gray' : 'bg-white text-navy'}`}
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-mono mb-4 bg-opacity-20 border border-cyan text-cyan">
            LIVE DEMONSTRATION
          </span>
          <h2 className={`text-3xl md:text-4xl font-orbitron font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-navy'
          }`}>
            SOC <span className="text-cyan">Simulation</span>
          </h2>
          <div className="w-24 h-1 bg-yellow mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-base opacity-80">
            This is a real-time simulation of a Security Operations Center (SOC) monitoring environment,
            demonstrating how security events are logged, categorized, and managed.
          </p>
        </div>
        
        <div className={`rounded-lg overflow-hidden border ${
          darkMode ? 'border-gray-700 bg-navy-light' : 'border-gray-200 bg-white'
        } shadow-lg`}>
          <div className={`p-4 ${
            darkMode ? 'bg-navy-dark' : 'bg-gray-100'
          } border-b border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4`}>
            <h3 className="font-mono text-lg flex items-center">
              <Shield className="w-5 h-5 text-cyan mr-2" />
              <span className={darkMode ? 'text-white' : 'text-navy'}>Security Event Monitor</span>
            </h3>
            
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-cyan text-navy'
                    : darkMode 
                      ? 'bg-navy text-gray hover:bg-navy-dark' 
                      : 'bg-gray-200 text-navy hover:bg-gray-300'
                }`}
              >
                All Events
              </button>
              <button 
                onClick={() => setActiveFilter('critical')}
                className={`px-3 py-1 text-xs rounded-full flex items-center transition-colors ${
                  activeFilter === 'critical'
                    ? 'bg-red-500 text-white'
                    : darkMode 
                      ? 'bg-navy text-gray hover:bg-navy-dark' 
                      : 'bg-gray-200 text-navy hover:bg-gray-300'
                }`}
              >
                <ShieldAlert className="w-3 h-3 mr-1" />
                Critical
              </button>
              <button 
                onClick={() => setActiveFilter('warning')}
                className={`px-3 py-1 text-xs rounded-full flex items-center transition-colors ${
                  activeFilter === 'warning'
                    ? 'bg-yellow text-navy'
                    : darkMode 
                      ? 'bg-navy text-gray hover:bg-navy-dark' 
                      : 'bg-gray-200 text-navy hover:bg-gray-300'
                }`}
              >
                <AlertTriangle className="w-3 h-3 mr-1" />
                Warnings
              </button>
              <button 
                onClick={() => setActiveFilter('info')}
                className={`px-3 py-1 text-xs rounded-full flex items-center transition-colors ${
                  activeFilter === 'info'
                    ? 'bg-cyan text-navy'
                    : darkMode 
                      ? 'bg-navy text-gray hover:bg-navy-dark' 
                      : 'bg-gray-200 text-navy hover:bg-gray-300'
                }`}
              >
                <Clock className="w-3 h-3 mr-1" />
                Info
              </button>
              <button 
                onClick={() => setActiveFilter('success')}
                className={`px-3 py-1 text-xs rounded-full flex items-center transition-colors ${
                  activeFilter === 'success'
                    ? 'bg-green-500 text-white'
                    : darkMode 
                      ? 'bg-navy text-gray hover:bg-navy-dark' 
                      : 'bg-gray-200 text-navy hover:bg-gray-300'
                }`}
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                Success
              </button>
            </div>
          </div>
          
          <div className="h-96 overflow-y-auto">
            <div className="divide-y divide-gray-700">
              {filteredLogs.length === 0 ? (
                <div className="p-6 text-center text-sm opacity-70">
                  No events matching your filter criteria.
                </div>
              ) : (
                filteredLogs.map(log => (
                  <div 
                    key={log.id}
                    className={`p-4 flex items-start transition-colors ${
                      log.type === 'critical' 
                        ? darkMode ? 'bg-red-900/20' : 'bg-red-50'
                        : log.type === 'warning'
                          ? darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'
                          : ''
                    } hover:bg-opacity-10 hover:bg-cyan group`}
                  >
                    <div className="mr-4 mt-1">{getTypeIcon(log.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-xs font-mono opacity-60">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                        <span className={`text-xs px-2 rounded-full uppercase ${
                          log.type === 'critical' 
                            ? 'bg-red-500/20 text-red-400'
                            : log.type === 'warning'
                              ? 'bg-yellow/20 text-yellow'
                              : log.type === 'success'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-cyan/20 text-cyan'
                        }`}>
                          {log.source}
                        </span>
                      </div>
                      <p className={`text-sm mt-1 ${
                        darkMode ? 'text-white' : 'text-navy'
                      }`}>
                        {log.message}
                      </p>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs opacity-60">{log.ip}</span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center text-cyan">
                          Details
                          <MoreHorizontal className="w-3 h-3 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className={`p-3 ${
            darkMode ? 'bg-navy-dark' : 'bg-gray-100'
          } border-t border-gray-700 text-xs font-mono flex justify-between items-center`}>
            <span>Events: {filteredLogs.length} displayed</span>
            <span className="flex items-center">
              <span className="mr-2">Auto-refresh:</span>
              <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">Active</span>
            </span>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm italic opacity-70 max-w-2xl mx-auto">
            This is a simulation of a SOC environment with generated security events.
            In a real environment, I would analyze these events, identify patterns, and respond to threats.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SecuritySimulation;