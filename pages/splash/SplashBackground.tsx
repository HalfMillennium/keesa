import React from "react";
import { View, Image, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { COLORS } from "../components/common";
const { width, height } = Dimensions.get("window");

export const SplashBackground: React.FC = () => {
  return (
    <View style={styles.container}>
      <Video
        source={require("./purple_animation_bg.mp4")}
        style={styles.backgroundVideo}
        resizeMode={ResizeMode.COVER}
        isLooping
        isMuted
        shouldPlay
      />
      <View style={[styles.overlay, {gap: 10, justifyContent: 'center'}]}>
        <Image
          resizeMode={ResizeMode.CONTAIN}
          source={require("../assets/images/keesa_logo_white_large.png")}
          style={styles.logo}
        />
        <ActivityIndicator size="small" color="#f7f7f7"></ActivityIndicator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background
  },
  backgroundVideo: {
    position: "absolute",
    opacity: 0.8,
    width: height,
    height: width,
    transform: [{ rotate: "90deg" }],
  },
  overlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 125,
    height: 100
  },
});
