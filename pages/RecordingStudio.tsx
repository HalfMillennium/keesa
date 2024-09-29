import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";

const { width } = Dimensions.get("window");

type RecordingStudioNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Studio"
>;

interface RecordingStudioProps {
  navigation: RecordingStudioNavigationProp;
}

export const RecordingStudio = ({ navigation }: RecordingStudioProps) => {
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* StatusBar */}
      <StatusBar barStyle="light-content" backgroundColor="#222222" />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons name="chevron-back-outline" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.fileName}>new_voice2022.mp3</Text>
          <Ionicons name="share-social-outline" size={24} color="white" />
        </View>

        {/* Recording Info */}
        <View style={styles.recordingInfo}>
          <Text style={styles.time}>0h 00m 40s</Text>
          <TouchableOpacity style={styles.recordButton}>
            <Text style={styles.recordText}>REC</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sampleInfo}>
          <Text style={styles.sampleRate}>84.96 kHz</Text>
          <Text style={styles.bitRate}>32 bit</Text>
        </View>

        {/* Waveform Display */}
        <View style={styles.waveform}>
          <Image
            source={{ uri: "https://www.example.com/waveform.png" }}
            style={styles.waveformImage}
          />
        </View>

        {/* Control Buttons */}
        <View style={styles.controlButtons}>
          <Ionicons name="musical-notes-outline" size={32} color="white" />
          <Ionicons name="camera-outline" size={32} color="white" />
          <Ionicons name="moon-outline" size={32} color="white" />
          <Ionicons name="mic-outline" size={32} color="white" />
        </View>

        {/* Storage Info */}
        <View style={styles.storageInfo}>
          <Text style={styles.storageLabel}>Storage Remaining</Text>
          <Text style={styles.storageAmount}>2.13GB</Text>
          <Ionicons name="help-circle-outline" size={24} color="white" />
        </View>

        {/* Recording Controls */}
        <View style={styles.recordControls}>
          <TouchableOpacity style={styles.stopButton}>
            <Ionicons name="square-outline" size={48} color="white" />
            <Text style={styles.stopLabel}>STOP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.recPauseButton}
            onPress={toggleRecording}
          >
            <Ionicons
              name={isRecording ? "pause" : "mic-outline"}
              size={48}
              color="white"
            />
            <Text style={styles.recPauseLabel}>
              {isRecording ? "PAUSE" : "REC / PAUSE"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#222222",
  },
  container: {
    flex: 1,
    backgroundColor: "#222222",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  fileName: {
    color: "white",
    fontSize: 18,
  },
  recordingInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  time: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  recordButton: {
    backgroundColor: "#5DADE2",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
  },
  recordText: {
    color: "white",
    fontSize: 16,
  },
  sampleInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sampleRate: {
    color: "white",
    fontSize: 16,
  },
  bitRate: {
    color: "white",
    fontSize: 16,
  },
  waveform: {
    height: 100,
    backgroundColor: "#333333",
    marginBottom: 16,
  },
  waveformImage: {
    width: width - 32,
    height: 100,
  },
  controlButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  storageInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  storageLabel: {
    color: "white",
    fontSize: 16,
  },
  storageAmount: {
    color: "white",
    fontSize: 16,
  },
  recordControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stopButton: {
    alignItems: "center",
  },
  stopLabel: {
    color: "white",
    fontSize: 16,
    marginTop: 8,
  },
  recPauseButton: {
    alignItems: "center",
  },
  recPauseLabel: {
    color: "white",
    fontSize: 16,
    marginTop: 8,
  },
});
