import { useState, useEffect } from 'react';
import { getSheetData } from '../services/googleSheets';

export interface Restaurant {
  id: string;
  nombre: string;
  direccion: string;
  ciudad?: string;
  tipoCocina: string;
  validadoSeguro: boolean;
  valoracion?: number;
  telefono?: string;
  descripcion?: string;
  linkMaps?: string;
  puntuacionComunidad?: string;
}

export interface Tienda {
  id: string;
  nombre: string;
  direccion?: string;
  ubicacion: string;
  especialidad: string;
  horario?: string;
  telefono?: string;
  validadoSeguro?: boolean;
  tipo?: string;
}

export interface Marca {
  id: string;
  nombre?: string;
  marca: string;
  producto: string;
  categoria?: string;
  descripcion?: string;
  imagenSello?: string;
  alertaTrazas?: boolean;
  validadoSeguro?: boolean;
  web?: string;
}

export const useGoogleSheetsData = () => {
  const [restaurantes, setRestaurantes] = useState<Restaurant[]>([]);
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState({
    isOnline: navigator.onLine,
    lastSync: null as Date | null,
    pendingChanges: 0,
    error: null as string | null
  });

  // Función para cargar datos
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Datos de ejemplo para fallback
      const datosEjemplo = {
        restaurantes: [
          {
            id: 'rest_1',
            nombre: 'Sin Gluten Tres Cantos',
            direccion: 'Calle de la Libertad 14, Tres Cantos',
            ciudad: 'Madrid',
            tipoCocina: 'Restaurante 100% Sin Gluten',
            validadoSeguro: true,
            valoracion: 4.8,
            telefono: '+34 916 05 18 27',
            descripcion: 'Restaurante exclusivamente sin gluten con obrador propio',
            linkMaps: '',
            puntuacionComunidad: '4.8'
          },
          {
            id: 'rest_2',
            nombre: 'La Buenacha',
            direccion: 'Calle de la Palma 2, Madrid',
            ciudad: 'Madrid',
            tipoCocina: 'Restaurante 100% Sin Gluten',
            validadoSeguro: true,
            valoracion: 4.7,
            telefono: '+34 915 22 88 07',
            descripcion: 'Cocina 100% sin gluten especializada en comida casera',
            linkMaps: '',
            puntuacionComunidad: '4.7'
          }
        ],
        tiendas: [
          {
            id: 'tienda_1',
            nombre: 'Herbolario Navarro',
            direccion: 'Calle Fuencarral 72, Madrid',
            ubicacion: 'Madrid',
            especialidad: 'Herbolario especializado',
            horario: '9:00-20:00',
            telefono: '+34 915 31 77 33',
            validadoSeguro: true,
            tipo: 'Herbolario'
          }
        ],
        marcas: [
          {
            id: 'marca_1',
            nombre: 'Schär',
            marca: 'Schär',
            producto: 'Pan sin gluten',
            categoria: 'Panadería',
            descripcion: 'Pan blanco sin gluten, ideal para sandwiches',
            imagenSello: '',
            alertaTrazas: false,
            validadoSeguro: true,
            web: 'https://www.schaer.com'
          }
        ]
      };

      try {
        // Intentar obtener datos de Google Sheets
        const restaurantesData = await getSheetData('Restaurantes');
        const restaurantesFormateados = restaurantesData.slice(1).map((row, index) => ({
          id: `rest_${index + 1}`,
          nombre: row[0] || '',
          direccion: row[1] || '',
          ciudad: row[2] || 'Madrid',
          tipoCocina: row[3] || 'Restaurante',
          validadoSeguro: row[4] === 'TRUE',
          valoracion: parseFloat(row[5]) || 4.5,
          telefono: row[6] || '',
          descripcion: row[7] || 'Restaurante especializado en cocina sin gluten',
          linkMaps: row[8] || '',
          puntuacionComunidad: row[9] || '0'
        }));
        setRestaurantes(restaurantesFormateados.length > 0 ? restaurantesFormateados : datosEjemplo.restaurantes);

        // Obtener datos de Tiendas
        const tiendasData = await getSheetData('Tiendas');
        const tiendasFormateadas = tiendasData.slice(1).map((row, index) => ({
          id: `tienda_${index + 1}`,
          nombre: row[0] || '',
          direccion: row[1] || '',
          ubicacion: row[2] || 'Madrid',
          especialidad: row[3] || 'Productos sin gluten',
          horario: row[4] || '9:00-21:00',
          telefono: row[5] || '',
          validadoSeguro: row[6] === 'TRUE',
          tipo: row[7] || 'Tienda especializada'
        }));
        setTiendas(tiendasFormateadas.length > 0 ? tiendasFormateadas : datosEjemplo.tiendas);

        // Obtener datos de Marcas
        const marcasData = await getSheetData('Marcas');
        const marcasFormateadas = marcasData.slice(1).map((row, index) => ({
          id: `marca_${index + 1}`,
          nombre: row[0] || '',
          marca: row[0] || '',
          producto: row[1] || '',
          categoria: row[2] || 'Alimentación',
          descripcion: row[3] || 'Producto certificado sin gluten',
          imagenSello: row[4] || '',
          alertaTrazas: row[5] === 'SÍ' || row[5] === 'SI',
          validadoSeguro: row[6] === 'TRUE',
          web: row[7] || ''
        }));
        setMarcas(marcasFormateadas.length > 0 ? marcasFormateadas : datosEjemplo.marcas);

      } catch (sheetsError) {
        console.warn('Error cargando datos de Google Sheets, usando datos de ejemplo:', sheetsError);
        // Usar datos de ejemplo si falla Google Sheets
        setRestaurantes(datosEjemplo.restaurantes);
        setTiendas(datosEjemplo.tiendas);
        setMarcas(datosEjemplo.marcas);
      }

      // Actualizar estado de sincronización
      setSyncStatus({
        isOnline: navigator.onLine,
        lastSync: new Date(),
        pendingChanges: 0,
        error: null
      });

    } catch (err) {
      console.error('Error general cargando datos:', err);
      setError('Error al cargar los datos. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const forceSync = async () => {
    await loadData();
  };

  return {
    restaurantes,
    tiendas,
    marcas,
    loading,
    error,
    syncStatus,
    forceSync,
    refetch: forceSync
  };
};