import { motion } from 'motion/react';
import { ArrowRight, MapPin, Compass, ShoppingBag, ShieldCheck, Search, Star } from 'lucide-react';
import { CeliGoLogo } from '../components/CeliGoLogo';

export const WelcomeScreen = () => {
  const navigate = (path: string) => {
    window.location.href = path;
  };

  const features = [
    {
      icon: MapPin,
      title: 'Restaurantes',
      description: 'Encuentra lugares 100% seguros',
      color: '#BA4A00',
      action: () => navigate('/restaurantes')
    },
    {
      icon: ShoppingBag,
      title: 'Tiendas',
      description: 'Productos certificados cerca',
      color: '#4A235A',
      action: () => navigate('/tiendas')
    },
    {
      icon: ShieldCheck,
      title: 'Marcas',
      description: 'Confianza en cada producto',
      color: '#1D4ED8',
      action: () => navigate('/marcas')
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-surface via-surface-container to-primary/5"
    >
      {/* Header */}
      <header className="pt-12 pb-8 px-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <CeliGoLogo color="#0F5238" className="text-5xl mb-4" />
          <h1 className="text-3xl font-light text-on-surface mb-2">
            Tu santuario de opciones
          </h1>
          <p className="text-lg text-on-surface-variant">
            Vive sin gluten, sin preocupaciones
          </p>
        </motion.div>
      </header>

      {/* Features Grid */}
      <main className="px-6 pb-12">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid gap-6 max-w-md mx-auto"
        >
          {features.map((feature, index) => (
            <motion.button
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={feature.action}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-left"
              style={{ borderLeft: `4px solid ${feature.color}` }}
            >
              <div className="flex items-center mb-3">
                <motion.div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                  style={{ backgroundColor: `${feature.color}15` }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon size={24} style={{ color: feature.color }} />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-on-surface mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant">
                    {feature.description}
                  </p>
                </div>
                <ArrowRight size={20} className="text-on-surface-variant" />
              </div>
            </motion.button>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="px-6 pb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-sm text-on-surface-variant">
            Tu viaje hacia una vida sin gluten comienza aquí
          </p>
        </motion.div>
      </footer>
    </motion.div>
  );
};