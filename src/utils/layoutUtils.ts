import dagre from 'dagre';
import { Node, Edge } from 'reactflow';

const nodeWidth = 150;
const nodeHeight = 100;

export const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  // Set graph direction and spacing
  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: 200,  // Increased horizontal spacing
    ranksep: 150,  // Increased vertical spacing
    marginx: 100,
    marginy: 100,
    ranker: 'network-simplex'  // Use network-simplex for better hierarchical layout
  });
  
  // Add nodes to dagre graph
  nodes.forEach(node => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
  
  // Add edges to dagre graph
  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
  
  // Calculate layout
  dagre.layout(dagreGraph);
  
  // Get new node positions with increased spacing
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