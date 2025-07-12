
import React from 'react';
import { getTextShadow } from '../utils/themeUtils';

interface ZineTitleSectionProps {
  title: string;
  subtitle: string;
  headingFont: string;
  accentColor: string;
  textColor: string;
  shadowLevel: string;
}

const ZineTitleSection: React.FC<ZineTitleSectionProps> = ({
  title,
  subtitle,
  headingFont,
  accentColor,
  textColor,
  shadowLevel
}) => {
  if (!title) return null;

  return (
    <header className="mb-8 text-center relative z-10">
      <h1 
        className="text-4xl font-bold mb-2"
        style={{ 
          fontFamily: headingFont,
          color: accentColor,
          textShadow: getTextShadow(shadowLevel, accentColor)
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p 
          className="text-xl opacity-80"
          style={{ color: textColor }}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default ZineTitleSection;
