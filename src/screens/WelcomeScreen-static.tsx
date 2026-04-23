import React from 'react';
import { MapPin, ShoppingBag, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Restaurantes',
    description: 'Encuentra lugares 100% seguros',
    color: '#BA4A00'
  },
  {
    icon: ShoppingBag,
    title: 'Tiendas',
    description: 'Productos certificados cerca',
    color: '#4A235A'
  },
  {
    icon: ShieldCheck,
    title: 'Marcas',
    description: 'Confianza en cada producto',
    color: '#1D4ED8'
  }
];

export const WelcomeScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-surface-container to-primary/5">
      {/* Header */}
      <header className="pt-12 pb-8 px-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary mb-4">CeliGO</h1>
          <h2 className="text-3xl font-light text-on-surface mb-2">
            Tu santuario de opciones
          </h2>
          <p className="text-lg text-on-surface-variant">
            Vive sin gluten, sin preocupaciones
          </p>
        </div>
      </header>

      {/* Features Grid */}
      <main className="px-6 pb-12">
        <div className="grid gap-6 max-w-md mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-6 shadow-lg text-left"
              style={{ borderLeft: `4px solid ${feature.color}` }}
            >
              <div className="flex items-center mb-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon size={24} style={{ color: feature.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-on-surface">
                    {feature.title}
                  </h3>
                </div>
              </div>
              <p className="text-on-surface-variant">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 pb-8">
        <div className="text-center">
          <p className="text-sm text-on-surface-variant">
            Tu viaje hacia una vida sin gluten comienza aquí
          </p>
        </div>
      </footer>
    </div>
  );
};