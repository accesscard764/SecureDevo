import React, { useContext } from 'react';
import { Shield, Server, Code, Wifi } from 'lucide-react';
import ThemeContext from '../../contexts/ThemeContext';

const About: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);
  
  const timelineEvents = [
    {
      year: '2023',
      role: 'Senior Security Analyst',
      company: 'CyberDefend Solutions',
      description: 'Leading SOC operations and incident response for enterprise clients.',
      icon: <Shield className="w-5 h-5 text-cyan" />,
    },
    {
      year: '2021',
      role: 'Network Security Engineer',
      company: 'SecureNet Technologies',
      description: 'Implemented advanced network security protocols and monitoring systems.',
      icon: <Wifi className="w-5 h-5 text-cyan" />,
    },
    {
      year: '2019',
      role: 'Cybersecurity Analyst',
      company: 'DataGuard Inc.',
      description: 'Conducted vulnerability assessments and security audits for clients.',
      icon: <Server className="w-5 h-5 text-cyan" />,
    },
    {
      year: '2017',
      role: 'Security Developer',
      company: 'CodeSecure',
      description: 'Developed secure applications with a focus on encryption and authentication.',
      icon: <Code className="w-5 h-5 text-cyan" />,
    },
  ];

  return (
    <section 
      id="about" 
      className={`py-20 ${darkMode ? 'bg-navy-light text-gray' : 'bg-gray-50 text-navy'}`}
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-mono mb-4 bg-opacity-20 border border-cyan text-cyan">
            ABOUT ME
          </span>
          <h2 className={`text-3xl md:text-4xl font-orbitron font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-navy'
          }`}>
            The Security <span className="text-cyan">Mindset</span>
          </h2>
          <div className="w-24 h-1 bg-yellow mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className={`p-6 rounded-lg border ${
              darkMode ? 'border-gray-700 bg-navy' : 'border-gray-200 bg-white'
            } mb-8`}>
              <p className="text-lg mb-4">
                I'm a cybersecurity specialist with over 6 years of experience protecting organizations from evolving digital threats. My expertise spans:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className={`inline-block w-6 h-6 rounded-full ${
                    darkMode ? 'bg-navy-light' : 'bg-gray-100'
                  } flex items-center justify-center mr-3 mt-0.5`}>
                    <Shield className="w-3 h-3 text-cyan" />
                  </span>
                  <span>SOC operations and incident response</span>
                </li>
                <li className="flex items-start">
                  <span className={`inline-block w-6 h-6 rounded-full ${
                    darkMode ? 'bg-navy-light' : 'bg-gray-100'
                  } flex items-center justify-center mr-3 mt-0.5`}>
                    <Wifi className="w-3 h-3 text-cyan" />
                  </span>
                  <span>Network security architecture</span>
                </li>
                <li className="flex items-start">
                  <span className={`inline-block w-6 h-6 rounded-full ${
                    darkMode ? 'bg-navy-light' : 'bg-gray-100'
                  } flex items-center justify-center mr-3 mt-0.5`}>
                    <Server className="w-3 h-3 text-cyan" />
                  </span>
                  <span>Vulnerability assessment & penetration testing</span>
                </li>
                <li className="flex items-start">
                  <span className={`inline-block w-6 h-6 rounded-full ${
                    darkMode ? 'bg-navy-light' : 'bg-gray-100'
                  } flex items-center justify-center mr-3 mt-0.5`}>
                    <Code className="w-3 h-3 text-cyan" />
                  </span>
                  <span>Secure development practices</span>
                </li>
              </ul>
            </div>
            
            <p className="text-base opacity-80 font-mono">
              "Security is not just about prevention; it's about resilience, awareness, and continuous adaptation to evolving threats."
            </p>
          </div>
          
          <div>
            <h3 className={`text-xl md:text-2xl font-orbitron font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-navy'
            }`}>
              Professional Timeline
            </h3>
            
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-cyan"></div>
              
              <div className="space-y-10">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="relative flex">
                    <div className="absolute left-8 -translate-x-1/2 w-7 h-7 rounded-full bg-cyan flex items-center justify-center z-10">
                      {event.icon}
                    </div>
                    
                    <div className="ml-16">
                      <div className="flex items-baseline">
                        <span className="text-xs font-mono text-cyan mr-2">{event.year}</span>
                        <h4 className={`text-lg font-bold ${
                          darkMode ? 'text-white' : 'text-navy'
                        }`}>
                          {event.role}
                        </h4>
                      </div>
                      <p className="text-cyan font-mono text-sm mb-1">{event.company}</p>
                      <p className="text-sm opacity-80">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;