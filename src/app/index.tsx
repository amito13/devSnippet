import { useEffect } from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import RootNavigator from "../navigation/RootNavigator";

import { initializeDatabase } from "../database/sqlite";
import { initializeFileSystem   } from "../services/fileService";

export default function App() {
  useEffect(() => {
    initializeDatabase();
    initializeFileSystem();
  }, []);

  return (
    <GestureHandlerRootView  
      style={{ flex: 1 }}
    >
      <RootNavigator />
    </GestureHandlerRootView>
  );
}