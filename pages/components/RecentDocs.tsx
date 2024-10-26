import React from "react";
import { exampleRecentDocContents } from "../testing/example_recent_docs";
import { RecentJotBox } from "./RecentDocBox";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { DocDetails } from "../testing/example_recent_docs";
import { COLORS } from "./common";

interface RecentDocsProps {
  allRecentDocs: DocDetails[];
}


export const RecentDocs: React.FC<RecentDocsProps> = ({allRecentDocs}) => { 
  const docItems = allRecentDocs.map((doc) => {
    return (
      <RecentJotBox
        key={doc.name}
        title={doc.name}
        description={doc.description}
        createdDate={doc.createdDate}
      />
    );
  });

  return (
    <View style={{gap: 20, flex: 1}}>
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <View style={{ height: 40, flex: 1 }}>
        <Text style={styles.mediumHeaderText}>Recent jots</Text>
        <Text
          style={{
            fontFamily: "Work Sans",
            fontSize: 12,
            color: COLORS.goldYellow,
            opacity: 0.7,
            width: "100%",
            flex: 1,
          }}
        >
          Hop back into it. Long press to delete or share.
        </Text>
      </View>
      <Feather
        name="more-horizontal"
        size={24}
        color={COLORS.text}
        style={{
          opacity: 0.2,
        }}
      />
    </View>
    <ScrollView>{docItems}</ScrollView>
  </View>
  )  
};

const styles = StyleSheet.create({
  mediumHeaderText: {
    fontSize: 18,
    fontFamily: "WorkSans",
    fontWeight: 600,
    color: COLORS.text,
    opacity: 0.9,
  },
});
