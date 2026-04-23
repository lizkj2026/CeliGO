/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  MapPin, 
  ShoppingBag, 
  Search, 
  Utensils, 
  ArrowRight, 
  Star,
  Shield,
  User,
  MessageCircle,
  Plus,
  Edit,
  Upload,
  Package,
  Award,
  CheckCircle2,
  XCircle,
  Globe,
  QrCode,
  Heart,
  Settings,
  LogOut,
  BarChart3,
  Users,
  FileText,
  AlertTriangle,
  TrendingUp,
  Download,
  RefreshCw,
  Trash2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building,
  Store,
  Factory,
  Crown
} from 'lucide-react';

// --- Componentes ---

const CeliGoLogo = ({ size = 'large' }) => {
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-3xl',
    large: 'text-5xl',
    xlarge: 'text-6xl'
  };

  return (
    <div className={`font-black tracking-tighter flex items-center gap-2 ${sizeClasses[size]}`} style={{ color: '#10b981' }}>
      <div 
        className="w-[1em] h-[1em]"
        style={{ 
          backgroundColor: '#10b981',
          WebkitMaskImage: 'url(https://files.catbox.moe/5k8x51.png)',
          maskImage: 'url(https://files.catbox.moe/5k8x51.png)',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center'
        }} 
      />
      CeliGO
    </div>
  );
};

// --- Home Original ---

const WelcomeScreen = ({ onNext, onSignUp }: { onNext: () => void, onSignUp: () => void }) => {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden bg-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(177,240,206,0.3)_0%,rgba(248,249,250,0)_40%),radial-gradient(circle_at_90%_80%,rgba(166,243,200,0.2)_0%,rgba(248,249,250,0)_50%)] -z-10 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-100/20 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none" />
      <div className="absolute -bottom-48 -right-24 w-[32rem] h-[32rem] bg-blue-100/10 rounded-full blur-[100px] opacity-60 -z-10 pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center text-center relative z-10">
        {/* Logo Section */}
        <div className="mb-12">
          <div className="relative inline-flex items-center justify-center p-8 bg-white rounded-3xl shadow-[0_0_40px_0_rgba(15,82,56,0.06)] group">
            <img 
              src="https://files.catbox.moe/5k8x51.png" 
              alt="CeliGO Logo" 
              className="w-24 h-24 object-contain transform group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-2 border-green-200/20 rounded-3xl pointer-events-none" />
          </div>
          <CeliGoLogo size="large" className="mt-8 text-6xl mx-auto" />
          <p className="mt-4 text-gray-600 text-sm leading-relaxed italic">
            "Por fin, el gluten no es el que manda."<br />
            De celíaca a celíaco 😉
          </p>
        </div>

        {/* Visual Hook Card */}
        <div className="w-full mb-12 aspect-[4/3] rounded-xl overflow-hidden relative shadow-2xl">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjyqLrZQvYVJstQPpDfjPby5Rx_NHYfwni8hEvZyZJtIjQazgpje0voEY2qkX3lQhlH3P_42xOPyBG148LEkHOOTwc92Uthsr5boB0NLVKYPRsH-z3e7fR2Btvz__5U4HMMAE2dX80OaEuY7MDqSn4j4JLSjJiImyX4QKbZg6PiwLvcln_KKwBgTwC4WZ3HpNSFmvIq9qLJ3iH4B67JgZfxaPBwZNVlsIRIZsGouXmcMlN1seFTXpf5ZC-wESglyhSz48TwTxa1Mg" 
            alt="Gluten free bread" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-600/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Certificado</span>
            </div>
            <p className="text-white text-lg font-semibold leading-tight">Seguridad en cada bocado.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-4 relative z-20">
          <button 
            onClick={onNext}
            className="w-full h-16 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 group"
          >
            <span>Iniciar Sesión</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button 
            onClick={onSignUp}
            className="w-full h-16 bg-white text-green-600 border border-gray-300 rounded-full font-bold hover:bg-gray-50 transition-all active:scale-95"
          >
            Crear una cuenta
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12">
          <p className="text-sm text-gray-600 font-medium">
            Explora sin límites. Vive con confianza.
          </p>
          <div className="mt-6 flex justify-center gap-6">
            <Utensils className="text-gray-400 w-6 h-6 hover:text-green-600 cursor-pointer transition-colors" />
            <ShoppingBag className="text-gray-400 w-6 h-6 hover:text-green-600 cursor-pointer transition-colors" />
            <div className="w-6 h-6 text-gray-400 hover:text-green-600 cursor-pointer transition-colors" style={{
              backgroundColor: 'currentColor',
              WebkitMaskImage: 'url(https://files.catbox.moe/5k8x51.png)',
              maskImage: 'url(https://files.catbox.moe/5k8x51.png)',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center'
            }} />
          </div>
        </div>
      </div>
    </main>
  );
};

