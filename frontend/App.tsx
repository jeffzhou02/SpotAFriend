import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useState, useMemo } from "react";
import { LogBox } from 'react-native';

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { UserContext } from "./components/UserContext";

LogBox.ignoreAllLogs(); // ignore all log warnings

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [user, setUser] = useState("");
  const userValue = useMemo(() => ({user, setUser}), [user, setUser]);
  
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <UserContext.Provider value={userValue}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </UserContext.Provider>
      </SafeAreaProvider>
    );
  }
}
