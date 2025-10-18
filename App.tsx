import React from "react";
import { View, Text } from "react-native";

export default function App() {
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Catch any initialization errors
    try {
      console.log("App mounted successfully on web!");
    } catch (e: any) {
      setError(e.toString());
    }
  }, []);

  if (error) {
    return (
      <View style={{ flex: 1, padding: 20, backgroundColor: "#dc2626" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
          Error: {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1e293b" }}>
      <Text style={{ fontSize: 48, fontWeight: "bold", color: "#f3f4f6" }}>
        Dezyne
      </Text>
      <Text style={{ fontSize: 18, color: "#10b981", marginTop: 16 }}>
        ✓ Web version is working!
      </Text>
    </View>
  );
}
