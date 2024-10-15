import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  Modal,
} from "react-native";
import {
  Canvas,
  Path,
  Skia,
  SkPath,
  RoundedRect,
  Image,
  useImage,
} from "@shopify/react-native-skia";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { COLORS } from "./components/common";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { STROKE_WIDTHS, StrokeTypes } from "./components/stroke/stroke";
import { smoothPath } from "./utils";
import { ImageCanvas } from "./components/ImageCanvas";
import { StrokeWidthOptions } from "./components/stroke/StrokeWidthOptions";

type CanvasNavigationProp = StackNavigationProp<RootStackParamList, "Canvas">;

interface CanvasProps {
  navigation: CanvasNavigationProp;
}

interface SkiaPathPoint {
  path: SkPath;
  color: string;
  strokeWidth: number;
}

// Rectangle that covers part of screen where user wants to place media (currently, only images)
interface Placer {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 *
 * @note Skia paths refer to drawing paths that are drawn on the canvas, while technically placer paths are also Skia paths, they are used to represent the rectangle that covers the screen where the user wants to place media
 */
export const CanvasComponent: React.FC<CanvasProps> = ({ navigation }) => {
  const [skiaPaths, setSkiaPaths] = useState<SkiaPathPoint[]>([]);
  const [currentSkiaPath, setCurrentSkiaPath] = useState<SkPath | null>(null);

  // Stroke options
  const [strokeColor, setStrokeColor] = useState<string>("white"); // State to track the selected color
  const [strokeWidth, setStrokeWidth] = useState<number>(
    STROKE_WIDTHS[StrokeTypes.THIN]
  );

  // Drag-and-pan
  const [isDragMode, setIsDragMode] = useState<boolean>(false);
  const pan = useRef({ x: 0, y: 0 }).current; // Store the initial position of the canvas
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Current position of the canvas
  const startTouchPosition = useRef({ x: 0, y: 0 }).current; // To store the initial touch point


  // Placer configuration - used to place media on the canvas
  const [isPlacerMode, setIsPlacerMode] = useState<boolean>(false);
  const [currentPlacerPath, setCurrentPlacerPath] = useState<Placer | null>(
    null
  );
  const [placerPath, setPlacerPath] = useState<Placer>();
  const imageIcon = useImage(require("./assets/icons/image_icon.png"));
  const [isStrokeOptionsVisible, setIsStrokeOptionsVisible] =
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

  useEffect(() => {
    if (!isPlacerMode) {
      setPlacerPath(undefined);
    }
  }, [isPlacerMode]);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  // Handle touch start events
  const onTouchStart = (event: GestureResponderEvent) => {
    if(!isDragMode) {
      const locationX = event.nativeEvent.locationX;
      const locationY = event.nativeEvent.locationY;
      if (isPlacerMode) {
        const initPlacer = { x: locationX, y: locationY, width: 0, height: 0 };
        setCurrentPlacerPath(initPlacer);
      } else {
        const newPath = Skia.Path.Make();
        newPath.moveTo(locationX, locationY);
        setCurrentSkiaPath(newPath);
      }
    } else {
      // Capture the initial touch position
      const touch = event.nativeEvent;
      startTouchPosition.x = touch.pageX;
      startTouchPosition.y = touch.pageY;
    }
  };

  // Handle touch move events
  const onTouchMove = (event: GestureResponderEvent) => {
    if(!isDragMode) {
      const locationX = event.nativeEvent.locationX;
      const locationY = event.nativeEvent.locationY;
  
      if (isPlacerMode) {
        if (currentPlacerPath) {
          let updatedX = currentPlacerPath.x;
          let updatedY = currentPlacerPath.y;
          let updatedWidth = locationX - currentPlacerPath.x;
          let updatedHeight = locationY - currentPlacerPath.y;
  
          if (updatedWidth < 0) {
            updatedX = locationX;
            updatedWidth = Math.abs(updatedWidth);
          }
  
          if (updatedHeight < 0) {
            updatedY = locationY;
            updatedHeight = Math.abs(updatedHeight);
          }
  
          const updatedPlacer = {
            x: updatedX,
            y: updatedY,
            width: updatedWidth,
            height: updatedHeight,
          };
  
          setCurrentPlacerPath(updatedPlacer);
          setPlacerPath(updatedPlacer);
        }
      } else {
        if (currentSkiaPath) {
          currentSkiaPath.lineTo(locationX, locationY);
          setCurrentSkiaPath(currentSkiaPath);
        }
      }
    } else {
      const touch = event.nativeEvent;
      const dx = touch.pageX - startTouchPosition.x;
      const dy = touch.pageY - startTouchPosition.y;
  
      // Update the position of the canvas during the drag
      setPosition({
        x: pan.x + dx,
        y: pan.y + dy,
      });
    }
  };

  const onTouchEnd = (event: GestureResponderEvent) => {
    if(!isDragMode) {
      if (isPlacerMode) {
        if (currentPlacerPath) {
          setPlacerPath(currentPlacerPath);
          setCurrentPlacerPath(null);
        }
      } else {
        if (currentSkiaPath) {
          const smoothedPath = smoothPath(currentSkiaPath);
          setSkiaPaths([
            ...skiaPaths,
            { path: smoothedPath, color: strokeColor, strokeWidth: strokeWidth },
          ]);
          setCurrentSkiaPath(null);
        }
      }
    } else {
      // Save the final position after the user lifts their finger
      pan.x += event.nativeEvent.pageX - startTouchPosition.x;
      pan.y += event.nativeEvent.pageY - startTouchPosition.y;
    }
  };
  // Clear the canvas
  const clearCanvas = () => {
    setSkiaPaths([]); // Clear all paint paths
  };

  const imageIconWidth = imageIcon ? imageIcon.width() / 4 : 0;
  const imageIconHeight = imageIcon ? imageIcon.height() / 4 : 0;
  const image = useImage(require("./assets/images/apple_image.jpg"));

  return (
    <View style={[styles.container]}>
      <View
        style={{
          flex: 1,
          transform: [{ translateX: position.x }, { translateY: position.y }],
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Canvas style={{ flex: 1 }}>
          {image && placerPath && (
            <ImageCanvas
              images={[
                {
                  image: image,
                  x: placerPath.x,
                  y: placerPath.y,
                  width: placerPath.width,
                  height: placerPath.height,
                },
              ]}
            />
          )}
          {skiaPaths.map((pathObj, index) => (
            <Path
              key={index}
              path={pathObj.path}
              color={pathObj.color}
              style="stroke"
              strokeWidth={pathObj.strokeWidth}
              strokeCap="round"
              strokeJoin="round"
            />
          ))}
          {placerPath && (
            <>
              <RoundedRect
                x={placerPath.x}
                y={placerPath.y}
                r={10}
                width={placerPath.width}
                height={placerPath.height}
                color="#ffffff50"
                style="stroke"
                strokeWidth={1}
              />
              {imageIcon && placerPath && (
                <Image
                  image={imageIcon}
                  x={placerPath.x + placerPath.width / 2 - imageIconWidth / 2}
                  y={placerPath.y + placerPath.height / 2 - imageIconHeight / 2}
                  width={imageIconWidth}
                  height={imageIconHeight}
                />
              )}
            </>
          )}
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

      <View style={styles.drawingActions}>
      <TouchableOpacity onPress={() => {
          setIsDragMode(!isDragMode);
          setIsPlacerMode(false);
        }}>
          {!isDragMode && (
            <View style={styles.enableDragModeButton}>
              <Ionicons
                name="hand-right-outline"
                size={24}
                color={COLORS.turq}
              />
            </View>
          )}
          {isDragMode && (
            <View style={styles.disableDragModeButton}>
              <Ionicons
                name="hand-right"
                size={24}
                color="#212121"
              />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setIsPlacerMode(!isPlacerMode);
          setIsDragMode(false);
          }}>
          {!isPlacerMode && (
            <View style={styles.enablePlacerModeButton}>
              <MaterialCommunityIcons
                name="dots-square"
                size={24}
                color="white"
              />
            </View>
          )}
          {isPlacerMode && (
            <View style={styles.disablePlacerModeButton}>
              <MaterialCommunityIcons
                name="dots-square"
                size={24}
                color="#212121"
              />
            </View>
          )}
        </TouchableOpacity>
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
      </View>

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
            <StrokeWidthOptions strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth}/>
          </View>
          <TouchableOpacity
            style={styles.closeOverlayButton}
            onPress={() => setIsStrokeOptionsVisible(false)}
          >
            <FontAwesome5 name="check" size={16} color="black" />
            <Text style={styles.closeOverlayText}>Save</Text>
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
  colorPanel: {
    position: "absolute",
    gap: 15,
    top: 70,
    right: 20,
  },
  backButton: {
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    top: 70,
    left: 20,
  },
  drawingActions: {
    position: "absolute",
    bottom: 40,
    right: 20,
    gap: 10,
    alignItems: "flex-end",
  },
  toggleColorButton: {
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
    marginVertical: 250,
    backgroundColor: "#00000095",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  colorButton: {
    width: 45,
    height: 45,
    marginRight: 10,
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
    justifyContent: "center",
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
    gap: 5,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  closeOverlayText: {
    color: "black",
    fontSize: 16,
    fontFamily: "WorkSans",
    letterSpacing: 1,
  },
  enablePlacerModeButton: {
    borderColor: COLORS.hotPink,
    borderWidth: 1,
    borderRadius: 100,
    padding: 10,
  },
  enableDragModeButton: {
    borderColor: COLORS.turq,
    borderWidth: 1,
    borderRadius: 100,
    padding: 10,
  },
  disableDragModeButton: {
    borderColor: COLORS.turq,
    backgroundColor: COLORS.turq,
    borderWidth: 1,
    borderRadius: 100,
    padding: 10,
  },
  disablePlacerModeButton: {
    borderColor: COLORS.hotPink,
    backgroundColor: COLORS.hotPink,
    borderWidth: 1,
    borderRadius: 100,
    padding: 10,
  },
});

export default CanvasComponent;
