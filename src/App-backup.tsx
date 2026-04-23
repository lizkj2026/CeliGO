/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode, useRef, useEffect } from 'react';
import { 
  Menu, 
  MapPin, 
  Compass, 
  ShoppingBag, 
  ShieldCheck, 
  Verified, 
  Search, 
  Utensils, 
  ArrowRight, 
  Plus, 
  Info,
  Star,
  Ruler,
  ChevronRight,
  Shield,
  Flag,
  Check,
  Leaf,
  LogOut,
  LayoutDashboard,
  User,
  Mail,
  Lock,
  Eye,
  Globe,
  MessageCircle,
  X,
  Send,
  Scan,
  FileUp,
  Bell,
  Users,
  BarChart3,
  FileText,
  AlertTriangle,
  History,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

// Importar las nuevas pantallas
import { RestaurantesScreen } from './screens/RestaurantesScreen';
import { TiendasScreen } from './screens/TiendasScreen';
import { MarcasScreen } from './screens/MarcasScreen';
import { PopiChatbot } from './components/PopiChatbot';

// --- Components ---

const CeliGoLogo = ({ color = '#0F5238', className = "text-3xl", inline = false }: { color?: string, className?: string, inline?: boolean }) => (
  <span 
    className={`${inline ? 'inline-block align-baseline' : 'flex items-center justify-center gap-2'} ${className} font-black tracking-tighter`} 
    style={{ color }}
  >
    <div 
      className={inline ? "inline-block w-[1em] h-[1em] align-middle -translate-y-[2px]" : "w-[1.2em] h-[1.2em]"}
      style={{ 
        backgroundColor: color,
        WebkitMaskImage: 'url(https://files.catbox.moe/5k8x51.png)',
        maskImage: 'url(https://files.catbox.moe/5k8x51.png)',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center'
      }} 
    />
    CeliGO
  </span>
);

const BrandIcon = ({ color, className = "w-6 h-6" }: { color: string, className?: string }) => (
  <div 
    className={className}
    style={{ 
      backgroundColor: color,
      WebkitMaskImage: 'url(https://files.catbox.moe/5k8x51.png)',
      maskImage: 'url(https://files.catbox.moe/5k8x51.png)',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      maskPosition: 'center'
    }} 
  />
);

const Badge = ({ children, variant = 'primary' }: { children: ReactNode, variant?: 'primary' | 'secondary' | 'outline' }) => {
  const variants = {
    primary: "bg-secondary-fixed text-on-secondary-fixed",
    secondary: "bg-primary-container text-on-primary-container",
    outline: "bg-surface-container-low text-on-surface-variant border border-outline-variant/20"
  };
  return (
    <span className={`px-4 py-2 rounded-full text-[0.75rem] font-bold tracking-widest uppercase flex items-center gap-2 ${variants[variant]}`}>
      <BrandIcon color="currentColor" className="w-4 h-4 opacity-70" />
      {children}
    </span>
  );
};

// --- Screens ---

const ROLES = [
  { id: 'client', label: 'Cliente', desc: 'Celíaco o familiar', icon: User, color: '#0F5238' },
  { id: 'restaurant', label: 'Restaurante', desc: 'Hostelería y menús', icon: Utensils, color: '#BA4A00' },
  { id: 'shop', label: 'Tienda', desc: 'Locales, Supermercados y Makros', icon: ShoppingBag, color: '#4A235A' },
  { id: 'brand', label: 'Marca', desc: 'Fabricante de productos sin gluten', icon: () => <BrandIcon color="#1D4ED8" className="w-8 h-8" />, color: '#1D4ED8' },
  { id: 'admin', label: 'Admin', desc: 'Control y moderación', icon: Shield, color: '#000000' },
];

const ProfileSelectionScreen = ({ onBack, onSelect }: { onBack: () => void, onSelect: (roleId: string) => void, key?: string }) => (
  <motion.div 
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '100%' }}
    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    className="min-h-screen bg-surface flex flex-col p-8 overflow-y-auto no-scrollbar"
  >
    <header className="flex items-center justify-between h-16 w-full mb-12">
      <button onClick={onBack} className="p-2 hover:bg-surface-container rounded-full transition-colors">
        <ArrowRight className="w-6 h-6 text-on-surface rotate-180" />
      </button>
      <CeliGoLogo color="#0F5238" className="text-3xl" />
      <div className="w-10" />
    </header>

    <div className="mb-10">
      <h2 className="text-4xl font-light text-on-surface leading-tight">
        ¿Cómo quieres <br />
        <span className="font-bold text-primary flex items-center gap-2">usar <CeliGoLogo color="#0F5238" className="text-4xl" />?</span>
      </h2>
      <p className="mt-4 text-on-surface-variant label-md opacity-70">Selecciona el perfil que mejor te describa.</p>
    </div>

    <div className="grid grid-cols-1 gap-4 mb-20 relative z-20">
      {ROLES.map((role) => (
        <button 
          key={role.id}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(role.id);
          }}
          className="group relative flex items-center gap-6 p-6 bg-surface-container-low rounded-[2rem] border border-outline-variant/10 hover:border-primary/30 transition-all hover:bg-surface-container-low/50 hover:shadow-xl active:scale-[0.98] cursor-pointer"
        >
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500"
            style={{ backgroundColor: `${role.color}15`, color: role.color }}
          >
            <role.icon className="w-8 h-8" />
          </div>
          <div className="text-left">
            <h3 className="title-lg text-on-surface mb-1" style={{ color: role.color }}>{role.label}</h3>
            <p className="text-on-surface-variant text-sm font-medium opacity-60 leading-tight">{role.desc}</p>
          </div>
          <div className="ml-auto w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline group-hover:bg-primary group-hover:text-on-primary transition-all">
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>
      ))}
    </div>
  </motion.div>
);

