import { Tabs } from "expo-router";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
// Icons
import { MaterialCommunityIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

const TabIcon = ({ icon, title, focused }: any) => {
  return (
    <View style={styles.container}>
      {icon}
      <Text
        style={{
          color: focused ? colors.black : colors.grey,
          fontSize: 12,
          fontFamily: "Poppins-SemiBold",
        }}
      >
        {title}
      </Text>
    </View>
  );
};


export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          height: 80,
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Home" icon={<Entypo name="home" size={28} color={focused ? colors.black : colors.grey} />} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Settings" icon={<Ionicons name="settings-sharp" size={28} color={focused ? colors.black : colors.grey} />} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 60,
    marginTop: 40,
    marginBottom: 20,
  },
});