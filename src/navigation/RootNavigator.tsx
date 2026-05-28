import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";
import CreateSnippetScreen from "../screens/CreateSnippetScreen";
import SnippetDetailsScreen from "../screens/SnippetDetailsScreen";

import { RootStackParamList } from "./types";
import { useAppTheme } from "../theme/AppTheme";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { colors, navigationTheme } =
    useAppTheme();

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: "800",
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CreateSnippet"
          component={CreateSnippetScreen}
          options={{
            title: "Create Snippet",
          }}
        />

        <Stack.Screen
          name="SnippetDetails"
          component={SnippetDetailsScreen}
          options={{
            title: "Snippet Details",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
