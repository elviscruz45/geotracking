// import { Link, Stack, router } from "expo-router";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import Animated, {
  FadeIn,
  FadeOut,
  BounceInRight,
  SlideOutLeft,
  BounceOutLeft,
  SlideInRight,
} from "react-native-reanimated";

const onboardingSteps = [
  {
    icon: "gem",
    title: "Bienvenido a GeoTrack",
    description:
      "Una aplicación para hacer seguimiento a los avances diarios de perforación diamantina.",
  },
  {
    icon: "people-arrows",
    title: "Conecta",
    description: "Learn by building 24 projects with React Native and Expo",
  },
  {
    icon: "book-reader",
    title: "Te quiero <3",
    description: "dar todos los dias",
  },
];

export default function OnboardingScreen({ setOnBoarding }) {
  const [screenIndex, setScreenIndex] = useState(0);

  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const endOnboarding = () => {
    setScreenIndex(0);
    setOnBoarding(true);
  };

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
  );

  return (
    <ImageBackground
      source={
        screenIndex === 0
          ? require("../../../assets/onBoarding/paisaje1.png")
          : screenIndex === 1
          ? require("../../../assets/onBoarding/paisaje2.jpg")
          : require("../../../assets/onBoarding/paisaje3.jpg")
      }
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.page}>
        <StatusBar style="light" />

        <View style={styles.stepIndicatorContainer}>
          {onboardingSteps.map((step, index) => (
            <View
              key={index}
              style={[
                styles.stepIndicator,
                { backgroundColor: index === screenIndex ? "#97022F" : "grey" },
              ]}
            />
          ))}
        </View>

        <GestureDetector gesture={swipes}>
          <View style={styles.pageContent} key={screenIndex}>
            {/* <Animated.View entering={FadeIn} exiting={FadeOut}>
              <FontAwesome5
                style={styles.image}
                name={data.icon}
                size={150}
                color="#CEF202"
              />
            </Animated.View> */}

            <View style={styles.footer}>
              <Animated.Text
                entering={SlideInRight}
                exiting={SlideOutLeft}
                style={styles.title}
              >
                {data.title}
              </Animated.Text>
              <Animated.Text
                entering={SlideInRight.delay(50)}
                exiting={SlideOutLeft}
                style={styles.description}
              >
                {data.description}
              </Animated.Text>

              <View style={styles.buttonsRow}>
                <Text onPress={endOnboarding} style={styles.buttonText}>
                  Salir
                </Text>

                <Pressable onPress={onContinue} style={styles.button}>
                  <Text style={styles.buttonText}>Continuar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </GestureDetector>
      </SafeAreaView>
    </ImageBackground>
  );
}

// #97022F

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    // resizeMode: "cover", // or 'stretch'
    resizeMode: "stretch", // or 'stretch'
  },
  page: {
    // alignItems: 'center',
    justifyContent: "center",
    flex: 1,
  },
  pageContent: {
    padding: 20,
    flex: 1,
  },
  image: {
    alignSelf: "center",
    margin: 20,
    marginTop: 70,
  },
  title: {
    color: "#FDFDFD",
    fontSize: 55,
    fontWeight: "bold",
    fontFamily: "InterBlack",
    letterSpacing: 1.3,
    marginVertical: 10,
  },
  description: {
    color: "white",
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "Inter",
    lineHeight: 28,
  },
  footer: {
    marginTop: "auto",
  },

  buttonsRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#302E38",
    borderRadius: 50,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: "#FDFDFD",
    fontFamily: "InterSemi",
    fontSize: 16,

    padding: 15,
    paddingHorizontal: 25,
  },

  // steps
  stepIndicatorContainer: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 15,
  },
  stepIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: "gray",
    borderRadius: 10,
  },
});
