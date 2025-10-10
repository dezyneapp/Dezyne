import React from 'react';
import { View, Text } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export default function LoadingScreen() {
  return (
    <View className="flex-1 bg-[#1e293b] items-center justify-center px-8">
      {/* Hanger Icon - Custom SVG to match logo */}
      <View className="mb-8" style={{ paddingTop: 10 }}>
        <Svg width="140" height="120" viewBox="0 0 140 120" fill="none">
          {/* Hanger hook */}
          <Path
            d="M 65 20 Q 65 8, 70 8 Q 75 8, 75 20 Q 75 32, 70 38"
            stroke="#f3f4f6"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Hanger bar */}
          <Path
            d="M 15 75 L 70 38 L 125 75"
            stroke="#f3f4f6"
            strokeWidth="7"
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
