import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useGoogleSheetsData } from '../hooks/useGoogleSheetsData';

// Tipos de datos
export interface Local {
  id: string;
  name: string;
  address: string;
  city: string;
  type: 'restaurant' | 'tienda' | 'marca';
  category: string;
  safety: '100gluten' | 'protocol' | 'precaution';
  rating: number;
  phone?: string;
  distance?: number;
  lat?: number;
  lng?: number;
  description: string;
  products?: number;
  schedule?: string;
}

export interface AppContextType {
  // Estado de navegación
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  navigationHistory: string[];
  addToHistory: (screen: string) => void;
  goBack: () => void;
  
  // Estado de datos
  restaurantes: any[];
  tiendas: any[];
  marcas: any[];
  loading: boolean;
  error: string | null;
  
  // Estado de filtros y búsqueda
  searchTerms: {
    restaurantes: string;
    tiendas: string;
    marcas: string;
  };
  setSearchTerms: (terms: Partial<typeof searchTerms>) => void;
  
  // Estado de scroll
  scrollPositions: Record<string, number>;
  saveScrollPosition: (screen: string, position: number) => void;
  getScrollPosition: (screen: string) => number;
  
  // Acciones
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Usar el hook de Google Sheets para obtener datos reales
  const { restaurantes, tiendas, marcas, loading, error, syncStatus, forceSync } = useGoogleSheetsData();
  
  // Estado de navegación
  const [currentScreen, setCurrentScreen] = useState('home');
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['home']);
  
  // Estado de filtros y búsqueda
  const [searchTerms, setSearchTermsState] = useState({
    restaurantes: '',
    tiendas: '',
    marcas: ''
  });
  
  // Estado de scroll
  const [scrollPositions, setScrollPositions] = useState<Record<string, number>>({});
  
  // Navegación
  const addToHistory = (screen: string) => {
    setNavigationHistory(prev => [...prev, screen]);
    setCurrentScreen(screen);
  };
  
  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop();
      const previousScreen = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setCurrentScreen(previousScreen);
    }
  };
  
  // Búsqueda
  const setSearchTerms = (terms: Partial<typeof searchTerms>) => {
    setSearchTermsState(prev => ({ ...prev, ...terms }));
  };
  
  // Scroll
  const saveScrollPosition = (screen: string, position: number) => {
    setScrollPositions(prev => ({ ...prev, [screen]: position }));
  };
  
  const getScrollPosition = (screen: string) => {
    return scrollPositions[screen] || 0;
  };
  
  // Refrescar datos
  const refreshData = async () => {
    await forceSync();
  };
  
  const value: AppContextType = {
    // Navegación
    currentScreen,
    setCurrentScreen,
    navigationHistory,
    addToHistory,
    goBack,
    
    // Datos (del hook de Google Sheets)
    restaurantes,
    tiendas,
    marcas,
    loading,
    error,
    
    // Búsqueda
    searchTerms,
    setSearchTerms,
    
    // Scroll
    scrollPositions,
    saveScrollPosition,
    getScrollPosition,
    
    // Acciones
    refreshData
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};