import React, { useCallback, useContext, useState, useMemo, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  addEdge,
  Panel,
  NodeTypes,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import ThemeContext from '../../contexts/ThemeContext';
import { ArrowLeft, Download, Plus, Shield, Trash2, Info, CheckCircle, Network, Database, FileWarning, Server, Globe, Laptop, Router, Wifi, Cloud, Lock, UserCheck, AlertTriangle, HardDrive, Building2, Users, ShieldAlert, Radio, Fingerprint, Lightbulb, Eye, UserCog, Book, Settings, CloudCog, Layers, FileCode, Bug, Key, Cpu, ShieldCheck, Mail, MailCheck, UserPlus, CheckCircle as CircleCheck, AlertCircle as CircleAlert, CircleSlash, Code, Binary, Filter, Briefcase as BriefcaseBusiness, Timer, FileText, BarChart2, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomNode from '../custom/CustomNode';
import RiskAssessment from '../risk/RiskAssessment';
import { validateConnection } from '../../utils/connectionRules';
import { templates } from '../../utils/templateBuilder';
import { getLayoutedElements } from '../../utils/layoutUtils';

interface SecurityComponent {
  id: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  benefits: string[];
  icon: JSX.Element;
  section: string;
  tier: string;
}

const securityComponents: SecurityComponent[] = [
  // TIER 1: INFRASTRUCTURE LAYER
  {
    id: 'firewall',
    name: 'Next-Gen Firewall',
    shortName: 'NGFW',
    category: 'Network Security',
    section: 'Network Infrastructure',
    tier: 'Infrastructure Layer',
    description: 'Advanced firewall with deep packet inspection and threat prevention',
    benefits: [
      'Application-aware security',
      'Intrusion prevention',
      'SSL/TLS inspection'
    ],
    icon: <Shield className="w-5 h-5 text-cyan" />
  },
  {
    id: 'router',
    name: 'Enterprise Router',
    shortName: 'Router',
    category: 'Network Infrastructure',
    section: 'Network Infrastructure',
    tier: 'Infrastructure Layer',
    description: 'Core routing infrastructure with security features',
    benefits: [
      'Secure routing protocols',
      'Traffic segmentation',
      'QoS enforcement'
    ],
    icon: <Router className="w-5 h-5 text-cyan" />
  },
  {
    id: 'switch',
    name: 'Layer 3 Switch',
    shortName: 'L3 Switch',
    category: 'Network Infrastructure',
    section: 'Network Infrastructure',
    tier: 'Infrastructure Layer',
    description: 'Advanced switching with routing capabilities',
    benefits: [
      'VLAN segmentation',
      'Access control lists',
      'Port security'
    ],
    icon: <Network className="w-5 h-5 text-cyan" />
  },
  {
    id: 'wap',
    name: 'Wireless Access Point',
    shortName: 'WAP',
    category: 'Network Infrastructure',
    section: 'Network Infrastructure',
    tier: 'Infrastructure Layer',
    description: 'Enterprise wireless access point with security features',
    benefits: [
      'WPA3 encryption',
      'Client isolation',
      'Rogue AP detection'
    ],
    icon: <Wifi className="w-5 h-5 text-cyan" />
  },
  {
    id: 'loadbalancer',
    name: 'Load Balancer',
    shortName: 'LB',
    category: 'Network Infrastructure',
    section: 'Network Infrastructure',
    tier: 'Infrastructure Layer',
    description: 'Distributes network traffic across multiple servers',
    benefits: [
      'Traffic distribution',
      'High availability',
      'SSL offloading'
    ],
    icon: <Layers className="w-5 h-5 text-cyan" />
  },
  {
    id: 'vpn',
    name: 'VPN Gateway',
    shortName: 'VPN',
    category: 'Network Infrastructure',
    section: 'Network Infrastructure',
    tier: 'Infrastructure Layer',
    description: 'Secure remote access to corporate resources',
    benefits: [
      'Encrypted tunneling',
      'Remote access',
      'Site-to-site connectivity'
    ],
    icon: <Lock className="w-5 h-5 text-cyan" />
  },
  {
    id: 'server',
    name: 'Enterprise Server',
    shortName: 'Server',
    category: 'Infrastructure',
    section: 'Server Infrastructure',
    tier: 'Infrastructure Layer',
    description: 'Secure server infrastructure',
    benefits: [
      'Hardened configuration',
      'Resource isolation',
      'Security baseline'
    ],
    icon: <Server className="w-5 h-5 text-cyan" />
  },
  {
    id: 'storage',
    name: 'Secure Storage',
    shortName: 'Storage',
    category: 'Infrastructure',
    section: 'Server Infrastructure',
    tier: 'Infrastructure Layer',
    description: 'Enterprise storage with security controls',
    benefits: [
      'Data encryption',
      'Access auditing',
      'Secure backup'
    ],
    icon: <HardDrive className="w-5 h-5 text-cyan" />
  },
  {
    id: 'endpoint',
    name: 'Endpoint Device',
    shortName: 'Endpoint',
    category: 'Endpoint',
    section: 'Endpoint Infrastructure',
    tier: 'Infrastructure Layer',
    description: 'End-user computing devices with security controls',
    benefits: [
      'Device encryption',
      'Secure boot',
      'Anti-malware'
    ],
    icon: <Laptop className="w-5 h-5 text-cyan" />
  },
  {
    id: 'mobiledm',
    name: 'Mobile Device Management',
    shortName: 'MDM',
    category: 'Endpoint',
    section: 'Endpoint Infrastructure',
    tier: 'Infrastructure Layer',
    description: 'Management platform for mobile devices',
    benefits: [
      'Device enrollment',
      'Policy enforcement',
      'Remote wipe'
    ],
    icon: <Smartphone className="w-5 h-5 text-cyan" />
  },
  
  // TIER 2: APPLICATION & SOFTWARE LAYER
  {
    id: 'webapp',
    name: 'Web Application',
    shortName: 'Web App',
    category: 'Application',
    section: 'Applications',
    tier: 'Application & Software Layer',
    description: 'Customer-facing or internal web application',
    benefits: [
      'Input validation',
      'Authentication',
      'Session management'
    ],
    icon: <Globe className="w-5 h-5 text-cyan" />
  },
  {
    id: 'api',
    name: 'API Gateway',
    shortName: 'API',
    category: 'Application',
    section: 'Applications',
    tier: 'Application & Software Layer',
    description: 'Managed API gateway for service integration',
    benefits: [
      'Rate limiting',
      'Authentication',
      'Request validation'
    ],
    icon: <Settings className="w-5 h-5 text-cyan" />
  },
  {
    id: 'microservices',
    name: 'Microservices',
    shortName: 'Micro',
    category: 'Application',
    section: 'Applications',
    tier: 'Application & Software Layer',
    description: 'Distributed service architecture',
    benefits: [
      'Service isolation',
      'Scalability',
      'Independent deployment'
    ],
    icon: <Layers className="w-5 h-5 text-cyan" />
  },
  {
    id: 'serverless',
    name: 'Serverless Functions',
    shortName: 'FaaS',
    category: 'Application',
    section: 'Applications',
    tier: 'Application & Software Layer',
    description: 'Event-driven compute service',
    benefits: [
      'Auto-scaling',
      'Event-driven',
      'Reduced attack surface'
    ],
    icon: <Code className="w-5 h-5 text-cyan" />
  },
  {
    id: 'database',
    name: 'Database',
    shortName: 'DB',
    category: 'Data Storage',
    section: 'Applications',
    tier: 'Application & Software Layer',
    description: 'Secure database for application data',
    benefits: [
      'Encryption at rest',
      'Access controls',
      'Audit logging'
    ],
    icon: <Database className="w-5 h-5 text-cyan" />
  },
  {
    id: 'datawarehouse',
    name: 'Data Warehouse',
    shortName: 'DW',
    category: 'Data Storage',
    section: 'Applications',
    tier: 'Application & Software Layer',
    description: 'Enterprise data warehouse for analytics',
    benefits: [
      'Data governance',
      'Access controls',
      'Encryption'
    ],
    icon: <Database className="w-5 h-5 text-cyan" />
  },
  {
    id: 'cicd',
    name: 'CI/CD Pipeline',
    shortName: 'CI/CD',
    category: 'DevOps',
    section: 'Development',
    tier: 'Application & Software Layer',
    description: 'Continuous integration and deployment pipeline',
    benefits: [
      'Secure builds',
      'Dependency scanning',
      'Image signing'
    ],
    icon: <Settings className="w-5 h-5 text-cyan" />
  },
  {
    id: 'sast',
    name: 'Static Application Security Testing',
    shortName: 'SAST',
    category: 'DevSecOps',
    section: 'Development',
    tier: 'Application & Software Layer',
    description: 'Static code analysis for security vulnerabilities',
    benefits: [
      'Code scanning',
      'Vulnerability detection',
      'Early remediation'
    ],
    icon: <FileCode className="w-5 h-5 text-cyan" />
  },
  {
    id: 'dast',
    name: 'Dynamic Application Security Testing',
    shortName: 'DAST',
    category: 'DevSecOps',
    section: 'Development',
    tier: 'Application & Software Layer',
    description: 'Dynamic testing of running applications',
    benefits: [
      'Runtime analysis',
      'Attack simulation',
      'Vulnerability detection'
    ],
    icon: <Bug className="w-5 h-5 text-cyan" />
  },
  {
    id: 'containers',
    name: 'Container Platform',
    shortName: 'Containers',
    category: 'Infrastructure',
    section: 'Development',
    tier: 'Application & Software Layer',
    description: 'Container orchestration platform',
    benefits: [
      'Isolation',
      'Immutable infrastructure',
      'Security scanning'
    ],
    icon: <Layers className="w-5 h-5 text-cyan" />
  },

  // TIER 3: SECURITY CONTROLS LAYER
  {
    id: 'ids',
    name: 'Intrusion Detection System',
    shortName: 'IDS',
    category: 'Security Monitoring',
    section: 'Security Controls',
    tier: 'Security Controls Layer',
    description: 'Monitors network traffic for suspicious activity',
    benefits: [
      'Real-time threat detection',
      'Network behavior analysis',
      'Compliance monitoring'
    ],
    icon: <AlertTriangle className="w-5 h-5 text-cyan" />
  },
  {
    id: 'ips',
    name: 'Intrusion Prevention System',
    shortName: 'IPS',
    category: 'Security Monitoring',
    section: 'Security Controls',
    tier: 'Security Controls Layer',
    description: 'Actively blocks detected threats',
    benefits: [
      'Automated threat blocking',
      'Real-time protection',
      'Policy enforcement'
    ],
    icon: <ShieldAlert className="w-5 h-5 text-cyan" />
  },
  {
    id: 'waf',
    name: 'Web Application Firewall',
    shortName: 'WAF',
    category: 'Application Security',
    section: 'Security Controls',
    tier: 'Security Controls Layer',
    description: 'Protects web applications from attacks',
    benefits: [
      'OWASP top 10 protection',
      'Bot protection',
      'API security'
    ],
    icon: <Globe className="w-5 h-5 text-cyan" />
  },
  {
    id: 'apifirewall',
    name: 'API Security Gateway',
    shortName: 'API Sec',
    category: 'Application Security',
    section: 'Security Controls',
    tier: 'Security Controls Layer',
    description: 'Protects APIs from security threats',
    benefits: [
      'Schema validation',
      'Rate limiting',
      'Token validation'
    ],
    icon: <Shield className="w-5 h-5 text-cyan" />
  },
  {
    id: 'dlp',
    name: 'Data Loss Prevention',
    shortName: 'DLP',
    category: 'Data Security',
    section: 'Security Controls',
    tier: 'Security Controls Layer',
    description: 'Prevents unauthorized data exfiltration',
    benefits: [
      'Content inspection',
      'Policy enforcement',
      'Data classification'
    ],
    icon: <Database className="w-5 h-5 text-cyan" />
  },
  {
    id: 'encryption',
    name: 'Encryption Service',
    shortName: 'Encrypt',
    category: 'Data Security',
    section: 'Security Controls',
    tier: 'Security Controls Layer',
    description: 'Enterprise encryption platform',
    benefits: [
      'Data protection',
      'Key management',
      'Compliance enablement'
    ],
    icon: <Key className="w-5 h-5 text-cyan" />
  },
  {
    id: 'casb',
    name: 'Cloud Access Security Broker',
    shortName: 'CASB',
    category: 'Cloud Security',
    section: 'Security Controls',
    tier: 'Security Controls Layer',
    description: 'Secures cloud service usage',
    benefits: [
      'Visibility',
      'Compliance',
      'Threat protection'
    ],
    icon: <CloudCog className="w-5 h-5 text-cyan" />
  },
  {
    id: 'iam',
    name: 'Identity & Access Management',
    shortName: 'IAM',
    category: 'Access Control',
    section: 'Identity & Access',
    tier: 'Security Controls Layer',
    description: 'Centralized identity management platform',
    benefits: [
      'Single sign-on',
      'Role-based access',
      'User lifecycle management'
    ],
    icon: <UserCheck className="w-5 h-5 text-cyan" />
  },
  {
    id: 'pam',
    name: 'Privileged Access Management',
    shortName: 'PAM',
    category: 'Access Control',
    section: 'Identity & Access',
    tier: 'Security Controls Layer',
    description: 'Manages privileged account access',
    benefits: [
      'Password vaulting',
      'Session recording',
      'Just-in-time access'
    ],
    icon: <Lock className="w-5 h-5 text-cyan" />
  },
  {
    id: 'mfa',
    name: 'Multi-Factor Authentication',
    shortName: 'MFA',
    category: 'Authentication',
    section: 'Identity & Access',
    tier: 'Security Controls Layer',
    description: 'Additional authentication factors',
    benefits: [
      'Biometric authentication',
      'Hardware tokens',
      'Push notifications'
    ],
    icon: <Fingerprint className="w-5 h-5 text-cyan" />
  },
  {
    id: 'passwordmgr',
    name: 'Password Manager',
    shortName: 'PassMgr',
    category: 'Authentication',
    section: 'Identity & Access',
    tier: 'Security Controls Layer',
    description: 'Secure password storage and management',
    benefits: [
      'Strong password generation',
      'Secure storage',
      'Password sharing'
    ],
    icon: <Key className="w-5 h-5 text-cyan" />
  },
  {
    id: 'siem',
    name: 'Security Information & Event Management',
    shortName: 'SIEM',
    category: 'Security Monitoring',
    section: 'Monitoring & Response',
    tier: 'Security Controls Layer',
    description: 'Centralized security monitoring platform',
    benefits: [
      'Log aggregation',
      'Correlation analysis',
      'Threat hunting'
    ],
    icon: <FileWarning className="w-5 h-5 text-cyan" />
  },
  {
    id: 'soar',
    name: 'Security Orchestration & Response',
    shortName: 'SOAR',
    category: 'Incident Response',
    section: 'Monitoring & Response',
    tier: 'Security Controls Layer',
    description: 'Automated security response platform',
    benefits: [
      'Incident playbooks',
      'Automated response',
      'Case management'
    ],
    icon: <Radio className="w-5 h-5 text-cyan" />
  },
  {
    id: 'edr',
    name: 'Endpoint Detection & Response',
    shortName: 'EDR',
    category: 'Endpoint Security',
    section: 'Monitoring & Response',
    tier: 'Security Controls Layer',
    description: 'Advanced endpoint protection platform',
    benefits: [
      'Behavior monitoring',
      'Threat hunting',
      'Incident response'
    ],
    icon: <ShieldAlert className="w-5 h-5 text-cyan" />
  },
  {
    id: 'threatintel',
    name: 'Threat Intelligence Platform',
    shortName: 'TIP',
    category: 'Security Intelligence',
    section: 'Monitoring & Response',
    tier: 'Security Controls Layer',
    description: 'Collects and analyzes threat intelligence',
    benefits: [
      'Indicator management',
      'Threat correlation',
      'Intelligence sharing'
    ],
    icon: <Eye className="w-5 h-5 text-cyan" />
  },
  {
    id: 'email-security',
    name: 'Email Security Gateway',
    shortName: 'Email Sec',
    category: 'Communication Security',
    section: 'Security Controls',
    tier: 'Security Controls Layer',
    description: 'Protects against email-based threats',
    benefits: [
      'Phishing protection',
      'Malware scanning',
      'Data loss prevention'
    ],
    icon: <Mail className="w-5 h-5 text-cyan" />
  },

  // TIER 4: HUMAN & GOVERNANCE LAYER
  {
    id: 'awareness',
    name: 'Security Awareness Training',
    shortName: 'Training',
    category: 'User Awareness',
    section: 'Human & Governance',
    tier: 'Human & Governance Layer',
    description: 'Security awareness and training program',
    benefits: [
      'Phishing awareness',
      'Password hygiene',
      'Social engineering defense'
    ],
    icon: <Lightbulb className="w-5 h-5 text-cyan" />
  },
  {
    id: 'policy',
    name: 'Security Policies',
    shortName: 'Policies',
    category: 'Governance',
    section: 'Human & Governance',
    tier: 'Human & Governance Layer',
    description: 'Security policies and procedures',
    benefits: [
      'Clear guidelines',
      'Compliance alignment',
      'Risk management'
    ],
    icon: <Book className="w-5 h-5 text-cyan" />
  },
  {
    id: 'accessreview',
    name: 'Access Reviews',
    shortName: 'Reviews',
    category: 'Governance',
    section: 'Human & Governance',
    tier: 'Human & Governance Layer',
    description: 'Regular access control reviews',
    benefits: [
      'Least privilege',
      'Separation of duties',
      'Regulatory compliance'
    ],
    icon: <UserCog className="w-5 h-5 text-cyan" />
  },
  {
    id: 'audit',
    name: 'Security Audits',
    shortName: 'Audits',
    category: 'Governance',
    section: 'Human & Governance',
    tier: 'Human & Governance Layer',
    description: 'Regular security audits and assessments',
    benefits: [
      'Gap identification',
      'Control validation',
      'Continuous improvement'
    ],
    icon: <Eye className="w-5 h-5 text-cyan" />
  },
  {
    id: 'grc',
    name: 'GRC Platform',
    shortName: 'GRC',
    category: 'Governance',
    section: 'Human & Governance',
    tier: 'Human & Governance Layer',
    description: 'Governance, Risk, and Compliance management',
    benefits: [
      'Policy management',
      'Risk assessment',
      'Compliance tracking'
    ],
    icon: <CheckCircle className="w-5 h-5 text-cyan" />
  },
  {
    id: 'bcdr',
    name: 'Business Continuity & Disaster Recovery',
    shortName: 'BCDR',
    category: 'Resilience',
    section: 'Human & Governance',
    tier: 'Human & Governance Layer',
    description: 'Ensures business operations can continue during disruptions',
    benefits: [
      'Business impact analysis',
      'Recovery planning',
      'Regular testing'
    ],
    icon: <Timer className="w-5 h-5 text-cyan" />
  },
  {
    id: 'vendor',
    name: 'Third-Party Risk Management',
    shortName: 'TPRM',
    category: 'Supply Chain',
    section: 'Human & Governance',
    tier: 'Human & Governance Layer',
    description: 'Manages risks from third-party vendors',
    benefits: [
      'Vendor assessment',
      'Continuous monitoring',
      'Risk-based approach'
    ],
    icon: <BriefcaseBusiness className="w-5 h-5 text-cyan" />
  },
  {
    id: 'incident',
    name: 'Incident Response Program',
    shortName: 'IR',
    category: 'Response',
    section: 'Human & Governance',
    tier: 'Human & Governance Layer',
    description: 'Structured approach to handle security incidents',
    benefits: [
      'Defined playbooks',
      'Regular training',
      'Post-incident analysis'
    ],
    icon: <AlertTriangle className="w-5 h-5 text-cyan" />
  },
];

const SecurityWorkflow: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);
  
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'basic' | 'expert' | 'compliance'>('expert');
  const [showRiskAssessment, setShowRiskAssessment] = useState(false);

  const nodeTypes: NodeTypes = useMemo(() => ({
    customNode: CustomNode
  }), []);

  const tiers = [...new Set(securityComponents.map(c => c.tier))];

  const filteredComponents = selectedTier 
    ? securityComponents.filter(c => c.tier === selectedTier)
    : securityComponents;

  const sectionsByTier = filteredComponents.reduce((acc, component) => {
    if (!acc[component.section]) {
      acc[component.section] = [];
    }
    acc[component.section].push(component);
    return acc;
  }, {} as Record<string, SecurityComponent[]>);

  useEffect(() => {
    setExpandedSections({
      'Network Infrastructure': true
    });
  }, []);

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return;

      const { valid, riskLevel } = validateConnection(params.source, params.target);
      
      if (!valid) {
        console.warn('Invalid connection attempted');
        return;
      }

      const edgeStyle = {
        animated: true,
        style: {
          stroke: riskLevel === 'secure' ? '#22c55e' : 
                 riskLevel === 'warning' ? '#facc15' : 
                 riskLevel === 'error' ? '#ef4444' : '#6b7280',
          strokeWidth: 2
        }
      };

      const newEdge = {
        ...params,
        ...edgeStyle,
        id: `e-${params.source}-${params.target}`
      };
      
      setEdges((eds) => addEdge(newEdge, eds));
      
      setNodes(nodes => {
        return nodes.map(node => {
          if (node.id === params.source || node.id === params.target) {
            return {
              ...node,
              data: {
                ...node.data,
                connections: {
                  connected: true,
                  status: riskLevel
                }
              }
            };
          }
          return node;
        });
      });
    },
    []
  );

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
  };

  const onPaneClick = () => {
    setSelectedNode(null);
  };

  const onNodeDragStop = (_: React.MouseEvent, node: Node) => {
    const updatedNodes = nodes.map((n) => {
      if (n.id === node.id) {
        return { ...n, position: node.position };
      }
      return n;
    });
    setNodes(updatedNodes);
  };

  const addNode = (component: SecurityComponent) => {
    const newNode = {
      id: `${component.id}-${Date.now()}`,
      type: 'customNode',
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      draggable: true,
      data: {
        component: component,
        darkMode: darkMode,
        connections: {
          connected: false,
          status: 'default'
        },
        onDelete: deleteNode  // Add this line
      }
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const clearWorkflow = () => {
    setNodes([]);
    setEdges([]);
  };

  const exportWorkflow = () => {
    const data = {
      nodes,
      edges,
      components: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        component: node.data.component
      })),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'security-architecture.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const loadTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;
    
    clearWorkflow();
    
    const componentMap = new Map<string, SecurityComponent>();
    securityComponents.forEach(comp => componentMap.set(comp.id, comp));
    
    const newNodes: Node[] = [];
    template.nodeConfigs.forEach(config => {
      const component = componentMap.get(config.id);
      if (component) {
        newNodes.push({
          id: `${config.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          type: 'customNode',
          position: config.position,
          draggable: true,
          data: {
            component: component,
            darkMode: darkMode,
            connections: {
              connected: false,
              status: config.status || 'offline'
            },
            onDelete: deleteNode
          }
        });
      }
    });
    
    const newEdges: Edge[] = [];
    template.nodeConfigs.forEach(config => {
      if (config.connections) {
        const sourceNodeId = newNodes.find(n => n.data.component.id === config.id)?.id;
        
        config.connections.forEach(targetCompId => {
          const targetNodeId = newNodes.find(n => n.data.component.id === targetCompId)?.id;
          
          if (sourceNodeId && targetNodeId) {
            const { valid, riskLevel } = validateConnection(sourceNodeId, targetNodeId);
            
            if (valid) {
              newEdges.push({
                id: `e-${sourceNodeId}-${targetNodeId}`,
                source: sourceNodeId,
                target: targetNodeId,
                animated: true,
                style: {
                  stroke: riskLevel === 'secure' ? '#22c55e' : 
                         riskLevel === 'warning' ? '#facc15' : 
                         riskLevel === 'error' ? '#ef4444' : '#6b7280',
                  strokeWidth: 2
                }
              });
            }
          }
        });
      }
    });
    
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(newNodes, newEdges);
    
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    setShowIntro(false);
  };

  const selectedComponent = nodes.find(node => node.id === selectedNode)?.data?.component;

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
const deleteNode = useCallback((nodeId: string) => {
  setNodes((nds) => nds.filter((node) => node.id !== nodeId));
  setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  setSelectedNode(null);
}, []);
  
  return (
    <ReactFlowProvider>
    <div className={`h-screen ${darkMode ? 'bg-navy text-gray' : 'bg-white text-navy'}`}>
      
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`max-w-2xl mx-4 p-8 rounded-xl shadow-2xl ${
                darkMode ? 'bg-navy border border-cyan' : 'bg-white border border-navy'
              }`}
            >
              <div className="flex items-center justify-center mb-6">
                <Shield className="w-12 h-12 text-cyan" />
              </div>
              <h2 className={`text-2xl font-bold mb-4 text-center ${
                darkMode ? 'text-white' : 'text-navy'
              }`}>
                Enterprise Security Architecture Builder
              </h2>
              <p className="text-center mb-6 opacity-80">
                Design your organization's security infrastructure by connecting network devices, security controls, and monitoring solutions.
                Create a comprehensive security architecture that aligns with your security requirements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Shield, text: "Add infrastructure components" },
                  { icon: Plus, text: "Connect security controls" },
                  { icon: Download, text: "Export your architecture" }
                ].map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <step.icon className="w-6 h-6 text-cyan" />
                    </div>
                    <p className="text-sm">{step.text}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <h3 className="md:col-span-2 lg:col-span-3 text-center font-medium mb-2">Start with a template:</h3>
                {templates.map((template) => (
                  <motion.button
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => loadTemplate(template.id)}
                    className={`p-3 rounded-lg border text-left ${
                      darkMode 
                        ? 'border-gray-700 hover:border-cyan bg-navy-light' 
                        : 'border-gray-300 hover:border-navy bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">{template.name}</div>
                    <div className="text-xs opacity-70">{template.description}</div>
                  </motion.button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowIntro(false)}
                className="w-full py-3 bg-cyan text-navy rounded-lg font-mono flex items-center justify-center"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Start Building
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRiskAssessment && (
          <RiskAssessment 
            nodes={nodes}
            edges={edges}
            darkMode={darkMode} 
            onClose={() => setShowRiskAssessment(false)}
          />
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 z-40"
      >
        <div className={`p-4 ${darkMode ? 'bg-navy-dark' : 'bg-gray-100'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              
              <motion.button 
  onClick={() => window.location.href = '/'}
  className={`flex items-center space-x-2 ${darkMode ? 'text-gray hover:text-cyan' : 'text-navy hover:text-cyan'}`}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <Shield className="w-5 h-5" />
  <span className="font-mono">Return</span>
</motion.button>
              
              <div className="flex items-center space-x-2">
                {['basic', 'expert', 'compliance'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as any)}
                    className={`px-3 py-1 text-xs rounded-md font-mono ${
                      viewMode === mode
                        ? 'bg-cyan text-navy'
                        : darkMode
                          ? 'bg-navy-light text-gray'
                          : 'bg-gray-200 text-navy'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setShowRiskAssessment(true)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                  darkMode 
                    ? 'bg-navy-light text-gray hover:bg-navy-light/80' 
                    : 'bg-gray-200 text-navy hover:bg-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BarChart2 className="w-4 h-4" />
                <span className="font-mono text-sm">Risk Assessment</span>
              </motion.button>
            
              <motion.button
                onClick={clearWorkflow}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                  darkMode 
                    ? 'bg-navy-light text-gray hover:bg-red-900/20' 
                    : 'bg-gray-200 text-navy hover:bg-red-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash2 className="w-4 h-4" />
                <span className="font-mono text-sm">Clear</span>
              </motion.button>
              
              <motion.button
                onClick={exportWorkflow}
                className="flex items-center space-x-2 px-4 py-2 rounded-md bg-cyan text-navy"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                <span className="font-mono text-sm">Export</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="h-full pt-16 flex">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${
            isPanelCollapsed ? 'w-12' : 'w-72'
          } transition-all duration-300 h-full overflow-y-auto border-r ${
            darkMode ? 'border-gray-700 bg-navy-dark' : 'border-gray-200 bg-gray-50'
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              {!isPanelCollapsed && (
                <h3 className="font-mono text-sm flex items-center">
                  <Shield className="w-4 h-4 text-cyan mr-2" />
                  Security Components
                </h3>
              )}
              <button
                onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
                className={`p-1 rounded-md ${
                  darkMode ? 'hover:bg-navy-light' : 'hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className={`w-4 h-4 text-cyan transform transition-transform ${
                  isPanelCollapsed ? 'rotate-180' : ''
                }`} />
              </button>
            </div>
            
            {!isPanelCollapsed && (
              <div className="space-y-4">
                <div className="mb-4">
                  <div className="text-xs font-mono uppercase tracking-wider mb-2">
                    Filter by Tier
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedTier(null)}
                      className={`text-xs px-2 py-1 rounded-md ${
                        selectedTier === null
                          ? 'bg-cyan text-navy'
                          : darkMode
                            ? 'bg-navy-light text-gray'
                            : 'bg-gray-200 text-navy'
                      }`}
                    >
                      All
                    </button>
                    {tiers.map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setSelectedTier(tier)}
                        className={`text-xs px-2 py-1 rounded-md ${
                          selectedTier === tier
                            ? 'bg-cyan text-navy'
                            : darkMode
                              ? 'bg-navy-light text-gray'
                              : 'bg-gray-200 text-navy'
                        }`}
                      >
                        {tier.replace(' Layer', '')}
                      </button>
                    ))}
                  </div>
                </div>
                
                {Object.entries(sectionsByTier).map(([section, components]) => (
                  <div key={section} className="space-y-2">
                    <button
                      onClick={() => toggleSection(section)}
                      className={`w-full flex items-center justify-between text-xs font-mono uppercase tracking-wider px-2 py-1 rounded ${
                        darkMode ? 'bg-navy-light text-cyan' : 'bg-gray-100 text-navy'
                      }`}
                    >
                      <span>{section}</span>
                      <span className="transform transition-transform">
                        {expandedSections[section] ? '−' : '+'}
                      </span>
                    </button>
                    
                    <AnimatePresence>
                      {expandedSections[section] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2 overflow-hidden"
                        >
                          {components.map((component) => (
                            <motion.button
                              key={component.id}
                              onClick={() => addNode(component)}
                              className={`w-full p-2 rounded-lg text-left group transition-all ${
                                darkMode 
                                  ? 'hover:bg-navy-light border border-gray-700 hover:border-cyan' 
                                  : 'hover:bg-gray-50 border border-gray-200 hover:border-navy'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  {component.icon}
                                  <div className="ml-2">
                                    <span className="text-sm font-medium block">{component.name}</span>
                                    <span className="text-xs opacity-70">{component.category}</span>
                                  </div>
                                </div>
                                <Plus className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                                  darkMode ? 'text-cyan' : 'text-navy'
                                }`} />
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <div className="flex-1 h-full relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onNodeDragStop={onNodeDragStop}
            nodeTypes={nodeTypes}
            className={darkMode ? 'bg-navy-dark' : 'bg-gray-50'}
            defaultEdgeOptions={{
              animated: true,
              style: { stroke: '#00F6FF', strokeWidth: 2 }
            }}
            fitView
          >
            <Background 
              color={darkMode ? "#1A3A5A" : "#e2e8f0"} 
              gap={20}
              size={1}
            />
            <Controls 
              className={`${darkMode ? '!bg-navy-dark !border-gray-700' : '!bg-gray-100 !border-gray-200'}`}
              style={{
                button: {
                  backgroundColor: darkMode ? '#13293D' : '#f3f4f6',
                  color: darkMode ? '#00F6FF' : '#0B1F3A',
                  borderColor: darkMode ? '#374151' : '#e5e7eb',
                  '&:hover': {
                    backgroundColor: darkMode ? '#091729' : '#e5e7eb',
                  }
                }
              }}
            />
            <MiniMap 
              className={`${darkMode ? '!bg-navy !border-gray-700' : '!bg-gray-100 !border-gray-200'}`}
              nodeColor={darkMode ? '#00F6FF' : '#0B1F3A'}
              maskColor={darkMode ? 'rgba(19, 41, 61, 0.8)' : 'rgba(243, 244, 246, 0.8)'}
            />

            <AnimatePresence>
              {selectedComponent && (
                <Panel position="bottom-center\" className="mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className={`p-4 rounded-lg ${
                      darkMode ? 'bg-navy border-gray-700' : 'bg-white border-gray-200'
                    } border shadow-lg max-w-md`}
                  >
                    <div className="flex items-start mb-3">
                      <Info className="w-5 h-5 text-cyan mr-2 mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">{selectedComponent.name}</h4>
                        <p className="text-sm opacity-70">{selectedComponent.description}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {selectedComponent.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-cyan mr-2" />
                          <span className="opacity-80">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </Panel>
              )}
            </AnimatePresence>
          </ReactFlow>
        </div>
      </div>
    </div>
    </ReactFlowProvider>
  );
};

export default SecurityWorkflow;