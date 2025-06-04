import React, { useContext, useState, useEffect } from 'react';
import { Shield, AlertTriangle, Lock, UserX, Database, Server, Network, FileWarning, ChevronDown, ChevronUp, ExternalLink, Terminal, Activity } from 'lucide-react';
import ThemeContext from '../../contexts/ThemeContext';

interface SecurityCase {
  id: number;
  title: string;
  status: string;
  icon: JSX.Element;
  problem: string;
  solution: string;
  approach: string[];
  tools: string[];
  timeline: string;
  metrics: {
    label: string;
    value: string;
    improvement: string;
  }[];
}

const SecuritySolutions: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);
  const [expandedCase, setExpandedCase] = useState<number | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('enterprise');
  const [activeMetric, setActiveMetric] = useState<number | null>(null);

  useEffect(() => {
    if (expandedCase !== null) {
      const timer = setTimeout(() => {
        setActiveMetric(0);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setActiveMetric(null);
    }
  }, [expandedCase]);

  const securityCases: Record<string, SecurityCase[]> = {
    enterprise: [
      {
        id: 1,
        title: "Advanced Persistent Threat Detection",
        status: "Active Defense",
        icon: <Shield className="w-6 h-6 text-cyan" />,
        problem: "Sophisticated actors maintaining long-term unauthorized access to network infrastructure",
        solution: "Implementation of comprehensive threat hunting program with ML-powered anomaly detection",
        approach: [
          "Continuous network monitoring and behavioral analysis",
          "Advanced endpoint detection and response (EDR)",
          "Threat intelligence integration",
          "Automated response playbooks"
        ],
        tools: ["Splunk Enterprise", "CrowdStrike", "Elastic Security", "MISP"],
        timeline: "90 days for full implementation",
        metrics: [
          {
            label: "Detection Time",
            value: "< 30 minutes",
            improvement: "↓ 85%"
          },
          {
            label: "False Positives",
            value: "< 5%",
            improvement: "↓ 75%"
          }
        ]
      },
      {
        id: 2,
        title: "Zero Trust Architecture Implementation",
        status: "Active Defense",
        icon: <Lock className="w-6 h-6 text-cyan" />,
        problem: "Traditional perimeter-based security failing to protect modern hybrid infrastructure",
        solution: "Zero Trust security model with continuous verification and least privilege access",
        approach: [
          "Identity-based access control",
          "Micro-segmentation",
          "Real-time access policy enforcement",
          "Continuous authentication"
        ],
        tools: ["Okta", "Palo Alto Networks", "Microsoft Azure AD", "HashiCorp Vault"],
        timeline: "120 days phased rollout",
        metrics: [
          {
            label: "Security Incidents",
            value: "↓ 60%",
            improvement: "Year over Year"
          },
          {
            label: "Access Control",
            value: "100%",
            improvement: "Visibility"
          }
        ]
      }
    ],
    startup: [
      {
        id: 3,
        title: "Rapid Security Scale-Up",
        status: "Active Defense",
        icon: <Network className="w-6 h-6 text-cyan" />,
        problem: "Fast-growing infrastructure without matching security controls",
        solution: "Automated security infrastructure that scales with your business",
        approach: [
          "Cloud-native security architecture",
          "DevSecOps integration",
          "Automated compliance checks",
          "Security as Code implementation"
        ],
        tools: ["AWS Security Hub", "Terraform", "GitLab CI/CD", "Snyk"],
        timeline: "45 days to initial deployment",
        metrics: [
          {
            label: "Deployment Time",
            value: "↓ 70%",
            improvement: "Automation"
          },
          {
            label: "Coverage",
            value: "100%",
            improvement: "Infrastructure"
          }
        ]
      }
    ],
    government: [
      {
        id: 4,
        title: "Compliance-First Security Program",
        status: "Active Defense",
        icon: <FileWarning className="w-6 h-6 text-cyan" />,
        problem: "Complex regulatory requirements with strict audit needs",
        solution: "Comprehensive compliance program with automated controls and reporting",
        approach: [
          "Regulatory mapping and gap analysis",
          "Automated compliance monitoring",
          "Continuous control validation",
          "Real-time audit readiness"
        ],
        tools: ["Nessus", "Qualys", "ServiceNow GRC", "Archer"],
        timeline: "180 days for full compliance",
        metrics: [
          {
            label: "Audit Preparation",
            value: "↓ 80%",
            improvement: "Time Saved"
          },
          {
            label: "Compliance",
            value: "100%",
            improvement: "NIST 800-53"
          }
        ]
      }
    ]
  };

  const industries = [
    { id: 'enterprise', label: 'Enterprise' },
    { id: 'startup', label: 'Startup' },
    { id: 'government', label: 'Government' }
  ];

  const toggleCase = (id: number) => {
    setExpandedCase(expandedCase === id ? null : id);
  };

  return (
    <section
      id="solutions"
      className={`py-20 ${darkMode ? 'bg-navy text-gray' : 'bg-white text-navy'}`}
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-mono mb-4 bg-opacity-20 border border-cyan text-cyan">
            SECURITY SOLUTIONS
          </span>
          <h2 className={`text-3xl md:text-4xl font-orbitron font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-navy'
          }`}>
            How I <span className="text-cyan">Secure</span> Your Business
          </h2>
          <div className="w-24 h-1 bg-yellow mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-base opacity-80">
            Select your industry to see tailored security solutions and real-world case studies.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className={`inline-flex rounded-lg p-1 ${
            darkMode ? 'bg-navy-light' : 'bg-gray-100'
          }`}>
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id)}
                className={`px-6 py-2 rounded-md text-sm font-mono transition-all duration-300 relative overflow-hidden ${
                  selectedIndustry === industry.id
                    ? 'bg-cyan text-navy shadow-lg'
                    : darkMode
                      ? 'text-gray hover:text-white'
                      : 'text-navy hover:text-cyan'
                }`}
              >
                <span className="relative z-10">{industry.label}</span>
                {selectedIndustry === industry.id && (
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan via-yellow to-cyan opacity-20 animate-shimmer"></span>
                )}
              </button>
            ))}
          </div>

          <div className={`flex items-center gap-4 text-sm ${
            darkMode ? 'text-gray' : 'text-navy'
          }`}>
            <div className="flex items-center">
              <Terminal className="w-4 h-4 text-cyan mr-2" />
              <span className="font-mono">Active Monitoring</span>
            </div>
            <div className="flex items-center">
              <Activity className="w-4 h-4 text-yellow mr-2" />
              <span className="font-mono">Real-time Protection</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {securityCases[selectedIndustry]?.map((case_) => (
            <div
              key={case_.id}
              className={`rounded-lg border transition-all duration-300 ${
                expandedCase === case_.id
                  ? `scale-100 ${darkMode ? 'border-cyan shadow-glow' : 'border-cyan shadow-lg'}`
                  : darkMode 
                    ? 'border-gray-700 hover:border-cyan' 
                    : 'border-gray-200 hover:border-cyan'
              } ${darkMode ? 'bg-navy-light' : 'bg-white'}`}
            >
              <button
                onClick={() => toggleCase(case_.id)}
                className="w-full p-6 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg relative ${
                      darkMode ? 'bg-navy' : 'bg-gray-100'
                    }`}>
                      {case_.icon}
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`text-xl font-bold ${
                          darkMode ? 'text-white' : 'text-navy'
                        }`}>
                          {case_.title}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          darkMode ? 'bg-navy text-cyan' : 'bg-gray-100 text-navy'
                        }`}>
                          {case_.status}
                        </span>
                      </div>
                      <p className="text-sm opacity-80">{case_.problem}</p>
                    </div>
                  </div>
                  {expandedCase === case_.id ? (
                    <ChevronUp className="w-5 h-5 text-cyan" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-cyan" />
                  )}
                </div>
              </button>

              {expandedCase === case_.id && (
                <div className={`p-6 border-t ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                } animate-fadeIn`}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-cyan font-mono text-sm mb-3">Solution</h4>
                      <p className="mb-6">{case_.solution}</p>

                      <h4 className="text-cyan font-mono text-sm mb-3">Approach</h4>
                      <ul className="space-y-2 mb-6">
                        {case_.approach.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <span className={`inline-block w-6 h-6 rounded-full ${
                              darkMode ? 'bg-navy' : 'bg-gray-100'
                            } flex items-center justify-center mr-3 mt-0.5`}>
                              <Shield className="w-3 h-3 text-cyan" />
                            </span>
                            {step}
                          </li>
                        ))}
                      </ul>

                      <h4 className="text-cyan font-mono text-sm mb-3">Tools & Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {case_.tools.map((tool, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 rounded-full text-xs ${
                              darkMode
                                ? 'bg-navy text-cyan'
                                : 'bg-gray-100 text-navy'
                            }`}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className={`p-6 rounded-lg ${
                        darkMode ? 'bg-navy' : 'bg-gray-100'
                      }`}>
                        <h4 className="text-cyan font-mono text-sm mb-4">Implementation Metrics</h4>
                        
                        <div className="space-y-4">
                          {case_.metrics.map((metric, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-sm opacity-80">{metric.label}</span>
                              <div className="text-right">
                                <span className={`text-lg font-bold ${
                                  darkMode ? 'text-white' : 'text-navy'
                                }`}>
                                  {metric.value}
                                </span>
                                <span className="block text-xs text-green-400">
                                  {metric.improvement}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className={`mt-6 pt-6 border-t ${
                          darkMode ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-mono">Implementation Timeline</span>
                            <span className={`text-lg font-bold ${
                              darkMode ? 'text-white' : 'text-navy'
                            }`}>
                              {case_.timeline}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <a
                          href="#contact"
                          className="group relative overflow-hidden rounded-lg w-full py-3 bg-cyan text-navy font-mono flex items-center justify-center transition-all duration-300"
                        >
                          <span className="relative z-10 flex items-center">
                            <Lock className="w-5 h-5 mr-2" />
                            <span>Implement This Solution</span>
                          </span>
                          <span className="absolute inset-0 w-0 bg-yellow group-hover:w-full transition-all duration-500 ease-out"></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className={`text-sm font-mono ${darkMode ? 'text-gray' : 'text-navy'}`}>
            All solutions include 24/7 monitoring and incident response
          </p>
        </div>
      </div>
    </section>
  );
};

export default SecuritySolutions;