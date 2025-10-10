import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoadingScreen() {
  return (
    <View className="flex-1 bg-[#1e293b] items-center justify-center">
      {/* Hanger Icon */}
      <View className="mb-6">
        <Ionicons name="shirt-outline" size={80} color="#f3f4f6" />
      </View>
      
      {/* Dezyne Text Logo */}
      <Text className="text-6xl font-bold text-gray-100 tracking-wide mb-2">
        Dezyne
      </Text>
      
      <Text className="text-gray-400 text-lg mb-12">
        Upcycled Fashion Marketplace
      </Text>
      
      {/* Loading Indicator */}
      <ActivityIndicator size="large" color="#f3f4f6" />
    </View>
  );
}