const SignUpScreen = ({ onBack, onLogin, roleId }: { onBack: () => void, onLogin: () => void, roleId: string, key?: string }) => {
  const role = ROLES.find(r => r.id === roleId) || ROLES[0];
  const accentColor = role.color;

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="min-h-screen bg-surface flex flex-col p-6 overflow-y-auto no-scrollbar scroll-smooth"
    >
      {/* Header */}
      <header className="flex items-center justify-between h-16 w-full mb-10">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-surface-container rounded-full transition-colors"
        >
          <ArrowRight className="w-6 h-6 text-on-surface rotate-180" />
        </button>
        <CeliGoLogo color={accentColor} className="text-4xl" />
        <div className="w-10 h-10" /> {/* Spacer */}
      </header>

      {/* Title Section */}
      <div className="relative mb-8">
        <div 
          className="absolute -top-16 -left-8 text-[14rem] font-bold select-none pointer-events-none opacity-[0.07]"
          style={{ color: accentColor }}
        >
          Ú
        </div>
        <div className="relative z-10">
          <h2 className="text-5xl font-light text-on-surface leading-tight tracking-tight">
            Únete a la <br />
            <span className="font-extrabold" style={{ color: accentColor }}>comunidad</span>
          </h2>
          <p className="mt-4 text-on-surface-variant text-lg leading-relaxed max-w-[280px]">
            {role.id === 'client' ? 'Empieza tu viaje hacia un estilo de vida sin gluten, seguro y premium.' : <span className="flex items-center flex-wrap">Perfil de {role.label}: Configura tu cuenta para gestionar el ecosistema <CeliGoLogo color={accentColor} inline className="text-lg" />.</span>}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-8 relative z-20 mt-12 mb-12">
        <div className="space-y-3">
          <label className="text-[11px] font-black text-on-surface/60 uppercase tracking-[0.2em] ml-4">Nombre Completo</label>
          <div className="relative flex items-center">
            <User className="absolute left-6 w-5 h-5 text-outline/60" />
            <input 
              type="text" 
              placeholder="Ej. Ana García"
              className="w-full h-18 pl-16 pr-6 bg-[#E8EAEB] rounded-[2rem] border-none focus:ring-2 transition-all text-on-surface placeholder:text-outline/40 font-medium"
              style={{ '--tw-ring-color': accentColor } as any}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[11px] font-black text-on-surface/60 uppercase tracking-[0.2em] ml-4">Correo Electrónico</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-6 w-5 h-5 text-outline/60" />
            <input 
              type="email" 
              placeholder="ana@ejemplo.com"
              className="w-full h-18 pl-16 pr-6 bg-[#E8EAEB] rounded-[2rem] border-none focus:ring-2 transition-all text-on-surface placeholder:text-outline/40 font-medium"
              style={{ '--tw-ring-color': accentColor } as any}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[11px] font-black text-on-surface/60 uppercase tracking-[0.2em] ml-4">Contraseña</label>
          <div className="relative flex items-center">
            <Lock className="absolute left-6 w-5 h-5 text-outline/60" />
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full h-18 pl-16 pr-20 bg-[#E8EAEB] rounded-[2rem] border-none focus:ring-2 transition-all text-on-surface placeholder:text-outline/40 font-medium"
              style={{ '--tw-ring-color': accentColor } as any}
            />
            <button className="absolute right-6 p-2 text-outline/40 hover:opacity-70 transition-opacity">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-start gap-4 px-2 py-2">
          <div className="mt-1 w-6 h-6 rounded-full bg-[#E8EAEB] border-2 border-transparent cursor-pointer transition-all flex-shrink-0" />
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Acepto los <span className="font-bold underline cursor-pointer decoration-2 underline-offset-4" style={{ color: accentColor }}>términos y condiciones</span> y la política de privacidad de <CeliGoLogo color={accentColor} inline className="text-sm" />.
          </p>
        </div>

        <div className="pt-4 space-y-8">
          <button 
            onClick={onLogin}
            className="w-full h-18 text-white rounded-[2rem] font-bold flex items-center justify-center gap-3 shadow-[0_12px_24px_-8px_rgba(15,82,56,0.3)] hover:shadow-xl active:scale-[0.98] transition-all text-lg"
            style={{ backgroundColor: accentColor }}
          >
            Crear mi cuenta <ArrowRight className="w-5 h-5 shadow-sm" />
          </button>

          <div className="text-center">
            <p className="text-on-surface/70 font-medium">
              ¿Ya tienes cuenta? <span onClick={onLogin} className="font-bold cursor-pointer hover:opacity-80 transition-opacity" style={{ color: accentColor }}>Iniciar sesión</span>
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges - Redesigned to match image */}
      <div className="flex justify-between gap-6 px-2 mt-8 pb-12">
        <div className="flex-1 flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full bg-surface-container-low flex items-center justify-center relative overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-[#0F5238]/5" />
            <div className="w-12 h-12 bg-[#B1F0CE] rounded-xl flex items-center justify-center text-[#0F5238] shadow-sm z-10">
              <BrandIcon color="#0F5238" className="w-6 h-6" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface/40 mb-1">Seguridad</p>
            <p className="font-bold text-sm text-on-surface">Datos Protegidos</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full bg-surface-container-low flex items-center justify-center relative overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-[#0F5238]/5" />
            <div className="w-12 h-12 bg-[#B1F0CE] rounded-xl flex items-center justify-center text-[#0F5238] shadow-sm z-10">
              <BrandIcon color="#0F5238" className="w-6 h-6" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface/40 mb-1">Calidad</p>
            <p className="font-bold text-sm text-on-surface">100% Sin Gluten</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WelcomeScreen = ({ onNext, onSignUp }: { onNext: () => void, onSignUp: () => void, key?: string }) => (
  <motion.main 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden bg-surface"
  >
      {/* Organic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(177,240,206,0.3)_0%,rgba(248,249,250,0)_40%),radial-gradient(circle_at_90%_80%,rgba(166,243,200,0.2)_0%,rgba(248,249,250,0)_50%)] -z-10 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none" />
      <div className="absolute -bottom-48 -right-24 w-[32rem] h-[32rem] bg-secondary-fixed/10 rounded-full blur-[100px] opacity-60 -z-10 pointer-events-none" />

    <div className="w-full max-w-md flex flex-col items-center text-center relative z-10">
      {/* Logo Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <div className="relative inline-flex items-center justify-center p-8 bg-surface-container-lowest rounded-3xl shadow-[0_0_40px_0_rgba(15,82,56,0.06)] group">
          <img 
            src="https://files.catbox.moe/5k8x51.png" 
            alt="Leaf Icon Replacement" 
            className="w-24 h-24 object-contain transform group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 border-2 border-primary-fixed/20 rounded-3xl pointer-events-none" />
        </div>
        <CeliGoLogo color="#0F5238" className="mt-8 text-6xl mx-auto" />
        <p className="mt-4 text-on-surface-variant label-md opacity-80 leading-relaxed italic">
          "Por fin, el gluten no es el que manda."<br />
          De celíaca a celíaco 😉
        </p>
      </motion.div>

      {/* Visual Hook Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full mb-12 aspect-[4/3] rounded-xl overflow-hidden relative shadow-2xl"
      >
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjyqLrZQvYVJstQPpDfjPby5Rx_NHYfwni8hEvZyZJtIjQazgpje0voEY2qkX3lQhlH3P_42xOPyBG148LEkHOOTwc92Uthsr5boB0NLVKYPRsH-z3e7fR2Btvz__5U4HMMAE2dX80OaEuY7MDqSn4j4JLSjJiImyX4QKbZg6PiwLvcln_KKwBgTwC4WZ3HpNSFmvIq9qLJ3iH4B67JgZfxaPBwZNVlsIRIZsGouXmcMlN1seFTXpf5ZC-wESglyhSz48TwTxa1Mg" 
          alt="Artisan gluten free bread" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">Certificado</span>
          </div>
          <p className="text-white text-lg font-semibold leading-tight">Seguridad en cada bocado.</p>
        </div>
      </motion.div>

      {/* Action Cluster */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full space-y-4 relative z-20"
      >
        <button 
          onClick={onNext}
          className="w-full h-16 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 group"
        >
          <span>Iniciar Sesión</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
        <button 
          onClick={onSignUp}
          className="w-full h-16 bg-surface-container-lowest text-primary border border-outline-variant/30 rounded-full font-bold hover:bg-surface-container transition-all active:scale-95"
        >
          Crear una cuenta
        </button>
      </motion.div>

      {/* Footer Meta */}
      <div className="mt-12">
        <p className="text-sm text-on-surface-variant font-medium">
          Explora sin límites. Vive con confianza.
        </p>
        <div className="mt-6 flex justify-center gap-6">
          <Utensils className="text-outline w-6 h-6 hover:text-primary cursor-pointer transition-colors" />
          <ShoppingBag className="text-outline w-6 h-6 hover:text-primary cursor-pointer transition-colors" />
          <BrandIcon color="currentColor" className="text-outline w-6 h-6 hover:text-primary cursor-pointer transition-colors" />
        </div>
      </div>
    </div>
  </motion.main>
);

const ClientDashboard = ({ onNavigate, key }: { onNavigate: (s: string) => void, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="pt-24 pb-32 px-6"
  >
    {/* Search & Core Actions */}
    <section className="mb-10">
      <div className="relative group mb-6">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-outline/60">
          <Search className="w-6 h-6" />
        </div>
        <input 
          className="w-full h-18 pl-16 pr-8 rounded-[2rem] bg-surface-container-high border-none focus:ring-2 focus:ring-primary transition-all text-on-surface font-medium" 
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
            className="flex flex-col items-center gap-3 p-4 bg-surface-container-low rounded-3xl border border-outline-variant/10 hover:shadow-lg transition-all"
          >
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${action.color}15`, color: action.color }}
            >
              <action.icon className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-on-surface/70">{action.label}</span>
          </button>
        ))}
      </div>
    </section>

    {/* Featured Categories Teaser (Merged from original HomeScreen) */}
    <section className="mb-10">
      <h2 className="title-lg text-on-surface mb-6 flex items-center gap-2">
        <Compass className="w-6 h-6 text-primary" /> Santuarios Destacados
      </h2>
      <div className="space-y-6">
        {/* Binary Validation System Showcase */}
        {[
          { name: 'Terraza Verde', type: 'Restaurante', safe: true, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0hdpo97tbqHRwAil5fkhiCGRWtYPcgq3Fhuo4pJtqRJeNHQc5gVexpnc4ML_ZR9jvgWh7caM08K7RUhyutxECHW8DppsXkMHo4_KWwtzPrQHXjbU7DWocschcr7LRT6lnjaUap0-hj9X5ablmmKmyEK1S8oCsTqRaPvYP0zVU68mDD11ybwe_cZLmGRt5Q9wEhFDS1hYJG-ts1havi4thq7CDB5mJNsOR2-CoV62N8SWq5kU_3PVRVFs_loPZiV-FSSD9jp4y8Jo' },
          { name: 'Pan Artesano Mix', type: 'Panadería', safe: false, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjN7P4Tl_DsAOhmWXuyj2IdmqVvD_GfoQe-VFZ6uZRSUC58DA8kzpxtGCJnpTo6mZsZ9OSEA6TISpZKSvDUsQoGOVgGV4sQrtut-Uw1QQzc7MLkprYXCq8YGWRzDlLv7mUEnSNKclPZMWNKyZVxXMmiB7VO0wtuECllfubOyklCpFdjxTXx3ftLA_2nGEePnQR-d6s-_y66TnJgqQk1HD1AP6ChrftIb-qCuNRTac0uvLo0WA77ryGPzJJQcxcUg0h0o6MIsfNvz8' }
        ].map((item) => (
          <div key={item.name} className="relative group overflow-hidden rounded-[2.5rem] bg-surface-container-low border border-outline-variant/5">
            <div className="aspect-[21/9] w-full relative overflow-hidden">
              <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={item.name} referrerPolicy="no-referrer" />
              {/* Binary Validation Overlay */}
              <div className="absolute top-4 right-4 z-20">
                {item.safe ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#B1F0CE] text-[#0F5238] rounded-full shadow-lg border border-[#0F5238]/20 font-bold text-xs uppercase tracking-widest">
                    <CheckCircle2 className="w-4 h-4" /> Seguro
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#FADBD8] text-[#922B21] rounded-full shadow-lg border border-[#922B21]/20 font-bold text-xs uppercase tracking-widest">
                    <XCircle className="w-4 h-4" /> Precaución
                  </div>
                )}
              </div>
            </div>
            <div className="p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">{item.type}</p>
              <h3 className="title-lg text-on-surface">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

const RestaurantDashboard = ({ key }: { key?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="pt-24 pb-32 px-6"
  >
    <section className="mb-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="display-sm text-on-surface leading-tight">Panel de <br /><span className="text-[#BA4A00]">Control</span></h2>
          <p className="text-on-surface-variant mt-2 font-medium">Seguridad Alimentaria CeliGO</p>
        </div>
        <div className="w-16 h-16 bg-[#BA4A00]/10 rounded-2xl flex items-center justify-center text-[#BA4A00]">
          <BarChart3 className="w-8 h-8" />
        </div>
      </div>

      <button className="w-full h-20 bg-[#BA4A00] text-white rounded-3xl font-black text-lg flex items-center justify-center gap-4 shadow-[0_12px_24px_-8px_rgba(186,74,0,0.4)] active:scale-95 transition-transform">
        <Plus className="w-8 h-8" /> AÑADIR NUEVO PLATO
      </button>
    </section>

    {/* Menu Logic */}
    <section className="mb-10">
      <h3 className="label-md text-on-surface/60 uppercase tracking-[0.2em] ml-4 mb-4">Gestión de Carta</h3>
      <div className="space-y-4">
        {[
          { name: 'Pizza Margarita', status: 'safe' },
          { name: 'Lasaña Casera', status: 'gluten' },
          { name: 'Tarta de Queso', status: 'safe' }
        ].map((dish) => (
          <div key={dish.name} className="p-6 bg-surface-container-low rounded-3xl flex items-center justify-between border border-outline-variant/10">
            <div>
              <h4 className="title-md text-on-surface">{dish.name}</h4>
              <p className="text-xs text-on-surface-variant font-medium opacity-60">Última actualización: Hoy, 10:45</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${dish.status === 'safe' ? 'bg-[#B1F0CE] text-[#0F5238] border border-[#0F5238]/20' : 'bg-surface-container text-outline'}`}
              >
                Sin Trazas
              </button>
              <button 
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${dish.status === 'gluten' ? 'bg-[#FADBD8] text-[#922B21] border border-[#922B21]/20' : 'bg-surface-container text-outline'}`}
              >
                Con Gluten
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Social Metrics */}
    <section>
      <h3 className="label-md text-on-surface/60 uppercase tracking-[0.2em] ml-4 mb-4">Feedback Comunidad</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-surface-container-high rounded-3xl flex flex-col items-center text-center">
          <Star className="w-8 h-8 text-amber-500 fill-amber-500 mb-2" />
          <p className="text-3xl font-black text-on-surface">4.8</p>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Calificación Media</p>
        </div>
        <div className="p-6 bg-surface-container-high rounded-3xl flex flex-col items-center text-center border-2 border-[#BA4A00]/20">
          <History className="w-8 h-8 text-[#BA4A00] mb-2" />
          <p className="text-3xl font-black text-on-surface">24</p>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Reseñas este mes</p>
        </div>
      </div>
    </section>
  </motion.div>
);

const ShopDashboard = ({ key }: { key?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="pt-24 pb-32 px-6"
  >
    <section className="mb-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="display-sm text-on-surface leading-tight">Gestión de <br /><span className="text-[#4A235A]">Stock</span></h2>
          <p className="text-on-surface-variant mt-2 font-medium">Inventario Sin Gluten Certificado</p>
        </div>
        <div className="w-16 h-16 bg-[#4A235A]/10 rounded-2xl flex items-center justify-center text-[#4A235A]">
          <ShoppingBag className="w-8 h-8" />
        </div>
      </div>

      {/* Alert Feed */}
      <div className="p-6 bg-[#4A235A] text-white rounded-3xl mb-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 flex-shrink-0 animate-pulse" />
          <div>
            <h4 className="font-black text-lg uppercase tracking-tight">Alerta de Alérgenos Urgente</h4>
            <p className="text-white/80 text-sm mt-1 font-medium">Publica una notificación push inmediata sobre trazas cruzadas en productos específicos.</p>
            <button className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-md rounded-xl font-bold text-xs uppercase tracking-widest border border-white/30">
              Notificar a Clientes
            </button>
          </div>
        </div>
        <Bell className="absolute -right-8 -bottom-8 w-32 h-32 opacity-10 rotate-12" />
      </div>
    </section>

    {/* Product Feed */}
    <section>
      <div className="flex items-center justify-between mb-6 px-4">
        <h3 className="label-md text-on-surface/60 uppercase tracking-[0.2em]">Productos en Feed</h3>
        <Plus className="w-6 h-6 text-[#4A235A] cursor-pointer" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: 'Pan de Molde', price: '3,50€', img: 'https://picsum.photos/seed/bread/400/400' },
          { name: 'Galletas Choco', price: '4,20€', img: 'https://picsum.photos/seed/cookie/400/400' },
          { name: 'Pasta Penne', price: '2,95€', img: 'https://picsum.photos/seed/pasta/400/400' },
          { name: 'Cerveza Sin GF', price: '1,80€', img: 'https://picsum.photos/seed/beer/400/400' }
        ].map((prod) => (
          <div key={prod.name} className="group bg-surface-container-low rounded-3xl overflow-hidden border border-outline-variant/10 hover:shadow-lg transition-all">
            <div className="aspect-square relative overflow-hidden">
              <img src={prod.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={prod.name} referrerPolicy="no-referrer" />
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-[#4A235A]">
                {prod.price}
              </div>
            </div>
            <div className="p-4">
              <h4 className="title-md text-on-surface line-clamp-1">{prod.name}</h4>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">En Stock</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

const BrandDashboard = ({ key }: { key?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="pt-24 pb-32 px-6"
  >
    <section className="mb-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="display-sm text-on-surface leading-tight">Gestión de <br /><span className="text-[#1D4ED8]">Certificados</span></h2>
          <p className="text-on-surface-variant mt-2 font-medium">Validación de Sellos Oficiales</p>
        </div>
        <div className="w-16 h-16 bg-[#1D4ED8]/10 rounded-2xl flex items-center justify-center">
          <BrandIcon color="#1D4ED8" className="w-8 h-8" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="p-8 bg-surface-container-low rounded-[2rem] border border-outline-variant/10 text-center">
          <TrendingUp className="w-8 h-8 text-[#1D4ED8] mx-auto mb-3" />
          <p className="text-3xl font-black text-on-surface">45.2K</p>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Vistas de Perfil</p>
        </div>
        <div className="p-8 bg-surface-container-low rounded-[2rem] border border-outline-variant/10 text-center">
          <CheckCircle2 className="w-8 h-8 text-[#0F5238] mx-auto mb-3" />
          <p className="text-3xl font-black text-on-surface">12</p>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Productos OK</p>
        </div>
      </div>
    </section>

    {/* PDF Upload Zone */}
    <section className="mb-10">
      <h3 className="label-md text-on-surface/60 uppercase tracking-[0.2em] ml-4 mb-4">Certificación de Sellos</h3>
      <div className="p-10 border-2 border-dashed border-outline-variant/30 rounded-[3rem] bg-surface-container-lowest flex flex-col items-center text-center group hover:border-[#1D4ED8]/50 transition-all cursor-pointer">
        <div className="w-20 h-20 bg-[#1D4ED8]/10 rounded-full flex items-center justify-center text-[#1D4ED8] mb-6 group-hover:scale-110 transition-transform">
          <FileUp className="w-10 h-10" />
        </div>
        <h4 className="title-lg text-on-surface mb-2">Cargar Certificado Sin Gluten</h4>
        <p className="text-on-surface-variant text-sm font-medium px-4">Sube tus documentos PDF o imágenes de auditorías para validación de la IA.</p>
        <div className="mt-8 flex items-center gap-3">
          <Badge variant="outline">PDF</Badge>
          <Badge variant="outline">JPG</Badge>
          <Badge variant="outline">PNG</Badge>
        </div>
      </div>
    </section>

    {/* AI Analysis Card */}
    <section>
      <div className="p-8 bg-[#1D4ED8]/5 rounded-[2.5rem] border border-[#1D4ED8]/20 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <CeliGoLogo color="#1D4ED8" inline className="text-2xl" />
            <span className="text-[10px] font-black uppercase bg-[#1D4ED8] text-white px-2 py-0.5 rounded-md">Analizador IA</span>
          </div>
          <h4 className="title-lg text-on-surface mb-3">Auditoría de Etiquetado</h4>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Sube una foto del etiquetado frontal y trasero. Nuestra IA verificará si cumple con el Reglamento (UE) No 828/2014.</p>
          <button className="w-full h-14 bg-white border-2 border-[#1D4ED8] text-[#1D4ED8] rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-[#1D4ED8] hover:text-white transition-all">
            <Scan className="w-5 h-5" /> Iniciar Análisis
          </button>
        </div>
        <BrandIcon color="#1D4ED8" className="absolute -right-10 -bottom-10 w-48 h-48 opacity-[0.03] rotate-12" />
      </div>
    </section>
  </motion.div>
);

const AdminDashboard = ({ key }: { key?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="pt-24 pb-32 px-6"
  >
    <header className="mb-10">
      <h2 className="display-sm text-on-surface">Centro de <br /><span className="text-primary">Moderación</span></h2>
      <p className="text-on-surface-variant mt-2 text-lg">Control Global de Seguridad Alimentaria</p>
    </header>

    {/* Stats Grid */}
    <div className="grid grid-cols-3 gap-3 mb-10">
       {[
         { label: 'Usuarios', val: '1.2K', color: '#000' },
         { label: 'Pendientes', val: '18', color: '#BA4A00' },
         { label: 'IA Uso', val: '92%', color: '#1D4ED8' }
       ].map(stat => (
         <div key={stat.label} className="p-4 bg-surface-container-low rounded-2xl text-center border border-outline-variant/5">
            <p className="text-xl font-black text-on-surface" style={{ color: stat.color }}>{stat.val}</p>
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant mt-1">{stat.label}</p>
         </div>
       ))}
    </div>

    {/* Moderation Table */}
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6 px-4">
        <h3 className="label-md text-on-surface/60 uppercase tracking-[0.2em]">Validaciones Pendientes</h3>
        <ChevronRight className="w-5 h-5 text-outline" />
      </div>
      <div className="space-y-4">
        {[
          { name: 'Hnos. Garcia SL', type: 'Marca', role: 'brand' },
          { name: 'Rest. El Celíaco', type: 'Restaurante', role: 'restaurant' }
        ].map((item) => (
          <div key={item.name} className="p-6 bg-surface-container-high rounded-3xl border border-outline-variant/10 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary">
                  {item.role === 'brand' ? <BrandIcon color="currentColor" className="w-6 h-6" /> : <Utensils className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="title-md text-on-surface">{item.name}</h4>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">{item.type}</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-surface-container rounded-full flex items-center justify-center text-outline">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-outline-variant/10">
              <button className="h-12 bg-[#B1F0CE] text-[#0F5238] rounded-xl font-black text-[10px] uppercase tracking-widest hover:brightness-95 transition-all">Aprobar</button>
              <button className="h-12 bg-[#FADBD8] text-[#922B21] rounded-xl font-black text-[10px] uppercase tracking-widest hover:brightness-95 transition-all">Denegar</button>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Users List Snapshot */}
    <section>
      <h3 className="label-md text-on-surface/60 uppercase tracking-[0.2em] ml-4 mb-4">Usuarios por Perfil</h3>
      <div className="p-8 bg-surface-container-low rounded-[2.5rem] space-y-6">
        {[
          { label: 'Clientes', icon: User, count: 980, color: '#0F5238' },
          { label: 'Restaurantes', icon: Utensils, count: 145, color: '#BA4A00' },
          { label: 'Tiendas', icon: ShoppingBag, count: 86, color: '#4A235A' },
          { label: 'Marcas', icon: Verified, count: 37, color: '#1D4ED8' }
        ].map(cat => (
          <div key={cat.label} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
              <cat.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-on-surface">{cat.label}</span>
                <span className="text-xs font-black text-on-surface/40">{cat.count}</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(cat.count / 1000) * 100}%` }}
                  className="h-full rounded-full" 
                  style={{ backgroundColor: cat.color }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

const LocalesScreen = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="pt-24 pb-32 px-6"
  >
    <section className="mb-12">
      <h2 className="display-sm text-on-surface mb-6">
        Encuentra tu lugar <br /><span className="text-secondary">seguro hoy.</span>
      </h2>
      <div className="relative flex items-center">
        <input 
          className="w-full h-14 pl-14 pr-6 bg-surface-container-highest border-none rounded-2xl focus:ring-2 focus:ring-primary focus:bg-surface-bright transition-all placeholder:text-outline/60" 
          placeholder="Buscar restaurantes o ciudades..." 
          type="text" 
        />
        <Search className="absolute left-5 text-outline w-6 h-6" />
      </div>
    </section>

    <div className="flex gap-3 mb-10 overflow-x-auto no-scrollbar pb-2">
      {['Opciones Sin Gluten', 'Cerca de mí', 'Mejor valorados'].map(filter => (
        <button key={filter} className="flex items-center gap-2 bg-surface-container-high px-6 py-3 rounded-full text-on-surface-variant font-semibold text-sm whitespace-nowrap hover:bg-surface-dim transition-colors">
          {filter}
        </button>
      ))}
    </div>

    <div className="space-y-8">
      {/* Principal Result */}
      <div className="group relative overflow-hidden rounded-3xl bg-surface-container-lowest shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-500">
        <div className="aspect-[16/10] overflow-hidden relative">
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0hdpo97tbqHRwAil5fkhiCGRWtYPcgq3Fhuo4pJtqRJeNHQc5gVexpnc4ML_ZR9jvgWh7caM08K7RUhyutxECHW8DppsXkMHo4_KWwtzPrQHXjbU7DWocschcr7LRT6lnjaUap0-hj9X5ablmmKmyEK1S8oCsTqRaPvYP0zVU68mDD11ybwe_cZLmGRt5Q9wEhFDS1hYJG-ts1havi4thq7CDB5mJNsOR2-CoV62N8SWq5kU_3PVRVFs_loPZiV-FSSD9jp4y8Jo"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 bg-secondary-fixed/95 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
            <BrandIcon color="#0f5238" className="w-4 h-4" />
          </div>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="label-md text-secondary mb-1">Alta Cocina</p>
              <h3 className="title-lg text-on-surface">Terraza Verde Gastronomía</h3>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container-high px-3 py-1.5 rounded-full">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-bold">4.9</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-outline text-sm font-medium">
            <span className="flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded-md"><MapPin className="w-4 h-4 text-primary" /> a 0.8 km</span>
            <span className="flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded-md"><Utensils className="w-4 h-4 text-primary" /> €€€</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="group overflow-hidden rounded-3xl bg-surface-container-lowest shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-500">
          <div className="aspect-square overflow-hidden relative">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9XMXE4uqL3iZDzTAPt0OkIAk7_4XOrpaWEssTQ-6EYD3de5wSeInHS0b1NaUD_jkQCDxxzN4EoYGiX4M9UyXILt8zmOTZ7O6mKBQ3cEtTYeGhs4F_4sKk46xEoW0q5Y1ntQpJ7aWuu7N9HvDXvSb0wcLF2BRz3VVUEXqeEQfb-fsXsfBRySmqnK5kf6c7qOv5q9gSZkXf1vy70F9C4HXq2i0tBd66WTrfwryS8pS6Eso-9OpYBc79_-jMT_NZsFaftrH_HHi1nNc"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
              <span className="label-md text-on-surface">Sin Gluten</span>
            </div>
          </div>
          <div className="p-6">
            <h4 className="title-lg text-on-surface mb-2">Trigo Cero Bakery</h4>
            <div className="flex items-center justify-between text-xs text-outline font-bold">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> a 1.2 km</span>
              <span className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full"><Star className="w-3 h-3 text-amber-500 fill-amber-500" /> 4.7</span>
            </div>
          </div>
        </div>
        <div className="bg-primary-fixed p-8 rounded-3xl flex flex-col justify-center h-full relative overflow-hidden group shadow-sm">
          <BrandIcon color="#0F5238" className="absolute -right-4 -bottom-4 w-32 h-32 opacity-15 rotate-12 group-hover:rotate-[24deg] transition-transform duration-700" />
          <h4 className="text-on-primary-fixed title-lg mb-2 z-10 leading-tight">Seguridad <br />Garantizada</h4>
          <p className="text-on-primary-fixed-variant text-sm z-10 opacity-90 leading-relaxed font-medium">Auditados periódicamente por organizaciones certificadoras.</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const ExplorarScreen = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="pt-24 pb-32 px-6"
  >
    <section className="mb-12">
      <div className="flex flex-col gap-1">
        <p className="label-md text-primary">Bienvenido de nuevo</p>
        <h2 className="display-sm text-on-surface">Hola, Adrián.</h2>
        <p className="text-on-surface-variant mt-2 text-lg">Tu santuario de opciones sin gluten está listo.</p>
      </div>
    </section>

    <div className="flex flex-col gap-6">
      {/* Featured Big Card */}
      <div className="bg-primary-fixed rounded-3xl p-10 flex flex-col justify-between overflow-hidden relative group cursor-pointer shadow-[0_10px_40px_rgba(15,82,56,0.08)] hover:shadow-2xl transition-all duration-500">
        <div className="z-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg transform group-hover:-rotate-6 transition-transform">
            <Utensils className="w-8 h-8 text-on-primary" />
          </div>
          <h3 className="text-4xl font-extrabold text-on-primary-fixed mt-8 tracking-tighter">Restaurantes</h3>
          <p className="text-on-secondary-fixed-variant text-base mt-2 font-medium opacity-80 italic">120+ Lugares seguros</p>
        </div>
        <div className="absolute top-10 right-10 opacity-5 group-hover:scale-125 transition-transform duration-1000 group-hover:rotate-12">
          <Utensils className="w-64 h-64" />
        </div>
        <div className="z-10 mt-12">
          <button className="bg-primary text-on-primary h-14 px-8 rounded-full font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-lg group-hover:bg-primary/90">
            Explorar ahora <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Smaller Cards */}
        <div className="bg-surface-container-low rounded-3xl p-8 flex flex-col justify-between items-start cursor-pointer hover:bg-surface-container transition-all duration-300 group shadow-sm hover:translate-y-[-4px]">
          <div className="w-14 h-14 bg-secondary-container rounded-2xl flex items-center justify-center text-on-secondary-container shadow-sm group-hover:rotate-12 transition-transform">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div>
            <h4 className="title-lg text-on-surface">Tiendas</h4>
            <p className="label-md text-on-surface-variant opacity-60 mt-1">Cercanas</p>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-3xl p-8 flex flex-col justify-between items-start cursor-pointer hover:bg-surface-container transition-all duration-300 group shadow-sm hover:translate-y-[-4px]">
          <div className="w-14 h-14 bg-tertiary-fixed rounded-2xl flex items-center justify-center text-on-tertiary-fixed-variant shadow-sm group-hover:-rotate-12 transition-transform">
            <BrandIcon color="currentColor" className="w-7 h-7" />
          </div>
          <div>
            <h4 className="title-lg text-on-surface">Marcas</h4>
            <p className="label-md text-on-surface-variant opacity-60 mt-1">Validadas</p>
          </div>
        </div>
      </div>

      {/* Horizontal Banner Card */}
      <div className="bg-surface-container-lowest rounded-3xl p-8 flex flex-row items-center justify-between cursor-pointer border border-outline-variant/10 hover:shadow-lg transition-all duration-500 group">
        <div className="flex flex-col gap-2">
          <h4 className="text-2xl font-bold text-on-surface">Recursos Celíacos</h4>
          <p className="text-sm text-on-surface-variant font-medium max-w-[200px]">Guías, noticias y comunidad segura para ti.</p>
        </div>
        <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center text-primary shadow-inner group-hover:scale-110 transition-transform">
          <Compass className="w-10 h-10 group-hover:rotate-[360deg] transition-transform duration-1000" />
        </div>
      </div>
    </div>
  </motion.div>
);

const BRANDS = [
  { 
    nombre: 'Schär', 
    web_oficial: 'https://www.schaer.com/es-es', 
    logo: 'https://files.catbox.moe/sr2gm1',
    especialidad: 'Panadería y Repostería',
    descripcion: 'Líder mundial con certificación AOECS, garantizando la máxima seguridad y sabor en cada receta sin gluten.',
    pais_origen: 'Italia',
    top: true
  },
  { 
    nombre: 'Gullón', 
    web_oficial: 'https://gullon.es/productos/sin-gluten/', 
    logo: 'https://gullon.es/wp-content/uploads/2021/04/LogoGullon.png',
    especialidad: 'Galletas y Snacks',
    descripcion: 'Innovación constante y procesos certificados para ofrecer las mejores galletas sin gluten con total confianza.',
    pais_origen: 'España',
    top: true
  },
  { 
    nombre: 'Procelli', 
    web_oficial: 'https://www.procelli.com/', 
    logo: 'https://www.procelli.com/wp-content/uploads/2019/02/logo-procelli.png',
    especialidad: 'Panadería y Bollería',
    descripcion: 'Especialistas en panadería premium, con estrictos controles de calidad para una vida sin gluten segura y deliciosa.',
    pais_origen: 'España',
    top: true
  },
  { 
    nombre: 'Santiveri', 
    web_oficial: 'https://santiveri.com/productos-sin-gluten/', 
    logo: 'https://santiveri.com/wp-content/uploads/2019/04/logo-santiveri.png',
    especialidad: 'Alimentación Natural',
    descripcion: 'Pioneros en bienestar, ofreciendo productos certificados que combinan salud, naturaleza y seguridad alimentaria.',
    pais_origen: 'España',
    top: true
  },
  { 
    nombre: 'Barilla', 
    web_oficial: 'https://www.barilla.com/es-es/productos/pasta/sin-gluten', 
    logo: 'https://picsum.photos/seed/barillagf/800/400',
    especialidad: 'Pasta',
    descripcion: 'La auténtica pasta italiana ahora sin gluten, certificada para garantizar el placer tradicional con total seguridad.',
    pais_origen: 'Italia'
  },
  { 
    nombre: 'Facundo', 
    web_oficial: 'https://www.facundo.es/', 
    logo: 'https://picsum.photos/seed/facundogf/800/400',
    especialidad: 'Snacks y Frutos Secos',
    descripcion: 'Tradición en snacks certificados 100% sin gluten, controlando cada traza para momentos de disfrute seguro.',
    pais_origen: 'España'
  },
  { 
    nombre: 'Nagual', 
    web_oficial: 'https://tortillasnagual.com/', 
    logo: 'https://picsum.photos/seed/nagualgf/800/400',
    especialidad: 'Tortillas de Maíz',
    descripcion: 'Tortillas artesanas de maíz con certificación oficial, elaboradas en exclusiva para garantizar la ausencia total de gluten.',
    pais_origen: 'España'
  },
  { 
    nombre: 'Airos', 
    web_oficial: 'https://airos.es/', 
    logo: 'https://picsum.photos/seed/airosgf/800/400',
    especialidad: 'Panadería y Bollería',
    descripcion: 'Maestros panaderos dedicados exclusivamente al mundo sin gluten, con procesos certificados de alta seguridad.',
    pais_origen: 'España'
  },
  { 
    nombre: 'Adpan', 
    web_oficial: 'https://adpan.es/', 
    logo: 'https://picsum.photos/seed/adpangf/800/400',
    especialidad: 'Harinas y Panadería',
    descripcion: 'Especialistas en masas y harinas certificadas, eliminando riesgos de contaminación cruzada en cada lote.',
    pais_origen: 'España'
  },
  { 
    nombre: 'Esgir', 
    web_oficial: 'https://esgir.com/', 
    logo: 'https://picsum.photos/seed/esgirgf/800/400',
    especialidad: 'Cereales y Crujientes',
    descripcion: 'Cereales y picatostes certificados con la Espiga Barrada, ideales para una dieta segura y equilibrada.',
    pais_origen: 'España'
  },
  { 
    nombre: 'Casa Tarradellas', 
    web_oficial: 'https://www.casatarradellas.es/', 
    logo: 'https://picsum.photos/seed/tarradellasgf/800/400',
    especialidad: 'Pizzas y Embutidos',
    descripcion: 'Calidad artesana en productos certificados sin gluten, ofreciendo seguridad y sabor en cada momento familiar.',
    pais_origen: 'España'
  },
  { 
    nombre: 'Campofrío', 
    web_oficial: 'https://www.campofrio.es/sin-gluten/', 
    logo: 'https://picsum.photos/seed/campofriogf/800/400',
    especialidad: 'Charcutería',
    descripcion: 'Compromiso total con la comunidad celíaca, certificando nuestra gama para asegurar embutidos libres de gluten.',
    pais_origen: 'España'
  },
  { 
    nombre: 'El Pozo', 
    web_oficial: 'https://www.elpozo.com/', 
    logo: 'https://picsum.photos/seed/elpozogf/800/400',
    especialidad: 'Charcutería',
    descripcion: 'Rigurosos controles en nuestra línea sin gluten para garantizar productos cárnicos seguros y nutritivos para todos.',
    pais_origen: 'España'
  },
  { 
    nombre: 'Pastas Gallo', 
    web_oficial: 'https://www.pastasgallo.es/', 
    logo: 'https://picsum.photos/seed/gallogf/800/400',
    especialidad: 'Pasta y Harinas',
    descripcion: 'Excelencia en pastas certificadas sin gluten, producidas en líneas dedicadas para una seguridad absoluta.',
    pais_origen: 'España'
  },
  { 
    nombre: 'Bimbo', 
    web_oficial: 'https://www.bimbo.es/', 
    logo: 'https://picsum.photos/seed/bimbogf/800/400',
    especialidad: 'Panadería',
    descripcion: 'Gama especializada con certificación oficial, aportando la confianza del líder mundial al hogar sin gluten.',
    pais_origen: 'España'
  },
  { 
    nombre: 'Gerblé', 
    web_oficial: 'https://www.gerble.es/', 
    logo: 'https://picsum.photos/seed/gerblegf/800/400',
    especialidad: 'Dietética y Salud',
    descripcion: 'Soluciones nutricionales certificadas para celíacos, priorizando la pureza de los ingredientes y el sabor.',
    pais_origen: 'Francia'
  },
  { 
    nombre: 'Dr. Oetker', 
    web_oficial: 'https://www.oetker.es/', 
    logo: 'https://picsum.photos/seed/oetkergf/800/400',
    especialidad: 'Pizzas y Repostería',
    descripcion: 'Calidad alemana certificada en nuestra gama sin gluten, garantizando resultados perfectos y máxima seguridad.',
    pais_origen: 'Alemania'
  },
  { 
    nombre: 'Nestlé', 
    web_oficial: 'https://www.nestle.es/sin-gluten/', 
    logo: 'https://picsum.photos/seed/nestlegf/800/400',
    especialidad: 'Cereales y Lácteos',
    descripcion: 'Control exhaustivo de la cadena de suministro para ofrecer opciones sin gluten certificadas y confiables.',
    pais_origen: 'Suiza'
  },
  { 
    nombre: 'Danone', 
    web_oficial: 'https://www.danone.es/', 
    logo: 'https://picsum.photos/seed/danonegf/800/400',
    especialidad: 'Lácteos',
    descripcion: 'Yogures y postres con sello de confianza, garantizando la ausencia de gluten mediante protocolos rigurosos.',
    pais_origen: 'Francia'
  },
  { 
    nombre: 'Amy\'s Kitchen', 
    web_oficial: 'https://amyskitchen.es/', 
    logo: 'https://picsum.photos/seed/amysgf/800/400',
    especialidad: 'Platos Preparados',
    descripcion: 'Cocina ecológica y certificada sin gluten, enfocada en ingredientes naturales y seguridad total.',
    pais_origen: 'EEUU'
  }
];

const AdminScreen = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="px-6 pt-24 space-y-12 pb-32"
  >
    <section className="space-y-3">
      <h1 className="display-sm text-on-surface">Panel de Control</h1>
      <p className="text-on-surface-variant text-lg opacity-80 flex items-center">Gestión segura del ecosistema <CeliGoLogo color="#000000" inline className="text-lg" />.</p>
    </section>

    {/* Metric Overview */}
    <section className="space-y-6">
      <div className="bg-surface-container-low p-8 rounded-[2rem] space-y-4">
        <h3 className="label-md text-primary">Usuarios Activos</h3>
        <p className="text-5xl font-black text-on-surface">1,248</p>
        <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
          <div className="h-full w-[70%] bg-primary rounded-full" />
        </div>
      </div>
      <div className="bg-surface-container-low p-8 rounded-[2rem] space-y-4">
        <h3 className="label-md text-secondary">Locales Verificados</h3>
        <p className="text-5xl font-black text-on-surface">86</p>
        <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
          <div className="h-full w-[45%] bg-secondary rounded-full" />
        </div>
      </div>
    </section>
  </motion.div>
);

