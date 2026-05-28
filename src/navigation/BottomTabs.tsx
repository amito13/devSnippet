import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FileManagerScreen from "../screens/FileManagerScreen";
import SettingsScreen from "../screens/SettingsScreen";

import { BottomTabParamList } from "./types";
import TabIcon from "../components/navigation/TabIcon";
import { useAppTheme } from "../theme/AppTheme";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabs() {
  const { colors } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSubtle,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "800",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({
            color,
            focused,
          }) => (
            <TabIcon
              name="home"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({
            color,
            focused,
          }) => (
            <TabIcon
              name="favorites"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Files"
        component={FileManagerScreen}
        options={{
          tabBarIcon: ({
            color,
            focused,
          }) => (
            <TabIcon
              name="files"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({
            color,
            focused,
          }) => (
            <TabIcon
              name="settings"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
