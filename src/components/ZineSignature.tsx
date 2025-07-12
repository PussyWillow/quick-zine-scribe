
import React from 'react';

interface ZineSignatureProps {
  theme: any;
}

const ZineSignature: React.FC<ZineSignatureProps> = ({ theme }) => {
  return (
    <div className="mt-12 pt-6 border-t border-opacity-30 text-center relative z-10" 
         style={{ borderColor: theme.styles.text }}>
      {/* Botanical illustration */}
      <div className="mb-3 flex justify-center">
        <img 
          src="/placeholder.svg?height=60&width=120" 
          alt="Botanical illustration"
          className="h-15 w-auto opacity-70 transition-opacity duration-300 hover:opacity-90"
          style={{ filter: theme.id === 'cyberpunk' || theme.id === 'neon' ? 'invert(1)' : 'none' }}
        />
      </div>
      
      {/* Signature text */}
      <p 
        className="text-sm italic tracking-wide opacity-75"
        style={{ 
          color: theme.styles.text,
          fontFamily: theme.id === 'gothic' ? "'Cinzel', serif" : "'Lora', serif"
        }}
      >
        The Boom Boom Room
      </p>
    </div>
  );
};

export default ZineSignature;
