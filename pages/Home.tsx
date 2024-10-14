import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Easing,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { RecentJotBox } from "./components";
import { exampleRecentJotContents } from "./example_data/jots";
import { COLORS, WorkSansText } from "./components/common";
import {
  Ionicons,
  AntDesign,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { AnimatedNavButtonGroup } from "./components/AnimatedNavButtonGroup";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import styled from "styled-components/native";

interface NavBoxProps {
  onPress: () => void;
  children: React.ReactNode;
}

const NavBoxRight: React.FC<NavBoxProps> = ({ onPress, children }) => {
  const styles = StyleSheet.create({
    navButtonRight: {
      backgroundColor: COLORS.goldYellow,
      padding: 10,
      alignItems: "center",
      borderRadius: 30,
      borderBottomEndRadius: 0,
      width: "100%",
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
    },
  });

  return (
    <TouchableOpacity style={styles.navButtonRight} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const NavBoxContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const RecentJots = styled.View`
  gap: 20px;
  flex: 1;
`;

const NavBoxLeft: React.FC<NavBoxProps> = ({ onPress, children }) => {
  const styles = StyleSheet.create({
    navButtonLeft: {
      backgroundColor: COLORS.hotPink,
      width: "100%",
      borderRadius: 30,
      borderTopLeftRadius: 0,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 60,
      paddingBottom: 60,
    },
  });

  return (
    <TouchableOpacity style={styles.navButtonLeft} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

interface AnimatedButtonSpec {
  title: string;
  icon: string;
  active: boolean;
  onPress: () => void;
}

const mainNavOptions: AnimatedButtonSpec[] = [
  {
    title: "home",
    icon: "home",
    active: true,
    onPress: () => {},
  },
  {
    title: "shared",
    icon: "link",
    active: false,
    onPress: () => {},
  },
  {
    title: "saved",
    icon: "save",
    active: false,
    onPress: () => {},
  },
];

const allRecentJots = exampleRecentJotContents.map((jot) => {
  return (
    <RecentJotBox
      key={jot.name}
      title={jot.name}
      description={jot.description}
      createdDate={jot.createdDate}
    />
  );
});

interface AnimatedNavBoxProps {
  children: React.ReactNode;
}

const AnimatedNavBox: React.FC<AnimatedNavBoxProps> = ({ children }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 2,
    }).start();
  }, [scaleAnim]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], flex: 1 }}>
      {children}
    </Animated.View>
  );
};

interface HomeProps {
  navigation: any;
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState("home");
  const slideAnim = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const [fontsLoaded] = useFonts({
    WorkSans: require("./assets/fonts/WorkSans.ttf"),
    "WorkSans-Bold": require("./assets/fonts/WorkSans-Bold.ttf")
  });

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  const handleButtonPress = (button: string) => {
    setActiveButton(button);
  };

  const MainTitle: React.FC = () => {
    return (
      <View
        style={{
          borderBottomWidth: 2,
          alignSelf: "flex-start",
          borderColor: COLORS.goldYellow,
          paddingBottom: 3,
        }}
      >
        <View
          style={{
            borderBottomWidth: 2,
            alignSelf: "flex-start",
            borderColor: COLORS.hotPink,
          }}
        >
          <Text style={styles.headerText}>keesa</Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.background,
        flex: 1,
        padding: 20,
        paddingTop: 70,
        paddingBottom: 40,
        width: "100%",
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
        }}
      >
        <MainTitle />
        <View style={{ flexDirection: "row", gap: 20 }}>
          <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons
              color={COLORS.turq}
              size={18}
              name="auto-fix"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons color="white" size={18} name="settings" />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
        <AnimatedNavButtonGroup
          buttonSpecs={mainNavOptions}
          activeButtonName={activeButton}
          setActiveButton={setActiveButton}
        />
      </Animated.View>
      <NavBoxContainer style={{ gap: 20 }}>
        <AnimatedNavBox>
          <NavBoxLeft onPress={() => navigation.navigate("Studio")}>
            <View>
              <View style={{ opacity: 0.3 }}>
                <AntDesign name="plus" />
              </View>
              <Ionicons
                name="mic-outline"
                size={50}
                color={COLORS.navBoxIcon}
              />
            </View>
          </NavBoxLeft>
        </AnimatedNavBox>
        <View style={{ flex: 1 }}>
          <AnimatedNavBox>
            <View style={{ height: "100%" }}>
              <NavBoxRight onPress={() => navigation.navigate("Canvas")}>
                <View>
                  <View style={{ opacity: 0.3 }}>
                    <AntDesign name="plus" />
                  </View>
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={50}
                    color={COLORS.navBoxIcon}
                  />
                </View>
              </NavBoxRight>
            </View>
          </AnimatedNavBox>
        </View>
      </NavBoxContainer>
      <RecentJots>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ height: 40, flex: 1 }}>
            <Text style={styles.mediumHeaderText}>
              Recent jots
            </Text>
            <WorkSansText
              style={{
                fontSize: 12,
                color: COLORS.goldYellow,
                opacity: 0.7,
                width: "100%",
                flex: 1,
              }}
            >
              Hop back into it. Long press to delete or share.
            </WorkSansText>
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
        <ScrollView>{allRecentJots}</ScrollView>
      </RecentJots>
    </View>
  );
};

const styles = StyleSheet.create({ 
  headerText: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.text,
    alignSelf: "flex-start",
    width: "auto",
  },
  mediumHeaderText: {
    fontSize: 18,
    fontFamily: "WorkSans",
    fontWeight: 600,
    color: COLORS.text,
    opacity: 0.9
  }
});
