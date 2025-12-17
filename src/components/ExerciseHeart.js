import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import Svg, { Defs, LinearGradient as SvgGradient, Stop, Path, Circle, G } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function ExerciseHeart({ width = 200, height = 200, progress = 0 }) {
  const clamped = Math.max(0, Math.min(1, progress));
  
  const heartbeat = useRef(new Animated.Value(1)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const sparkle1 = useRef(new Animated.Value(0)).current;
  const sparkle2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Batimento cardíaco realista
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartbeat, {
          toValue: 1.12,
          duration: 120,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(heartbeat, {
          toValue: 0.95,
          duration: 120,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(heartbeat, {
          toValue: 1.08,
          duration: 100,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(heartbeat, {
          toValue: 1,
          duration: 660,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pulso de energia
    Animated.loop(
      Animated.timing(pulse, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ).start();

    // Brilhos
    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkle1, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(sparkle1, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.delay(400),
        Animated.timing(sparkle2, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(sparkle2, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const centerX = width / 2;
  const centerY = height / 2;

  const pulseScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.8],
  });

  const pulseOpacity = pulse.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0.6, 0.2, 0],
  });

  // Caminho do coração mais bonito e suave
  const heartPath = `
    M ${centerX} ${centerY - 25}
    C ${centerX} ${centerY - 30}, ${centerX - 8} ${centerY - 38}, ${centerX - 20} ${centerY - 38}
    C ${centerX - 35} ${centerY - 38}, ${centerX - 42} ${centerY - 28}, ${centerX - 42} ${centerY - 15}
    C ${centerX - 42} ${centerY}, ${centerX - 30} ${centerY + 15}, ${centerX} ${centerY + 40}
    C ${centerX + 30} ${centerY + 15}, ${centerX + 42} ${centerY}, ${centerX + 42} ${centerY - 15}
    C ${centerX + 42} ${centerY - 28}, ${centerX + 35} ${centerY - 38}, ${centerX + 20} ${centerY - 38}
    C ${centerX + 8} ${centerY - 38}, ${centerX} ${centerY - 30}, ${centerX} ${centerY - 25}
    Z
  `;

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        <Defs>
          {/* Gradiente vermelho intenso e vibrante */}
          <SvgGradient id="heartGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FF1744" stopOpacity="1" />
            <Stop offset="0.3" stopColor="#FF0000" stopOpacity="1" />
            <Stop offset="0.7" stopColor="#DC143C" stopOpacity="1" />
            <Stop offset="1" stopColor="#B71C1C" stopOpacity="1" />
          </SvgGradient>

          {/* Gradiente para brilho */}
          <SvgGradient id="shineGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.8" />
            <Stop offset="0.5" stopColor="#FFE5E5" stopOpacity="0.4" />
            <Stop offset="1" stopColor="#FF8A80" stopOpacity="0" />
          </SvgGradient>

          {/* Sombra interna */}
          <SvgGradient id="shadowGrad" x1="0" y1="1" x2="0" y2="0">
            <Stop offset="0" stopColor="#B71C1C" stopOpacity="0.5" />
            <Stop offset="0.5" stopColor="#D32F2F" stopOpacity="0" />
          </SvgGradient>
        </Defs>

        {/* Fundo suave */}
        <Circle cx={centerX} cy={centerY} r={90} fill="#FFEBEE" opacity={0.4} />

        {/* Pulso de energia expandindo */}
        <AnimatedPath
          d={heartPath}
          fill="none"
          stroke="#F44336"
          strokeWidth="4"
          opacity={pulseOpacity}
          style={{
            transform: [{ scale: pulseScale }],
          }}
          origin={`${centerX}, ${centerY}`}
        />

        {/* Coração principal com batimento */}
        <Animated.View
          style={{
            transform: [{ scale: heartbeat }],
          }}
        >
          <Svg width={width} height={height}>
            {/* Sombra do coração */}
            <Path
              d={heartPath}
              fill="#B71C1C"
              opacity={0.3}
              transform={`translate(2, 3)`}
            />

            {/* Corpo do coração */}
            <Path d={heartPath} fill="url(#heartGrad)" />

            {/* Sombra interna */}
            <Path d={heartPath} fill="url(#shadowGrad)" />

            {/* Brilho principal */}
            <Path
              d={`
                M ${centerX - 20} ${centerY - 30}
                Q ${centerX - 15} ${centerY - 35}, ${centerX - 8} ${centerY - 32}
                Q ${centerX - 12} ${centerY - 28}, ${centerX - 20} ${centerY - 30}
                Z
              `}
              fill="url(#shineGrad)"
              opacity={0.9}
            />

            {/* Preenchimento de progresso */}
            {clamped > 0 && (
              <Path
                d={heartPath}
                fill="#C62828"
                opacity={clamped * 0.4}
              />
            )}
          </Svg>
        </Animated.View>

        {/* Partículas brilhantes ao redor */}
        <AnimatedCircle
          cx={centerX - 50}
          cy={centerY - 20}
          r={3}
          fill="#FF6B9D"
          opacity={sparkle1.interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          })}
        />
        <AnimatedCircle
          cx={centerX + 48}
          cy={centerY - 15}
          r={2.5}
          fill="#FF5582"
          opacity={sparkle2.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
          })}
        />
        <AnimatedCircle
          cx={centerX + 35}
          cy={centerY + 25}
          r={2}
          fill="#FF8A80"
          opacity={sparkle1.interpolate({
            inputRange: [0, 1],
            outputRange: [0.4, 1],
          })}
        />
        <AnimatedCircle
          cx={centerX - 40}
          cy={centerY + 20}
          r={2.5}
          fill="#FF6B9D"
          opacity={sparkle2.interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          })}
        />

        {/* Ícones de força quando progresso > 50% */}
        {clamped > 0.5 && (
          <>
            {/* Símbolo de força esquerda */}
            <Path
              d={`M ${centerX - 75} ${centerY - 40} L ${centerX - 70} ${centerY - 50} L ${centerX - 65} ${centerY - 40} Z`}
              fill="#FF5722"
              opacity={0.7}
            />
            <Path
              d={`M ${centerX - 75} ${centerY - 35} L ${centerX - 70} ${centerY - 25} L ${centerX - 65} ${centerY - 35} Z`}
              fill="#FF6F00"
              opacity={0.6}
            />

            {/* Símbolo de força direita */}
            <Path
              d={`M ${centerX + 75} ${centerY - 40} L ${centerX + 70} ${centerY - 50} L ${centerX + 65} ${centerY - 40} Z`}
              fill="#FF5722"
              opacity={0.7}
            />
            <Path
              d={`M ${centerX + 75} ${centerY - 35} L ${centerX + 70} ${centerY - 25} L ${centerX + 65} ${centerY - 35} Z`}
              fill="#FF6F00"
              opacity={0.6}
            />
          </>
        )}
      </Svg>
    </View>
  );
}
