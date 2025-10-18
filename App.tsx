import React from "react";
import { View, Text } from "react-native";

/*
IMPORTANT NOTICE: DO NOT REMOVE
There are already environment keys in the project. 
Before telling the user to add them, check if you already have access to the required keys through bash.
Directly access them with process.env.${key}

Correct usage:
process.env.EXPO_PUBLIC_VIBECODE_{key}
//directly access the key

Incorrect usage:
import { OPENAI_API_KEY } from '@env';
//don't use @env, its depreicated

Incorrect usage:
import Constants from 'expo-constants';
const openai_api_key = Constants.expoConfig.extra.apikey;
//don't use expo-constants, its depreicated

*/

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1e293b" }}>
      <Text style={{ fontSize: 48, fontWeight: "bold", color: "#f3f4f6" }}>
        Dezyne
      </Text>
      <Text style={{ fontSize: 18, color: "#9ca3af", marginTop: 16 }}>
        Web version loading test
      </Text>
    </View>
  );
}
