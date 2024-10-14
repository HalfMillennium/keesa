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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Slider from "@react-native-community/slider";
import { COLORS } from "./components/common";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { STROKE_WIDTHS, StrokeTypes } from "./components/stroke";

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

  // Stroke options
  const [strokeColor, setStrokeColor] = useState<string>("white"); // State to track the selected color
  const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTHS[StrokeTypes.THIN]);

  const [isStrokeOptionsVisible, setIsStrokeOptionsVisible] = useState<boolean>(false); // Color overlay visibility
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
      setSkiaPaths([...skiaPaths, { path: currentSkiaPath, color: strokeColor }]);
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
              color={strokeColor}
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
                setStrokeColor("white");
                setIsStrokeOptionsVisible(false);
              }}
            />
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: COLORS.pastelRed }]}
              onPress={() => {
                setStrokeColor(COLORS.pastelRed);
                setIsStrokeOptionsVisible(false);
              }}
            />
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: COLORS.babyBlue }]}
              onPress={() => {
                setStrokeColor(COLORS.babyBlue);
                setIsStrokeOptionsVisible(false);
              }}
            />
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: COLORS.pastelGreen }]}
              onPress={() => {
                setStrokeColor(COLORS.pastelGreen);
                setIsStrokeOptionsVisible(false);
              }}
            />
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: COLORS.goldYellow }]}
              onPress={() => {
                setStrokeColor(COLORS.goldYellow);
                setIsStrokeOptionsVisible(false);
              }}
            />
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: COLORS.softLavender }]}
              onPress={() => {
                setStrokeColor(COLORS.softLavender);
                setIsStrokeOptionsVisible(false);
              }}
            />
        </View>

      {/* Toggle Stroke Options Button */}
      <TouchableOpacity
        onPress={() => setIsStrokeOptionsVisible(true)}
        style={styles.toggleColorButton}
      >
        <View style={styles.colorChangeButton}>
          <MaterialCommunityIcons
            name="draw"
            color="white"
            size={18}
          ></MaterialCommunityIcons>
          <Text style={styles.toggleColorButtonText}>Edit Stroke</Text>
        </View>
      </TouchableOpacity>

      {/* Clear Button */}
      <TouchableOpacity onPress={clearCanvas} style={styles.clearButton}>
        <Ionicons name="trash-outline" size={18} color="white" />
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>

      {/* Stroke Options  Overlay */}
      <Modal
        visible={isStrokeOptionsVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.editStrokeOverlay}>
          <View
            style={{
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
              paddingTop: 10,
              gap: 20,
            }}
          >
            <View style={styles.colorChangeButton}>
              <MaterialCommunityIcons
                name="draw"
                color={COLORS.hotPink}
                size={18}
              ></MaterialCommunityIcons>
              <Text style={styles.toggleColorButtonText}>Stroke Options</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 20}}>
              <TouchableOpacity
                style={[styles.strokeOptionButton, {borderColor: strokeWidth === STROKE_WIDTHS[StrokeTypes.THIN] ? "white" : "#ffffff50"}]}
                onPress={() => {
                  setStrokeWidth(STROKE_WIDTHS[StrokeTypes.THIN]);
                }}
              >
                <Text style={{color: "white", fontSize: 14, textAlign: "center"}}>Thin</Text>
                <Text style={{color: "#ffffff50", fontSize: 12, textAlign: "center", fontStyle: 'italic'}}>{`${STROKE_WIDTHS[StrokeTypes.THIN]}px`}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.strokeOptionButton, {borderColor: strokeWidth === STROKE_WIDTHS[StrokeTypes.MEDIUM] ? "white" : "#ffffff50"}]}
                onPress={() => {
                  setStrokeWidth(STROKE_WIDTHS[StrokeTypes.MEDIUM]);
                }}
              >
                <Text style={{color: "white", fontSize: 14, textAlign: "center"}}>Medium</Text>
                <Text style={{color: "#ffffff50", fontSize: 12, textAlign: "center", fontStyle: 'italic'}}>{`${STROKE_WIDTHS[StrokeTypes.MEDIUM]}px`}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.strokeOptionButton, {borderColor: strokeWidth === STROKE_WIDTHS[StrokeTypes.HEAVY] ? "white" : "#ffffff50"}]}
                onPress={() => {
                  setStrokeWidth(STROKE_WIDTHS[StrokeTypes.HEAVY]);
                }}
              >
                <Text style={{color: "white", fontSize: 14, textAlign: "center"}}>Heavy</Text>
                <Text style={{color: "#ffffff50", fontSize: 12, textAlign: "center", fontStyle: 'italic'}}>{`${STROKE_WIDTHS[StrokeTypes.HEAVY]}px`}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.closeOverlayButton}
            onPress={() => setIsStrokeOptionsVisible(false)}
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
  editStrokeOverlay: {
    flex: 1,
    gap: 20,
    marginHorizontal: 30,
    marginVertical: 300,
    backgroundColor: "#000000",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  colorButton: {
    width: 45,
    height: 45,
    margin: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "white",
  },
  strokeOptionButton: {
    width: 75,
    height: 75,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  colorChangeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  closeOverlayButton: {
    borderRadius: 15,
    marginTop: 20,
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff70",
  },
  closeOverlayText: {
    color: "black",
    fontSize: 16,
    letterSpacing: 1
  },
});

export default CanvasComponent;