// --- Pantalla de Selección de Perfiles (Primera) ---

const ProfileSelectionScreen = ({ onSelectRole, onBack }: { 
  onSelectRole: (role: string) => void, 
  onBack: () => void 
}) => {
  const roles = [
    {
      id: 'client',
      title: 'Cliente',
      subtitle: 'Celíaco o familiar',
      description: 'Encuentra lugares seguros y productos certificados',
      icon: User,
      bgColor: 'from-green-400 to-green-600',
      features: ['Mapa interactivo', 'Escáner de productos', 'Reseñas verificadas'],
      popular: true
    },
    {
      id: 'restaurant',
      title: 'Restaurante',
      subtitle: 'Hostelería y menús',
      description: 'Gestiona tu menú sin gluten y conecta con clientes',
      icon: Utensils,
      bgColor: 'from-amber-400 to-amber-600',
      features: ['Gestión de menú', 'Sistema de reservas', 'Reseñas de clientes']
    },
    {
      id: 'shop',
      title: 'Tienda',
      subtitle: 'Supermercados y locales',
      description: 'Muestra tu catálogo de productos sin gluten',
      icon: Store,
      bgColor: 'from-purple-400 to-purple-600',
      features: ['Catálogo de productos', 'Alertas de stock', 'Sistema de pedidos']
    },
    {
      id: 'brand',
      title: 'Marca',
      subtitle: 'Fabricante de productos',
      description: 'Certifica tus productos y llega a miles de usuarios',
      icon: Factory,
      bgColor: 'from-blue-400 to-blue-600',
      features: ['Certificaciones', 'Análisis de mercado', 'Gestión de productos']
    },
    {
      id: 'admin',
      title: 'Administrador',
      subtitle: 'Control y moderación',
      description: 'Gestiona la plataforma y asegura la calidad',
      icon: Crown,
      bgColor: 'from-gray-400 to-gray-600',
      features: ['Panel de control', 'Gestión de usuarios', 'Análisis de datos']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-gray-600 rotate-180" />
          </button>
          <CeliGoLogo size="medium" />
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ¿Cómo quieres usar <span className="text-green-600">CeliGO</span>?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecciona el perfil que mejor describe tus necesidades
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {roles.map((role) => (
            <div 
              key={role.id} 
              onClick={() => onSelectRole(role.id)}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:scale-[1.02] hover:border-green-200 transition-all duration-300 cursor-pointer p-6 group relative"
            >
              {/* Popular Badge */}
              {role.popular && (
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  Más Popular
                </div>
              )}

              {/* Icon and Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center
                  bg-gradient-to-br ${role.bgColor} text-white shadow-lg
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <role.icon className="w-8 h-8" />
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{role.title}</h3>
                <p className="text-sm font-medium text-gray-500 mb-2">{role.subtitle}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{role.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-4">
                {role.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-500">Seleccionar</span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// --- Pantalla de Registro/Autenticación por Perfil ---

const AuthScreen = ({ onBack, onAuthSuccess, selectedRole }: { 
  onBack: () => void, 
  onAuthSuccess: () => void,
  selectedRole: string
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const roleConfig = {
    client: {
      title: 'Únete como Cliente',
      subtitle: 'Descubre lugares seguros y productos certificados',
      icon: User,
      color: 'from-green-400 to-green-600',
      fields: ['name', 'email', 'password', 'celiac']
    },
    restaurant: {
      title: 'Registra tu Restaurante',
      subtitle: 'Gestiona tu menú sin gluten y conecta con clientes',
      icon: Utensils,
      color: 'from-amber-400 to-amber-600',
      fields: ['business', 'email', 'password', 'address']
    },
    shop: {
      title: 'Registra tu Tienda',
      subtitle: 'Muestra tu catálogo de productos sin gluten',
      icon: Store,
      color: 'from-purple-400 to-purple-600',
      fields: ['business', 'email', 'password', 'address']
    },
    brand: {
      title: 'Registra tu Marca',
      subtitle: 'Certifica tus productos y llega a miles de usuarios',
      icon: Factory,
      color: 'from-blue-400 to-blue-600',
      fields: ['brand', 'email', 'password', 'certifications']
    },
    admin: {
      title: 'Acceso Administrador',
      subtitle: 'Gestiona la plataforma y asegura la calidad',
      icon: Crown,
      color: 'from-gray-400 to-gray-600',
      fields: ['admin', 'email', 'password', 'permissions']
    }
  };

  const config = roleConfig[selectedRole as keyof typeof roleConfig];

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess();
    }, 2000);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms && selectedRole !== 'admin') {
      alert('Debes aceptar los términos y condiciones');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess();
    }, 1500);
  };

  const renderAdditionalFields = () => {
    switch (selectedRole) {
      case 'client':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Eres celíaco o familiar?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="p-3 border-2 border-green-500 bg-green-50 text-green-700 rounded-xl font-medium hover:bg-green-100 transition-colors"
              >
                Celíaco
              </button>
              <button
                type="button"
                className="p-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Familiar
              </button>
            </div>
          </div>
        );
      
      case 'restaurant':
      case 'shop':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del {selectedRole === 'restaurant' ? 'Restaurante' : 'Local'}
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder={selectedRole === 'restaurant' ? 'Restaurante El Celíaco' : 'Supermercado Verde'}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Calle Principal 123, Ciudad"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </>
        );
      
      case 'brand':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Marca
              </label>
              <div className="relative">
                <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Hnos. Garcia SL"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Tienes certificaciones sin gluten?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="p-3 border-2 border-blue-500 bg-blue-50 text-blue-700 rounded-xl font-medium hover:bg-blue-100 transition-colors"
                >
                  Sí
                </button>
                <button
                  type="button"
                  className="p-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  No
                </button>
              </div>
            </div>
          </>
        );
      
      case 'admin':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código de Administrador
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                placeholder="Código de acceso admin"
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <button 
            onClick={onBack}
            className="mb-6 p-2 hover:bg-gray-100 rounded-full transition-colors inline-flex"
          >
            <ArrowRight className="w-5 h-5 text-gray-600 rotate-180" />
          </button>
          
          {/* Role Icon */}
          <div className={`
            w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center
            bg-gradient-to-br ${config.color} text-white shadow-lg
          `}>
            <config.icon className="w-10 h-10" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {config.title}
          </h2>
          <p className="text-gray-600">
            {config.subtitle}
          </p>
        </div>

        {/* Google Auth Button */}
        <button 
          onClick={handleGoogleAuth}
          disabled={isLoading}
          className="w-full h-12 bg-white border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-3 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin" />
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continuar con Google</span>
            </>
          )}
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-br from-green-50 via-white to-blue-50 text-gray-500">
              O registrarte con email
            </span>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          {/* Additional Fields by Role */}
          {renderAdditionalFields()}

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          {selectedRole !== 'admin' && (
            <div className="p-4 bg-gray-50 rounded-xl">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-600">
                  Acepto los{' '}
                  <button type="button" className="text-green-600 hover:text-green-700 font-medium">
                    Términos de Servicio
                  </button>{' '}
                  y{' '}
                  <button type="button" className="text-green-600 hover:text-green-700 font-medium">
                    Política de Privacidad
                  </button>
                </span>
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-medium shadow-lg hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              'Crear Cuenta'
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <button className="text-green-600 hover:text-green-700 font-medium">
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Dashboard Cliente ---

const ClientDashboard = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {
  return (
    <div className="pt-24 pb-32 px-6">
      {/* Search & Core Actions */}
      <section className="mb-10">
        <div className="relative group mb-6">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-400">
            <Search className="w-6 h-6" />
          </div>
          <input 
            className="w-full h-18 pl-16 pr-8 rounded-[2rem] bg-gray-100 border-none focus:ring-2 focus:ring-green-500 transition-all text-gray-800 font-medium" 
            placeholder="Busca locales o productos..." 
            type="text" 
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Restaurantes', icon: Utensils, color: '#0F5238', screen: 'Restaurantes' },
            { label: 'Tiendas', icon: ShoppingBag, color: '#4A235A', screen: 'Tiendas' },
            { label: 'Marcas', icon: Star, color: '#1D4ED8', screen: 'Marcas' }
          ].map((action) => (
            <button 
              key={action.label}
              onClick={() => onNavigate(action.screen)}
              className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-3xl border border-gray-200 hover:shadow-lg transition-all"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${action.color}15`, color: action.color }}
              >
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Categories Teaser */}
      <section className="mb-10">
        <h2 className="text-xl text-gray-800 mb-6 flex items-center gap-2">
          <Globe className="w-6 h-6 text-green-600" /> Santuarios Destacados
        </h2>
        <div className="space-y-6">
          {/* Binary Validation System Showcase */}
          {[
            { name: 'Terraza Verde', type: 'Restaurante', safe: true, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0hdpo97tbqHRwAil5fkhiCGRWtYPcgq3Fhuo4pJtqRJeNHQc5gVexpnc4ML_ZR9jvgWh7caM08K7RUhyutxECHW8DppsXkMHo4_KWwtzPrQHXjbU7DWocschcr7LRT6lnjaUap0-hj9X5ablmmKmyEK1S8oCsTqRaPvYP0zVU68mDD11ybwe_cZLmGRt5Q9wEhFDS1hYJG-ts1havi4thq7CDB5mJNsOR2-CoV62N8SWq5kU_3PVRVFs_loPZiV-FSSD9jp4y8Jo' },
            { name: 'Pan Artesano Mix', type: 'Panadería', safe: false, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjN7P4Tl_DsAOhmWXuyj2IdmqVvD_GfoQe-VFZ6uZRSUC58DA8kzpxtGCJnpTo6mZsZ9OSEA6TISpZKSvDUsQoGOVgGV4sQrtut-Uw1QQzc7MLkprYXCq8YGWRzDlLv7mUEnSNKclPZMWNKyZVxXMmiB7VO0wtuECllfubOyklCpFdjxTXx3ftLA_2nGEePnQR-d6s-_y66TnJgqQk1HD1AP6ChrftIb-qCuNRTac0uvLo0WA77ryGPzJJQcxcUg0h0o6MIsfNvz8' }
          ].map((item) => (
            <div key={item.name} className="relative group overflow-hidden rounded-[2.5rem] bg-gray-50 border border-gray-200">
              <div className="aspect-[21/9] w-full relative overflow-hidden">
                <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={item.name} referrerPolicy="no-referrer" />
                {/* Binary Validation Overlay */}
                <div className="absolute top-4 right-4 z-20">
                  {item.safe ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full shadow-lg border border-green-300 font-bold text-xs uppercase tracking-widest">
                      <CheckCircle2 className="w-4 h-4" /> Seguro
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full shadow-lg border border-red-300 font-bold text-xs uppercase tracking-widest">
                      <XCircle className="w-4 h-4" /> Precaución
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600 mb-1">{item.type}</p>
                <h3 className="text-lg text-gray-800">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- Dashboard Restaurante/Tienda ---

const ManagementDashboard = ({ type }: { type: 'restaurant' | 'shop' }) => {
  const isRestaurant = type === 'restaurant';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <CeliGoLogo size="medium" />
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600">
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: isRestaurant ? 'Platos' : 'Productos', value: '24', change: '+12%', icon: isRestaurant ? Utensils : Package },
            { label: 'Ventas', value: '€1,847', change: '+23%', icon: TrendingUp },
            { label: 'Reseñas', value: '4.8⭐', change: '+0.3', icon: Star },
            { label: 'Clientes', value: '342', change: '+45', icon: Users }
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <stat.icon className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {isRestaurant ? 'Gestión de Menú' : 'Gestión de Inventario'}
            </h3>
            <button className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-lg hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2 mb-3">
              <Plus className="w-4 h-4" />
              {isRestaurant ? 'Añadir Nuevo Plato' : 'Añadir Nuevo Producto'}
            </button>
            <div className="space-y-2">
              {[
                { name: isRestaurant ? 'Paella Valenciana SF' : 'Pan Integral SF', status: 'available' },
                { name: isRestaurant ? 'Pizza Margarita' : 'Galletas de Avena', status: 'unavailable' }
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'available' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status === 'available' ? 'Disponible' : 'No disponible'}
                    </span>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Edit className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Alertas de Alérgenos</h3>
            <div className="space-y-3">
              {[
                { type: 'warning', message: 'Nuevo lote con posible trazas de gluten', time: 'Hace 2 horas' },
                { type: 'info', message: 'Actualización de certificados disponible', time: 'Hace 5 horas' },
                { type: 'error', message: 'Retirada de producto: Lote #1234', time: 'Ayer' }
              ].map((alert, index) => (
                <div key={index} className={`
                  p-3 rounded-lg border-l-4
                  ${alert.type === 'warning' ? 'bg-amber-50 border-amber-400' : ''}
                  ${alert.type === 'info' ? 'bg-blue-50 border-blue-400' : ''}
                  ${alert.type === 'error' ? 'bg-red-50 border-red-400' : ''}
                `}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                      alert.type === 'warning' ? 'text-amber-600' : 
                      alert.type === 'info' ? 'text-blue-600' : 'text-red-600'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Dashboard Marca ---

const BrandDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <CeliGoLogo size="medium" />
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600">
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Brand Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Productos', value: '45', icon: Package },
            { label: 'Visualizaciones', value: '15.2K', icon: Users },
            { label: 'Certificados', value: '12', icon: Award },
            { label: 'Tasa Conversión', value: '3.2%', icon: TrendingUp }
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-lg p-4 text-center">
              <div className="p-3 bg-blue-100 rounded-xl w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Certification Upload */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Gestión de Certificaciones</h3>
          <button className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-lg hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2 mb-4">
            <Upload className="w-4 h-4" />
            Subir Nuevo Certificado
          </button>
          <div className="space-y-3">
            {[
              { name: 'Certificado Sin Gluten 2024', status: 'approved', date: '2024-01-15' },
              { name: 'Análisis de Alérgenos', status: 'pending', date: '2024-01-20' },
              { name: 'Certificación Orgánica', status: 'approved', date: '2024-01-10' }
            ].map((cert) => (
              <div key={cert.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-800">{cert.name}</p>
                    <p className="text-sm text-gray-500">{cert.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    cert.status === 'approved' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {cert.status === 'approved' ? 'Aprobado' : 'Pendiente'}
                  </span>
                  <button className="p-2 hover:bg-gray-200 rounded-lg">
                    <Download className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Dashboard Admin ---

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <CeliGoLogo size="medium" />
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600">
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Usuarios Totales', value: '1,247', change: '+89', icon: Users },
            { label: 'Empresas Verificadas', value: '342', change: '+23', icon: Shield },
            { label: 'Productos Certificados', value: '5,678', change: '+156', icon: Package },
            { label: 'Uso IA Assistant', value: '92%', change: '+5%', icon: BarChart3 }
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <stat.icon className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Validaciones Pendientes</h3>
          <div className="space-y-3">
            {[
              { name: 'Hnos. Garcia SL', type: 'Marca', priority: 'high' },
              { name: 'Restaurante El Celíaco', type: 'Restaurante', priority: 'medium' },
              { name: 'Supermercado Verde', type: 'Tienda', priority: 'low' }
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    item.priority === 'high' ? 'bg-red-500' : 
                    item.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 border border-green-500 text-green-600 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                    Revisar
                  </button>
                  <button className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-medium shadow hover:from-green-600 hover:to-green-700 transition-all">
                    Aprobar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Main App Component ---

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen 
            onNext={() => setCurrentScreen('profile-selection')}
            onSignUp={() => setCurrentScreen('profile-selection')}
          />
        );
      
      case 'profile-selection':
        return (
          <ProfileSelectionScreen 
            onSelectRole={(role) => {
              setSelectedRole(role);
              setCurrentScreen('auth');
            }}
            onBack={() => setCurrentScreen('welcome')}
          />
        );
      
      case 'auth':
        return (
          <AuthScreen 
            onBack={() => setCurrentScreen('profile-selection')}
            onAuthSuccess={() => setCurrentScreen('dashboard')}
            selectedRole={selectedRole || 'client'}
          />
        );
      
      case 'dashboard':
        switch (selectedRole) {
          case 'client':
            return <ClientDashboard onNavigate={(screen) => setCurrentScreen(screen)} />;
          case 'restaurant':
            return <ManagementDashboard type="restaurant" />;
          case 'shop':
            return <ManagementDashboard type="shop" />;
          case 'brand':
            return <BrandDashboard />;
          case 'admin':
            return <AdminDashboard />;
          default:
            return <ClientDashboard onNavigate={(screen) => setCurrentScreen(screen)} />;
        }
      
      case 'Restaurantes':
      case 'Tiendas':
      case 'Marcas':
        return (
          <div className="pt-24 pb-32 px-6">
            <div className="mb-8">
              <button 
                onClick={() => setCurrentScreen('dashboard')}
                className="mb-4 p-2 hover:bg-gray-100 rounded-full transition-colors inline-flex"
              >
                <ArrowRight className="w-5 h-5 text-gray-600 rotate-180" />
              </button>
              <h1 className="text-3xl font-bold text-gray-800">
                {currentScreen === 'Restaurantes' && 'Restaurantes'}
                {currentScreen === 'Tiendas' && 'Tiendas'}
                {currentScreen === 'Marcas' && 'Marcas'}
              </h1>
              <p className="text-gray-600 mt-2">
                {currentScreen === 'Restaurantes' && 'Descubre restaurantes certificados sin gluten'}
                {currentScreen === 'Tiendas' && 'Encuentra tiendas con productos seguros'}
                {currentScreen === 'Marcas' && 'Explora marcas de confianza certificadas'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Ejemplo 1', verified: true, description: 'Descripción del lugar' },
                { name: 'Ejemplo 2', verified: false, description: 'Otra descripción' },
                { name: 'Ejemplo 3', verified: true, description: 'Más información' }
              ].map((item) => (
                <div key={item.name} className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    {item.verified && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return <WelcomeScreen onNext={() => setCurrentScreen('profile-selection')} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderScreen()}
    </div>
  );
}

export default App;