import React, { useCallback, useContext, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  addEdge,
  Panel,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import ThemeContext from '../../contexts/ThemeContext';
import { ArrowLeft, Download, Plus, Shield, Trash2, Info, CheckCircle, Lock, Network, Database, FileWarning } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecurityComponent {
  id: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  benefits: string[];
  icon: JSX.Element;
}

const securityComponents: SecurityComponent[] = [
  {
    id: 'mfa',
    name: 'Multi-Factor Authentication',
    shortName: 'MFA',
    category: 'Authentication',
    description: 'Adds an additional layer of security beyond passwords',
    benefits: [
      'Reduce unauthorized access by 99.9%',
      'Comply with security regulations',
      'Protect sensitive data'
    ],
    icon: <Lock className="w-5 h-5 text-cyan" />
  },
  {
    id: 'waf',
    name: 'Web Application Firewall',
    shortName: 'WAF',
    category: 'Network Security',
    description: 'Protects web applications from common attacks',
    benefits: [
      'Block malicious traffic automatically',
      'Prevent SQL injection attacks',
      'Protect against zero-day vulnerabilities'
    ],
    icon: <Network className="w-5 h-5 text-cyan" />
  },
  {
    id: 'dlp',
    name: 'Data Loss Prevention',
    shortName: 'DLP',
    category: 'Data Security',
    description: 'Prevents sensitive data from leaving the organization',
    benefits: [
      'Protect intellectual property',
      'Ensure regulatory compliance',
      'Prevent data breaches'
    ],
    icon: <Database className="w-5 h-5 text-cyan" />
  },
  {
    id: 'iam',
    name: 'Identity & Access Management',
    shortName: 'IAM',
    category: 'Access Control',
    description: 'Manages user identities and access rights',
    benefits: [
      'Streamline access management',
      'Reduce security risks',
      'Improve operational efficiency'
    ],
    icon: <Shield className="w-5 h-5 text-cyan" />
  },
  {
    id: 'siem',
    name: 'Security Information & Event Management',
    shortName: 'SIEM',
    category: 'Monitoring',
    description: 'Centralizes security event monitoring and analysis',
    benefits: [
      'Real-time threat detection',
      'Automated incident response',
      'Comprehensive security visibility'
    ],
    icon: <FileWarning className="w-5 h-5 text-cyan" />
  },
];

const SecurityWorkflow: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
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
      type: 'default',
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      draggable: true,
      data: {
        label: (
          <div className="p-3 min-w-[120px] max-w-[120px]">
            <div className="flex items-center justify-center mb-2">
              {component.icon}
            </div>
            <div className="text-sm font-medium text-center truncate text-white">
              {component.shortName}
            </div>
            <div className="text-xs opacity-70 text-center truncate text-gray">
              {component.category}
            </div>
            <Handle type="target" position={Position.Top} className="!bg-cyan" />
            <Handle type="source" position={Position.Bottom} className="!bg-cyan" />
            <Handle type="target" position={Position.Left} className="!bg-cyan" />
            <Handle type="source" position={Position.Right} className="!bg-cyan" />
          </div>
        ),
        component: component
      },
      className: `border-2 rounded-lg shadow-lg ${darkMode ? 'border-cyan bg-navy' : 'border-navy bg-white'}`,
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
      })),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'security-workflow.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const selectedComponent = nodes.find(node => node.id === selectedNode)?.data?.component;

  return (
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
                Security Workflow Builder
              </h2>
              <p className="text-center mb-6 opacity-80">
                Design your organization's security infrastructure by dragging and connecting security components. 
                Visualize gaps and get recommendations for a stronger security posture.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Shield, text: "Add security components from the panel" },
                  { icon: Plus, text: "Connect components to create your workflow" },
                  { icon: Download, text: "Export your security blueprint" }
                ].map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <step.icon className="w-6 h-6 text-cyan" />
                    </div>
                    <p className="text-sm">{step.text}</p>
                  </div>
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

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 z-40"
      >
        <div className={`p-4 ${darkMode ? 'bg-navy-dark' : 'bg-gray-100'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="container mx-auto flex items-center justify-between">
            <motion.a
              href="/"
              className={`flex items-center space-x-2 ${darkMode ? 'text-gray hover:text-cyan' : 'text-navy hover:text-cyan'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-mono">Back to Portfolio</span>
            </motion.a>
            
            <div className="flex items-center space-x-4">
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
        {/* Component Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${
            isPanelCollapsed ? 'w-12' : 'w-64'
          } transition-all duration-300 h-full overflow-y-auto border-r ${
            darkMode ? 'border-gray-700 bg-navy-dark' : 'border-gray-200 bg-gray-50'
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              {!isPanelCollapsed && (
                <h3 className="font-mono text-sm flex items-center">
                  <Shield className="w-4 h-4 text-cyan mr-2" />
                  Components
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
              <div className="space-y-2">
                {securityComponents.map((component) => (
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
              </div>
            )}
          </div>
        </motion.div>

        {/* Flow Canvas */}
        <div className="flex-1 h-full relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onNodeDragStop={onNodeDragStop}
            className={darkMode ? 'bg-navy-dark' : 'bg-gray-50'}
          >
            <Background />
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
                <Panel position="bottom-center" className="mb-8">
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
  );
};

export default SecurityWorkflow;