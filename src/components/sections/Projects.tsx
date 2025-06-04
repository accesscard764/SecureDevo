import React, { useContext, useState } from 'react';
import { Shield, Lock, Unlock, Code, ExternalLink } from 'lucide-react';
import ThemeContext from '../../contexts/ThemeContext';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  challenges: string[];
  image: string;
  link: string;
}

const Projects: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);
  const [openProject, setOpenProject] = useState<number | null>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'Enterprise SOC Implementation',
      description: 'Designed and implemented a comprehensive Security Operations Center for a financial institution, including log management, SIEM configuration, and custom alert rules.',
      technologies: ['Splunk', 'ELK Stack', 'Python', 'PowerShell'],
      challenges: ['Data normalization', 'Alert noise reduction', 'Automated response workflows'],
      image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '#'
    },
    {
      id: 2,
      title: 'Secure Web Application Framework',
      description: 'Developed a security-focused web application framework with built-in protections against common vulnerabilities like XSS, CSRF, and SQL injection.',
      technologies: ['Node.js', 'Express', 'TypeScript', 'MySQL'],
      challenges: ['Input sanitization', 'Session management', 'CSP implementation'],
      image: 'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '#'
    },
    {
      id: 3,
      title: 'Network Intrusion Detection System',
      description: 'Built a custom network IDS using machine learning to detect anomalous traffic patterns and potential security breaches.',
      technologies: ['Python', 'TensorFlow', 'Wireshark', 'Linux'],
      challenges: ['Feature engineering', 'False positive reduction', 'Real-time processing'],
      image: 'https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '#'
    }
  ];

  const toggleProject = (id: number) => {
    setOpenProject(openProject === id ? null : id);
  };

  return (
    <section
      id="projects"
      className={`py-20 ${darkMode ? 'bg-navy-light text-gray' : 'bg-gray-50 text-navy'}`}
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-mono mb-4 bg-opacity-20 border border-cyan text-cyan">
            SECURITY PROJECTS
          </span>
          <h2 className={`text-3xl md:text-4xl font-orbitron font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-navy'
          }`}>
            Secure <span className="text-cyan">Case Files</span>
          </h2>
          <div className="w-24 h-1 bg-yellow mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className={`group relative overflow-hidden rounded-lg border transition-all duration-500 ${
                openProject === project.id
                  ? `scale-100 ${darkMode ? 'border-cyan' : 'border-cyan shadow-lg'}`
                  : darkMode 
                    ? 'border-gray-700 hover:border-cyan' 
                    : 'border-gray-200 hover:border-cyan'
              } ${
                darkMode ? 'bg-navy' : 'bg-white'
              }`}
            >
              <div 
                className={`h-48 overflow-hidden relative ${
                  openProject === project.id ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                } transition-opacity duration-300`}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className={`font-bold text-lg ${
                    darkMode ? 'text-white' : 'text-navy'
                  }`}>
                    {project.title}
                  </h3>
                  <button 
                    onClick={() => toggleProject(project.id)}
                    className={`p-2 rounded-full ${
                      openProject === project.id
                        ? 'bg-cyan text-navy'
                        : darkMode 
                          ? 'bg-navy-light text-cyan hover:bg-cyan hover:text-navy' 
                          : 'bg-gray-100 text-navy hover:bg-cyan hover:text-navy'
                    } transition-colors duration-300`}
                    aria-label={openProject === project.id ? "Close project" : "Open project"}
                  >
                    {openProject === project.id ? <Lock size={18} /> : <Unlock size={18} />}
                  </button>
                </div>
                
                <div className="mb-4">
                  <p className={`text-sm ${openProject === project.id ? 'line-clamp-none' : 'line-clamp-2'}`}>
                    {project.description}
                  </p>
                </div>
                
                {openProject === project.id && (
                  <div className="animate-fadeIn">
                    <div className="mb-4">
                      <h4 className="text-sm font-mono text-cyan mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className={`text-xs px-2 py-1 rounded ${
                              darkMode ? 'bg-navy-dark text-gray' : 'bg-gray-100 text-navy'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-mono text-cyan mb-2">Security Challenges</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 pl-2">
                        {project.challenges.map((challenge, index) => (
                          <li key={index}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <a 
                      href={project.link}
                      className="flex items-center justify-center w-full py-2 mt-2 rounded text-sm font-mono bg-cyan text-navy hover:bg-yellow transition-colors duration-300"
                    >
                      <Code size={16} className="mr-2" />
                      View Project Details
                    </a>
                  </div>
                )}
                
                {openProject !== project.id && (
                  <a 
                    href={project.link}
                    className={`flex items-center text-xs ${
                      darkMode ? 'text-cyan' : 'text-navy'
                    } hover:text-cyan transition-colors duration-300`}
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Details
                  </a>
                )}
              </div>
              
              {/* Lock/unlock animation */}
              <div 
                className={`absolute inset-0 bg-cyan/10 transition-opacity duration-500 ${
                  openProject === project.id ? 'opacity-100' : 'opacity-0'
                } pointer-events-none`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;