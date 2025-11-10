// src/components/CertificateSVG.js
import React from 'react';
import Svg, { Rect, Text, G, Path, Line, Circle } from 'react-native-svg';

const CertificateSVG = ({ name, achievement, date, issuedBy, template }) => {
  const getTemplateStyle = () => {
    const styles = {
      classic: {
        borderColor: '#D4AF37',
        backgroundColor: '#FFFDF5',
        textColor: '#2D3748',
        accentColor: '#D4AF37',
        titleColor: '#B8860B',
        secondaryColor: '#E6D7A8',
        goldColor: '#D4AF37',
        borderPattern: '#D4AF37'
      },
      modern: {
        borderColor: '#7C3AED',
        backgroundColor: '#F8FAFC',
        textColor: '#2D3748',
        accentColor: '#7C3AED',
        titleColor: '#5B21B6',
        secondaryColor: '#C4B5FD',
        goldColor: '#7C3AED',
        borderPattern: '#7C3AED'
      },
      fun: {
        borderColor: '#EC4899',
        backgroundColor: '#FDF2F8',
        textColor: '#2D3748',
        accentColor: '#EC4899',
        titleColor: '#BE185D',
        secondaryColor: '#FBCFE8',
        goldColor: '#EC4899',
        borderPattern: '#EC4899'
      },
      elegant: {
        borderColor: '#059669',
        backgroundColor: '#F0FDF4',
        textColor: '#2D3748',
        accentColor: '#059669',
        titleColor: '#047857',
        secondaryColor: '#A7F3D0',
        goldColor: '#059669',
        borderPattern: '#059669'
      },
      minimalist: {
        borderColor: '#3B82F6',
        backgroundColor: '#FFFFFF',
        textColor: '#2D3748',
        accentColor: '#3B82F6',
        titleColor: '#1D4ED8',
        secondaryColor: '#BFDBFE',
        goldColor: '#3B82F6',
        borderPattern: '#3B82F6'
      },
      vintage: {
        borderColor: '#92400E',
        backgroundColor: '#FEF7CD',
        textColor: '#422006',
        accentColor: '#92400E',
        titleColor: '#78350F',
        secondaryColor: '#FDE68A',
        goldColor: '#B45309',
        borderPattern: '#92400E'
      }
    };
    return styles[template] || styles.classic;
  };

  const style = getTemplateStyle();

  const renderOrnateBorder = () => {
    return (
      <>
        {/* Main Border */}
        <Rect
          x="5"
          y="5"
          width="290"
          height="190"
          fill="none"
          stroke={style.borderColor}
          strokeWidth="2"
          rx="4"
        />
        
        {/* Inner Border */}
        <Rect
          x="15"
          y="15"
          width="270"
          height="170"
          fill="none"
          stroke={style.borderPattern}
          strokeWidth="1"
          strokeDasharray="3,3"
          rx="2"
        />

        {/* Corner Decorations */}
        {/* Top Left Corner */}
        <G transform="translate(15, 15)">
          <Path d="M0,5 L5,0" stroke={style.goldColor} strokeWidth="1.5"/>
          <Path d="M0,10 L10,0" stroke={style.goldColor} strokeWidth="1.5"/>
        </G>
        
        {/* Top Right Corner */}
        <G transform="translate(285, 15)">
          <Path d="M-5,0 L0,5" stroke={style.goldColor} strokeWidth="1.5"/>
          <Path d="M-10,0 L0,10" stroke={style.goldColor} strokeWidth="1.5"/>
        </G>
        
        {/* Bottom Left Corner */}
        <G transform="translate(15, 185)">
          <Path d="M0,-5 L5,0" stroke={style.goldColor} strokeWidth="1.5"/>
          <Path d="M0,-10 L10,0" stroke={style.goldColor} strokeWidth="1.5"/>
        </G>
        
        {/* Bottom Right Corner */}
        <G transform="translate(285, 185)">
          <Path d="M-5,0 L0,-5" stroke={style.goldColor} strokeWidth="1.5"/>
          <Path d="M-10,0 L0,-10" stroke={style.goldColor} strokeWidth="1.5"/>
        </G>
      </>
    );
  };

  const renderOfficialSeal = () => {
    return (
      <G transform="translate(150, 140)">
        {/* Outer Circle */}
        <Circle cx="0" cy="0" r="18" fill="none" stroke={style.goldColor} strokeWidth="2"/>
        
        {/* Inner Circle */}
        <Circle cx="0" cy="0" r="14" fill="none" stroke={style.goldColor} strokeWidth="1"/>
        
        {/* Seal Center */}
        <Circle cx="0" cy="0" r="8" fill={style.goldColor} opacity="0.1"/>
        
        {/* Seal Star */}
        <Path
          d="M0,-6 L2,2 L-2,2 Z"
          fill={style.goldColor}
          opacity="0.8"
        />
        
        {/* Seal Text */}
        <G transform="rotate(-30)">
          <Text
            x="0"
            y="11"
            textAnchor="middle"
            fontSize="4"
            fill={style.goldColor}
            fontWeight="bold"
            letterSpacing="0.5"
          >
            OFFICIAL
          </Text>
        </G>
      </G>
    );
  };

  return (
    <Svg width="300" height="200" viewBox="0 0 300 200">
      {/* Main Certificate Background */}
      <Rect
        x="0"
        y="0"
        width="300"
        height="200"
        fill={style.backgroundColor}
        rx="8"
      />

      {renderOrnateBorder()}

      {/* Certificate Header */}
      <G transform="translate(150, 35)">
        {/* Main Title */}
        <Text
          x="0"
          y="0"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill={style.titleColor}
          letterSpacing="2"
        >
          CERTIFICATE OF ACHIEVEMENT
        </Text>
        
        {/* Title Underline */}
        <Line 
          x1="-40" 
          y1="8" 
          x2="40" 
          y2="8" 
          stroke={style.goldColor} 
          strokeWidth="1.5"
        />
      </G>

      {/* Organization/Issuer */}
      <Text
        x="150"
        y="55"
        textAnchor="middle"
        fontSize="8"
        fill={style.textColor}
        fontWeight="600"
        letterSpacing="1"
      >
        THE RECOGNITION COMMITTEE
      </Text>

      {/* Presentation Text */}
      <Text
        x="150"
        y="75"
        textAnchor="middle"
        fontSize="9"
        fill={style.textColor}
        fontStyle="italic"
      >
        This certifies that
      </Text>

      {/* Recipient Name */}
      <Text
        x="150"
        y="95"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill={style.accentColor}
        letterSpacing="1"
      >
        {name.toUpperCase() || "RECIPIENT NAME"}
      </Text>

      {/* Achievement Text */}
      <G transform="translate(150, 110)">
        <Text
          x="0"
          y="0"
          textAnchor="middle"
          fontSize="9"
          fill={style.textColor}
          fontStyle="italic"
        >
          has successfully achieved
        </Text>
      </G>

      {/* Achievement Title */}
      <Text
        x="150"
        y="125"
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill={style.titleColor}
      >
        {achievement.toUpperCase() || "OUTSTANDING ACHIEVEMENT"}
      </Text>

      {/* Date Section */}
      <G transform="translate(80, 160)">
        <Text
          x="0"
          y="0"
          textAnchor="middle"
          fontSize="8"
          fontWeight="bold"
          fill={style.textColor}
        >
          DATE
        </Text>
        <Text
          x="0"
          y="10"
          textAnchor="middle"
          fontSize="9"
          fill={style.accentColor}
          fontWeight="600"
        >
          {date}
        </Text>
      </G>

      {/* Signature Section */}
      <G transform="translate(220, 160)">
        <Text
          x="0"
          y="0"
          textAnchor="middle"
          fontSize="8"
          fontWeight="bold"
          fill={style.textColor}
        >
          AUTHORIZED SIGNATURE
        </Text>
        <Line 
          x1="-25" 
          y1="12" 
          x2="25" 
          y2="12" 
          stroke={style.textColor} 
          strokeWidth="0.5"
        />
        <Text
          x="0"
          y="20"
          textAnchor="middle"
          fontSize="8"
          fill={style.accentColor}
          fontWeight="600"
        >
          {issuedBy.toUpperCase()}
        </Text>
      </G>

      {/* Official Seal */}
      {renderOfficialSeal()}

      {/* Bottom Recognition Text */}
      <Text
        x="150"
        y="185"
        textAnchor="middle"
        fontSize="6"
        fill={style.textColor}
        opacity="0.7"
        letterSpacing="0.5"
      >
        AWARDED IN RECOGNITION OF EXCELLENCE AND DEDICATION
      </Text>

      {/* Side Decorations */}
      {/* Left Side Decoration */}
      <G transform="translate(30, 100)">
        <Path
          d="M0,0 L5,-5 L10,0 L5,5 Z"
          fill={style.goldColor}
          opacity="0.6"
        />
      </G>
      
      {/* Right Side Decoration */}
      <G transform="translate(270, 100)">
        <Path
          d="M0,0 L5,-5 L10,0 L5,5 Z"
          fill={style.goldColor}
          opacity="0.6"
        />
      </G>
    </Svg>
  );
};

export default CertificateSVG;