import { Node, Edge } from 'reactflow';

// Define realistic connection rules between network components
const connectionRules = {
  // Infrastructure Layer
  'firewall': {
    validTargets: ['*'], // Allow all connections
    incompatibleTargets: [], // No strictly incompatible targets
    riskLevel: (target: string) => {
      if (['webapp', 'api'].includes(target)) return 'warning'; // Should go through WAF
      if (['router', 'switch', 'waf'].includes(target)) return 'secure';
      return 'warning';
    }
  },
  'router': {
    validTargets: ['*'],
    incompatibleTargets: [],
    riskLevel: (target: string) => {
      if (['firewall', 'switch'].includes(target)) return 'secure';
      if (target === 'server') return 'warning'; // Servers should be behind firewall
      return 'warning';
    }
  },
  'switch': {
    validTargets: ['*'],
    incompatibleTargets: [],
    riskLevel: (target: string) => {
      if (['server', 'endpoint', 'wap'].includes(target)) return 'secure';
      return 'warning';
    }
  },
  'server': {
    validTargets: ['*'],
    incompatibleTargets: [],
    riskLevel: (target: string) => {
      if (['database', 'storage'].includes(target)) return 'secure';
      if (['webapp', 'api'].includes(target)) return 'warning';
      return 'warning';
    }
  },
  'wap': {
    validTargets: ['*'],
    incompatibleTargets: [],
    riskLevel: (target: string) => {
      if (['switch', 'firewall'].includes(target)) return 'secure';
      return 'warning';
    }
  },
  'endpoint': {
    validTargets: ['*'],
    incompatibleTargets: [],
    riskLevel: (target: string) => {
      if (target === 'wap') return 'warning';
      if (target === 'switch') return 'secure';
      return 'warning';
    }
  },
  
  // Application Layer
  'webapp': {
    validTargets: ['*'],
    incompatibleTargets: [],
    riskLevel: (target: string, path: string[]) => {
      if (target === 'api') return 'secure';
      if (target === 'database') {
        // Check if there's a WAF in the path
        if (path.includes('waf')) return 'secure';
        return 'warning';
      }
      if (target === 'waf') return 'secure';
      return 'warning';
    }
  },
  'api': {
    validTargets: ['*'],
    incompatibleTargets: [],
    riskLevel: (target: string, path: string[]) => {
      if (['database', 'storage'].includes(target)) {
        if (path.includes('waf') || path.includes('firewall')) return 'secure';
        return 'warning';
      }
      return 'warning';
    }
  },
  'database': {
    validTargets: ['*'],
    incompatibleTargets: [],
    riskLevel: (target: string, path: string[]) => {
      if (target === 'storage') return 'secure';
      if (path.includes('waf') || path.includes('firewall')) return 'secure';
      return 'warning';
    }
  },
  'storage': {
    validTargets: ['*'],
    incompatibleTargets: [],
    riskLevel: (target: string, path: string[]) => {
      if (path.includes('encryption')) return 'secure';
      return 'warning';
    }
  },
  'microservices': {
    validTargets: ['*'],
    incompatibleTargets: [],
    riskLevel: (target: string, path: string[]) => {
      if (['api', 'database'].includes(target)) {
        if (path.includes('waf')) return 'secure';
        return 'warning';
      }
      return 'warning';
    }
  },
  
  // Security Controls
  'waf': {
    validTargets: ['*'],
    incompatibleTargets: [],
    riskLevel: (target: string) => {
      if (['webapp', 'api', 'database'].includes(target)) return 'secure';
      return 'warning';
    }
  },
  'iam': {
    validTargets: ['*'],
    incompatibleTargets: [],
    riskLevel: () => 'secure'
  },
  'dlp': {
    validTargets: ['*'],
    incompatibleTargets: [],
    riskLevel: () => 'secure'
  },
  'ids': {
    validTargets: ['*'],
    incompatibleTargets: [],
    riskLevel: () => 'secure'
  },
  'siem': {
    validTargets: ['*'],
    incompatibleTargets: [],
    riskLevel: () => 'secure'
  },
  'edr': {
    validTargets: ['*'],
    incompatibleTargets: [],
    riskLevel: () => 'secure'
  },
  'encryption': {
    validTargets: ['*'],
    incompatibleTargets: [],
    riskLevel: () => 'secure'
  }
};

