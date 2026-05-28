import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {TouchableOpacity} from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

import { useSnippetStore } from "../store/snippetStore";

export default function HomeScreen() {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();
  const {
    snippets,
    addSnippet,
    loadSnippets,
  } = useSnippetStore();

  useEffect(() => {
    loadSnippets();
  }, []);

  const handleAddSnippet = async () => {
    await addSnippet({
      title: "React Native Notes",
      code: "console.log('Expo App')",
      language: "JavaScript",
      tags: "react-native,expo",
      isFavorite: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Add Snippet"
        onPress={handleAddSnippet}
      />
      <Button
        title="Go To Create Screen"
        onPress={() =>
          navigation.navigate("CreateSnippet")
        }
    />

      <FlatList
        data={snippets}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        contentContainerStyle={{
          paddingTop: 20,
          gap: 12,
        }}
        renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate(
                  "SnippetDetails",
                  {
                    id: item.id!,
                  }
                )
              }
            >
              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.language}>
                {item.language}
              </Text>

              <Text numberOfLines={2}>
                {item.code}
              </Text>
            </TouchableOpacity>
)}  
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  card: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 12,
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  language: {
    color: "#F97316",
    marginVertical: 6,
  },
});