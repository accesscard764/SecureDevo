import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, Trash2 } from 'lucide-react';

interface ComponentData {
  component: {
    id: string;
    name: string;
    shortName: string;
    category: string;
    icon: JSX.Element;
  };
  darkMode: boolean;
  connections: {
    connected: boolean;
    status: 'secure' | 'warning' | 'error' | 'offline';
    message?: string;
  };
  onDelete?: (nodeId: string) => void;
}

const CustomNode = ({ data, selected, id }: NodeProps<ComponentData>) => {
  const { darkMode } = data;
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [showDeleteButton, setShowDeleteButton] = React.useState(false);
  
  // Update delete button visibility
  React.useEffect(() => {
    if (selected || isHovered || showDeleteConfirm) {
      setShowDeleteButton(true);
    } else {
      const timer = setTimeout(() => {
        setShowDeleteButton(false);
      }, 200); // Small delay to prevent flickering when moving between elements
      return () => clearTimeout(timer);
    }
  }, [selected, isHovered, showDeleteConfirm]);

  const getStatusStyles = () => {
    switch(data.connections.status) {
      case 'secure':
        return 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]';
      case 'warning':
        return 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]';
      case 'error':
        return 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]';
      case 'offline':
        return 'border-gray-500 shadow-[0_0_15px_rgba(107,114,128,0.5)]';
      default:
        return 'border-cyan shadow-[0_0_15px_rgba(0,246,255,0.3)]';
    }
  };

  const getHandleColor = () => {
    switch(data.connections.status) {
      case 'secure': return '!bg-green-500';
      case 'warning': return '!bg-yellow-400';
      case 'error': return '!bg-red-500';
      case 'offline': return '!bg-gray-500';
      default: return '!bg-cyan';
    }
  };

  const getStatusIcon = () => {
    if (data.connections.status === 'warning' || data.connections.status === 'error') {
      return (
        <div 
          className="absolute -top-2 -right-2 cursor-pointer z-10"
          onClick={(e) => {
            e.stopPropagation();
            setShowTooltip(!showTooltip);
          }}
        >
          <AlertTriangle 
            className={`w-5 h-5 ${
              data.connections.status === 'warning' ? 'text-yellow-400' : 'text-red-500'
            }`}
          />
          {showTooltip && (
            <div 
              className={`absolute top-6 right-0 z-50 p-3 rounded-lg shadow-lg text-sm w-64 ${
                darkMode ? 'bg-navy-light border border-gray-700' : 'bg-white border border-gray-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start">
                <Info className="w-4 h-4 text-cyan mt-0.5 mr-2" />
                <span>{data.connections.message || 'Connection status warning'}</span>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onDelete) {
      data.onDelete(id);
    }
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  const handleDeleteButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  return (
    <motion.div
      className={`p-3 min-w-[120px] max-w-[120px] border-2 rounded-lg shadow-lg relative ${
        darkMode ? 'bg-navy' : 'bg-white'
      } ${getStatusStyles()} ${selected ? 'ring-2 ring-cyan' : ''}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 200
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {getStatusIcon()}
      
      {/* Delete Button - Show when selected, hovered, or modal is open */}
      <AnimatePresence>
        {showDeleteButton && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-2 -left-2 z-20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              onClick={handleDeleteButtonClick}
              onMouseDown={(e) => e.stopPropagation()} // Prevent node deselection
              className={`p-1.5 rounded-full ${
                darkMode ? 'bg-navy-light hover:bg-red-900/20' : 'bg-white hover:bg-red-100'
              } border border-red-500 text-red-500 shadow-lg transition-colors duration-200`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-8 left-0 z-50 p-3 rounded-lg shadow-xl min-w-[160px] ${
              darkMode 
                ? 'bg-navy-light border border-gray-700' 
                : 'bg-white border border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm mb-3">Delete this component?</p>
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 flex-1"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className={`px-3 py-1.5 text-xs rounded-md flex-1 ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors duration-200`}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center mb-2">
        {data.component.icon}
      </div>
      <div className={`text-sm font-medium text-center truncate ${darkMode ? 'text-white' : 'text-navy'}`}>
        {data.component.shortName}
      </div>
      <div className={`text-xs opacity-70 text-center truncate ${darkMode ? 'text-gray' : 'text-navy-light'}`}>
        {data.component.category}
      </div>
      
      <Handle 
        type="target" 
        position={Position.Top} 
        className={`!w-3 !h-3 !border-2 !border-white ${getHandleColor()}`} 
        id="top-target"
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className={`!w-3 !h-3 !border-2 !border-white ${getHandleColor()}`} 
        id="bottom-source"
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        className={`!w-3 !h-3 !border-2 !border-white ${getHandleColor()}`} 
        id="left-target"
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className={`!w-3 !h-3 !border-2 !border-white ${getHandleColor()}`} 
        id="right-source"
      />
    </motion.div>
  );
};

export default CustomNode;