// Find all paths between two nodes
const findAllPaths = (
  edges: Edge[],
  start: string,
  end: string,
  maxDepth: number = 10
): string[][] => {
  const paths: string[][] = [];
  
  const dfs = (current: string, path: string[], visited: Set<string>) => {
    if (path.length > maxDepth) return;
    if (current === end) {
      paths.push([...path]);
      return;
    }
    
    const nextNodes = edges
      .filter(edge => edge.source === current && !visited.has(edge.target))
      .map(edge => edge.target);
    
    for (const next of nextNodes) {
      visited.add(next);
      dfs(next, [...path, next], visited);
      visited.delete(next);
    }
  };
  
  dfs(start, [start], new Set([start]));
  return paths;
};

// Get component type from node ID
const getComponentType = (nodeId: string): string => nodeId.split('-')[0];

// Evaluate security of a complete path
const evaluatePathSecurity = (path: string[], edges: Edge[]): {
  status: 'secure' | 'warning' | 'error';
  message: string;
} => {
  // Extract component types from the path
  const componentPath = path.map(getComponentType);
  
  // Check if path includes necessary security controls
  const hasWAF = componentPath.includes('waf');
  const hasFirewall = componentPath.includes('firewall');
  const hasIAM = componentPath.includes('iam');
  
  // Check for direct access to sensitive components
  if (componentPath.includes('database')) {
    if (!hasWAF && !hasFirewall) {
      return {
        status: 'warning',
        message: 'Database access without proper security controls (WAF/Firewall)'
      };
    }
  }
  
  // Check for proper authentication
  if (componentPath.includes('webapp') || componentPath.includes('api')) {
    if (!hasIAM) {
      return {
        status: 'warning',
        message: 'Application access without proper authentication controls'
      };
    }
  }
  
  return {
    status: 'secure',
    message: 'Path includes necessary security controls'
  };
};

export const validateConnection = (
  sourceNode: string,
  targetNode: string,
  edges: Edge[] = []
): { 
  valid: boolean;
  riskLevel: 'secure' | 'warning' | 'error' | 'offline';
  message: string;
} => {
  const sourceType = getComponentType(sourceNode);
  const targetType = getComponentType(targetNode);
  
  // Always allow connections but evaluate security
  const rules = connectionRules[sourceType as keyof typeof connectionRules];
  if (!rules) {
    return {
      valid: true,
      riskLevel: 'warning',
      message: 'No specific security rules defined for this connection'
    };
  }

  // Find all existing paths between these components
  const allPaths = findAllPaths(edges, sourceNode, targetNode);
  const allPathTypes = allPaths.map(path => path.map(getComponentType));
  
  // If there are existing paths, evaluate their security
  if (allPaths.length > 0) {
    const pathSecurityResults = allPaths.map(path => evaluatePathSecurity(path, edges));
    
    // If any path is secure, consider the connection secure
    if (pathSecurityResults.some(result => result.status === 'secure')) {
      return {
        valid: true,
        riskLevel: 'secure',
        message: 'Secure path exists through security controls'
      };
    }
    
    // Otherwise use the best available path
    const bestResult = pathSecurityResults.reduce((best, current) => {
      if (current.status === 'secure') return current;
      if (current.status === 'warning' && best.status === 'error') return current;
      return best;
    });
    
    return {
      valid: true,
      riskLevel: bestResult.status,
      message: bestResult.message
    };
  }
  
  // For new direct connections, evaluate based on component types
  const riskLevel = rules.riskLevel(targetType, [sourceType, targetType]);
  
  return {
    valid: true,
    riskLevel,
    message: getRiskMessage(sourceType, targetType, riskLevel)
  };
};

const getRiskMessage = (
  source: string,
  target: string,
  riskLevel: 'secure' | 'warning' | 'error'
): string => {
  switch (riskLevel) {
    case 'secure':
      return `Secure connection from ${source} to ${target} following security best practices`;
    case 'warning':
      return `Connection from ${source} to ${target} may need additional security controls`;
    case 'error':
      return `Insecure connection from ${source} to ${target} - consider adding security controls`;
    default:
      return 'Connection status unknown';
  }
};