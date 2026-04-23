import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Utensils, 
  ShoppingBag, 
  ShieldCheck, 
  User 
} from 'lucide-react';
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

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-primary scale-110' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <item.icon 
                size={20} 
                className={isActive ? 'mb-1' : 'mb-1'}
                style={{ color: isActive ? item.color : undefined }}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};