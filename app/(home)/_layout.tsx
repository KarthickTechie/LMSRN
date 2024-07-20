import { View, Text, Image, Alert } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomDrawer from "@/components/CustomDrawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeLayout = () => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawer}
        initialRouteName="home"
        screenOptions={{
          drawerLabelStyle: { marginLeft: -20 },
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: { display: "none" },
          headerStyle: {
            backgroundColor: "white",
            height: top + 50,
          },
        }}
      >
        <Drawer.Screen
          name="home" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="scheduler" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Scheduler",
            title: "Scheduler",
            drawerIcon: ({ size, color }) => (
              <Ionicons
                name="calendar-number-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="visitreport" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Client Visit",
            title: "Client Visit",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="map-outline" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="attendance" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Attendance",
            title: "Attendance",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="enter-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="reports" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Reports",
            title: "Reports",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="analytics" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="auditlogs" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "AuditLogs",
            title: "AuditLogs",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="clipboard-outline" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="(leadtabs)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "New Lead",
            title: "New Lead",
            drawerIcon: ({ size, color }) => (
              <MaterialIcons
                name="create-new-folder"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default HomeLayout;
