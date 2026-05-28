import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";
import CreateSnippetScreen from "../screens/CreateSnippetScreen";
import SnippetDetailsScreen from "../screens/SnippetDetailsScreen";

import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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