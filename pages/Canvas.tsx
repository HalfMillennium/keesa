import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ScrollView,
  Modal,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Slider from "@react-native-community/slider";
import { COLORS } from "./components/common";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

// Define types for the path and path objects
interface PathObj {
  path: string[];
  color: string;
}

type CanvasNavigationProp = StackNavigationProp<RootStackParamList, "Canvas">;

interface CanvasProps {
  navigation: CanvasNavigationProp;
}

export const Canvas: React.FC<CanvasProps> = ({ navigation }) => {
  const [paths, setPaths] = useState<PathObj[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [color, setColor] = useState<string>("white"); // State to track the selected color
  const [isDragMode, setIsDragMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState<number>(5);
  const [isColorOptionsVisible, setIsColorOptionsVisible] =
    useState<boolean>(false); // Color overlay visibility
  const [fontsLoaded] = useFonts({
    WorkSans: require("./assets/fonts/WorkSans.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  // Handle touch start events
  const onTouchStart = (event: GestureResponderEvent) => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    setCurrentPath([`M ${locationX},${locationY}`]); // Move to the starting point
  };

  // Handle touch move events
  const onTouchMove = (event: GestureResponderEvent) => {
    if (!isDragMode) {
      const locationX = event.nativeEvent.locationX;
      const locationY = event.nativeEvent.locationY;
      const newPath = [...currentPath, `L ${locationX},${locationY}`]; // Draw a line to the new point
      setCurrentPath(newPath);
    }
  };

  // Handle touch end events
  const onTouchEnd = () => {
    setPaths([...paths, { path: currentPath, color }]); // Store the path with its color
    setCurrentPath([]); // Reset current path
  };

  // Clear the canvas
  const clearCanvas = () => {
    setPaths([]); // Clear all paths
  };

  const toggleDragMode = () => {
    setIsDragMode(!isDragMode);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled={isDragMode}
        horizontal={true}
        maximumZoomScale={3}
        minimumZoomScale={1}
      >
        <View
          style={styles.fullScreenCanvas}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Svg height="4000" width="4000">
            {paths.map((pathObj, index) => (
              <Path
                key={index}
                d={pathObj.path.join(" ")} // Join the path commands into a string
                stroke={pathObj.color} // Use the path's specific color
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            ))}
            {currentPath.length > 0 && (
              <Path
                d={currentPath.join(" ")} // Join the current path's commands
                stroke={color} // Use the currently selected color
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            )}
          </Svg>
        </View>
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="chevron-back-outline" size={24} color="white" />
      </TouchableOpacity>

      <View>
        {/* Toggle Color Options Button */}
        <TouchableOpacity
          onPress={() => setIsColorOptionsVisible(true)}
          style={styles.toggleColorButtonContainer}
        >
          <View style={styles.colorChangeButton}>
            <Ionicons
              name={"color-palette-outline"}
              color="white"
              size={18}
            ></Ionicons>
            <Text style={styles.toggleColorButtonText}>Change Color</Text>
          </View>
        </TouchableOpacity>
        {/* Toggle Drag Mode Button */}
        <TouchableOpacity
          style={{
            ...styles.dragModeButton,
            backgroundColor: isDragMode ? COLORS.turq : "transparent",
          }}
          onPress={() => toggleDragMode()}
        >
          <FontAwesome5
            name={"hand-paper"}
            color={isDragMode ? "black" : COLORS.turq}
            size={18}
          />
        </TouchableOpacity>
      </View>

      {/* Clear Button */}
      <TouchableOpacity onPress={clearCanvas} style={styles.clearButton}>
        <Ionicons name="trash-outline" size={18} color="white" />
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>

      {/* Color Options Overlay */}
      <Modal
        visible={isColorOptionsVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.colorOverlay}>
          <View style={{ gap: 0 }}>
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: "white" }]}
              onPress={() => {
                setColor("white");
                setIsColorOptionsVisible(false);
              }}
            />
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: "red" }]}
              onPress={() => {
                setColor("red");
                setIsColorOptionsVisible(false);
              }}
            />
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: "blue" }]}
              onPress={() => {
                setColor("blue");
                setIsColorOptionsVisible(false);
              }}
            />
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: "green" }]}
              onPress={() => {
                setColor("green");
                setIsColorOptionsVisible(false);
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "30%",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontFamily: "WorkSans",
                  fontStyle: "italic",
                  color: COLORS.hotPink,
                  fontWeight: "900",
                }}
              >
                {strokeWidth}
              </Text>
              <Text style={{ color: "gray", fontFamily: "WorkSans" }}>
                Stroke Width
              </Text>
            </View>
            <Slider
              style={{ width: "60%", height: 100 }}
              step={1}
              minimumValue={1}
              maximumValue={100}
              value={strokeWidth}
              onValueChange={setStrokeWidth}
              minimumTrackTintColor="#1EB1FC"
              maximumTrackTintColor="#8E8E93"
              thumbTintColor={COLORS.text}
            />
          </View>
          <TouchableOpacity
            style={styles.closeOverlayButton}
            onPress={() => setIsColorOptionsVisible(false)}
          >
            <Text style={styles.closeOverlayText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.canvasBackground,
  },
  fullScreenCanvas: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 70,
    left: 20,
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
  },
  toggleColorButtonContainer: {
    position: "absolute",
    bottom: 40,
    right: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderColor: "#ffffff30",
    borderWidth: 1,
    backgroundColor: COLORS.canvasBackground,
  },
  toggleColorButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "WorkSans",
  },
  clearButton: {
    position: "absolute",
    gap: 5,
    bottom: 40,
    left: 20,
    backgroundColor: "#9b2900",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    fontFamily: "WorkSans",
  },
  clearButtonText: {
    color: "white",
    fontFamily: "WorkSans",
    fontSize: 16,
  },
  colorOverlay: {
    flex: 1,
    gap: 30,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  colorButton: {
    width: 60,
    height: 60,
    margin: 10,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "white",
  },
  dragModeButton: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.turq,
    justifyContent: "center",
    alignItems: "center",
  },
  colorChangeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  closeOverlayButton: {
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff90",
  },
  closeOverlayText: {
    color: "black",
    fontSize: 16,
  },
});
