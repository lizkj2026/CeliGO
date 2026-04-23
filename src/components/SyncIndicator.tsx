import { Wifi, WifiOff, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface SyncIndicatorProps {
  syncStatus: {
    isOnline: boolean;
    lastSync: Date | null;
    pendingChanges: number;
    error: string | null;
  };
  onForceSync?: () => void;
}

export const SyncIndicator = ({ syncStatus, onForceSync }: SyncIndicatorProps) => {
  const { isOnline, lastSync, pendingChanges, error } = syncStatus;

  const formatLastSync = (date: Date | null) => {
    if (!date) return 'Nunca';
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) return 'Ahora';
    if (seconds < 3600) return `Hace ${Math.floor(seconds / 60)} min`;
    if (seconds < 86400) return `Hace ${Math.floor(seconds / 3600)} h`;
    return `Hace ${Math.floor(seconds / 86400)} d`;
  };

  const getStatusColor = () => {
    if (error) return 'text-red-500';
    if (!isOnline) return 'text-orange-500';
    if (pendingChanges > 0) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getStatusIcon = () => {
    if (error) return <AlertCircle className="w-4 h-4" />;
    if (!isOnline) return <WifiOff className="w-4 h-4" />;
    if (pendingChanges > 0) return <RefreshCw className="w-4 h-4 animate-spin" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  const getStatusText = () => {
    if (error) return 'Error de sincronización';
    if (!isOnline) return 'Sin conexión';
    if (pendingChanges > 0) return 'Sincronizando...';
    return 'Sincronizado';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-full border border-outline-variant/20"
    >
      <div className={`flex items-center gap-1 ${getStatusColor()}`}>
        {getStatusIcon()}
        <span className="text-xs font-medium">{getStatusText()}</span>
      </div>
      
      <div className="text-xs text-on-surface-variant">
        {formatLastSync(lastSync)}
      </div>

      {(error || !isOnline) && onForceSync && (
        <button
          onClick={onForceSync}
          className="p-1 hover:bg-surface-container rounded-full transition-colors"
          title="Forzar sincronización"
        >
          <RefreshCw className="w-3 h-3 text-on-surface-variant" />
        </button>
      )}
    </motion.div>
  );
};