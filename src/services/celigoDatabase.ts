// Servicio de Base de Datos Híbrida CeliGO
import { mapaMundialCeliGO, directorioMaestroCeliGO } from '../data/celigoDatabase';
import restaurantesInvestigados from '../data/restaurantesInvestigados';

export interface LocalCeliGO {
  id: string;
  name: string;
  address: string;
  city: string;
  coordinates: { lat: number; lng: number };
  type: 'restaurant' | 'tienda' | 'marca';
  safety: '100gluten' | 'protocol' | 'precaution';
  rating: number;
  phone?: string;
  description: string;
  distance?: number;
  photos?: string[];
  mi_valoracion?: number;
  source: 'directorio_maestro' | 'mapa_mundial';
  isHighlighted?: boolean; // Para prioridad visual
  // Información específica para celíacos
  esAptoCeliacos?: boolean;
  verificacionCeliaca?: string;
  riesgoContaminacion?: string;
  advertenciaCeliaca?: string;
  web?: string;
  instagram?: string;
}

class CeliGODatabaseService {
  private directorioMaestro = directorioMaestroCeliGO;
  private mapaMundial = mapaMundialCeliGO;
  private restaurantesInvestigados = restaurantesInvestigados;

  constructor() {
    // Actualizar la base de datos con la investigación real para celíacos
    this.actualizarBaseDatosConInvestigacion();
  }

  // Actualizar la base de datos con información real para celíacos
  private actualizarBaseDatosConInvestigacion() {
    this.restaurantesInvestigados.forEach(restauranteInvestigado => {
      // Actualizar en Directorio Maestro
      const indexDirectorio = this.directorioMaestro.findIndex(
        local => local.id === restauranteInvestigado.id
      );
      if (indexDirectorio !== -1) {
        this.directorioMaestro[indexDirectorio] = {
          ...this.directorioMaestro[indexDirectorio],
          ...restauranteInvestigado
        };
      }

      // Actualizar en Mapa Mundial
      const indexMapa = this.mapaMundial.findIndex(
        local => local.id === restauranteInvestigado.id
      );
      if (indexMapa !== -1) {
        this.mapaMundial[indexMapa] = {
          ...this.mapaMundial[indexMapa],
          ...restauranteInvestigado
        };
      }
    });
  }

  // Filtrar restaurantes que son aptos para celíacos
  private filtrarAptosParaCeliacos(locales: LocalCeliGO[]): LocalCeliGO[] {
    return locales.filter(local => {
      // Si no es restaurante, incluirlo automáticamente
      if (local.type !== 'restaurant') {
        return true;
      }

      // Para restaurantes, verificar que sean aptos para celíacos
      if (local.esAptoCeliacos === false) {
        return false; // Excluir explícitamente los no aptos
      }

      if (local.esAptoCeliacos === true) {
        return true; // Incluir explícitamente los aptos
      }

      // Criterio por defecto: solo incluir 100% sin gluten o con protocolo
      return local.safety === '100gluten' || local.safety === 'protocol';
    });
  }

