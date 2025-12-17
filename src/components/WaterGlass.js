import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import Svg, { Defs, LinearGradient as SvgGradient, Stop, Rect, Path, Circle, ClipPath, G } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function WaterGlass({ width = 200, height = 280, progress = 0 }) {
  const clamped = Math.max(0, Math.min(1, progress));
  
  const wave = useRef(new Animated.Value(0)).current;
  const iceBob1 = useRef(new Animated.Value(0)).current;
  const iceBob2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Smooth continuous wave
    Animated.loop(
      Animated.timing(wave, {
        toValue: 1,
        duration: 2500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start();

    // Ice floating animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(iceBob1, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(iceBob1, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(iceBob2, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(iceBob2, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const pad = 15;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;
  const surfaceY = pad + innerH * (1 - clamped);

  // Wave animation
  const wavePhase = wave.interpolate({
    inputRange: [0, 1],
    outputRange: [0, innerW],
  });

  // Ice bob animations
  const iceBobY1 = iceBob1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });
  
  const iceBobY2 = iceBob2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  const createWave = (phase) => {
    const amplitude = 3;
    const wavelength = innerW * 0.8;
    let d = `M ${pad} ${height}`;
    d += ` L ${pad} ${surfaceY}`;
    
    // Simple smooth wave
    for (let x = 0; x <= innerW; x += 3) {
      const actualX = pad + x;
      const y = surfaceY + Math.sin(((x + phase) * Math.PI * 2) / wavelength) * amplitude;
      d += ` L ${actualX} ${y}`;
    }
    
    d += ` L ${pad + innerW} ${height}`;
    d += ` Z`;
    return d;
  };

  const showIce = clamped > 0.15;
  const ice1Y = surfaceY + 12;
  const ice2Y = surfaceY + 18;

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        <Defs>
          {/* Água azul cristalina natural */}
          <SvgGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#4FC3F7" stopOpacity="0.6" />
            <Stop offset="0.5" stopColor="#29B6F6" stopOpacity="0.75" />
            <Stop offset="1" stopColor="#0288D1" stopOpacity="0.85" />
          </SvgGradient>
          
          {/* Vidro transparente */}
          <SvgGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.15" />
            <Stop offset="0.5" stopColor="#E3F2FD" stopOpacity="0.08" />
            <Stop offset="1" stopColor="#BBDEFB" stopOpacity="0.2" />
          </SvgGradient>
          
          {/* Reflexo de luz */}
          <SvgGradient id="lightReflect" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.4" />
            <Stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.1" />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </SvgGradient>
          
          {/* ClipPath para manter a água dentro do copo */}
          <ClipPath id="glassClip">
            <Rect x={pad} y={pad} width={innerW} height={innerH} rx={15} />
          </ClipPath>
        </Defs>

        {/* Corpo do copo */}
        <Rect
          x={pad}
          y={pad}
          width={innerW}
          height={innerH}
          rx={15}
          fill="url(#glassGrad)"
          stroke="#B0BEC5"
          strokeWidth="2.5"
        />

        {/* Água com onda suave - dentro do clip */}
        <G clipPath="url(#glassClip)">
          <AnimatedPath
            d={wave.interpolate({
              inputRange: [0, 1],
              outputRange: [createWave(0), createWave(innerW)],
            })}
            fill="url(#waterGrad)"
          />

          {/* Cubos de gelo simples e bonitos */}
          {showIce && (
            <>
              <AnimatedCircle
              cx={pad + innerW * 0.3}
              cy={ice1Y}
              r={8}
              fill="#E1F5FE"
              stroke="#81D4FA"
              strokeWidth="1.5"
              opacity={0.92}
              style={{
                transform: [{ translateY: iceBobY1 }],
              }}
            />
            <Circle
              cx={pad + innerW * 0.3}
              cy={ice1Y - 2}
              r={2.5}
              fill="#FFFFFF"
              opacity={0.7}
            />
            
            <AnimatedCircle
              cx={pad + innerW * 0.7}
              cy={ice2Y}
              r={10}
              fill="#E1F5FE"
              stroke="#81D4FA"
              strokeWidth="1.5"
              opacity={0.88}
              style={{
                transform: [{ translateY: iceBobY2 }],
              }}
            />
            <Circle
              cx={pad + innerW * 0.7 + 2}
              cy={ice2Y - 3}
              r={3}
              fill="#FFFFFF"
              opacity={0.7}
            />
            
            {clamped > 0.4 && (
              <>
                <Circle
                  cx={pad + innerW * 0.5}
                  cy={surfaceY + 15}
                  r={7}
                  fill="#E1F5FE"
                  stroke="#81D4FA"
                  strokeWidth="1.5"
                  opacity={0.9}
                />
                <Circle
                  cx={pad + innerW * 0.5 + 1}
                  cy={surfaceY + 13}
                  r={2}
                  fill="#FFFFFF"
                  opacity={0.7}
                />
              </>
            )}
          </>
        )}
        </G>

        {/* Reflexo de luz no vidro */}
        <Rect
          x={pad + 5}
          y={pad + 10}
          width={innerW * 0.25}
          height={innerH * 0.6}
          rx={8}
          fill="url(#lightReflect)"
        />
      </Svg>
    </View>
  );
}
