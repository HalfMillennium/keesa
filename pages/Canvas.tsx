import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  Modal,
} from "react-native";
import { Canvas, Path, Skia, SkPath } from "@shopify/react-native-skia";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Slider from "@react-native-community/slider";
import { COLORS } from "./components/common";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

type CanvasNavigationProp = StackNavigationProp<RootStackParamList, "Canvas">;

interface CanvasProps {
  navigation: CanvasNavigationProp;
}

interface SkiaPathPoint {
  path: SkPath;
  color: string;
}

export const CanvasComponent: React.FC<CanvasProps> = ({ navigation }) => {
  const [skiaPaths, setSkiaPaths] = useState<SkiaPathPoint[]>([]);
  const [currentSkiaPath, setCurrentSkiaPath] = useState<SkPath | null>(null);
  const [color, setColor] = useState<string>("white"); // State to track the selected color
  const [strokeWidth, setStrokeWidth] = useState<number>(5);
  const [isColorOptionsVisible, setIsColorOptionsVisible] = useState<boolean>(false); // Color overlay visibility
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
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  // Handle touch start events
  const onTouchStart = (event: GestureResponderEvent) => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const newPath = Skia.Path.Make();
    newPath.moveTo(locationX, locationY);
    setCurrentSkiaPath(newPath);
  };

  // Handle touch move events
  const onTouchMove = (event: GestureResponderEvent) => {
    if (currentSkiaPath) {
      const locationX = event.nativeEvent.locationX;
      const locationY = event.nativeEvent.locationY;
      currentSkiaPath.lineTo(locationX, locationY);
      setCurrentSkiaPath(currentSkiaPath);
    }
  };

  // Handle touch end events
  const onTouchEnd = () => {
    if (currentSkiaPath) {
      setSkiaPaths([...skiaPaths, { path: currentSkiaPath, color }]);
      setCurrentSkiaPath(null);
    }
  };

  // Clear the canvas
  const clearCanvas = () => {
    setSkiaPaths([]); // Clear all paths
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.fullScreenCanvas}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Canvas style={{ flex: 1 }}>
          {skiaPaths.map((pathObj, index) => (
            <Path
              key={index}
              path={pathObj.path}
              color={pathObj.color}
              style="stroke"
              strokeWidth={strokeWidth}
              strokeCap="round"
              strokeJoin="round"
            />
          ))}
          {currentSkiaPath && (
            <Path
              path={currentSkiaPath}
              color={color}
              style="stroke"
              strokeWidth={strokeWidth}
              strokeCap="round"
              strokeJoin="round"
            />
          )}
        </Canvas>
      </View>

      <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
        <Ionicons name="chevron-back-outline" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.colorPanel}>
          <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: "white" }]}
              onPress={() => {
                setColor("white");
                setIsColorOptionsVisible(false);
              }}
            />
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: COLORS.pastelRed }]}
              onPress={() => {
                setColor(COLORS.pastelRed);
                setIsColorOptionsVisible(false);
              }}
            />
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: COLORS.babyBlue }]}
              onPress={() => {
                setColor(COLORS.babyBlue);
                setIsColorOptionsVisible(false);
              }}
            />
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: COLORS.pastelGreen }]}
              onPress={() => {
                setColor(COLORS.pastelGreen);
                setIsColorOptionsVisible(false);
              }}
            />
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: COLORS.goldYellow }]}
              onPress={() => {
                setColor(COLORS.goldYellow);
                setIsColorOptionsVisible(false);
              }}
            />
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: COLORS.softLavender }]}
              onPress={() => {
                setColor(COLORS.softLavender);
                setIsColorOptionsVisible(false);
              }}
            />
        </View>

      {/* Toggle Color Options Button */}
      <TouchableOpacity
        onPress={() => setIsColorOptionsVisible(true)}
        style={styles.toggleColorButton}
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

      {/* Clear Button */}
      <TouchableOpacity onPress={clearCanvas} style={styles.clearButton}>
        <Ionicons name="trash-outline" size={18} color="white" />
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>

      {/* Color Options Overlay */}
      <Modal
        visible={isColorOptionsVisible}
        transparent={true}
        animationType="fade"
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
    backgroundColor: "#212121",
  },
  fullScreenCanvas: {
    flex: 1,
  },
  colorPanel: {
    position: "absolute",
    gap: 5,
    top: 70,
    right: 20
  },
  backButton: {
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    top: 70,
    left: 20
  },
  toggleColorButton: {
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
    width:45,
    height: 45,
    margin: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "white",
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

export default CanvasComponent;