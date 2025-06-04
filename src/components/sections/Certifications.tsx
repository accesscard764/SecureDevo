import React, { useContext } from 'react';
import { Shield, Award, Clock, ExternalLink } from 'lucide-react';
import ThemeContext from '../../contexts/ThemeContext';

const Certifications: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);

  const certifications = [
    {
      name: 'Certified Information Systems Security Professional (CISSP)',
      provider: 'ISC²',
      date: 'June 2022',
      status: 'Active',
      icon: <Shield className="w-10 h-10 text-cyan" />,
    },
    {
      name: 'Certified Ethical Hacker (CEH)',
      provider: 'EC-Council',
      date: 'March 2021',
      status: 'Active',
      icon: <Shield className="w-10 h-10 text-cyan" />,
    },
    {
      name: 'CompTIA Security+',
      provider: 'CompTIA',
      date: 'November 2019',
      status: 'Active',
      icon: <Shield className="w-10 h-10 text-cyan" />,
    },
    {
      name: 'Offensive Security Certified Professional (OSCP)',
      provider: 'Offensive Security',
      date: 'August 2020',
      status: 'Active',
      icon: <Shield className="w-10 h-10 text-cyan" />,
    },
    {
      name: 'Certified Information Security Manager (CISM)',
      provider: 'ISACA',
      date: 'January 2023',
      status: 'Active',
      icon: <Shield className="w-10 h-10 text-cyan" />,
    },
    {
      name: 'AWS Certified Security – Specialty',
      provider: 'Amazon Web Services',
      date: 'In Progress',
      status: 'Pending',
      icon: <Clock className="w-10 h-10 text-yellow" />,
    },
  ];

  return (
    <section
      id="certifications"
      className={`py-20 ${darkMode ? 'bg-navy text-gray' : 'bg-white text-navy'}`}
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-mono mb-4 bg-opacity-20 border border-cyan text-cyan">
            CREDENTIALS
          </span>
          <h2 className={`text-3xl md:text-4xl font-orbitron font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-navy'
          }`}>
            Security <span className="text-cyan">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-yellow mx-auto"></div>
        </div>

        <div className={`mb-12 p-6 rounded-lg ${
          darkMode ? 'bg-navy-light border border-gray-700' : 'bg-gray-50 border border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-mono">
              <span className="text-cyan">$</span> certification_dashboard
            </h3>
            <div className="flex space-x-3">
              <div className={`px-3 py-1 rounded text-xs ${
                darkMode ? 'bg-navy text-green-400' : 'bg-white text-green-600'
              }`}>
                5 Active
              </div>
              <div className={`px-3 py-1 rounded text-xs ${
                darkMode ? 'bg-navy text-yellow' : 'bg-white text-yellow-600'
              }`}>
                1 Pending
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className={`group relative p-5 rounded-lg border overflow-hidden transition-all duration-300 transform hover:-translate-y-1 ${
                  darkMode 
                    ? 'bg-navy border-gray-700 hover:border-cyan' 
                    : 'bg-white border-gray-200 hover:border-cyan'
                } hover:shadow-lg`}
              >
                <div className="flex items-start mb-4">
                  <div className="mr-4">{cert.icon}</div>
                  <div>
                    <span className={`text-xs font-mono ${
                      cert.status === 'Active' ? 'text-green-400' : 'text-yellow'
                    } mb-1 block`}>
                      {cert.status}
                    </span>
                    <h4 className={`font-bold text-base ${
                      darkMode ? 'text-white' : 'text-navy'
                    }`}>
                      {cert.name}
                    </h4>
                    <p className="text-sm opacity-70 mt-1">{cert.provider}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono opacity-70">{cert.date}</span>
                  <button 
                    className={`opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center ${
                      darkMode ? 'text-cyan' : 'text-navy'
                    }`}
                  >
                    View details
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </button>
                </div>
                
                {/* Lock animation overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <span className={`text-sm ${darkMode ? 'text-gray' : 'text-navy'}`}>
            Looking for more details about my certifications?
          </span>
          <a 
            href="#" 
            className="group relative overflow-hidden rounded-md py-2 px-4 bg-cyan text-navy font-mono flex items-center justify-center transition-all duration-300"
          >
            <span className="relative z-10 flex items-center">
              <Award className="w-4 h-4 mr-2" />
              <span>Full Credential Verification</span>
            </span>
            <span className="absolute inset-0 w-0 bg-yellow group-hover:w-full transition-all duration-500 ease-out"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Certifications;