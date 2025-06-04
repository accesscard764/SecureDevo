import React, { useContext, useState } from 'react';
import { Shield, Send, User, Mail, MessageSquare, Lock, Unlock } from 'lucide-react';
import ThemeContext from '../../contexts/ThemeContext';

const Contact: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);
  const [formStage, setFormStage] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  
  const handleFirstStage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email) {
      setFormStage(2);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !message) return;
    
    setSending(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSending(false);
      setSent(true);
      
      // Reset after showing success message
      setTimeout(() => {
        setFormStage(1);
        setEmail('');
        setName('');
        setMessage('');
        setSent(false);
      }, 5000);
    }, 2000);
  };

  return (
    <section
      id="contact"
      className={`py-20 ${darkMode ? 'bg-navy text-gray' : 'bg-white text-navy'}`}
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-mono mb-4 bg-opacity-20 border border-cyan text-cyan">
            SECURE TRANSMISSION
          </span>
          <h2 className={`text-3xl md:text-4xl font-orbitron font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-navy'
          }`}>
            Contact <span className="text-cyan">Protocol</span>
          </h2>
          <div className="w-24 h-1 bg-yellow mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-base opacity-80">
            Ready to enhance your security posture? Send me a secure message and I'll respond within 24 hours.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className={`rounded-lg overflow-hidden border ${
            darkMode ? 'border-gray-700 bg-navy-light' : 'border-gray-200 bg-white'
          } shadow-lg`}>
            <div className={`p-4 ${
              darkMode ? 'bg-navy-dark' : 'bg-gray-100'
            } border-b border-gray-700 flex items-center justify-between`}>
              <h3 className="font-mono text-lg flex items-center">
                <Shield className="w-5 h-5 text-cyan mr-2" />
                <span className={darkMode ? 'text-white' : 'text-navy'}>Secure Contact Form</span>
              </h3>
              
              <div className={`py-1 px-3 rounded-full text-xs flex items-center ${
                formStage === 1
                  ? 'bg-yellow/20 text-yellow'
                  : 'bg-green-500/20 text-green-400'
              }`}>
                {formStage === 1 ? (
                  <>
                    <Lock className="w-3 h-3 mr-1" />
                    <span>Stage 1</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-3 h-3 mr-1" />
                    <span>Stage 2</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="p-6">
              {!sent ? (
                formStage === 1 ? (
                  <form onSubmit={handleFirstStage} className="space-y-4">
                    <div className="mb-8 text-center">
                      <p className={`text-sm mb-2 ${
                        darkMode ? 'text-gray' : 'text-navy'
                      }`}>
                        Enter your email to initiate secure communication
                      </p>
                      <div className="w-16 h-1 bg-cyan mx-auto"></div>
                    </div>
                    
                    <div className="relative">
                      <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                        darkMode ? 'text-gray' : 'text-navy'
                      }`}>
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={`w-full py-3 pl-10 pr-4 rounded-lg focus:outline-none ${
                          darkMode 
                            ? 'bg-navy border-gray-700 text-white placeholder-gray-600' 
                            : 'bg-gray-50 border-gray-200 text-navy placeholder-gray-400'
                        } border focus:border-cyan transition-colors duration-300`}
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="group relative overflow-hidden rounded-lg w-full py-3 bg-cyan text-navy font-mono flex items-center justify-center transition-all duration-300 transform hover:scale-[1.01]"
                    >
                      <span className="relative z-10 flex items-center">
                        <Unlock className="w-5 h-5 mr-2" />
                        <span>Verify Identity</span>
                      </span>
                      <span className="absolute inset-0 w-0 bg-yellow group-hover:w-full transition-all duration-500 ease-out"></span>
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-8 text-center">
                      <p className={`text-sm mb-2 ${
                        darkMode ? 'text-gray' : 'text-navy'
                      }`}>
                        Identity verified. Complete your message.
                      </p>
                      <div className="w-16 h-1 bg-cyan mx-auto"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="relative">
                        <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                          darkMode ? 'text-gray' : 'text-navy'
                        }`}>
                          <Mail className="w-5 h-5" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          disabled
                          className={`w-full py-3 pl-10 pr-4 rounded-lg focus:outline-none ${
                            darkMode 
                              ? 'bg-navy-dark border-gray-700 text-white placeholder-gray-600' 
                              : 'bg-gray-100 border-gray-200 text-navy placeholder-gray-400'
                          } border focus:border-cyan transition-colors duration-300`}
                        />
                      </div>
                      
                      <div className="relative">
                        <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                          darkMode ? 'text-gray' : 'text-navy'
                        }`}>
                          <User className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className={`w-full py-3 pl-10 pr-4 rounded-lg focus:outline-none ${
                            darkMode 
                              ? 'bg-navy border-gray-700 text-white placeholder-gray-600' 
                              : 'bg-gray-50 border-gray-200 text-navy placeholder-gray-400'
                          } border focus:border-cyan transition-colors duration-300`}
                        />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className={`absolute left-3 top-3 ${
                        darkMode ? 'text-gray' : 'text-navy'
                      }`}>
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <textarea
                        placeholder="Your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={5}
                        className={`w-full py-3 pl-10 pr-4 rounded-lg focus:outline-none ${
                          darkMode 
                            ? 'bg-navy border-gray-700 text-white placeholder-gray-600' 
                            : 'bg-gray-50 border-gray-200 text-navy placeholder-gray-400'
                        } border focus:border-cyan transition-colors duration-300`}
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setFormStage(1)}
                        className={`mr-4 py-3 px-4 rounded-lg ${
                          darkMode 
                            ? 'bg-navy border-gray-700 text-gray' 
                            : 'bg-gray-100 border-gray-200 text-navy'
                        } border hover:bg-opacity-80 transition-colors duration-300`}
                      >
                        Back
                      </button>
                      
                      <button
                        type="submit"
                        disabled={sending}
                        className="group relative overflow-hidden rounded-lg flex-1 py-3 bg-cyan text-navy font-mono flex items-center justify-center transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10 flex items-center">
                          {sending ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>Encrypting message...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              <span>Send Message</span>
                            </>
                          )}
                        </span>
                        <span className="absolute inset-0 w-0 bg-yellow group-hover:w-full transition-all duration-500 ease-out"></span>
                      </button>
                    </div>
                  </form>
                )
              ) : (
                <div className="py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    darkMode ? 'text-white' : 'text-navy'
                  }`}>
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm opacity-80 mb-4">
                    Thank you for your message. I will respond to your inquiry within 24 hours.
                  </p>
                  <div className="w-24 h-1 bg-cyan mx-auto"></div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-12 flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className={`p-5 rounded-lg ${
              darkMode ? 'bg-navy-light border-gray-700' : 'bg-gray-50 border-gray-200'
            } border text-center w-full md:w-1/2`}>
              <Mail className="w-6 h-6 text-cyan mx-auto mb-2" />
              <h4 className={`text-lg font-bold mb-1 ${
                darkMode ? 'text-white' : 'text-navy'
              }`}>
                Email
              </h4>
              <a 
                href="mailto:contact@securedev.com"
                className="text-cyan hover:underline"
              >
                contact@securedev.com
              </a>
            </div>
            
            <div className={`p-5 rounded-lg ${
              darkMode ? 'bg-navy-light border-gray-700' : 'bg-gray-50 border-gray-200'
            } border text-center w-full md:w-1/2`}>
              <Shield className="w-6 h-6 text-cyan mx-auto mb-2" />
              <h4 className={`text-lg font-bold mb-1 ${
                darkMode ? 'text-white' : 'text-navy'
              }`}>
                PGP Key
              </h4>
              <button 
                className="text-cyan hover:underline"
              >
                Download Public Key
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;