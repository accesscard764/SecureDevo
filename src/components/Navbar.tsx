import React, { useState, useContext, useEffect } from 'react';
import { Menu, X, Shield, Sun, Moon } from 'lucide-react';
import ThemeContext from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Projects', href: '#projects' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'SOC Simulation', href: '#simulation' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
        scrolled 
          ? darkMode 
            ? 'bg-navy/80 backdrop-blur-md shadow-lg' 
            : 'bg-white/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#hero" className="flex items-center group shrink-0">
            <Shield className={`w-8 h-8 ${darkMode ? 'text-cyan' : 'text-navy'} group-hover:text-yellow transition-colors duration-300`} />
            <span className={`ml-2 font-orbitron text-xl font-bold ${darkMode ? 'text-white' : 'text-navy'}`}>
              SECURE<span className="text-cyan">DEVO</span>
            </span>
          </a>
          
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                className={`font-mono text-sm ${
                  darkMode ? 'text-gray hover:text-cyan' : 'text-navy hover:text-cyan'
                } transition-colors duration-300 relative group whitespace-nowrap`}
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            
            <button 
              onClick={toggleTheme} 
              className={`p-2 rounded-full ${
                darkMode ? 'bg-navy text-yellow hover:bg-navy-light' : 'bg-gray-200 text-navy hover:bg-gray-300'
              } transition-colors duration-300`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <a 
              href="#contact" 
              className={`py-2 px-4 rounded ${
                darkMode 
                  ? 'bg-cyan text-navy hover:bg-cyan/80' 
                  : 'bg-navy text-white hover:bg-navy/80'
              } transition-all duration-300 font-mono text-sm relative overflow-hidden group whitespace-nowrap`}
            >
              <span className="relative z-10">SECURE.CONNECT()</span>
              <span className="absolute inset-0 w-0 bg-yellow group-hover:w-full transition-all duration-500 ease-out"></span>
            </a>
          </div>
          
          <button 
            onClick={toggleMenu}
            className="lg:hidden text-gray hover:text-cyan transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } ${darkMode ? 'bg-navy-light' : 'bg-gray-100'}`}
      >
        <div className="px-4 py-2">
          <div className="flex flex-col space-y-4 py-4">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`font-mono text-sm px-2 py-1 ${
                  darkMode ? 'text-gray hover:text-cyan' : 'text-navy hover:text-cyan'
                } transition-colors duration-300`}
              >
                {item.name}
              </a>
            ))}
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <button 
                onClick={toggleTheme} 
                className={`p-2 rounded-full ${
                  darkMode ? 'bg-navy text-yellow hover:bg-navy-light' : 'bg-gray-200 text-navy hover:bg-gray-300'
                } transition-colors duration-300 flex items-center`}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                <span className="ml-2 text-sm">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
              
              <a 
                href="#contact" 
                onClick={() => setIsOpen(false)}
                className={`py-2 px-4 rounded ${
                  darkMode 
                    ? 'bg-cyan text-navy hover:bg-cyan/80' 
                    : 'bg-navy text-white hover:bg-navy/80'
                } transition-all duration-300 font-mono text-sm`}
              >
                SECURE.CONNECT()
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;