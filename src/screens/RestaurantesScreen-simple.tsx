import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';

// Datos de ejemplo para restaurantes
const mockRestaurantes = [
  {
    id: '1',
    name: 'Restaurante Sin TACC',
    address: 'Av. Corrientes 1234, CABA',
    city: 'Buenos Aires',
    category: 'Restaurant',
    safety: '100gluten' as const,
    rating: 4.8,
    phone: '11-1234-5678',
    description: 'Especializado en comida celíaca 100% segura'
  },
  {
    id: '2',
    name: 'Green Bowl',
    address: 'Palermo Soho, CABA',
    city: 'Buenos Aires',
    category: 'Restaurant',
    safety: 'protocol' as const,
    rating: 4.6,
    phone: '11-9876-5432',
    description: 'Opciones saludables sin gluten'
  }
];

export const RestaurantesScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValid, setFilterValid] = useState<'all' | 'valid' | 'invalid'>('all');

  const filteredRestaurantes = mockRestaurantes.filter(rest => {
    const matchesSearch = rest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rest.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterValid === 'all' || 
                         (filterValid === 'valid' && rest.safety === '100gluten') ||
                         (filterValid === 'invalid' && rest.safety !== '100gluten');
    return matchesSearch && matchesFilter;
  });

  const navigateToRestaurant = (id: string) => {
    window.location.href = `/restaurantes/${id}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-surface"
    >
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm sticky top-0 z-10"
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary mb-4">Restaurantes</h1>
          
          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar restaurantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterValid('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterValid === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterValid('valid')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterValid === 'valid' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              100% Gluten Free
            </button>
            <button
              onClick={() => setFilterValid('invalid')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterValid === 'invalid' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Con Protocolo
            </button>
          </div>
        </div>
      </motion.header>

      {/* Results */}
      <main className="p-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {filteredRestaurantes.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigateToRestaurant(restaurant.id)}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-on-surface">{restaurant.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  restaurant.safety === '100gluten' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {restaurant.safety === '100gluten' ? '100% GF' : 'Protocolo'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{restaurant.address}</p>
              <p className="text-sm text-on-surface-variant">{restaurant.description}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span className="text-sm font-medium">{restaurant.rating}</span>
                </div>
                <span className="text-xs text-gray-500">{restaurant.phone}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </motion.div>
  );
};