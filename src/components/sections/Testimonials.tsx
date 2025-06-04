import React, { useContext, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';
import ThemeContext from '../../contexts/ThemeContext';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  text: string;
  clearance: string;
}

const Testimonials: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CISO',
      company: 'FinSecure Banking',
      text: 'An exceptional security professional who consistently goes above and beyond. Their implementation of our SOC reduced detection time by 80% and significantly improved our security posture.',
      clearance: 'Trusted Advisor'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Director of Security',
      company: 'TechSafe Solutions',
      text: 'Their expertise in cybersecurity is unmatched. They identified critical vulnerabilities in our application that had been overlooked and provided practical, cost-effective remediation strategies.',
      clearance: 'Top Collaborator'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'VP of IT',
      company: 'HealthSecure Systems',
      text: 'Working with them transformed our security approach. Their deep knowledge of healthcare compliance requirements and cybersecurity best practices was invaluable in securing our patient data systems.',
      clearance: 'Security Partner'
    }
  ];
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      className={`py-20 ${darkMode ? 'bg-navy-light text-gray' : 'bg-gray-50 text-navy'}`}
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-mono mb-4 bg-opacity-20 border border-cyan text-cyan">
            ENDORSEMENTS
          </span>
          <h2 className={`text-3xl md:text-4xl font-orbitron font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-navy'
          }`}>
            Security <span className="text-cyan">Clearances</span>
          </h2>
          <div className="w-24 h-1 bg-yellow mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`transition-all duration-500 transform 
                  ${activeIndex === index 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 absolute top-0 left-0 right-0 translate-x-8'
                  }`}
              >
                <div className={`p-8 relative rounded-lg ${
                  darkMode ? 'bg-navy border border-gray-700' : 'bg-white border border-gray-200'
                } shadow-lg`}>
                  <div className="absolute -top-4 -left-4">
                    <Quote className={`w-8 h-8 ${
                      darkMode ? 'text-cyan' : 'text-navy'
                    }`} />
                  </div>
                  
                  <div className="mb-6">
                    <p className="italic text-lg mb-4">{testimonial.text}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        darkMode ? 'bg-navy-dark' : 'bg-gray-100'
                      }`}>
                        <User className="w-6 h-6 text-cyan" />
                      </div>
                      <div className="ml-4">
                        <h4 className={`font-bold ${
                          darkMode ? 'text-white' : 'text-navy'
                        }`}>
                          {testimonial.name}
                        </h4>
                        <p className="text-sm opacity-80">{testimonial.position}, {testimonial.company}</p>
                      </div>
                    </div>
                    
                    <div className={`py-1 px-3 rounded-full text-xs font-mono border ${
                      darkMode 
                        ? 'border-cyan text-cyan' 
                        : 'border-navy text-navy'
                    }`}>
                      {testimonial.clearance}
                    </div>
                  </div>
                  
                  {/* Badge shimmer effect */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan/10 to-transparent -translate-x-full animate-shimmer"></div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-center mt-8 space-x-4">
              <button 
                onClick={prevTestimonial}
                className={`p-2 rounded-full ${
                  darkMode 
                    ? 'bg-navy text-cyan hover:bg-navy-dark' 
                    : 'bg-gray-200 text-navy hover:bg-gray-300'
                } transition-colors duration-300`}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex space-x-2 items-center">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? 'w-6 bg-cyan'
                        : darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonial}
                className={`p-2 rounded-full ${
                  darkMode 
                    ? 'bg-navy text-cyan hover:bg-navy-dark' 
                    : 'bg-gray-200 text-navy hover:bg-gray-300'
                } transition-colors duration-300`}
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;