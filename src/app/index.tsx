import { useEffect } from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigator from "../navigation/RootNavigator";

import { initializeDatabase } from "../database/sqlite";
import { initializeFileSystem   } from "../services/fileService";
import { AppThemeProvider } from "../theme/AppTheme";

export default function App() {
  useEffect(() => {
    initializeDatabase();
    initializeFileSystem();
  }, []);

  return (
    <GestureHandlerRootView  
      style={{ flex: 1 }}
    >
      <SafeAreaProvider>
        <AppThemeProvider>
          <RootNavigator />
        </AppThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
