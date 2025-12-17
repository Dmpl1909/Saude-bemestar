import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient as SvgGradient, Stop, Circle, Path, Ellipse, Rect } from 'react-native-svg';

export default function MoonPhase({ width = 200, height = 200, progress = 0 }) {
  const centerX = width / 2;
  const centerY = height / 2;
  const moonRadius = 60;

  return (
    <View style={{ width, height, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={width} height={height}>
        <Defs>
          {/* Gradiente da lua realista com cores cremosas */}
          <SvgGradient id="moonGrad" x1="0.3" y1="0.3" x2="0.7" y2="0.7">
            <Stop offset="0" stopColor="#FFFEF5" stopOpacity="1" />
            <Stop offset="0.2" stopColor="#FFFFF0" stopOpacity="1" />
            <Stop offset="0.35" stopColor="#FFFACD" stopOpacity="1" />
            <Stop offset="0.5" stopColor="#FFF8DC" stopOpacity="1" />
            <Stop offset="0.65" stopColor="#FFFACD" stopOpacity="1" />
            <Stop offset="0.8" stopColor="#FFE8B6" stopOpacity="1" />
            <Stop offset="1" stopColor="#FFD89B" stopOpacity="1" />
          </SvgGradient>

          {/* Brilho suave envolvendo a lua */}
          <SvgGradient id="moonGlow" x1="0.5" y1="0" x2="0.5" y2="1">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" />
            <Stop offset="0.3" stopColor="#FFFACD" stopOpacity="0.3" />
            <Stop offset="0.6" stopColor="#FFF8DC" stopOpacity="0.1" />
            <Stop offset="1" stopColor="#FFFACD" stopOpacity="0" />
          </SvgGradient>

          {/* Gradiente realista das crateras */}
          <SvgGradient id="craterGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#E8D4A8" stopOpacity="0.7" />
            <Stop offset="1" stopColor="#D4B896" stopOpacity="0.5" />
          </SvgGradient>

          {/* Céu noturno suave */}
          <SvgGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#0B1F3F" stopOpacity="0.3" />
            <Stop offset="0.5" stopColor="#1A2B4A" stopOpacity="0.2" />
            <Stop offset="1" stopColor="#3A5F8F" stopOpacity="0.15" />
          </SvgGradient>
        </Defs>

        {/* Fundo do céu */}
        <Rect width={width} height={height} fill="url(#skyGrad)" />

        {/* Estrelas estáticas e suaves */}
        <Circle cx={centerX - 70} cy={centerY - 60} r={1.2} fill="#FFFFFF" opacity="0.6" />
        <Circle cx={centerX + 60} cy={centerY - 50} r={1} fill="#FFFFFF" opacity="0.5" />
        <Circle cx={centerX - 50} cy={centerY + 70} r={1.5} fill="#FFFFFF" opacity="0.55" />
        <Circle cx={centerX + 75} cy={centerY + 60} r={1.1} fill="#FFFFFF" opacity="0.4" />
        <Circle cx={centerX - 80} cy={centerY + 20} r={0.9} fill="#FFFFFF" opacity="0.5" />
        <Circle cx={centerX + 50} cy={centerY + 30} r={1.2} fill="#FFFFFF" opacity="0.45" />
        <Circle cx={centerX - 60} cy={centerY - 30} r={0.8} fill="#FFFFFF" opacity="0.35" />
        <Circle cx={centerX + 40} cy={centerY - 60} r={1} fill="#FFFFFF" opacity="0.5" />

        {/* Brilho envolvendo a lua */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={moonRadius + 12}
          fill="url(#moonGlow)"
        />

        {/* Lua base - estática e realista */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={moonRadius}
          fill="url(#moonGrad)"
        />

        {/* Crateras realistas - sem animação */}
        
        {/* Cratera grande - Tycho (lado direito) */}
        <Circle
          cx={centerX + 25}
          cy={centerY - 15}
          r={12}
          fill="url(#craterGrad)"
          opacity="0.6"
        />
        <Circle
          cx={centerX + 28}
          cy={centerY - 12}
          r={9}
          fill="#E8D4A8"
          opacity="0.4"
        />
        <Circle
          cx={centerX + 30}
          cy={centerY - 10}
          r={5}
          fill="#D4B896"
          opacity="0.3"
        />

        {/* Cratera média - lado esquerdo superior */}
        <Circle
          cx={centerX - 30}
          cy={centerY - 20}
          r={10}
          fill="url(#craterGrad)"
          opacity="0.55"
        />
        <Circle
          cx={centerX - 28}
          cy={centerY - 18}
          r={7}
          fill="#E8D4A8"
          opacity="0.35"
        />

        {/* Cratera grande - lado inferior */}
        <Circle
          cx={centerX + 15}
          cy={centerY + 30}
          r={13}
          fill="url(#craterGrad)"
          opacity="0.6"
        />
        <Circle
          cx={centerX + 18}
          cy={centerY + 32}
          r={10}
          fill="#E8D4A8"
          opacity="0.4"
        />

        {/* Cratera pequena - esquerda inferior */}
        <Circle
          cx={centerX - 35}
          cy={centerY + 20}
          r={8}
          fill="url(#craterGrad)"
          opacity="0.5"
        />
        <Circle
          cx={centerX - 33}
          cy={centerY + 22}
          r={5}
          fill="#E8D4A8"
          opacity="0.3"
        />

        {/* Crateras extras pequenas para realismo */}
        <Circle cx={centerX - 10} cy={centerY - 25} r={4} fill="#E8D4A8" opacity="0.35" />
        <Circle cx={centerX + 8} cy={centerY - 30} r={3} fill="#D4B896" opacity="0.3" />
        <Circle cx={centerX - 20} cy={centerY + 8} r={5} fill="#E8D4A8" opacity="0.4" />
        <Circle cx={centerX + 35} cy={centerY + 10} r={4} fill="#D4B896" opacity="0.35" />
        <Circle cx={centerX + 5} cy={centerY + 40} r={3.5} fill="#E8D4A8" opacity="0.3" />
        <Circle cx={centerX - 45} cy={centerY - 5} r={6} fill="url(#craterGrad)" opacity="0.45" />

        {/* Linhas suaves de relevo */}
        <Path
          d={`M ${centerX - 15} ${centerY - 35} Q ${centerX} ${centerY - 40} ${centerX + 20} ${centerY - 30}`}
          stroke="#FFE8B6"
          strokeWidth="0.8"
          fill="none"
          opacity="0.3"
        />
        <Path
          d={`M ${centerX - 25} ${centerY + 15} Q ${centerX - 5} ${centerY + 20} ${centerX + 25} ${centerY + 25}`}
          stroke="#FFE8B6"
          strokeWidth="0.8"
          fill="none"
          opacity="0.25"
        />

        {/* Borda sutil da lua */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={moonRadius}
          fill="none"
          stroke="#FFF4D1"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Luz interna sutil para profundidade */}
        <Ellipse
          cx={centerX - 18}
          cy={centerY - 18}
          rx={35}
          ry={40}
          fill="#FFFFFF"
          opacity="0.1"
        />
      </Svg>
    </View>
  );
}
