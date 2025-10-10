import React from 'react';
import { View, Text } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export default function LoadingScreen() {
  return (
    <View className="flex-1 bg-[#1e293b] items-center justify-center px-8">
      {/* Hanger Icon - Custom SVG to match logo */}
      <View className="mb-8">
        <Svg width="120" height="100" viewBox="0 0 120 100" fill="none">
          {/* Hanger hook */}
          <Path
            d="M 55 10 Q 55 0, 65 0 Q 75 0, 75 10 Q 75 20, 65 25"
            stroke="#f3f4f6"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          {/* Hanger bar */}
          <Path
            d="M 10 60 L 65 25 L 110 60"
            stroke="#f3f4f6"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
      
      {/* Dezyne Text Logo */}
      <Text 
        style={{ 
          fontSize: 72, 
          fontWeight: 'bold', 
          color: '#f3f4f6',
          letterSpacing: 2,
          fontFamily: 'System'
        }}
      >
        Dezyne
      </Text>
    </View>
  );
}
