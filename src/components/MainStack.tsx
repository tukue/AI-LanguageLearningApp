import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { LoginScreen } from "./screens/LoginScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { LessonScreen } from "./screens/LessonScreen";
import { useAuthStore } from "../store/authStore";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BaseNavigationContainer>
      <StackNavigator.Navigator
        initialRouteName={isAuthenticated ? "Home" : "Login"}
        screenOptions={{
          headerShown: true,
        }}
      >
        <StackNavigator.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <StackNavigator.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Language Learning" }}
        />
        <StackNavigator.Screen
          name="Lesson"
          component={LessonScreen}
          options={{ title: "Lesson" }}
        />
      </StackNavigator.Navigator>
    </BaseNavigationContainer>
  );
};