import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  Navigation,
  Share2,
  Heart,
  ExternalLink
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { CeliGoLogo } from '../App';

interface RestaurantDetailScreenProps {
  restaurantId: string;
}

export const RestaurantDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { restaurantes, saveScrollPosition, getScrollPosition } = useAppContext();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restaurar posición del scroll
    const scrollPos = getScrollPosition('restaurantes');
    if (scrollPos > 0) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }

    // Buscar el restaurante
    const foundRestaurant = restaurantes.find(r => r.id === id);
    setRestaurant(foundRestaurant || null);
    setLoading(false);
  }, [id, restaurantes, getScrollPosition]);

  const handleBack = () => {
    // Guardar posición actual antes de volver
    saveScrollPosition('restaurantes', window.pageYOffset);
    navigate('/restaurantes');
  };

  const getSafetyIcon = (validado: boolean) => {
    return validado ? (
      <CheckCircle className="w-5 h-5 text-green-600" />
    ) : (
      <AlertTriangle className="w-5 h-5 text-yellow-600" />
    );
  };

  const getSafetyText = (validado: boolean) => {
    return validado ? 'Certificado 100% Sin Gluten' : 'Con precaución';
  };

  const getSafetyColor = (validado: boolean) => {
    return validado ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-on-surface-variant">Cargando restaurante...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-surface flex flex-col"
      >
        <header className="sticky top-0 bg-surface-container-highest backdrop-blur-lg z-40 border-b border-outline-variant/10">
          <div className="flex items-center justify-between h-16 px-6">
            <button onClick={handleBack} className="p-2 hover:bg-surface-container rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-on-surface" />
            </button>
            <CeliGoLogo color="#BA4A00" className="text-2xl" />
            <div className="w-10" />
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <p className="text-on-surface-variant mb-4">Restaurante no encontrado</p>
            <button 
              onClick={handleBack}
              className="px-6 py-2 bg-primary text-white rounded-full font-medium"
            >
              Volver a restaurantes
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-surface pb-20"
    >
      {/* Header con imagen de fondo */}
      <div className="relative">
        <div className="h-64 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <CeliGoLogo color="#BA4A00" className="text-6xl opacity-20" />
        </div>
        
        {/* Header overlay */}
        <header className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center justify-between h-16 px-6">
            <button 
              onClick={handleBack} 
              className="p-2 bg-white/20 backdrop-blur-md rounded-full transition-colors hover:bg-white/30"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex gap-2">
              <button className="p-2 bg-white/20 backdrop-blur-md rounded-full transition-colors hover:bg-white/30">
                <Heart className="w-6 h-6 text-white" />
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-md rounded-full transition-colors hover:bg-white/30">
                <Share2 className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Contenido principal */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-6 -mt-8"
      >
        {/* Tarjeta principal */}
        <div className="bg-surface-container rounded-3xl shadow-xl p-6 mb-6">
          {/* Nombre y calificación */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-on-surface mb-2">
                {restaurant.nombre}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold text-on-surface">
                    {restaurant.valoracion || 4.5}
                  </span>
                </div>
                <span className="text-on-surface-variant">•</span>
                <span className="text-on-surface-variant">
                  {restaurant.tipoCocina}
                </span>
              </div>
            </div>
          </div>

          {/* Badge de seguridad */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getSafetyColor(restaurant.validadoSeguro)}`}>
            {getSafetyIcon(restaurant.validadoSeguro)}
            {getSafetyText(restaurant.validadoSeguro)}
          </div>
        </div>

        {/* Información de contacto */}
        <div className="bg-surface-container rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="text-lg font-semibold text-on-surface mb-4">Información</h2>
          
          {/* Dirección */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-on-surface">Dirección</p>
              <p className="text-on-surface-variant">{restaurant.direccion}</p>
              <p className="text-on-surface-variant">{restaurant.ciudad}</p>
            </div>
          </div>

          {/* Teléfono */}
          {restaurant.telefono && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-on-surface">Teléfono</p>
                <a 
                  href={`tel:${restaurant.telefono}`}
                  className="text-primary hover:underline"
                >
                  {restaurant.telefono}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Descripción */}
        {restaurant.descripcion && (
          <div className="bg-surface-container rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-on-surface mb-4">Sobre este lugar</h2>
            <p className="text-on-surface-variant leading-relaxed">
              {restaurant.descripcion}
            </p>
          </div>
        )}

        {/* Acciones */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="h-14 bg-primary text-white rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
            <Navigation className="w-5 h-5" />
            Cómo llegar
          </button>
          <button className="h-14 bg-surface-container text-on-surface rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-surface-container-hover transition-colors">
            <Phone className="w-5 h-5" />
            Llamar ahora
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};