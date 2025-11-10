// src/components/CertificateSVG.js
import React from 'react';
import Svg, { Rect, Text, G, Path } from 'react-native-svg';

const CertificateSVG = ({ name, achievement, date, issuedBy, template }) => {
  const getTemplateStyle = () => {
    const styles = {
      classic: {
        borderColor: '#8B4513',
        backgroundColor: '#F5DEB3',
        textColor: '#8B4513',
        accentColor: '#D2691E'
      },
      modern: {
        borderColor: '#4F46E5',
        backgroundColor: '#EEF2FF',
        textColor: '#1F2937',
        accentColor: '#4F46E5'
      },
      fun: {
        borderColor: '#EC4899',
        backgroundColor: '#FCE7F3',
        textColor: '#831843',
        accentColor: '#EC4899'
      },
      elegant: {
        borderColor: '#059669',
        backgroundColor: '#ECFDF5',
        textColor: '#065F46',
        accentColor: '#059669'
      }
    };
    return styles[template] || styles.classic;
  };

  const style = getTemplateStyle();

  return (
    <Svg width="300" height="200" viewBox="0 0 300 200">
      {/* Certificate Border */}
      <Rect
        x="5"
        y="5"
        width="290"
        height="190"
        fill={style.backgroundColor}
        stroke={style.borderColor}
        strokeWidth="2"
        rx="10"
      />
      
      {/* Decorative Border */}
      <Rect
        x="10"
        y="10"
        width="280"
        height="180"
        fill="none"
        stroke={style.accentColor}
        strokeWidth="1"
        strokeDasharray="5,5"
        rx="8"
      />

      {/* Title */}
      <Text
        x="150"
        y="40"
        textAnchor="middle"
        fontSize="16"
        fontWeight="bold"
        fill={style.accentColor}
      >
        CERTIFICATE OF ACHIEVEMENT
      </Text>

      {/* This certifies */}
      <Text
        x="150"
        y="65"
        textAnchor="middle"
        fontSize="10"
        fill={style.textColor}
      >
        This certifies that
      </Text>

      {/* Name */}
      <Text
        x="150"
        y="85"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill={style.accentColor}
      >
        {name.toUpperCase()}
      </Text>

      {/* Achievement */}
      <Text
        x="150"
        y="110"
        textAnchor="middle"
        fontSize="12"
        fill={style.textColor}
      >
        has achieved the status of
      </Text>
      
      <Text
        x="150"
        y="125"
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill={style.accentColor}
      >
        {achievement}
      </Text>

      {/* Date */}
      <Text
        x="150"
        y="150"
        textAnchor="middle"
        fontSize="10"
        fill={style.textColor}
      >
        Date: {date}
      </Text>

      {/* Issued By */}
      <Text
        x="150"
        y="170"
        textAnchor="middle"
        fontSize="10"
        fill={style.textColor}
      >
        Issued by: {issuedBy}
      </Text>

      {/* Decorative elements */}
      <G transform="translate(50, 180) scale(0.3)">
        <Path
          d="M50,0 L60,20 L80,20 L65,35 L75,55 L50,45 L25,55 L35,35 L20,20 L40,20 Z"
          fill={style.accentColor}
        />
      </G>
      
      <G transform="translate(230, 180) scale(0.3)">
        <Path
          d="M50,0 L60,20 L80,20 L65,35 L75,55 L50,45 L25,55 L35,35 L20,20 L40,20 Z"
          fill={style.accentColor}
        />
      </G>
    </Svg>
  );
};

export default CertificateSVG;