import React, { useState, useEffect } from 'react';
import { Router } from './components/Router';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import ThemeContext from './contexts/ThemeContext';

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gradient-to-b from-navy to-black' : 'bg-gradient-to-b from-gray-100 to-white'}`}>
        <Navbar />
        <Router />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;