  // Calcular distancia entre dos puntos (fórmula de Haversine)
  private calcularDistancia(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Buscar locales en un radio específico (por defecto 20km)
  async buscarLocalesPorRadio(
    userLat: number, 
    userLng: number, 
    radioKm: number = 20
  ): Promise<LocalCeliGO[]> {
    // 1. Buscar primero en Directorio Maestro (prioridad)
    const localesDirectorio = this.directorioMaestro
      .map(local => ({
        ...local,
        distance: this.calcularDistancia(userLat, userLng, local.coordinates.lat, local.coordinates.lng),
        isHighlighted: true
      }))
      .filter(local => local.distance <= radioKm);

    // 2. Si hay pocos resultados (< 3), complementar con Mapa Mundial
    let localesMapaMundial: any[] = [];
    if (localesDirectorio.length < 3) {
      localesMapaMundial = this.mapaMundial
        .map(local => ({
          ...local,
          distance: this.calcularDistancia(userLat, userLng, local.coordinates.lat, local.coordinates.lng),
          isHighlighted: false
        }))
        .filter(local => local.distance <= radioKm)
        // Evitar duplicados con Directorio Maestro
        .filter(mapaLocal => 
          !localesDirectorio.some(dirLocal => 
            dirLocal.name.toLowerCase() === mapaLocal.name.toLowerCase() &&
            dirLocal.city.toLowerCase() === mapaLocal.city.toLowerCase()
          )
        );
    }

    // 3. Fusionar y ordenar por distancia
    const todosLosLocales = [...localesDirectorio, ...localesMapaMundial]
      .sort((a, b) => (a.distance || 999) - (b.distance || 999));

    // 4. Filtrar solo aptos para celíacos
    return this.filtrarAptosParaCeliacos(todosLosLocales);
  }

  // Buscar locales por ciudad (fusionando ambas fuentes)
  async buscarLocalesPorCiudad(ciudad: string): Promise<LocalCeliGO[]> {
    const ciudadLower = ciudad.toLowerCase();

    // 1. Buscar en Directorio Maestro
    const localesDirectorio = this.directorioMaestro
      .filter(local => local.city.toLowerCase() === ciudadLower)
      .map(local => ({
        ...local,
        isHighlighted: true
      }));

    // 2. Buscar en Mapa Mundial
    const localesMapaMundial = this.mapaMundial
      .filter(local => local.city.toLowerCase() === ciudadLower)
      .map(local => ({
        ...local,
        isHighlighted: false
      }))
      // Evitar duplicados
      .filter(mapaLocal => 
        !localesDirectorio.some(dirLocal => 
          dirLocal.name.toLowerCase() === mapaLocal.name.toLowerCase()
        )
      );

    // 3. Fusionar: Directorio Maestro primero, luego Mapa Mundial
    const todosLosLocales = [...localesDirectorio, ...localesMapaMundial];
    
    // 4. Filtrar solo aptos para celíacos
    return this.filtrarAptosParaCeliacos(todosLosLocales);
  }

  // Buscar locales por tipo (restaurant, tienda, marca)
  async buscarLocalesPorTipo(tipo: 'restaurant' | 'tienda' | 'marca'): Promise<LocalCeliGO[]> {
    // 1. Directorio Maestro
    const localesDirectorio = this.directorioMaestro
      .filter(local => local.type === tipo)
      .map(local => ({
        ...local,
        isHighlighted: true
      }));

    // 2. Mapa Mundial
    const localesMapaMundial = this.mapaMundial
      .filter(local => local.type === tipo)
      .map(local => ({
        ...local,
        isHighlighted: false
      }))
      .filter(mapaLocal => 
        !localesDirectorio.some(dirLocal => 
          dirLocal.name.toLowerCase() === mapaLocal.name.toLowerCase() &&
          dirLocal.city.toLowerCase() === mapaLocal.city.toLowerCase()
        )
      );

    const todosLosLocales = [...localesDirectorio, ...localesMapaMundial];
    
    // 3. Filtrar solo aptos para celíacos
    return this.filtrarAptosParaCeliacos(todosLosLocales);
  }

  // Búsqueda global (para el chatbot)
  async busquedaGlobal(query: string): Promise<LocalCeliGO[]> {
    const queryLower = query.toLowerCase();
    
    // 1. Directorio Maestro
    const localesDirectorio = this.directorioMaestro
      .filter(local => 
        local.name.toLowerCase().includes(queryLower) ||
        local.city.toLowerCase().includes(queryLower) ||
        local.description.toLowerCase().includes(queryLower)
      )
      .map(local => ({
        ...local,
        isHighlighted: true
      }));

    // 2. Mapa Mundial
    const localesMapaMundial = this.mapaMundial
      .filter(local => 
        local.name.toLowerCase().includes(queryLower) ||
        local.city.toLowerCase().includes(queryLower) ||
        local.description.toLowerCase().includes(queryLower)
      )
      .map(local => ({
        ...local,
        isHighlighted: false
      }))
      .filter(mapaLocal => 
        !localesDirectorio.some(dirLocal => 
          dirLocal.name.toLowerCase() === mapaLocal.name.toLowerCase() &&
          dirLocal.city.toLowerCase() === mapaLocal.city.toLowerCase()
        )
      );

    const todosLosLocales = [...localesDirectorio, ...localesMapaMundial];
    
    // 3. Filtrar solo aptos para celíacos
    return this.filtrarAptosParaCeliacos(todosLosLocales);
  }

  // Obtener foto del local (prioridad: Directorio Maestro > Google Places > Placeholder)
  async obtenerFotoLocal(local: LocalCeliGO): Promise<string> {
    // 1. Si tiene fotos en Directorio Maestro, usar la primera
    if (local.photos && local.photos.length > 0) {
      return local.photos[0];
    }

    // 2. Placeholder basado en tipo y seguridad
    const seed = `${local.name.replace(/\s+/g, '')}${local.id}`;
    const safetyColors = {
      '100gluten': '10b981',
      'protocol': '1d4ed8', 
      'precaution': 'f59e0b'
    };
    
    return `https://picsum.photos/seed/${seed}/400/300.jpg`;
  }

  // Obtener badge de seguridad actualizado para celíacos
  getBadgeSeguridad(safety: string, source: string, esAptoCeliacos?: boolean, advertenciaCeliaca?: string) {
    // Si explícitamente no es apto para celíacos
    if (esAptoCeliacos === false) {
      return {
        text: '❌ NO APTO CELÍACOS',
        color: '#dc2626',
        bgColor: '#dc2626',
        icon: '❌',
        isVerified: false,
        advertencia: advertenciaCeliaca || 'Peligro de contaminación cruzada'
      };
    }

    if (source === 'directorio_maestro') {
      return {
        text: '⭐ Verificado CeliGO',
        color: '#10b981',
        bgColor: '#10b981',
        icon: '⭐',
        isVerified: true
      };
    }

    switch (safety) {
      case '100gluten':
        return {
          text: '⭐ 100% Sin Gluten',
          color: '#10b981',
          bgColor: '#10b981',
          icon: '⭐',
          isVerified: false
        };
      case 'protocol':
        return {
          text: '✔️ Opciones con Protocolo',
          color: '#1D4ED8',
          bgColor: '#1D4ED8',
          icon: '✔️',
          isVerified: false
        };
      case 'precaution':
        return {
          text: '⚠️ Precaución',
          color: '#f59e0b',
          bgColor: '#f59e0b',
          icon: '⚠️',
          isVerified: false
        };
      default:
        return {
          text: '❓ Sin información',
          color: '#6b7280',
          bgColor: '#6b7280',
          icon: '❓',
          isVerified: false
        };
    }
  }

  // Estadísticas de la base de datos
  getEstadisticas() {
    return {
      totalDirectorioMaestro: this.directorioMaestro.length,
      totalMapaMundial: this.mapaMundial.length,
      totalLocales: this.directorioMaestro.length + this.mapaMundial.length,
      ciudadesDirectorio: [...new Set(this.directorioMaestro.map(l => l.city))].length,
      ciudadesMundial: [...new Set(this.mapaMundial.map(l => l.city))].length,
      tiposDirectorio: {
        restaurantes: this.directorioMaestro.filter(l => l.type === 'restaurant').length,
        tiendas: this.directorioMaestro.filter(l => l.type === 'tienda').length,
        marcas: this.directorioMaestro.filter(l => l.type === 'marca').length
      }
    };
  }
}

export const celigoDatabase = new CeliGODatabaseService();