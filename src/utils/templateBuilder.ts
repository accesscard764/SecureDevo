import { Node, Edge } from 'reactflow';
import dagre from 'dagre';

const nodeWidth = 150;
const nodeHeight = 100;

// Define templates for different organization types
interface Template {
  id: string;
  name: string;
  description: string;
  nodeConfigs: {
    id: string;
    position: { x: number; y: number };
    connections?: string[];
    status?: 'secure' | 'warning' | 'error' | 'offline';
  }[];
}

// Helper function to generate random ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

// Function to layout nodes using dagre
const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Configure layout settings
  dagreGraph.setGraph({
    rankdir: 'TB',
    nodesep: 300, // Increased horizontal spacing
    ranksep: 200, // Increased vertical spacing
    marginx: 150,
    marginy: 150,
    ranker: 'network-simplex'
  });

  // Add nodes
  nodes.forEach(node => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  // Add edges
  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate layout
  dagre.layout(dagreGraph);

  // Get new node positions with offset to center the graph
  const layoutedNodes = nodes.map(node => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2
      }
    };
  });

  return { nodes: layoutedNodes, edges };
};

// Function to generate nodes and edges from a template
export const generateTemplateNodesAndEdges = (
  template: Template,
  componentMap: Map<string, any>,
  darkMode: boolean
): { nodes: Node[], edges: Edge[] } => {
  const nodes: Node[] = [];
  const nodeIdMap = new Map<string, string>();
  
  // First create all nodes
  template.nodeConfigs.forEach(config => {
    const component = componentMap.get(config.id);
    if (component) {
      const nodeId = `${config.id}-${generateId()}`;
      nodeIdMap.set(config.id, nodeId);
      
      nodes.push({
        id: nodeId,
        type: 'customNode',
        position: config.position,
        draggable: true,
        data: {
          component: {
            ...component,
            icon: component.icon // Ensure icon is properly passed
          },
          darkMode: darkMode,
          connections: {
            connected: false,
            status: config.status || 'secure'
          }
        },
        style: {
          borderColor: 'var(--color-cyan)',
          backgroundColor: darkMode ? 'var(--color-navy)' : 'white'
        }
      });
    }
  });
  
  // Then create edges
  const edges: Edge[] = [];
  template.nodeConfigs.forEach(config => {
    if (config.connections) {
      const sourceNodeId = nodeIdMap.get(config.id);
      
      config.connections.forEach(targetCompId => {
        const targetNodeId = nodeIdMap.get(targetCompId);
        
        if (sourceNodeId && targetNodeId) {
          edges.push({
            id: `e-${sourceNodeId}-${targetNodeId}`,
            source: sourceNodeId,
            target: targetNodeId,
            animated: true,
            style: { 
              stroke: 'var(--color-cyan)',
              strokeWidth: 2
            }
          });
        }
      });
    }
  });
  
  // Apply layout
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
  
  // Update node styles after layout
  const styledNodes = layoutedNodes.map(node => ({
    ...node,
    style: {
      borderColor: 'var(--color-cyan)',
      backgroundColor: darkMode ? 'var(--color-navy)' : 'white'
    }
  }));
  
  return { nodes: styledNodes, edges: layoutedEdges };
};

