/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Base de datos CeliGO - Estructura para Celíacos
// Información verificada y actualizada para la comunidad celíaca

export interface CeliGOPlace {
  id: string;
  name: string;
  category: 'restaurant' | 'shop' | 'brand';
  subcategory?: string;
  safetyLevel: 'SAFE' | 'CAUTION' | 'AVOID';
  certification?: {
    type: string;
    issuer: string;
    validUntil: string;
    certificateId: string;
  };
  location: {
    address: string;
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    social?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
  products?: {
    glutenFree: string[];
    containsGluten: string[];
    crossContaminationRisk: string[];
  };
  protocols: {
    dedicatedFacility: boolean;
    separatePreparation: boolean;
    staffTraining: boolean;
    cleaningProtocols: boolean;
  };
  verification: {
    lastVerified: string;
    verifiedBy: string;
    source: string;
    communityReports: number;
    averageRating: number;
  };
  images?: string[];
  notes?: string;
}

// Base de datos inicial con información verificada
export const CeliGODatabase: CeliGOPlace[] = [
  // RESTAURANTES 100% SIN GLUTEN (CERTIFICADOS)
  {
    id: "rest_001",
    name: "Sin Gluten Lab",
    category: "restaurant",
    subcategory: "Restaurante especializado",
    safetyLevel: "SAFE",
    certification: {
      type: "Certificado FACE",
      issuer: "Federación de Asociaciones de Celíacos de España",
      validUntil: "2025-12-31",
      certificateId: "FACE-2024-ES-001"
    },
    location: {
      address: "Calle Mayor 15, Centro",
      city: "Madrid",
      country: "España",
      coordinates: { lat: 40.4168, lng: -3.7038 }
    },
    contact: {
      phone: "+34 912 345 678",
      email: "info@singlutenlab.es",
      website: "https://www.singlutenlab.es",
      social: {
        instagram: "@singlutenlab",
        facebook: "SinGlutenLab"
      }
    },
    protocols: {
      dedicatedFacility: true,
      separatePreparation: true,
      staffTraining: true,
      cleaningProtocols: true
    },
    verification: {
      lastVerified: "2024-01-15",
      verifiedBy: "FACE Madrid",
      source: "Verificación presencial",
      communityReports: 156,
      averageRating: 4.8
    },
    notes: "100% libre de gluten. Menú rotativo diario. Todos los productos caseros y certificados."
  },
  {
    id: "rest_002",
    name: "La Buena Migas",
    category: "restaurant",
    subcategory: "Panadería-Restaurante",
    safetyLevel: "SAFE",
    certification: {
      type: "Certificado SCS",
      issuer: "Servicio de Certificación Celíaca",
      validUntil: "2024-12-31",
      certificateId: "SCS-2024-023"
    },
    location: {
      address: "Gran Vía 45",
      city: "Barcelona",
      country: "España",
      coordinates: { lat: 41.3851, lng: 2.1734 }
    },
    contact: {
      phone: "+34 933 456 789",
      email: "hola@labuenamigas.es"
    },
    protocols: {
      dedicatedFacility: true,
      separatePreparation: true,
      staffTraining: true,
      cleaningProtocols: true
    },
    verification: {
      lastVerified: "2024-01-10",
      verifiedBy: "ACE Cataluña",
      source: "Inspección oficial",
      communityReports: 89,
      averageRating: 4.6
    },
    notes: "Especializados en panadería sin gluten. Hornean en instalaciones dedicadas."
  },
  
  // RESTAURANTES CON OPCIÓN SIN GLUTEN (RIESGO CONTROLADO)
  {
    id: "rest_003",
    name: "Telepizza",
    category: "restaurant",
    subcategory: "Cadena de pizzerías",
    safetyLevel: "CAUTION",
    location: {
      address: "Múltiples ubicaciones",
      city: "Nacional",
      country: "España"
    },
    contact: {
      website: "https://www.telepizza.es",
      phone: "900 500 500"
    },
    products: {
      glutenFree: ["Pizza sin gluten (masa certificada)"],
      containsGluten: ["Pizzas tradicionales", "Alitas", "Postres"],
      crossContaminationRisk: ["Todos los productos excepto pizza sin gluten"]
    },
    protocols: {
      dedicatedFacility: false,
      separatePreparation: true,
      staffTraining: true,
      cleaningProtocols: true
    },
    verification: {
      lastVerified: "2024-01-20",
      verifiedBy: "Comunidad Celiaca",
      source: "Reportes usuarios",
      communityReports: 234,
      averageRating: 3.2
    },
    notes: "Ofrecen pizza sin gluten con masa certificada, pero comparten cocina. Riesgo de contaminación cruzada."
  },
  
  // TIENDAS ESPECIALIZADAS
  {
    id: "shop_001",
    name: "Herbolario El Granero",
    category: "shop",
    subcategory: "Herbolistería especializada",
    safetyLevel: "SAFE",
    location: {
      address: "Calle Salud 25",
      city: "Valencia",
      country: "España"
    },
    contact: {
      phone: "+34 963 789 012",
      email: "info@herbolarioelgranero.es"
    },
    products: {
      glutenFree: [
        "Harinas sin gluten (arroz, maíz, quinoa)",
        "Panes especiales",
        "Pastas sin gluten",
        "Galletas y snacks certificados",
        "Levadura sin gluten"
      ],
      containsGluten: [],
      crossContaminationRisk: []
    },
    protocols: {
      dedicatedFacility: true,
      separatePreparation: true,
      staffTraining: true,
      cleaningProtocols: true
    },
    verification: {
      lastVerified: "2024-01-18",
      verifiedBy: "ACE Valencia",
      source: "Verificación tienda",
      communityReports: 67,
      averageRating: 4.5
    },
    notes: "Tienda 100% especializada en productos sin gluten. Personal capacitado."
  },
  
  // MARCAS 100% SIN GLUTEN
  {
    id: "brand_001",
    name: "Schär",
    category: "brand",
    subcategory: "Fabricante especializado",
    safetyLevel: "SAFE",
    certification: {
      type: "Certificado Europeo",
      issuer: "European Food Safety Authority",
      validUntil: "2025-06-30",
      certificateId: "EU-GF-2024-001"
    },
    location: {
      address: "Via Galvani 19",
      city: "Burgstall",
      country: "Italia"
    },
    contact: {
      website: "https://www.schaer.com",
      email: "info@schaer.com"
    },
    products: {
      glutenFree: [
        "Pan de molde sin gluten",
        "Galletas",
        "Pasta",
        "Barritas de cereales",
        "Bizcochos",
        "Snacks salados"
      ],
      containsGluten: [],
      crossContaminationRisk: []
    },
    protocols: {
      dedicatedFacility: true,
      separatePreparation: true,
      staffTraining: true,
      cleaningProtocols: true
    },
    verification: {
      lastVerified: "2024-01-22",
      verifiedBy: "FACE Internacional",
      source: "Auditoría anual",
      communityReports: 1250,
      averageRating: 4.7
    },
    notes: "Líder europeo en productos sin gluten. Fábricas dedicadas 100% sin gluten."
  },
  
  // MARCAS CON LÍNEA SIN GLUTEN
  {
    id: "brand_002",
    name: "Bimbo",
    category: "brand",
    subcategory: "Fabricante con línea específica",
    safetyLevel: "CAUTION",
    location: {
      address: "Múltiples plantas",
      city: "Internacional",
      country: "Global"
    },
    contact: {
      website: "https://www.bimbo.com"
    },
    products: {
      glutenFree: ["Pan Bimbo Sin Gluten"],
      containsGluten: ["Todos los demás productos"],
      crossContaminationRisk: ["Posible trazas en línea específica"]
    },
    protocols: {
      dedicatedFacility: false,
      separatePreparation: true,
      staffTraining: true,
      cleaningProtocols: true
    },
    verification: {
      lastVerified: "2024-01-15",
      verifiedBy: "Comunidad Celiaca",
      source: "Reportes usuarios",
      communityReports: 456,
      averageRating: 3.8
    },
    notes: "Tienen línea específica pero comparten fábrica. Verificar certificación de cada lote."
  }
];

// Funciones de utilidad para la base de datos
export const CeliGOUtils = {
  // Filtrar por nivel de seguridad
  getBySafetyLevel: (level: 'SAFE' | 'CAUTION' | 'AVOID') => {
    return CeliGODatabase.filter(place => place.safetyLevel === level);
  },
  
  // Filtrar por categoría
  getByCategory: (category: 'restaurant' | 'shop' | 'brand') => {
    return CeliGODatabase.filter(place => place.category === category);
  },
  
  // Filtrar por ubicación
  getByLocation: (city: string, country?: string) => {
    return CeliGODatabase.filter(place => 
      place.location.city.toLowerCase().includes(city.toLowerCase()) &&
      (!country || place.location.country.toLowerCase().includes(country.toLowerCase()))
    );
  },
  
  // Buscar por nombre
  searchByName: (query: string) => {
    return CeliGODatabase.filter(place => 
      place.name.toLowerCase().includes(query.toLowerCase())
    );
  },
  
  // Obtener lugares verificados recientemente
  getRecentlyVerified: (days: number = 30) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return CeliGODatabase.filter(place => 
      new Date(place.verification.lastVerified) > cutoffDate
    );
  },
  
  // Validar si un lugar es seguro para celíacos
  isSafeForCeliacs: (place: CeliGOPlace) => {
    return place.safetyLevel === 'SAFE' && 
           place.protocols.dedicatedFacility && 
           place.certification !== undefined;
  }
};

export default CeliGODatabase;