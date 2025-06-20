import React, { useContext, useEffect, useRef, useState } from 'react';
import { Shield, FileDown, Github, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ThemeContext from '../../contexts/ThemeContext';
import cvFile from '../../assets/Shaik_CV.pdf';
const Hero: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [terminalComplete, setTerminalComplete] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
      const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'Shaik_Adnan_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const securityCommands: Record<string, { output: string[] }> = {
    'help': {
      output: [
        'Available security commands:',
        '  scan <target>     - Network vulnerability scan',
        '  monitor           - Real-time threat monitoring', 
        '  analyze <file>    - Malware analysis',
        '  status            - Security system status',
        '  logs              - View security logs',
        '  firewall          - Firewall configuration',
        '  encrypt <data>    - Data encryption utility',
        '  ports <host>      - Port enumeration',
        '  vuln <target>     - Vulnerability assessment',
        '  whoami            - Current user information',
        '  clear             - Clear terminal',
        '',
        'Pro tip: Commands simulate real SOC operations'
      ]
    },
    'whoami': {
      output: [
        'cybersec@defense-station',
        'Security Clearance: Level 3',
        'Department: SOC Operations',
        'Active Sessions: 2',
        'Last Login: 2025-06-04 14:30:15 UTC'
      ]
    },
    'status': {
      output: [
        'Security System Status:',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '🟢 Firewall Status:     ACTIVE',
        '🟢 IDS/IPS:            MONITORING',
        '🟡 Threat Level:       MODERATE',
        '🟢 Endpoint Security:  PROTECTED',
        '🟢 Network Integrity:  SECURE',
        '🔄 Last Scan:          2 minutes ago',
        '📊 Blocked Threats:    47 (last 24h)',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      ]
    },
    'monitor': {
      output: [
        'Initializing threat monitoring...',
        '',
        '🔍 Active Monitoring Dashboard',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '📡 Network Traffic:    Normal',
        '🛡️  Intrusion Attempts: 3 blocked',
        '🦠 Malware Signatures: Updated',
        '🔐 Authentication:     2FA Active',
        '📈 Bandwidth Usage:    67% nominal',
        '⚠️  Suspicious IPs:    2 quarantined',
        '',
        'Monitoring active. Press Ctrl+C to stop...'
      ]
    },
    'logs': {
      output: [
        'Recent Security Events:',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '[14:28:42] INFO: Firewall rule updated',
        '[14:27:15] WARN: Multiple login attempts from 192.168.1.45',
        '[14:25:33] INFO: Malware signature database updated',
        '[14:23:21] ALERT: Port scan detected from 10.0.0.24',
        '[14:22:18] INFO: SSL certificate renewed',
        '[14:20:45] WARN: Unusual outbound traffic pattern',
        '[14:19:32] INFO: IDS rule set updated',
        '[14:18:12] ALERT: Brute force attempt blocked',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      ]
    },
    'firewall': {
      output: [
        'Firewall Configuration:',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'Status: ACTIVE',
        'Default Policy: DENY',
        'Active Rules: 127',
        '',
        'Recent Rules:',
        '  ALLOW: 80/tcp  (HTTP)',
        '  ALLOW: 443/tcp (HTTPS)',
        '  ALLOW: 22/tcp  (SSH) - Restricted IPs',
        '  DENY:  */*     (Default)',
        '',
        'Blocked Connections: 1,247 (today)'
      ]
    },
    'analyze': {
      output: [
        'Malware analysis initiated...',
        '',
        '🦠 Sample Analysis Report:',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'File: suspicious_file.exe',
        'MD5:  5d41402abc4b2a76b9719d911017c592',
        'SHA1: aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d',
        '',
        'Threat Level: HIGH RISK',
        'Classification: Trojan.Generic.KD.31234567',
        '',
        'Behavioral Analysis:',
        '  ✗ Registry modification detected',
        '  ✗ Network communication (C&C server)',
        '  ✗ File encryption activity',
        '  ✗ Anti-analysis techniques',
        '',
        'Verdict: MALICIOUS - Quarantine immediately!'
      ]
    },
    'encrypt': {
      output: [
        'Initializing encryption utility...',
        '',
        '🔐 Encryption Service Active',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'Algorithm: AES-256-GCM',
        'Key Length: 256 bits',
        'Mode: Galois/Counter Mode',
        '',
        'Sample encryption:',
        'Input:  "confidential_data.txt"',
        'Output: "7a8f2e4b9c1d6e3f8a2b5c9e1f4d7a8b"',
        '',
        'Key Management:',
        '  ✓ Hardware Security Module (HSM)',
        '  ✓ Key rotation: Every 90 days', 
        '  ✓ Perfect Forward Secrecy enabled',
        '',
        'Status: Data successfully encrypted'
      ]
    },
    'scan': {
      output: [
        'Initiating network scan...',
        '',
        '🔍 Nmap scan results:',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'HOST: 192.168.1.0/24',
        'PORT     STATE    SERVICE    VERSION',
        '21/tcp   closed   ftp',
        '22/tcp   open     ssh        OpenSSH 8.2',
        '23/tcp   closed   telnet',
        '80/tcp   open     http       Apache 2.4.41',
        '443/tcp  open     https      Apache 2.4.41',
        '3389/tcp filtered rdp',
        '',
        '⚠️  Potential vulnerabilities detected:',
        '  - CVE-2021-44228 (Log4Shell) - CRITICAL',
        '  - Weak SSH configuration',
        '  - Outdated Apache version',
        '',
        'Recommendation: Patch immediately!'
      ]
    },
    'vuln': {
      output: [
        'Running vulnerability assessment...',
        '',
        '🛡️  Vulnerability Report:',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'CRITICAL: 2 vulnerabilities found',
        'HIGH:     5 vulnerabilities found',
        'MEDIUM:   12 vulnerabilities found',
        'LOW:      8 vulnerabilities found',
        '',
        'Top Risks:',
        '1. Unpatched Apache Log4j (CVSS: 10.0)',
        '2. Default SSH credentials (CVSS: 9.8)',
        '3. Missing security headers (CVSS: 7.5)',
        '',
        'Next: Run "scan" for detailed port analysis'
      ]
    },
    'ports': {
      output: [
        'Enumerating open ports...',
        '',
        '🔌 Port Analysis Results:',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'Open Ports (TCP):',
        '  22   - SSH (Secure Shell)',
        '  80   - HTTP (Web Server)',
        '  443  - HTTPS (Secure Web)',
        '  993  - IMAPS (Secure Email)',
        '  995  - POP3S (Secure Email)',
        '',
        'Filtered Ports:',
        '  135, 139, 445 - Windows SMB',
        '  3389 - Remote Desktop',
        '',
        'Security Note: All critical ports secured'
      ]
    }
  };

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    setCommandHistory(prev => [...prev, cmd]);
    
    if (command === 'clear') {
      if (terminalRef.current) {
        terminalRef.current.innerHTML = '<div class="text-cyan mb-2 text-sm">Terminal cleared. Type "help" for available commands.</div>';
      }
      return;
    }

    // Handle parameterized commands
    const baseCommand = command.split(' ')[0];
    let response = securityCommands[baseCommand];
    
    // Default response for unrecognized commands
    if (!response) {
      response = {
        output: [
          `Command '${cmd}' not recognized.`,
          'Type "help" for available commands.',
          '',
          'Available categories:',
          '  • Network scanning (scan, ports, vuln)',
          '  • Security monitoring (monitor, status, logs)',
          '  • Malware analysis (analyze)',
          '  • Cryptography (encrypt)',
          '  • System info (whoami, help)'
        ]
      };
    }

    // Add command to terminal
    if (terminalRef.current) {
      const commandDiv = document.createElement('div');
      commandDiv.className = 'text-yellow mb-1 font-mono text-sm';
      commandDiv.innerHTML = `cybersec@defense-station:~$ ${cmd}`;
      terminalRef.current.appendChild(commandDiv);

      // Add response with typing effect
      setIsTyping(true);
      response.output.forEach((line, index) => {
        setTimeout(() => {
          if (terminalRef.current) {
            const responseDiv = document.createElement('div');
            responseDiv.className = 'text-gray-300 mb-1 font-mono text-sm opacity-0 transition-opacity duration-300';
            responseDiv.innerHTML = line || '&nbsp;';
            terminalRef.current.appendChild(responseDiv);
            
            setTimeout(() => {
              responseDiv.classList.add('opacity-100');
            }, 50);

            // Scroll to bottom smoothly
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;

            if (index === response.output.length - 1) {
              setTimeout(() => setIsTyping(false), 300);
            }
          }
        }, index * 100 + 100);
      });

      // Add empty line after response
      setTimeout(() => {
        if (terminalRef.current) {
          const emptyDiv = document.createElement('div');
          emptyDiv.innerHTML = '&nbsp;';
          emptyDiv.className = 'text-sm';
          terminalRef.current.appendChild(emptyDiv);
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, response.output.length * 100 + 200);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentCommand.trim() && !isTyping) {
      handleCommand(currentCommand);
      setCurrentCommand('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  useEffect(() => {
    if (!terminalRef.current) return;
    
    const terminalLines = [
      { text: '$ sudo nmap -sS -O 192.168.1.0/24', delay: 800 },
      { text: 'Starting Nmap 7.94 ( https://nmap.org ) at 2025-06-04 14:32 UTC', delay: 1800 },
      { text: 'Nmap scan report for 192.168.1.1', delay: 3200 },
      { text: 'Host is up (0.00043s latency).', delay: 4200 },
      { text: 'Not shown: 997 closed ports', delay: 5200 },
      { text: 'PORT     STATE    SERVICE', delay: 6000 },
      { text: '22/tcp   open     ssh', delay: 6600 },
      { text: '80/tcp   open     http', delay: 7100 },
      { text: '443/tcp  open     https', delay: 7600 },
      { text: 'MAC Address: 00:1B:44:11:3A:B7 (Cisco Systems)', delay: 8800 },
      { text: 'Device type: router', delay: 9600 },
      { text: 'OS: Linux 3.2 - 4.9', delay: 10400 },
      { text: '', delay: 11000 },
      { text: 'Nmap done: 256 IP addresses (12 hosts up) scanned in 23.47 seconds', delay: 11800 },
      { text: '', delay: 12200 },
      { text: '✨ Scan complete. Terminal now interactive.', delay: 12600 },
      { text: '💡 Type "help" to explore security commands.', delay: 13200 },
    ];
    
    let timeouts: number[] = [];
    
    terminalLines.forEach((line, index) => {
      const timeout = window.setTimeout(() => {
        if (terminalRef.current) {
          const element = document.createElement('div');
          element.className = 'text-xs md:text-sm font-mono mb-1 opacity-0 transition-opacity duration-500';
          
          if (line.text.trim() === '') {
            element.innerHTML = '&nbsp;';
          } else if (line.text.startsWith('$')) {
            element.className += ' text-yellow';
            element.innerHTML = line.text;
          } else if (line.text.includes('✨') || line.text.includes('💡')) {
            element.className += ' text-cyan';
            element.innerHTML = line.text;
          } else {
            element.innerHTML = line.text;
          }
          
          terminalRef.current.appendChild(element);
          
          // Trigger fade in
          setTimeout(() => {
            element.classList.add('opacity-100');
          }, 100);

          // Scroll to bottom
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;

          // Mark completion and enable interactivity
          if (index === terminalLines.length - 1) {
            setTimeout(() => {
              setTerminalComplete(true);
              setIsInteractive(true);
            }, 1000);
          }
        }
      }, line.delay);
      timeouts.push(timeout);
    });
    
    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Focus input when terminal becomes interactive
  useEffect(() => {
    if (isInteractive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInteractive]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  // Subtle floating animation
  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      id="hero" 
      className={`min-h-screen pt-24 pb-12 flex items-center relative overflow-hidden ${
        darkMode ? 'text-gray' : 'text-navy'
      }`}
      ref={ref}
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(${darkMode ? '#00ffff' : '#1e3a8a'} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? '#00ffff' : '#1e3a8a'} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div 
            className="lg:col-span-7 order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div className="mb-8" variants={itemVariants}>
              <motion.div
                className="flex items-center mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="inline-block py-2 px-4 rounded-full text-xs font-mono bg-opacity-20 border border-cyan text-cyan backdrop-blur-sm">
                  CYBERSECURITY SPECIALIST
                </span>
              </motion.div>
              
              <motion.h1 
                className={`text-3xl md:text-4xl lg:text-6xl font-orbitron font-bold mb-6 ${
                  darkMode ? 'text-white' : 'text-navy'
                } leading-tight`}
                variants={itemVariants}
              >
                Secure. Compliant. Resilient. <br />
                <motion.span 
                  className="text-cyan relative inline-block"
                  initial={{ backgroundSize: '0% 100%' }}
                  animate={inView ? { backgroundSize: '100% 100%' } : { backgroundSize: '0% 100%' }}
                  transition={{ delay: 1.5, duration: 1 }}
                  style={{
                    backgroundImage: 'linear-gradient(90deg, rgba(0, 255, 255, 0.2), rgba(0, 255, 255, 0.1))',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left center',
                  }}
                >
                Protecting your digital infrastructure from threats — before they happen
                </motion.span> <br />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 2, duration: 0.8 }}
                >
                I help businesses safeguard their networks, systems, and sensitive data through end-to-end security services — <span className="text-yellow"> <br /> <i>from threat detection and vulnerability assessments to compliance audits and real-time monitoring.</i></span>.
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-base md:text-lg mb-8 max-w-2xl leading-relaxed"
                variants={itemVariants}
              >
                Specialized in <span className="text-cyan font-semibold">SOC operations</span>, 
                <span className="text-yellow font-semibold"> network security</span>, and 
                <span className="text-cyan font-semibold"> threat intelligence</span>. 
                Defending digital frontiers with expertise and precision.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.a 
                href="/workflow"
                className="group relative overflow-hidden rounded-md py-2.5 px-5 bg-yellow text-navy font-mono text-sm flex items-center justify-center transition-all duration-300"
                whileHover={{ y: -2 }} 
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <span className="relative z-10 flex items-center">
                  <Workflow className="w-4 h-4 mr-2" />
                  <span>Security Workflow</span>
                </span>
                <span className="absolute inset-0 w-0 bg-cyan group-hover:w-full transition-all duration-500 ease-out"></span>
              </motion.a>
              
               <motion.button 
    onClick={handleDownloadCV}
    className="group relative overflow-hidden rounded-md py-2.5 px-5 bg-cyan text-navy font-mono text-sm flex items-center justify-center transition-all duration-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    variants={itemVariants}
  >
    <span className="relative z-10 flex items-center">
      <FileDown className="w-4 h-4 mr-2" />
      <span>Download CV</span>
    </span>
    <span className="absolute inset-0 w-0 bg-yellow group-hover:w-full transition-all duration-500 ease-out"></span>
  </motion.button>
              
              <motion.a 
                href="#contact" 
                className={`group relative overflow-hidden rounded-md py-2.5 px-5 ${
                  darkMode ? 'bg-navy-light text-gray' : 'bg-gray-200 text-navy'
                } font-mono text-sm flex items-center justify-center border border-cyan transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <span className="relative z-10">Contact Me</span>
                <span className="absolute inset-0 w-0 bg-cyan opacity-20 group-hover:w-full transition-all duration-500 ease-out"></span>
              </motion.a>
              
              <motion.a 
                href="#" 
                className={`group relative overflow-hidden rounded-md py-2.5 px-5 ${
                  darkMode ? 'bg-transparent text-gray' : 'bg-transparent text-navy'
                } border border-gray font-mono text-sm flex items-center justify-center transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <span className="relative z-10 flex items-center">
                  <Github className="w-4 h-4 mr-2" />
                  <span>GitHub</span>
                </span>
                <span className="absolute inset-0 w-0 bg-gray opacity-20 group-hover:w-full transition-all duration-500 ease-out"></span>
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 50, rotateY: -15 }}
            transition={{ duration: 1, delay: 0.3 }}
            variants={floatingVariants}
          >
            <motion.div 
              className={`relative w-full max-w-md rounded-lg overflow-hidden ${
                darkMode ? 'bg-navy-light' : 'bg-gray-100'
              } shadow-xl border border-cyan`}
              whileHover={{ scale: 1.02 }}
              onClick={() => isInteractive && inputRef.current?.focus()}
            >
              {/* Terminal header */}
              <div className={`px-4 py-2 flex items-center ${
                darkMode ? 'bg-navy-dark' : 'bg-gray-200'
              } border-b border-gray-700`}>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-xs font-mono text-gray-400">cybersec@defense-station</div>
                {isInteractive && (
                  <div className="text-xs font-mono text-cyan animate-pulse">LIVE</div>
                )}
              </div>
              
              {/* Terminal content - Fixed height container */}
              <div className="relative h-80 flex flex-col">
                <div 
                  className="flex-1 p-4 font-mono overflow-y-auto"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: darkMode ? '#00ffff #1a1a2e' : '#1e3a8a #f3f4f6'
                  }}
                  ref={terminalRef}
                >
                  {/* Terminal output will be injected here */}
                </div>
                
                {/* Interactive input - Always visible at bottom */}
                {isInteractive && (
                  <div className={`flex-shrink-0 p-4 ${
                    darkMode ? 'bg-navy-light' : 'bg-gray-100'
                  } border-t border-gray-700`}>
                    <div className="flex items-center text-sm font-mono">
                      <span className="text-yellow mr-2 flex-shrink-0">cybersec@defense-station:~$</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={currentCommand}
                        onChange={(e) => setCurrentCommand(e.target.value)}
                        onKeyDown={handleKeyPress}
                        disabled={isTyping}
                        className="flex-1 bg-transparent outline-none text-gray-300 placeholder-gray-500 min-w-0"
                        placeholder={isTyping ? "Processing..." : "Type 'help' for commands"}
                        autoComplete="off"
                        spellCheck="false"
                      />
                      {isTyping && (
                        <div className="text-cyan text-xs animate-pulse flex-shrink-0 ml-2">●</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;