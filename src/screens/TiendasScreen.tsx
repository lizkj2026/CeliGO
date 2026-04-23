import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useGoogleSheetsData } from '../hooks/useGoogleSheetsData';
import { TiendaCard } from '../components/DataCards';
import { CeliGoLogo } from '../components/CeliGoLogo';
import { useAppContext } from '../contexts/AppContext';

export const TiendasScreen = () => {
  const navigate = useNavigate();
  const { tiendas, loading, error } = useGoogleSheetsData();
  const { searchTerms, setSearchTerms, saveScrollPosition, getScrollPosition } = useAppContext();

  // Restaurar scroll al entrar
  useEffect(() => {
    const scrollPos = getScrollPosition('tiendas');
    if (scrollPos > 0) {
      window.scrollTo(0, scrollPos);
    }
  }, [getScrollPosition]);

  // Guardar scroll al salir
  useEffect(() => {
    const handleScroll = () => {
      saveScrollPosition('tiendas', window.pageYOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [saveScrollPosition]);

  const filteredTiendas = tiendas.filter(tienda => 
    tienda.nombre.toLowerCase().includes(searchTerms.tiendas.toLowerCase()) ||
    tienda.especialidad.toLowerCase().includes(searchTerms.tiendas.toLowerCase()) ||
    tienda.ubicacion.toLowerCase().includes(searchTerms.tiendas.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-on-surface-variant">Cargando tiendas...</p>
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
          <CeliGoLogo color="#4A235A" className="text-2xl" />
          <div className="w-10" />
        </div>
      </header>

      <div className="px-6 pt-6">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-on-surface mb-2">Tiendas</h1>
          <p className="text-on-surface-variant">
            {filteredTiendas.length} establecimientos encontrados
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
          <input
            type="text"
            placeholder="Buscar tiendas..."
            value={searchTerms.tiendas}
            onChange={(e) => setSearchTerms({ tiendas: e.target.value })}
            className="w-full h-12 pl-12 pr-4 bg-surface-container rounded-full border border-outline-variant/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Store List */}
        <div className="space-y-4">
          {filteredTiendas.map((tienda, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <TiendaCard tienda={tienda} />
            </motion.div>
          ))}
        </div>

        {filteredTiendas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-on-surface-variant">No se encontraron tiendas</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};