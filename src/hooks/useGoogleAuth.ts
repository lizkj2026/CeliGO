import { useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  email: string;
  photo: string;
  role: string;
}

export const useGoogleAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simular autenticación de Google (en producción, usar Google OAuth)
  useEffect(() => {
    const loadUserProfile = () => {
      try {
        setLoading(true);
        
        // Para demostración, usamos datos simulados
        // En producción, esto vendría de Google OAuth API
        const mockUser: UserProfile = {
          name: 'Ana García López',
          email: 'ana.garcia@gmail.com',
          photo: 'https://ui-avatars.com/api/?name=Ana+Garcia&background=0F5238&color=fff&size=128',
          role: 'client'
        };

        // Guardar en localStorage
        localStorage.setItem('celigo_user', JSON.stringify(mockUser));
        setUser(mockUser);
        
      } catch (err) {
        console.error('Error loading user profile:', err);
        setError('Error al cargar el perfil de usuario');
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      
      // En producción, implementar Google OAuth flow
      const mockUser: UserProfile = {
        name: 'Usuario Demo',
        email: 'demo@celigo.com',
        photo: 'https://ui-avatars.com/api/?name=Usuario+Demo&background=0F5238&color=fff&size=128',
        role: 'client'
      };

      localStorage.setItem('celigo_user', JSON.stringify(mockUser));
      setUser(mockUser);
      
    } catch (err) {
      console.error('Error signing in with Google:', err);
      setError('Error al iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem('celigo_user');
      setUser(null);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      localStorage.setItem('celigo_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signOut,
    updateUserProfile
  };
};