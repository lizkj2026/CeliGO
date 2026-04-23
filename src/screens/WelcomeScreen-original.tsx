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
          <p className="text-xl font-bold text-primary mb-2">
            sin gluten (TACC)
          </p>
          <p className="text-on-surface-variant text-sm max-w-sm mx-auto">
            Localiza restaurantes, tiendas y marcas certificadas con seguridad y confianza.
          </p>
        </motion.div>
      </header>

      {/* Features Grid */}
      <div className="px-6 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.button
                key={feature.title}
                onClick={feature.action}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-surface-container-low rounded-3xl p-6 border border-outline-variant/10 hover:shadow-xl transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <Icon 
                      className="w-8 h-8" 
                      style={{ color: feature.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-xl font-bold mb-1"
                      style={{ color: feature.color }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm">
                      {feature.description}
                    </p>
                  </div>
                  <ArrowRight 
                    className="w-6 h-6 text-outline group-hover:text-primary transition-colors"
                  />
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="px-6 py-4"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
          <input
            type="text"
            placeholder="Buscar restaurantes, tiendas o marcas..."
            className="w-full h-14 pl-14 pr-6 bg-surface-container rounded-2xl border border-outline-variant/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-on-surface placeholder:text-outline/40"
            onFocus={() => navigate('/restaurantes')}
          />
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="px-6 py-8"
      >
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-6 border border-outline-variant/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary mb-1">500+</div>
              <div className="text-xs text-on-surface-variant">Restaurantes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary mb-1">200+</div>
              <div className="text-xs text-on-surface-variant">Tiendas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-tertiary mb-1">1000+</div>
              <div className="text-xs text-on-surface-variant">Marcas</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="px-6 py-4 pb-32"
      >
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span className="text-sm text-on-surface-variant">Verificado</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-on-surface-variant">Calidad</span>
          </div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary" />
            <span className="text-sm text-on-surface-variant">Cercano</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};