export const templates: Template[] = [
  {
    id: 'small-startup',
    name: 'Small Startup',
    description: 'Cloud-native, minimal security controls',
    nodeConfigs: [
      { id: 'firewall', position: { x: 250, y: 50 } },
      { id: 'waf', position: { x: 400, y: 150 }, connections: ['firewall'] },
      { id: 'webapp', position: { x: 250, y: 150 }, connections: ['waf'] },
      { id: 'api', position: { x: 250, y: 250 }, connections: ['webapp'] },
      { id: 'database', position: { x: 250, y: 350 }, connections: ['api'] },
      { id: 'iam', position: { x: 100, y: 150 }, connections: ['webapp'] },
      { id: 'mfa', position: { x: 100, y: 250 }, connections: ['iam'] }
    ]
  },
  {
    id: 'mid-size',
    name: 'Mid-size Business',
    description: 'Hybrid infrastructure, maturing security',
    nodeConfigs: [
      { id: 'firewall', position: { x: 250, y: 50 } },
      { id: 'router', position: { x: 250, y: 150 }, connections: ['firewall'] },
      { id: 'switch', position: { x: 250, y: 250 }, connections: ['router'] },
      { id: 'waf', position: { x: 400, y: 250 }, connections: ['firewall'] },
      { id: 'server', position: { x: 150, y: 350 }, connections: ['switch'] },
      { id: 'webapp', position: { x: 400, y: 350 }, connections: ['waf'] },
      { id: 'api', position: { x: 400, y: 450 }, connections: ['webapp'] },
      { id: 'database', position: { x: 250, y: 450 }, connections: ['api', 'server'] },
      { id: 'iam', position: { x: 550, y: 150 }, connections: ['firewall'] },
      { id: 'mfa', position: { x: 550, y: 250 }, connections: ['iam'] },
      { id: 'endpoint', position: { x: 150, y: 450 }, connections: ['switch'] },
      { id: 'siem', position: { x: 550, y: 350 }, connections: ['firewall', 'waf'] },
      { id: 'ids', position: { x: 550, y: 450 }, connections: ['switch', 'firewall'] }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Complex infrastructure, advanced security',
    nodeConfigs: [
      { id: 'firewall', position: { x: 300, y: 50 } },
      { id: 'router', position: { x: 300, y: 150 }, connections: ['firewall'] },
      { id: 'switch', position: { x: 300, y: 250 }, connections: ['router'] },
      { id: 'waf', position: { x: 450, y: 250 }, connections: ['firewall'] },
      { id: 'server', position: { x: 150, y: 350 }, connections: ['switch'] },
      { id: 'storage', position: { x: 150, y: 450 }, connections: ['server'] },
      { id: 'webapp', position: { x: 450, y: 350 }, connections: ['waf'] },
      { id: 'api', position: { x: 450, y: 450 }, connections: ['webapp'] },
      { id: 'database', position: { x: 300, y: 550 }, connections: ['api', 'server'] },
      { id: 'iam', position: { x: 600, y: 150 }, connections: ['firewall'] },
      { id: 'pam', position: { x: 600, y: 250 }, connections: ['iam'] },
      { id: 'mfa', position: { x: 600, y: 350 }, connections: ['iam'] },
      { id: 'siem', position: { x: 750, y: 250 }, connections: ['firewall', 'waf'] },
      { id: 'soar', position: { x: 750, y: 350 }, connections: ['siem'] },
      { id: 'dlp', position: { x: 450, y: 550 }, connections: ['database'] },
      { id: 'edr', position: { x: 150, y: 550 }, connections: ['server', 'endpoint'] },
      { id: 'ids', position: { x: 750, y: 450 }, connections: ['switch', 'firewall'] },
      { id: 'encryption', position: { x: 300, y: 650 }, connections: ['database', 'storage'] }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'HIPAA-focused, patient data protection',
    nodeConfigs: [
      { id: 'firewall', position: { x: 300, y: 50 } },
      { id: 'router', position: { x: 300, y: 150 }, connections: ['firewall'] },
      { id: 'switch', position: { x: 300, y: 250 }, connections: ['router'] },
      { id: 'waf', position: { x: 450, y: 250 }, connections: ['firewall'] },
      { id: 'server', position: { x: 150, y: 350 }, connections: ['switch'] },
      { id: 'webapp', position: { x: 450, y: 350 }, connections: ['waf'] },
      { id: 'api', position: { x: 450, y: 450 }, connections: ['webapp'] },
      { id: 'database', position: { x: 300, y: 450 }, connections: ['api', 'server'] },
      { id: 'iam', position: { x: 600, y: 150 }, connections: ['firewall'] },
      { id: 'pam', position: { x: 600, y: 250 }, connections: ['iam'] },
      { id: 'mfa', position: { x: 600, y: 350 }, connections: ['iam'] },
      { id: 'dlp', position: { x: 450, y: 550 }, connections: ['database'] },
      { id: 'encryption', position: { x: 150, y: 450 }, connections: ['database'] },
      { id: 'siem', position: { x: 750, y: 350 }, connections: ['firewall', 'waf'] },
      { id: 'ids', position: { x: 750, y: 450 }, connections: ['switch', 'firewall'] }
    ]
  }
];