import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';

type CircleProps = {
  circleX: Animated.SharedValue<number>;
};

const circleContainerSize = 50;

const AnimatedCircle: FC<CircleProps> = ({ circleX }) => {
  const { theme } = useTheme();

  // Define el estilo del contenedor del círculo
  const circleContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: circleX.value - circleContainerSize / 2 }],
      backgroundColor: theme === 'light' ? '#F7FBFC' : '#252A34', // Ajusta los colores según tu tema
    };
  }, [theme]);

  return <Animated.View style={[circleContainerStyle, styles.container]} />;
};

export default AnimatedCircle;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -circleContainerSize / 1.1,
    width: circleContainerSize,
    borderRadius: circleContainerSize,
    height: circleContainerSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
