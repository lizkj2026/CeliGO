import { useState, useEffect, useCallback } from 'react';
import { getSheetData } from '../services/googleSheets';

interface SyncConfig {
  interval: number; // en milisegundos
  enabled: boolean;
  lastSync: Date | null;
}

interface SyncStatus {
  isOnline: boolean;
  lastSync: Date | null;
  pendingChanges: number;
  error: string | null;
}

export const useRealtimeSync = (sheetNames: string[] = ['Restaurantes', 'Tiendas', 'Marcas']) => {
  const [syncConfig, setSyncConfig] = useState<SyncConfig>({
    interval: 30000, // 30 segundos
    enabled: true,
    lastSync: null
  });

  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: navigator.onLine,
    lastSync: null,
    pendingChanges: 0,
    error: null
  });

  const [data, setData] = useState<Record<string, any[]>>({});
  const [listeners, setListeners] = useState<Record<string, Function[]>>({});

  // Función para sincronizar datos
  const syncData = useCallback(async () => {
    if (!syncConfig.enabled || !syncStatus.isOnline) return;

    try {
      setSyncStatus(prev => ({ ...prev, error: null }));

      const updatedData: Record<string, any[]> = {};
      
      // Obtener datos de todas las pestañas configuradas
      for (const sheetName of sheetNames) {
        const sheetData = await getSheetData(sheetName);
        updatedData[sheetName] = sheetData;
      }

      // Actualizar datos
      setData(updatedData);
      
      // Actualizar estado de sincronización
      const now = new Date();
      setSyncStatus(prev => ({
        ...prev,
        lastSync: now,
        pendingChanges: 0
      }));
      
      setSyncConfig(prev => ({
        ...prev,
        lastSync: now
      }));

      console.log('🔄 Datos sincronizados correctamente');

    } catch (error) {
      console.error('❌ Error en sincronización:', error);
      setSyncStatus(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Error desconocido'
      }));
    }
  }, [syncConfig.enabled, syncStatus.isOnline, sheetNames]);

  // Efecto para sincronización inicial
  useEffect(() => {
    if (!syncConfig.enabled) return;

    // Sincronización inicial
    syncData();
  }, [syncConfig.enabled, syncData]);

  // Efecto para detectar estado de conexión
  useEffect(() => {
    const handleOnline = () => setSyncStatus(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setSyncStatus(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Función para suscribirse a cambios
  const subscribe = (event: string, callback: Function) => {
    setListeners(prev => ({
      ...prev,
      [event]: [...(prev[event] || []), callback]
    }));

    // Retornar función para unsuscribirse
    return () => {
      setListeners(prev => ({
        ...prev,
        [event]: prev[event].filter(cb => cb !== callback)
      }));
    };
  };

  // Función para forzar sincronización manual
  const forceSync = async () => {
    await syncData();
  };

  // Función para configurar sincronización
  const updateConfig = (newConfig: Partial<SyncConfig>) => {
    setSyncConfig(prev => ({ ...prev, ...newConfig }));
  };

  return {
    data,
    syncStatus,
    syncConfig,
    subscribe,
    forceSync,
    updateConfig,
    setupWebSocket: () => null // Deshabilitado por ahora
  };
};