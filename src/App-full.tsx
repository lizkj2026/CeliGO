/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

// Importar pantallas
import { WelcomeScreen } from './screens/WelcomeScreen';
import { RestaurantesScreen } from './screens/RestaurantesScreen';
import { TiendasScreen } from './screens/TiendasScreen';
import { MarcasScreen } from './screens/MarcasScreen';
import { RestaurantDetailScreen } from './screens/RestaurantDetailScreen';
import { UserProfileScreen } from './screens/UserProfileScreen';

// Componente para manejar las animaciones de transición
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 0, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 0, scale: 1.01 }}
        transition={{ type: 'tween', ease: 'anticipate', duration: 0.3 }}
        className="w-full h-full"
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/restaurantes" element={<RestaurantesScreen />} />
          <Route path="/restaurantes/:id" element={<RestaurantDetailScreen />} />
          <Route path="/tiendas" element={<TiendasScreen />} />
          <Route path="/marcas" element={<MarcasScreen />} />
          <Route path="/perfil" element={<UserProfileScreen />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface relative">
        {/* Contenido principal */}
        <main className="pb-20">
          <AnimatedRoutes />
        </main>
        
        {/* Barra de navegación persistente */}
        <NavigationBar />
      </div>
    </Router>
  );
}

export default App;