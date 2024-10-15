import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { STROKE_WIDTHS, StrokeTypes } from "./stroke";

export const StrokeWidthOptions: React.FC<{
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
}> = ({ strokeWidth, setStrokeWidth }) => {
  return (
    <View style={{gap: 20}}>
    <View style={{ flexDirection: "row", gap: 20 }}>
      <TouchableOpacity
        style={[
          styles.strokeOptionButton,
          {
            borderColor:
              strokeWidth === STROKE_WIDTHS[StrokeTypes.THIN]
                ? "white"
                : "#ffffff50",
          },
        ]}
        onPress={() => {
          setStrokeWidth(STROKE_WIDTHS[StrokeTypes.THIN]);
        }}
      >
        <Text style={{ color: "white", fontSize: 14, textAlign: "center" }}>
          Thin
        </Text>
        <Text
          style={{
            color: "#ffffff50",
            fontSize: 12,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >{`${STROKE_WIDTHS[StrokeTypes.THIN]}px`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.strokeOptionButton,
          {
            borderColor:
              strokeWidth === STROKE_WIDTHS[StrokeTypes.MEDIUM]
                ? "white"
                : "#ffffff50",
          },
        ]}
        onPress={() => {
          setStrokeWidth(STROKE_WIDTHS[StrokeTypes.MEDIUM]);
        }}
      >
        <Text style={{ color: "white", fontSize: 14, textAlign: "center" }}>
          Medium
        </Text>
        <Text
          style={{
            color: "#ffffff50",
            fontSize: 12,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >{`${STROKE_WIDTHS[StrokeTypes.MEDIUM]}px`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.strokeOptionButton,
          {
            borderColor:
              strokeWidth === STROKE_WIDTHS[StrokeTypes.HEAVY]
                ? "white"
                : "#ffffff50",
          },
        ]}
        onPress={() => {
          setStrokeWidth(STROKE_WIDTHS[StrokeTypes.HEAVY]);
        }}
      >
        <Text style={{ color: "white", fontSize: 14, textAlign: "center" }}>
          Heavy
        </Text>
        <Text
          style={{
            color: "#ffffff50",
            fontSize: 12,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >{`${STROKE_WIDTHS[StrokeTypes.HEAVY]}px`}</Text>
      </TouchableOpacity>
    </View>
    <View style={{ flexDirection: "row", gap: 20 }}>
      <TouchableOpacity
        style={[
          styles.strokeOptionButton,
          {
            borderColor:
              strokeWidth === STROKE_WIDTHS[StrokeTypes.THIN]
                ? "white"
                : "#ffffff50",
          },
        ]}
        onPress={() => {
          setStrokeWidth(STROKE_WIDTHS[StrokeTypes.THIN]);
        }}
      >
        <Text style={{ color: "white", fontSize: 14, textAlign: "center" }}>
          Extra Heavy
        </Text>
        <Text
          style={{
            color: "#ffffff50",
            fontSize: 12,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >{`${STROKE_WIDTHS[StrokeTypes.EXTRA_HEAVY]}px`}</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  strokeOptionButton: {
    width: 75,
    height: 75,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