// --- Layout Wrapper ---

export default function App() {
  const [screen, setScreen] = useState('Welcome');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('client');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: '¡Hola! Soy Celia, tu asistente experta de CeliGO. ¿En qué puedo ayudarte hoy con tu vida sin gluten? 🥖✨' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const aiRef = useRef<GoogleGenAI | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      if (!aiRef.current) {
        aiRef.current = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      }

      const response = await aiRef.current.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: "user", parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: `Eres Celia, la asistente experta de la aplicación CeliGO.
          Tu misión es ayudar a la comunidad celíaca a encontrar productos, restaurantes y marcas certificadas.
          Eres amable, profesional y usas emojis relacionados con comida saludable y seguridad.
          Si no conoces un dato específico, ofrece buscarlo o sugiere consultar las fuentes oficiales en la sección de 'Marcas'.
          Siempre promueves un estilo de vida sin gluten seguro y premium.`
        }
      });

      const assistantReply = response.text || "Lo siento, tuve un problema procesando tu mensaje. ¿Podrías repetirlo?";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantReply }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Ups, parece que algo falló en mi conexión. Por favor, inténtalo de nuevo." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const getNavItems = () => {
    const base = [
      { id: 'Home', icon: Compass, label: 'Inicio' },
    ];

    if (selectedRole === 'client') {
      return [
        ...base,
        { id: 'Locales', icon: Utensils, label: 'Locales' },
        { id: 'Marcas', icon: Verified, label: 'Marcas' },
        { id: 'Explorar', icon: User, label: 'Mi Perfil' },
      ];
    }

    if (selectedRole === 'restaurant') {
      return [
        ...base,
        { id: 'Home', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'Feedback', icon: Star, label: 'Reseñas' }
      ];
    }

    if (selectedRole === 'shop') {
      return [
        ...base,
        { id: 'Home', icon: ShoppingBag, label: 'Stock' },
        { id: 'Alertas', icon: Bell, label: 'Alertas' }
      ];
    }

    if (selectedRole === 'brand') {
      return [
        ...base,
        { id: 'Home', icon: Verified, label: 'Certificados' },
        { id: 'Metricas', icon: BarChart3, label: 'Métricas' }
      ];
    }

    if (selectedRole === 'admin') {
      return [
        ...base,
        { id: 'Home', icon: Shield, label: 'Moderación' },
        { id: 'Users', icon: Users, label: 'Usuarios' }
      ];
    }

    return base;
  };

  const navItems = getNavItems();

  const handleNavigate = (id: string) => {
    setScreen(id);
    setIsSidebarOpen(false);
  };

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setScreen('SignUp');
  };

  const currentRoleColor = ROLES.find(r => r.id === selectedRole)?.color || '#0F5238';

  return (
    <div 
      className="min-h-screen bg-surface selection:bg-primary-fixed" 
      style={{ '--primary-accent': currentRoleColor } as any}
    >
      <div className="w-full max-w-[500px] mx-auto bg-surface min-h-screen relative shadow-[0_0_80px_rgba(0,0,0,0.1)] overflow-x-hidden">
      {/* Sidebar Navigation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.nav 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 h-full w-[280px] bg-surface-container-lowest z-[70] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <CeliGoLogo color={currentRoleColor} className="text-5xl" />
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-surface-container rounded-full transition-colors"
                >
                  <ArrowRight className="w-6 h-6 text-primary rotate-180" />
                </button>
              </div>

              <div className="flex-1 space-y-2">
                <p className="label-md text-outline mb-4 ml-4 opacity-70">Menú Principal</p>
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = screen === item.id;
                  return (
                    <button 
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${isActive ? 'bg-primary-fixed text-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'}`}
                    >
                      <Icon className={`w-6 h-6 ${isActive ? 'fill-primary/20' : ''}`} />
                      <span className="title-lg text-lg tracking-tight">{item.label}</span>
                      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-8 border-t border-outline-variant/10">
                <button 
                  onClick={() => handleNavigate('Explorar')}
                  className="w-full flex items-center gap-4 px-6 py-4 text-on-surface-variant hover:bg-surface-container rounded-2xl transition-all"
                >
                  <LayoutDashboard className="w-6 h-6" />
                  <span className="font-bold">Mi Panel</span>
                </button>
                <div className="mt-8 p-6 bg-primary-fixed/30 rounded-3xl">
                  <p className="text-xs font-bold text-primary label-md mb-2">Santuario Verificado</p>
                  <p className="text-[10px] text-on-primary-fixed-variant leading-relaxed opacity-80">Garantizamos la seguridad de cada bocado con auditorías continuas.</p>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Dynamic Header */}
      {screen !== 'Welcome' && (
        <header className="sticky top-0 w-full flex justify-between items-center px-6 h-20 bg-surface/80 backdrop-blur-xl z-50 border-b border-outline-variant/5">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-surface-container rounded-full transition-colors group"
            >
              <Menu className="w-8 h-8 text-primary group-active:scale-95 transition-transform" />
            </button>
            <CeliGoLogo color={currentRoleColor} className="text-5xl" />
          </div>
          <div 
            onClick={() => setScreen('Explorar')}
            className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center overflow-hidden cursor-pointer border-2 border-primary-fixed hover:scale-105 transition-transform shadow-sm"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5jFZ_QOD0eQwI1r-Go_3zKrR3nrChIqQ53Mi0nsx4CxGW-LcZNtfFM0XHkm5KBUPCrKyRMWwF0b2BUv3eINfBe0r0tALxAUbhn6mZAfjYjCWfvUYVqmsXVAEwnFu4frUAi6xONCQUhZPwx8CJQsYWhomTc0kQJkrEJorEQOHDfLTHWxWha9gv7HLFheemoyMdmmd9UGRW4g4XBqkOGQHfRf5lJ1T8A6ThGwtdOkrd1YA8IEZENJdR2c-FoaxQF4j9sGBb9wRtiiQ" 
              alt="Profile"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {screen === 'Welcome' && <WelcomeScreen key="welcome" onNext={() => setScreen('Home')} onSignUp={() => setScreen('ProfileSelection')} />}
        {screen === 'ProfileSelection' && <ProfileSelectionScreen key="profiles" onBack={() => setScreen('Welcome')} onSelect={handleRoleSelect} />}
        {screen === 'SignUp' && <SignUpScreen key="signup" roleId={selectedRole} onBack={() => setScreen('ProfileSelection')} onLogin={() => setScreen('Home')} />}
        
        {screen === 'Home' && (
          selectedRole === 'client' ? <ClientDashboard key="client-home" onNavigate={setScreen} /> :
          selectedRole === 'restaurant' ? <RestaurantDashboard key="rest-home" /> :
          selectedRole === 'shop' ? <ShopDashboard key="shop-home" /> :
          selectedRole === 'brand' ? <BrandDashboard key="brand-home" /> :
          <AdminDashboard key="admin-home" />
        )}

        {screen === 'Restaurantes' && <RestaurantesScreen key="restaurantes" onBack={() => setScreen('Home')} />}
        {screen === 'Tiendas' && <TiendasScreen key="tiendas" onBack={() => setScreen('Home')} />}
        {screen === 'Marcas' && <MarcasScreen key="marcas" onBack={() => setScreen('Home')} />}
        {screen === 'Locales' && <LocalesScreen key="locales" />}
        {screen === 'Explorar' && <ExplorarScreen key="explorar" />}
        {screen === 'Admin' && <AdminDashboard key="admin" />}
      </AnimatePresence>

      {/* Floating Action Button (Chat Bot) */}
      {['Home', 'Restaurantes', 'Tiendas', 'Marcas'].includes(screen) && (
        <motion.button 
          onClick={() => setIsChatOpen(true)}
          animate={{ 
            y: [0, -12, 0],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="fixed right-6 bottom-10 w-20 h-20 bg-primary text-on-primary rounded-[2.5rem] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40 group cursor-pointer"
        >
          <img 
            src="https://files.catbox.moe/5k8x51.png" 
            alt="Celia Chatbot" 
            className="w-12 h-12 object-contain brightness-0 invert opacity-90 group-hover:scale-110 transition-transform duration-500"
          />
          {/* Notification Dot */}
          <div className="absolute top-4 right-4 w-4 h-4 bg-secondary rounded-full border-4 border-primary" />
        </motion.button>
      )}

      {/* Chat Bot Interface Overlay */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 h-[80vh] bg-surface rounded-t-[3rem] z-[110] shadow-2xl flex flex-col overflow-hidden max-w-[500px] mx-auto border-x border-outline-variant/10"
            >
              {/* Chat Header */}
              <header className="px-8 py-6 bg-primary text-on-primary flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30">
                    <img 
                      src="https://files.catbox.moe/5k8x51.png" 
                      className="w-8 h-8 object-contain brightness-0 invert" 
                      alt="Celia Icon"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight leading-none uppercase">Celia</h3>
                    <p className="text-xs font-bold opacity-70 tracking-widest mt-1 uppercase">Asistente Experta</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </header>

              {/* Chat Messages */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-surface-container-lowest"
              >
                {messages.map((msg, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] p-4 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-primary text-on-primary rounded-tr-none' 
                          : 'bg-surface-container-high text-on-surface rounded-tl-none border border-outline-variant/20'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-surface-container-high p-4 rounded-3xl rounded-tl-none border border-outline-variant/20 shadow-sm flex gap-1">
                      <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-6 bg-surface border-t border-outline-variant/10 shadow-2xl">
                <div className="relative flex items-center">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Pregunta sobre locales o marcas..."
                    className="w-full h-16 pl-6 pr-16 bg-surface-container-highest rounded-2xl border-none focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline/40 font-medium"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="absolute right-3 w-10 h-10 bg-primary text-on-primary rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:scale-100"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Popi Chatbot */}
      <PopiChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      </div>
    </div>
  );
}
