import { CheckCircle2, XCircle, Star, MapPin, Clock, ShoppingBag, AlertTriangle, Phone, Globe } from 'lucide-react';
import { Restaurant, Tienda, Marca } from '../hooks/useGoogleSheetsData';
import { celigoDatabase } from '../services/celigoDatabase';

interface SecurityIndicatorProps {
  isValid: boolean;
  hasAlert?: boolean;
  esAptoCeliacos?: boolean;
  verificacionCeliaca?: string;
}

export const SecurityIndicator = ({ isValid, hasAlert, esAptoCeliacos, verificacionCeliaca }: SecurityIndicatorProps) => {
  // Si explícitamente no es apto para celíacos
  if (esAptoCeliacos === false) {
    return (
      <div className="flex items-center gap-1 text-red-600">
        <XCircle className="w-5 h-5" />
        <span className="text-sm font-medium">❌ NO APTO CELÍACOS</span>
      </div>
    );
  }
  
  if (isValid || esAptoCeliacos === true) {
    return (
      <div className="flex items-center gap-1 text-green-600">
        <CheckCircle2 className="w-5 h-5" />
        <span className="text-sm font-medium">✅ APTO CELÍACOS</span>
      </div>
    );
  }
  
  if (hasAlert) {
    return (
      <div className="flex items-center gap-1 text-orange-500">
        <AlertTriangle className="w-5 h-5" />
        <span className="text-sm font-medium">⚠️ Precaución</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-1 text-red-500">
      <XCircle className="w-5 h-5" />
      <span className="text-sm font-medium">❓ Sin información</span>
    </div>
  );
};

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: () => void;
}

export const RestaurantCard = ({ restaurant, onClick }: RestaurantCardProps) => {
  // Obtener información del sistema CeliGO
  const celiGOInfo = celigoDatabase.filtrarAptosParaCeliacos([{
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
  }])[0];

  const badge = celigoDatabase.getBadgeSeguridad(
    restaurant.validadoSeguro ? '100gluten' : 'precaution',
    'directorio_maestro',
    celiGOInfo?.esAptoCeliacos,
    celiGOInfo?.advertenciaCeliaca
  );

  return (
    <div 
      className={`bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 hover:shadow-lg transition-all ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="title-lg text-on-surface mb-2">{restaurant.nombre}</h3>
          <p className="text-sm text-on-surface-variant mb-2">{restaurant.tipoCocina}</p>
          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            <MapPin className="w-4 h-4" />
            <span>{restaurant.direccion}</span>
          </div>
          
          {/* Información específica para celíacos */}
          {celiGOInfo?.verificacionCeliaca && (
            <div className={`mt-3 p-3 rounded-lg text-sm ${
              celiGOInfo.esAptoCeliacos === false 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              <p className="font-medium">{celiGOInfo.verificacionCeliaca}</p>
            </div>
          )}

          {/* Advertencia de riesgo */}
          {celiGOInfo?.riesgoContaminacion && (
            <div className="mt-2 p-3 rounded-lg bg-orange-50 text-orange-700 border border-orange-200 text-sm">
              <p className="font-medium">⚠️ Riesgo: {celiGOInfo.riesgoContaminacion}</p>
            </div>
          )}
        </div>
        
        <SecurityIndicator 
          isValid={restaurant.validadoSeguro} 
          esAptoCeliacos={celiGOInfo?.esAptoCeliacos}
          verificacionCeliaca={celiGOInfo?.verificacionCeliaca}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {restaurant.valoracion && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{restaurant.valoracion}</span>
            </div>
          )}
          {restaurant.telefono && (
            <button
              onClick={() => window.open(`tel:${restaurant.telefono}`, '_blank')}
              className="flex items-center gap-1 text-sm text-primary hover:text-primary-variant"
            >
              <Phone className="w-4 h-4" />
              <span>Llamar</span>
            </button>
          )}
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          badge.color === '#dc2626' ? 'bg-red-100 text-red-700' :
          badge.color === '#10b981' ? 'bg-green-100 text-green-700' :
          'bg-orange-100 text-orange-700'
        }`}>
          {badge.text}
        </div>
      </div>
    </div>
  );
};

interface TiendaCardProps {
  tienda: Tienda;
}

export const TiendaCard = ({ tienda }: TiendaCardProps) => {
  return (
    <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="title-lg text-on-surface mb-2">{tienda.nombre}</h3>
          <p className="text-sm text-on-surface-variant mb-2">{tienda.tipo}</p>
          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            <MapPin className="w-4 h-4" />
            <span>{tienda.direccion}</span>
          </div>
        </div>
        <SecurityIndicator isValid={tienda.validadoSeguro} />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {tienda.telefono && (
            <button
              onClick={() => window.open(`tel:${tienda.telefono}`, '_blank')}
              className="flex items-center gap-1 text-sm text-primary hover:text-primary-variant"
            >
              <Phone className="w-4 h-4" />
              <span>Llamar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface MarcaCardProps {
  marca: Marca;
}

export const MarcaCard = ({ marca }: MarcaCardProps) => {
  return (
    <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="title-lg text-on-surface mb-2">{marca.nombre}</h3>
          <p className="text-sm text-on-surface-variant mb-2">{marca.categoria}</p>
          <p className="text-sm text-on-surface-variant">{marca.descripcion}</p>
        </div>
        <SecurityIndicator isValid={marca.validadoSeguro} />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {marca.web && (
            <button
              onClick={() => window.open(marca.web, '_blank')}
              className="flex items-center gap-1 text-sm text-primary hover:text-primary-variant"
            >
              <Globe className="w-4 h-4" />
              <span>Web</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};