import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useGoogleSheetsData } from '../hooks/useGoogleSheetsData';
import { RestaurantCard } from '../components/DataCards';
import { SyncIndicator } from '../components/SyncIndicator';
import { CeliGoLogo } from '../components/CeliGoLogo';
import { celigoDatabase } from '../services/celigoDatabase';
import { useAppContext } from '../contexts/AppContext';

export const RestaurantesScreen = () => {
  const navigate = useNavigate();
  const { restaurantes, loading, error, syncStatus, forceSync } = useGoogleSheetsData();
  const { searchTerms, setSearchTerms, saveScrollPosition, getScrollPosition } = useAppContext();
  const [filterValid, setFilterValid] = useState<'all' | 'valid' | 'invalid'>('all');

  // Restaurar scroll al entrar
  useEffect(() => {
    const scrollPos = getScrollPosition('restaurantes');
    if (scrollPos > 0) {
      window.scrollTo(0, scrollPos);
    }
  }, [getScrollPosition]);

  // Guardar scroll al salir
  useEffect(() => {
    const handleScroll = () => {
      saveScrollPosition('restaurantes', window.pageYOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [saveScrollPosition]);

  const filteredRestaurantes = restaurantes.filter(restaurant => {
    const matchesSearch = restaurant.nombre.toLowerCase().includes(searchTerms.restaurantes.toLowerCase()) ||
                         restaurant.tipoCocina.toLowerCase().includes(searchTerms.restaurantes.toLowerCase()) ||
                         restaurant.direccion.toLowerCase().includes(searchTerms.restaurantes.toLowerCase());
    
    // Filtrar por seguridad para celíacos
    const esAptoCeliacos = celigoDatabase.filtrarAptosParaCeliacos([{
      id: restaurant.id,
      name: restaurant.nombre,
      address: restaurant.direccion,
      city: restaurant.ciudad || 'Desconocida',
      coordinates: { lat: 0, lng: 0 },
      type: 'restaurant',
      safety: restaurant.validadoSeguro ? '100gluten' : 'precaution',
      rating: restaurant.valoracion || 4,
      phone: restaurant.telefono,
      description: restaurant.descripcion || '',
      source: 'directorio_maestro'
    }]).length > 0;
    
    if (filterValid === 'valid') return matchesSearch && restaurant.validadoSeguro && esAptoCeliacos;
    if (filterValid === 'invalid') return matchesSearch && !esAptoCeliacos;
    return matchesSearch && esAptoCeliacos; // Solo mostrar aptos por defecto
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-on-surface-variant">Cargando restaurantes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-white rounded-full font-medium"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-surface pb-32"
    >
      {/* Header */}
      <header className="sticky top-0 bg-surface-container-highest backdrop-blur-lg z-40 border-b border-outline-variant/10">
        <div className="flex items-center justify-between h-16 px-6">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-surface-container rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-on-surface" />
          </button>
          <CeliGoLogo color="#0F5238" className="text-2xl" />
          <div className="w-10" />
        </div>
      </header>

      <div className="px-6 pt-6">
        {/* Title */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-on-surface mb-2">Restaurantes</h1>
            <p className="text-on-surface-variant">
              {filteredRestaurantes.length} lugares encontrados
            </p>
          </div>
          <SyncIndicator syncStatus={syncStatus} onForceSync={forceSync} />
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
          <input
            type="text"
            placeholder="Buscar restaurantes..."
            value={searchTerms.restaurantes}
            onChange={(e) => setSearchTerms({ restaurantes: e.target.value })}
            className="w-full h-12 pl-12 pr-4 bg-surface-container rounded-full border border-outline-variant/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterValid('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filterValid === 'all' 
                ? 'bg-primary text-on-primary' 
                : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterValid('valid')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              filterValid === 'valid' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            ✓ Certificados
          </button>
          <button
            onClick={() => setFilterValid('invalid')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              filterValid === 'invalid' 
                ? 'bg-red-100 text-red-700' 
                : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            ✗ Precaución
          </button>
        </div>

        {/* Restaurant List */}
        <div className="space-y-4">
          {filteredRestaurantes.map((restaurant, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <RestaurantCard 
                restaurant={restaurant} 
                onClick={() => navigate(`/restaurantes/${restaurant.id}`)}
              />
            </motion.div>
          ))}
        </div>

        {filteredRestaurantes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-on-surface-variant">No se encontraron restaurantes</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};