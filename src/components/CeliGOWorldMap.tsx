/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Mapa Interactivo Mundial CeliGO - Esencial para la Comunidad Celíaca
// Visualización global de lugares seguros y peligrososos para celíacos

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Navigation, Filter, Search, AlertTriangle, CheckCircle2, XCircle, Info, Star, MessageCircle, Share2, Maximize2, Minimize2 } from 'lucide-react';
import { CeliGOPlace, CeliGOUtils } from '../data/CeliGODatabase';

interface MapMarker {
  id: string;
  place: CeliGOPlace;
  position: { lat: number; lng: number };
  isSelected: boolean;
}

interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

interface FilterOptions {
  safetyLevel: 'ALL' | 'SAFE' | 'CAUTION' | 'AVOID';
  category: 'ALL' | 'restaurant' | 'shop' | 'brand';
  searchQuery: string;
  showOnlyCertified: boolean;
}

const CeliGOWorldMap: React.FC = () => {
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<CeliGOPlace | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    safetyLevel: 'ALL',
    category: 'ALL',
    searchQuery: '',
    showOnlyCertified: false
  });
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 40.4168, lng: -3.7038 });
  const [zoom, setZoom] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Inicializar marcadores desde la base de datos
  useEffect(() => {
    const initializeMarkers = () => {
      const places = CeliGODatabase.filter(place => place.location.coordinates);
      const mapMarkers: MapMarker[] = places.map(place => ({
        id: place.id,
        place,
        position: place.location.coordinates!,
        isSelected: false
      }));
      setMarkers(mapMarkers);
      setIsLoading(false);
    };

    initializeMarkers();
  }, []);

  // Obtener ubicación del usuario
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          setMapCenter(userPos);
          setZoom(12);
        },
        (error) => {
          console.warn('No se pudo obtener la ubicación:', error);
        }
      );
    }
  }, []);

  // Filtrar marcadores según los filtros activos
  const filteredMarkers = useCallback(() => {
    return markers.filter(marker => {
      const { place } = marker;
      
      // Filtrar por nivel de seguridad
      if (filters.safetyLevel !== 'ALL' && place.safetyLevel !== filters.safetyLevel) {
        return false;
      }
      
      // Filtrar por categoría
      if (filters.category !== 'ALL' && place.category !== filters.category) {
        return false;
      }
      
      // Filtrar por búsqueda
      if (filters.searchQuery && !place.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filtrar solo certificados
      if (filters.showOnlyCertified && !place.certification) {
        return false;
      }
      
      return true;
    });
  }, [markers, filters]);

  // Obtener color según nivel de seguridad
  const getSafetyColor = (safetyLevel: string): string => {
    switch (safetyLevel) {
      case 'SAFE': return '#10b981'; // verde
      case 'CAUTION': return '#f59e0b'; // ámbar
      case 'AVOID': return '#ef4444'; // rojo
      default: return '#6b7280'; // gris
    }
  };

  // Obtener icono según categoría
  const getCategoryIcon = (category: string): string => {
    switch (category) {
      case 'restaurant': return '🍽️';
      case 'shop': return '🛒';
      case 'brand': return '🏭';
      default: return '📍';
    }
  };

  // Manejar clic en marcador
  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedPlace(marker.place);
    setMarkers(prev => prev.map(m => ({ ...m, isSelected: m.id === marker.id })));
  };

  // Centrar mapa en ubicación del usuario
  const centerOnUser = () => {
    if (userLocation) {
      setMapCenter(userLocation);
      setZoom(15);
    }
  };

  // Renderizar marcador en el mapa
  const renderMarker = (marker: MapMarker) => {
    const color = getSafetyColor(marker.place.safetyLevel);
    const icon = getCategoryIcon(marker.place.category);
    
    return (
      <div
        key={marker.id}
        className={`absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-200 hover:scale-110 ${marker.isSelected ? 'scale-125 z-20' : 'z-10'}`}
        style={{
          left: '50%',
          top: '100%',
          transform: `translate(-50%, -100%) ${marker.isSelected ? 'scale(1.25)' : 'scale(1)'}`
        }}
        onClick={() => handleMarkerClick(marker)}
      >
        <div className="relative">
          {/* Marcador principal */}
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white"
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>
          
          {/* Indicador de certificación */}
          {marker.place.certification && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white" />
          )}
          
          {/* Badge de seguridad */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-bold text-white whitespace-nowrap"
               style={{ backgroundColor: color }}>
            {marker.place.safetyLevel === 'SAFE' && '✓ SEGURO'}
            {marker.place.safetyLevel === 'CAUTION' && '⚠ PRECAUCIÓN'}
            {marker.place.safetyLevel === 'AVOID' && '✗ EVITAR'}
          </div>
        </div>
      </div>
    );
  };

  // Renderizar panel de información del lugar seleccionado
  const renderPlaceInfo = () => {
    if (!selectedPlace) return null;

    const color = getSafetyColor(selectedPlace.safetyLevel);
    const icon = getCategoryIcon(selectedPlace.category);

    return (
      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-2xl p-4 max-w-md z-30">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                 style={{ backgroundColor: `${color}20`, color }}>
              {icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{selectedPlace.name}</h3>
              <p className="text-sm text-gray-600">{selectedPlace.subcategory}</p>
            </div>
          </div>
          <button 
            onClick={() => setSelectedPlace(null)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XCircle className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Badge de seguridad */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1`}
               style={{ backgroundColor: color }}>
            {selectedPlace.safetyLevel === 'SAFE' && <CheckCircle2 className="w-3 h-3" />}
            {selectedPlace.safetyLevel === 'CAUTION' && <AlertTriangle className="w-3 h-3" />}
            {selectedPlace.safetyLevel === 'AVOID' && <XCircle className="w-3 h-3" />}
            {selectedPlace.safetyLevel === 'SAFE' && '100% SEGURO'}
            {selectedPlace.safetyLevel === 'CAUTION' && 'PRECAUCIÓN'}
            {selectedPlace.safetyLevel === 'AVOID' && 'EVITAR'}
          </div>
          {selectedPlace.certification && (
            <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
              CERTIFICADO
            </div>
          )}
        </div>

        {/* Información de ubicación */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{selectedPlace.location.address}</span>
          </div>
          {selectedPlace.contact.phone && (
            <div className="text-sm text-gray-600">
              📞 {selectedPlace.contact.phone}
            </div>
          )}
        </div>

        {/* Rating de la comunidad */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(selectedPlace.verification.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
            <span className="text-sm text-gray-600 ml-1">
              ({selectedPlace.verification.communityReports})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MessageCircle className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Notas importantes */}
        {selectedPlace.notes && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 leading-relaxed">{selectedPlace.notes}</p>
          </div>
        )}
      </div>
    );
  };

  // Renderizar controles del mapa
  const renderMapControls = () => {
    return (
      <div className="absolute top-4 right-4 z-20 space-y-2">
        {/* Control de búsqueda */}
        <div className="bg-white rounded-lg shadow-lg p-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar lugares..."
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Control de filtros */}
        <div className="bg-white rounded-lg shadow-lg p-2">
          <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Filtros</span>
          </button>
        </div>

        {/* Control de ubicación */}
        <button
          onClick={centerOnUser}
          className="bg-white rounded-lg shadow-lg p-2 hover:bg-gray-50 transition-colors"
          title="Mi ubicación"
        >
          <Navigation className="w-4 h-4 text-gray-600" />
        </button>

        {/* Control de pantalla completa */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="bg-white rounded-lg shadow-lg p-2 hover:bg-gray-50 transition-colors"
          title="Pantalla completa"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4 text-gray-600" /> : <Maximize2 className="w-4 h-4 text-gray-600" />}
        </button>
      </div>
    );
  };

  // Renderizar leyenda
  const renderLegend = () => {
    return (
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 z-20">
        <h4 className="text-xs font-bold text-gray-700 mb-2">LEYENDA</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-gray-600">100% Seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-xs text-gray-600">Precaución</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-xs text-gray-600">Evitar</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="text-xs text-gray-600">Certificado</span>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar estadísticas
  const renderStats = () => {
    const filtered = filteredMarkers();
    const safe = filtered.filter(m => m.place.safetyLevel === 'SAFE').length;
    const caution = filtered.filter(m => m.place.safetyLevel === 'CAUTION').length;
    const avoid = filtered.filter(m => m.place.safetyLevel === 'AVOID').length;

    return (
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 z-20">
        <h4 className="text-xs font-bold text-gray-700 mb-2">ESTADÍSTICAS</h4>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between gap-4">
            <span className="text-gray-600">Total:</span>
            <span className="font-bold">{filtered.length}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-green-600">Seguros:</span>
            <span className="font-bold text-green-600">{safe}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-amber-600">Precaución:</span>
            <span className="font-bold text-amber-600">{caution}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-red-600">Evitar:</span>
            <span className="font-bold text-red-600">{avoid}</span>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando mapa CeliGO...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-gray-100 ${isFullscreen ? 'fixed inset-0 z-50' : 'h-screen'}`}>
      {/* Mapa simulado */}
      <div 
        ref={mapRef}
        className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
        }}
      >
        {/* Cuadrícula del mapa */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full border-t border-gray-300" style={{ top: `${i * 5}%` }} />
          ))}
          {[...Array(20)].map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full border-l border-gray-300" style={{ left: `${i * 5}%` }} />
          ))}
        </div>

        {/* Ubicación del usuario */}
        {userLocation && (
          <div 
            className="absolute w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg z-15"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping" />
          </div>
        )}

        {/* Marcadores */}
        {filteredMarkers().map(marker => renderMarker(marker))}
      </div>

      {/* Controles del mapa */}
      {renderMapControls()}

      {/* Leyenda */}
      {renderLegend()}

      {/* Estadísticas */}
      {renderStats()}

      {/* Información del lugar seleccionado */}
      {renderPlaceInfo()}

      {/* Indicador de conexión */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold z-20">
        🟢 CeliGO Conectado
      </div>
    </div>
  );
};

export default CeliGOWorldMap;