import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import {
  exportSnippetAsText,
  shareFile,
} from "../services/exportService";
import {
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";

import { Snippet } from "../types/snippet";

import { getSnippetById } from "../database/snippetRepository";

import { useSnippetStore } from "../store/snippetStore";

type RouteProps = RouteProp<
  RootStackParamList,
  "SnippetDetails"
>;

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

  export default function SnippetDetailsScreen() {
    const handleExport = async () => {
    if (!snippet) return;

    const uri =
      await exportSnippetAsText(snippet);

    if (uri) {
      await shareFile(uri);
    }
  };
    const route = useRoute<RouteProps>();

    const navigation =
      useNavigation<NavigationProp>();

    const { id } = route.params;

    const [snippet, setSnippet] =
      useState<Snippet | null>(null);

    const {
      deleteSnippetById,
      toggleFavorite,
    } = useSnippetStore();

    useEffect(() => {
      loadSnippet();
    }, []);

    const loadSnippet = async () => {
      const data = await getSnippetById(id);

      setSnippet(data as Snippet);
    };

    const handleDelete = () => {
      Alert.alert(
        "Delete Snippet",
        "Are you sure?",
        [
          {
            text: "Cancel",
          },

          {
            text: "Delete",

            style: "destructive",

            onPress: async () => {
              await deleteSnippetById(id);

              navigation.goBack();
            },
          },
        ]
      );
    };

    const handleFavorite = async () => {
      if (!snippet) return;

      await toggleFavorite(
        snippet.id!,
        snippet.isFavorite || 0
      );

      loadSnippet();
    };

    if (!snippet) {
      return null;
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>
          {snippet.title}
        </Text>

        <Text style={styles.language}>
          {snippet.language}
        </Text>

        <Text style={styles.tags}>
          {snippet.tags}
        </Text>

        <View style={styles.codeContainer}>
          <Text style={styles.code}>
            {snippet.code}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavorite}
        >
          <Text style={styles.buttonText}>
            {snippet.isFavorite
              ? "Remove Favorite"
              : "Add Favorite"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.exportButton}
        onPress={handleExport}
          >
        <Text style={styles.buttonText}>
          Export Snippet
        </Text>
        </TouchableOpacity>  
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>
            Delete Snippet
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  } 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 16,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },

  language: {
    color: "#F97316",
    marginTop: 10,
    fontSize: 18,
  },

  tags: {
    color: "#CBD5E1",
    marginTop: 10,
  },

  codeContainer: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },

  code: {
    color: "white",
    fontFamily: "monospace",
    lineHeight: 22,
  },

  favoriteButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },

  exportButton: {
    backgroundColor: "#10B981",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },

  deleteButton: {
    backgroundColor: "#DC2626",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});