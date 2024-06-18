import { Tabs } from "expo-router";
import React from "react";

import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Recent",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "hourglass" : "hourglass-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="allExpenses"
        options={{
          title: "All",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
