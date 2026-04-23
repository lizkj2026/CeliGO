import { useState } from 'react';
import { User, Mail, Camera, Edit2, LogOut, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export const UserProfileScreen = () => {
  const [loading] = useState(false);

  const goBack = () => {
    window.location.href = '/';
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
        <div className="p-4 flex items-center">
          <button
            onClick={goBack}
            className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-primary">Mi Perfil</h1>
        </div>
      </motion.header>

      <main className="p-4">
        {/* Profile Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6"
        >
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="relative mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <User size={40} className="text-white" />
              </div>
              <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg">
                <Camera size={16} />
              </button>
            </div>
            
            {/* User Info */}
            <h2 className="text-xl font-semibold text-on-surface mb-1">Usuario CeliGO</h2>
            <p className="text-sm text-on-surface-variant mb-4">usuario@celigo.com</p>
            
            <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <Edit2 size={16} />
              <span className="text-sm font-medium">Editar perfil</span>
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-primary mb-1">15</div>
            <div className="text-xs text-on-surface-variant">Restaurantes</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-primary mb-1">8</div>
            <div className="text-xs text-on-surface-variant">Tiendas</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-primary mb-1">23</div>
            <div className="text-xs text-on-surface-variant">Marcas</div>
          </div>
        </motion.div>

        {/* Menu Options */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <button className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail size={20} className="text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-on-surface">Configuración de correo</div>
                <div className="text-sm text-on-surface-variant">usuario@celigo.com</div>
              </div>
            </div>
            <ArrowLeft size={20} className="text-gray-400 rotate-180" />
          </button>

          <button className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-on-surface">Preferencias</div>
                <div className="text-sm text-on-surface-variant">Personaliza tu experiencia</div>
              </div>
            </div>
            <ArrowLeft size={20} className="text-gray-400 rotate-180" />
          </button>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => window.location.href = '/'}
          className="w-full mt-6 bg-red-50 text-red-600 rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Cerrar sesión</span>
        </motion.button>
      </main>
    </motion.div>
  );
};