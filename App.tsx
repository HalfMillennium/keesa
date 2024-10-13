import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StatusBar, StyleSheet } from "react-native"; // Import StatusBar
import { Home } from "./pages/Home";
import { RecordingStudio } from "./pages/RecordingStudio";
import { CanvasComponent } from "./pages/Canvas";

// Define types for your stack's routes
export type RootStackParamList = {
  Home: undefined;
  Studio: undefined;
  Canvas: undefined;
};

// Create a Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

// Main App Component
const App: React.FC = () => {
  return (
    <>
      {/* Set the StatusBar style to light-content to make the text white */}
      <StatusBar barStyle="light-content" />

      <View style={styles.navContainer}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false, gestureEnabled: false }} // Hide header for Home
            />
            <Stack.Screen
              name="Studio"
              component={RecordingStudio}
              options={{ headerShown: false, gestureEnabled: false }} // Hide header for Studio
            />
            <Stack.Screen
              name="Canvas"
              component={CanvasComponent}
              options={{ headerShown: false, gestureEnabled: false }} // Hide header for Studio
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    height: "100%",
  },
});

export default App;
