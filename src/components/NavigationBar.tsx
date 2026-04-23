import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Utensils, 
  ShoppingBag, 
  ShieldCheck, 
  User 
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { CeliGoLogo } from '../components/CeliGoLogo';

const navigationItems = [
  {
    id: 'home',
    label: 'Inicio',
    icon: LayoutDashboard,
    color: '#0F5238',
    path: '/'
  },
  {
    id: 'restaurantes',
    label: 'Restaurantes',
    icon: Utensils,
    color: '#BA4A00',
    path: '/restaurantes'
  },
  {
    id: 'tiendas',
    label: 'Tiendas',
    icon: ShoppingBag,
    color: '#4A235A',
    path: '/tiendas'
  },
  {
    id: 'marcas',
    label: 'Marcas',
    icon: ShieldCheck,
    color: '#1D4ED8',
    path: '/marcas'
  },
  {
    id: 'perfil',
    label: 'Mi Perfil',
    icon: User,
    color: '#6B7280',
    path: '/perfil'
  }
];

export const NavigationBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentScreen } = useAppContext();

  const getActiveItem = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/restaurantes')) return 'restaurantes';
    if (path.startsWith('/tiendas')) return 'tiendas';
    if (path.startsWith('/marcas')) return 'marcas';
    if (path.startsWith('/perfil')) return 'perfil';
    return 'home';
  };

  const activeItemId = getActiveItem();

  const handleNavigation = (itemId: string, path: string) => {
    if (itemId !== activeItemId) {
      navigate(path);
    }
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-surface-container-highest/95 backdrop-blur-xl border-t border-outline-variant/20 z-50"
    >
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navigationItems.map((item) => {
            const isActive = item.id === activeItemId;
            const Icon = item.icon;

            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item.id, item.path)}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Indicador activo */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Icono */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    color: isActive ? item.color : '#9CA3AF'
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  className="relative"
                >
                  <Icon 
                    className="w-6 h-6" 
                    style={{ color: isActive ? item.color : '#9CA3AF' }}
                  />
                  
                  {/* Punto de notificación para el logo activo */}
                  {isActive && item.id === 'home' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"
                    />
                  )}
                </motion.div>

                {/* Etiqueta */}
                <motion.span
                  animate={{
                    color: isActive ? item.color : '#9CA3AF',
                    fontWeight: isActive ? 600 : 400
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  className="text-xs font-medium"
                  style={{ color: isActive ? item.color : '#9CA3AF' }}
                >
                  {item.label}
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Safe area para iPhone */}
      <div className="h-2 bg-surface-container-highest" />
    </motion.nav>
  );
};