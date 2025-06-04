import React, { useContext } from 'react';
import { Github, Twitter, Linkedin, Shield } from 'lucide-react';
import ThemeContext from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <footer className={`py-12 ${darkMode ? 'bg-navy-dark text-gray' : 'bg-gray-100 text-navy'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Shield className="w-6 h-6 text-cyan mr-2" />
            <span className="font-orbitron text-lg">
              SECURE<span className="text-cyan">DEV</span>
            </span>
          </div>
          
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a 
              href="#" 
              className={`hover:text-cyan transition-colors duration-300`}
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="#" 
              className={`hover:text-cyan transition-colors duration-300`}
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="#" 
              className={`hover:text-cyan transition-colors duration-300`}
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
          
          <div className="text-sm opacity-75 text-center md:text-right">
            <p>© {new Date().getFullYear()} SecureDev. All rights secured.</p>
            <p className="mt-1 text-xs font-mono">
              //: Last security audit: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;