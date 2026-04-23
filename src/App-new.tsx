/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider } from './contexts/AppContext';
import { NavigationBar } from './components/NavigationBar';
import { PageTransition } from './components/PageTransition';

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
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/restaurantes" element={<RestaurantesScreen />} />
        <Route path="/restaurantes/:id" element={<RestaurantDetailScreen />} />
        <Route path="/tiendas" element={<TiendasScreen />} />
        <Route path="/marcas" element={<MarcasScreen />} />
        <Route path="/perfil" element={<UserProfileScreen />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-surface relative">
          {/* Contenido principal */}
          <main className="pb-20">
            <PageTransition>
              <AnimatedRoutes />
            </PageTransition>
          </main>
          
          {/* Barra de navegación persistente */}
          <NavigationBar />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;