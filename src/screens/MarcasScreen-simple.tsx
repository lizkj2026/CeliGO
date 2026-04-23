import { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';

// Datos de ejemplo para marcas
const mockMarcas = [
  {
    id: '1',
    name: 'Schär',
    category: 'Panadería',
    safety: '100gluten' as const,
    rating: 4.8,
    description: 'Líder europeo en productos sin gluten',
    products: 120,
    website: 'www.schar.com'
  },
  {
    id: '2',
    name: 'Nutrilon',
    category: 'Nutrición',
    safety: 'protocol' as const,
    rating: 4.6,
    description: 'Productos nutricionales certificados',
    products: 80,
    website: 'www.nutrilon.com'
  },
  {
    id: '3',
    name: 'Alicante',
    category: 'Galletitas',
    safety: '100gluten' as const,
    rating: 4.7,
    description: 'Galletitas y alfajores sin TACC',
    products: 45,
    website: 'www.alicente.com.ar'
  }
];

export const MarcasScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValid, setFilterValid] = useState<'all' | 'valid' | 'invalid'>('all');

  const filteredMarcas = mockMarcas.filter(marca => {
    const matchesSearch = marca.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         marca.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         marca.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterValid === 'all' || 
                         (filterValid === 'valid' && marca.safety === '100gluten') ||
                         (filterValid === 'invalid' && marca.safety !== '100gluten');
    return matchesSearch && matchesFilter;
  });

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
          <h1 className="text-2xl font-bold text-primary mb-4">Marcas</h1>
          
          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar marcas..."
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
              Todas
            </button>
            <button
              onClick={() => setFilterValid('valid')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterValid === 'valid' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              100% Certificadas
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
          {filteredMarcas.map((marca, index) => (
            <motion.div
              key={marca.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-on-surface">{marca.name}</h3>
                  <span className="text-sm text-blue-600 font-medium">{marca.category}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  marca.safety === '100gluten' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {marca.safety === '100gluten' ? '100% Cert' : 'Protocolo'}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant mb-3">{marca.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    <span className="text-sm font-medium">{marca.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-purple-500 mr-1">🏷️</span>
                    <span className="text-sm font-medium">{marca.products} productos</span>
                  </div>
                </div>
                <span className="text-xs text-blue-600">{marca.website}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </motion.div>
  );
};