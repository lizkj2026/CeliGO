import React from 'react';

export const CeliGoLogo = ({ color = '#0F5238', className = "text-3xl", inline = false }: { color?: string, className?: string, inline?: boolean }) => (
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

export const BrandIcon = ({ color, className = "w-6 h-6" }: { color: string, className?: string }) => (
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