import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Camera, Edit2, LogOut, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { CeliGoLogo } from '../components/CeliGoLogo';

export const UserProfileScreen = () => {
  const navigate = useNavigate();
  const [loading] = useState(false);

  // Datos de ejemplo para el perfil
  const user = {
    name: 'Ana García',
    email: 'ana@ejemplo.com',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'client'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-on-surface-variant">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-surface pb-32"
    >
      {/* Header */}
      <header className="sticky top-0 bg-surface-container-highest backdrop-blur-lg z-40 border-b border-outline-variant/10">
        <div className="flex items-center justify-between h-16 px-6">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-surface-container rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-on-surface" />
          </button>
          <CeliGoLogo color="#0F5238" className="text-2xl" />
          <button className="p-2 hover:bg-surface-container rounded-full transition-colors">
            <LogOut className="w-6 h-6 text-on-surface-variant" />
          </button>
        </div>
      </header>

      <div className="px-6 pt-8">
        {/* Profile Header */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
              <img 
                src={user.photo} 
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary/90 transition-colors">
              <Camera className="w-5 h-5" />
            </button>
          </div>

          <h1 className="text-3xl font-bold text-on-surface mb-2">{user.name}</h1>
          <p className="text-on-surface-variant mb-4">{user.email}</p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-container rounded-full">
            <User className="w-4 h-4 text-on-primary-container" />
            <span className="text-sm font-medium text-on-primary-container capitalize">
              {user.role === 'client' ? 'Cliente' : 
               user.role === 'restaurant' ? 'Restaurante' :
               user.role === 'shop' ? 'Tienda' :
               user.role === 'brand' ? 'Marca' : 'Admin'}
            </span>
          </div>
        </motion.div>

        {/* Profile Stats */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="text-center p-4 bg-surface-container-low rounded-2xl">
            <div className="text-2xl font-bold text-primary mb-1">12</div>
            <div className="text-xs text-on-surface-variant">Favoritos</div>
          </div>
          <div className="text-center p-4 bg-surface-container-low rounded-2xl">
            <div className="text-2xl font-bold text-primary mb-1">28</div>
            <div className="text-xs text-on-surface-variant">Visitas</div>
          </div>
          <div className="text-center p-4 bg-surface-container-low rounded-2xl">
            <div className="text-2xl font-bold text-primary mb-1">4.8</div>
            <div className="text-xs text-on-surface-variant">Valoración</div>
          </div>
        </motion.div>

        {/* Profile Actions */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <button className="w-full p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 hover:shadow-lg transition-all flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-on-primary-container" />
              </div>
              <div className="text-left">
                <div className="font-medium text-on-surface">Editar Perfil</div>
                <div className="text-sm text-on-surface-variant">Nombre y foto</div>
              </div>
            </div>
            <Edit2 className="w-5 h-5 text-outline" />
          </button>

          <button className="w-full p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 hover:shadow-lg transition-all flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-on-secondary-container" />
              </div>
              <div className="text-left">
                <div className="font-medium text-on-surface">Preferencias</div>
                <div className="text-sm text-on-surface-variant">Notificaciones y privacidad</div>
              </div>
            </div>
            <Edit2 className="w-5 h-5 text-outline" />
          </button>
        </motion.div>

        {/* CeliGO Membership */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20"
        >
          <div className="flex items-center justify-between mb-4">
            <CeliGoLogo color="#0F5238" className="text-xl" />
            <span className="px-3 py-1 bg-primary text-white rounded-full text-xs font-bold">PREMIUM</span>
          </div>
          <h3 className="font-bold text-on-surface mb-2">Miembro CeliGO</h3>
          <p className="text-sm text-on-surface-variant mb-4">
            Acceso ilimitado a restaurantes certificados, productos sin gluten y comunidad exclusiva.
          </p>
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            <span>Desde: 15 de Enero 2024</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};