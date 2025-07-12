
import React from 'react';

interface BackgroundTextureProps {
  texture?: string;
}

const BackgroundTexture: React.FC<BackgroundTextureProps> = ({ texture }) => {
  if (!texture) return null;

  return (
    <div 
      className="absolute inset-0 opacity-5 pointer-events-none"
      style={{
        backgroundImage: texture === 'paper' 
          ? 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)'
          : 'none',
        backgroundSize: '20px 20px'
      }}
    />
  );
};

export default BackgroundTexture;
