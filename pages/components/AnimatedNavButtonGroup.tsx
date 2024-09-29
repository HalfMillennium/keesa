import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from './common';
import styled from 'styled-components/native';

// Styled Component for Text
export const WorkSansText = styled.Text`
  font-family: Work Sans;
  color: ${COLORS.text};
`;

// Define the type for button specs
export interface AnimatedButtonSpec {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  active: boolean;
  onPress: () => void;
}

interface AnimatedNavButtonGroupProps {
  buttonSpecs: AnimatedButtonSpec[];
  activeButtonName: string;
  setActiveButton: (buttonName: string) => void;
}

export const AnimatedNavButtonGroup: React.FC<AnimatedNavButtonGroupProps> = ({
  buttonSpecs,
  activeButtonName,
  setActiveButton,
}) => {
  const animations = buttonSpecs.map(
    () => useRef(new Animated.Value(-200)).current
  );

  useEffect(() => {
    const animationsSequence = buttonSpecs.map((_, index) =>
      Animated.timing(animations[index], {
        toValue: 0,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
        delay: index * 100, // Stagger effect
      })
    );
    Animated.stagger(100, animationsSequence).start();
  }, [animations, buttonSpecs]);

  return (
    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20, marginBottom: 20, gap: 5 }}>
      {buttonSpecs.map((buttonSpec, index) => (
        <Animated.View
          key={buttonSpec.title}
          style={{ transform: [{ translateX: animations[index] }], flex: 1 }}>
          <TouchableOpacity
            style={{
              backgroundColor: activeButtonName === buttonSpec.title
                ? COLORS.buttonActive
                : COLORS.buttonInactive,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              borderRadius: 20,
              gap: 5,
              display: 'flex',
            }}
            onPress={() => setActiveButton(buttonSpec.title)}>
            <AntDesign
              name={(buttonSpec.icon) as "key"}
              size={14}
              style={{lineHeight: 15}}
              color={activeButtonName === buttonSpec.title ? COLORS.text : COLORS.background}
            />
            <WorkSansText style={{ color: activeButtonName === buttonSpec.title ? COLORS.text : COLORS.background, fontSize: 12, lineHeight: 20 }}>
              {buttonSpec.title}
            </WorkSansText>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};
