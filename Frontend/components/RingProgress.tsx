import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import SVG, { Circle, CircleProps } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';

type RingProgressProps = {
  radius?: number;
  strokeWidth?: number;
  progress: number;
  caloriesEaten: number;
  caloriesLeft: number;
};

const color = '#CCC9DC';

const RingProgress = ({
  radius = 100,
  strokeWidth = 35,
  progress,
  caloriesEaten,
  caloriesLeft,
}: RingProgressProps) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;
  const [fill, setFill] = useState(0);

  
  useEffect(() => {
    setFill(0);

    const animation = setInterval(() => {
      setFill((prev) => {
        if (prev < progress) {
          return Math.min(prev + 0.01, progress);
        }
        clearInterval(animation); 
        return prev;
      });
    }, 15); 

    return () => clearInterval(animation);
  }, [progress]);

  const strokeDasharray = [circumference * fill, circumference];

  const circleDefaultProps: CircleProps = {
    r: innerRadius,
    cx: radius,
    cy: radius,
    originX: radius,
    originY: radius,
    strokeWidth: strokeWidth,
    stroke: color,
    strokeLinecap: 'round',
    rotation: '-90', 
    strokeDasharray: strokeDasharray.join(','), 
  };

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignSelf: 'center',
        position: 'relative',
      }}
    >
      <SVG>
        {/* Background circle */}
        <Circle {...circleDefaultProps} opacity={0.2} strokeDasharray={undefined} />
        {/* Progress circle */}
        <Circle {...circleDefaultProps} />
      </SVG>

      {/* Center content */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: radius * 0.2,
            fontWeight: 'bold',
            color: '#324A5F',
            textAlign: 'center',
          }}
        >
          {caloriesEaten.toFixed(0)} kcal
        </Text>
        <Text
          style={{
            fontSize: radius * 0.15,
            fontWeight: 'bold',
            color: '#324A5F',
            textAlign: 'center',
          }}
        >
          {caloriesLeft.toFixed(0)} kcal left
        </Text>
      </View>

      {/* Optional decorative icon */}
      <AntDesign
        name="arrowright"
        size={strokeWidth * 0.8}
        color="black"
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: strokeWidth * 0.1,
        }}
      />
    </View>
  );
};

export default RingProgress;
