import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Node, Edge } from 'reactflow';
import { AlertTriangle, CheckCircle, X, Info, Shield, ExternalLink, BarChart2 } from 'lucide-react';

interface RiskAssessmentProps {
  nodes: Node[];
  edges: Edge[];
  darkMode: boolean;
  onClose: () => void;
}

interface RiskData {
  score: number;
  level: 'Low' | 'Medium' | 'High' | 'Critical';
  color: string;
  gaps: Gap[];
  compliance: {
    hipaa: number;
    pci: number;
    gdpr: number;
    nist: number;
  };
}

interface Gap {
  id: string;
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recommendation: string;
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ nodes, edges, darkMode, onClose }) => {
  const [riskData, setRiskData] = useState<RiskData>({
    score: 0,
    level: 'High',
    color: 'text-red-500',
    gaps: [],
    compliance: {
      hipaa: 0,
      pci: 0,
      gdpr: 0,
      nist: 0
    }
  });

  useEffect(() => {
    // Count components by tier
    const tierCounts: Record<string, number> = {};
    const componentIds = new Set<string>();
    
    nodes.forEach(node => {
      const tier = node.data.component.tier;
      tierCounts[tier] = (tierCounts[tier] || 0) + 1;
      componentIds.add(node.data.component.id);
    });

    // Calculate connection score
    const connectionsRatio = edges.length > 0 ? nodes.length / edges.length : 0;
    const connectionScore = Math.min(100, Math.round(connectionsRatio * 50));

    // Generate dynamic gaps based on missing components
    const gaps: Gap[] = [];
    
    // Critical security components that should be present
    const criticalComponents = [
      { 
        id: 'firewall', 
        name: 'Missing Perimeter Security', 
        description: 'No firewall or perimeter security detected',
        severity: 'high',
        recommendation: 'Add a Next-Gen Firewall to protect your network perimeter'
      },
      { 
        id: 'iam', 
        name: 'Missing Identity Management', 
        description: 'No identity and access management solution detected',
        severity: 'high',
        recommendation: 'Add an IAM solution to manage user identities and access'
      },
      { 
        id: 'mfa', 
        name: 'Missing Multi-Factor Authentication', 
        description: 'No MFA solution detected',
        severity: 'medium',
        recommendation: 'Implement MFA to strengthen authentication security'
      },
      { 
        id: 'siem', 
        name: 'Missing Security Monitoring', 
        description: 'No SIEM or monitoring solution detected',
        severity: 'high',
        recommendation: 'Add a SIEM solution for comprehensive security monitoring'
      },
      { 
        id: 'edr', 
        name: 'Missing Endpoint Protection', 
        description: 'No endpoint detection and response solution detected',
        severity: 'medium',
        recommendation: 'Implement EDR to protect endpoints from threats'
      },
      { 
        id: 'dlp', 
        name: 'Missing Data Protection', 
        description: 'No data loss prevention solution detected',
        severity: 'medium',
        recommendation: 'Add DLP to prevent data exfiltration'
      },
      { 
        id: 'waf', 
        name: 'Missing Web Application Protection', 
        description: 'No web application firewall detected',
        severity: 'high',
        recommendation: 'Implement a WAF to protect web applications from attacks'
      },
      { 
        id: 'awareness', 
        name: 'Missing Security Awareness', 
        description: 'No security awareness training program detected',
        severity: 'medium',
        recommendation: 'Implement security awareness training for all employees'
      }
    ];

    criticalComponents.forEach(comp => {
      if (!componentIds.has(comp.id)) {
        gaps.push({
          id: comp.id,
          name: comp.name,
          description: comp.description,
          severity: comp.severity as 'low' | 'medium' | 'high' | 'critical',
          recommendation: comp.recommendation
        });
      }
    });

    // Calculate risk score based on gaps and connections
    const gapSeverityScores = {
      'low': 10,
      'medium': 25,
      'high': 50,
      'critical': 100
    };

    const gapScore = gaps.reduce((total, gap) => {
      return total + gapSeverityScores[gap.severity];
    }, 0);

    // Base score starts at 100 (worst) and is reduced by coverage
    let totalScore = 100;
    
    // Reduce score based on tier coverage (better coverage = lower risk)
    const tierCoverageScore = Math.min(60, Object.keys(tierCounts).length * 15);
    totalScore -= tierCoverageScore;
    
    // Reduce score based on connections (more connections = lower risk)
    const maxConnectionScore = 20;
    totalScore -= Math.min(maxConnectionScore, connectionScore);
    
    // Add score based on gaps (more gaps = higher risk)
    totalScore += Math.min(80, gapScore / 10);
    
    // Ensure score is between 0-100
    totalScore = Math.max(0, Math.min(100, totalScore));
    
    // Determine risk level
    let riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
    let riskColor: string;
    
    if (totalScore < 25) {
      riskLevel = 'Low';
      riskColor = 'text-green-500';
    } else if (totalScore < 50) {
      riskLevel = 'Medium';
      riskColor = 'text-yellow-500';
    } else if (totalScore < 75) {
      riskLevel = 'High';
      riskColor = 'text-orange-500';
    } else {
      riskLevel = 'Critical';
      riskColor = 'text-red-500';
    }

    // Calculate dynamic compliance scores based on components present
    const calculateComplianceScore = (framework: string): number => {
      // This is a simplified calculation for demo purposes
      const frameworkComponents: Record<string, string[]> = {
        'hipaa': ['dlp', 'iam', 'audit', 'encryption', 'mfa', 'firewall'],
        'pci': ['firewall', 'iam', 'mfa', 'dlp', 'waf', 'encryption', 'ids'],
        'gdpr': ['dlp', 'privacy', 'audit', 'iam', 'encryption'],
        'nist': ['firewall', 'iam', 'mfa', 'siem', 'edr', 'dlp', 'ids', 'awareness', 'policy']
      };
      
      const requiredComponents = frameworkComponents[framework] || [];
      if (requiredComponents.length === 0) return 0;
      
      const presentCount = requiredComponents.filter(comp => componentIds.has(comp)).length;
      return Math.round((presentCount / requiredComponents.length) * 100);
    };

    // Update risk data
    setRiskData({
      score: Math.round(totalScore),
      level: riskLevel,
      color: riskColor,
      gaps: gaps,
      compliance: {
        hipaa: calculateComplianceScore('hipaa'),
        pci: calculateComplianceScore('pci'),
        gdpr: calculateComplianceScore('gdpr'),
        nist: calculateComplianceScore('nist')
      }
    });
  }, [nodes, edges]);

  const getColorForScore = (score: number) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    if (score >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className={`w-full max-w-4xl mx-4 rounded-xl shadow-2xl overflow-hidden ${
          darkMode ? 'bg-navy border border-cyan' : 'bg-white border border-navy'
        }`}
      >
        {/* Header */}
        <div className={`p-4 ${darkMode ? 'bg-navy-dark' : 'bg-gray-100'} flex items-center justify-between`}>
          <div className="flex items-center">
            <BarChart2 className="w-5 h-5 text-cyan mr-2" />
            <h2 className="font-bold">Comprehensive Security Risk Assessment</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className={`p-6 max-h-[70vh] overflow-y-auto ${darkMode ? 'bg-navy' : 'bg-white'}`}>
          {/* Risk Score */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className={`p-6 rounded-lg border ${
              darkMode ? 'border-gray-700 bg-navy-light' : 'border-gray-200 bg-gray-50'
            } col-span-1 flex flex-col items-center justify-center`}>
              <div className="text-center mb-4">
                <h3 className="text-sm uppercase tracking-wider opacity-70 mb-1">Overall Risk Score</h3>
                <div className="relative inline-block">
                  <svg className="w-32 h-32">
                    <circle
                      className={`stroke-current ${darkMode ? 'text-gray-700' : 'text-gray-200'}`}
                      strokeWidth="8"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className={`stroke-current ${
                        riskData.score < 25 ? 'text-green-500' : 
                        riskData.score < 50 ? 'text-yellow-500' : 
                        riskData.score < 75 ? 'text-orange-500' : 'text-red-500'
                      }`}
                      strokeWidth="8"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                      strokeDasharray="364.4"
                      strokeDashoffset={364.4 - (364.4 * riskData.score / 100)}
                      strokeLinecap="round"
                      transform="rotate(-90 64 64)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold">{riskData.score}</span>
                    <span className="text-xs opacity-70">RISK SCORE</span>
                  </div>
                </div>
              </div>
              <div className={`text-center ${riskData.color}`}>
                <span className="font-bold text-lg">{riskData.level} Risk</span>
              </div>
            </div>

            <div className={`p-6 rounded-lg border ${
              darkMode ? 'border-gray-700 bg-navy-light' : 'border-gray-200 bg-gray-50'
            } col-span-2`}>
              <h3 className="text-sm uppercase tracking-wider opacity-70 mb-4">Compliance Readiness</h3>
              <div className="space-y-4">
                {[
                  { name: 'HIPAA', score: riskData.compliance.hipaa },
                  { name: 'PCI DSS', score: riskData.compliance.pci },
                  { name: 'GDPR', score: riskData.compliance.gdpr },
                  { name: 'NIST CSF', score: riskData.compliance.nist }
                ].map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-bold">{item.score}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                      <div 
                        className={`h-full ${getColorForScore(item.score)}`}
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Security Gaps */}
          <div className="mb-6">
            <h3 className="text-sm uppercase tracking-wider opacity-70 mb-4">Security Gaps ({riskData.gaps.length})</h3>
            
            {riskData.gaps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {riskData.gaps.map((gap) => (
                  <div 
                    key={gap.id}
                    className={`p-4 rounded-lg border ${
                      darkMode ? 'border-gray-700 bg-navy-light' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start mb-2">
                      <div className={`mt-0.5 mr-2 ${
                        gap.severity === 'critical' ? 'text-red-500' : 
                        gap.severity === 'high' ? 'text-orange-500' : 
                        gap.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                      }`}>
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">{gap.name}</div>
                        <div className="text-sm opacity-70">{gap.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <Info className="w-4 h-4 text-cyan mr-2" />
                      <span>{gap.recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 bg-green-50 rounded-lg border border-green-200 dark:bg-green-900/20 dark:border-green-900">
                <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
                <p className="text-center">No significant security gaps detected in your architecture!</p>
              </div>
            )}
          </div>
          
          {/* Recommendations */}
          <div>
            <h3 className="text-sm uppercase tracking-wider opacity-70 mb-4">Next Steps</h3>
            <div className={`p-4 rounded-lg border ${
              darkMode ? 'border-gray-700 bg-navy-light' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-cyan text-navy mr-2">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Address Critical Gaps</h4>
                    <p className="text-sm opacity-70">
                      Focus on implementing the missing components with 'high' or 'critical' severity first.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-cyan text-navy mr-2">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Verify Connections</h4>
                    <p className="text-sm opacity-70">
                      Ensure all components are properly connected and secured in your architecture.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-cyan text-navy mr-2">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Schedule Security Assessment</h4>
                    <p className="text-sm opacity-70">
                      Consider a professional security assessment to validate your architecture.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <button 
                  className="w-full flex items-center justify-center py-2 bg-cyan text-navy rounded-lg"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Generate Detailed Report
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={onClose}
            className="w-full py-2 bg-cyan text-navy rounded-lg font-medium"
          >
            Close Assessment
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RiskAssessment;