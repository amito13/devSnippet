import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { getSnippetById } from "../database/snippetRepository";
import { RootStackParamList } from "../navigation/types";
import {
  exportSnippetAsText,
  shareFile,
} from "../services/exportService";
import { useSnippetStore } from "../store/snippetStore";
import { useAppTheme } from "../theme/AppTheme";
import { Snippet } from "../types/snippet";

type RouteProps = RouteProp<
  RootStackParamList,
  "SnippetDetails"
>;

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function SnippetDetailsScreen() {
  const route = useRoute<RouteProps>();
  const navigation =
    useNavigation<NavigationProp>();
  const { colors } = useAppTheme();

  const { id } = route.params;
  const [snippet, setSnippet] =
    useState<Snippet | null>(null);

  const {
    deleteSnippetById,
    toggleFavorite,
  } = useSnippetStore();

  const loadSnippet = useCallback(async () => {
    const data = await getSnippetById(id);
    setSnippet(data as Snippet);
  }, [id]);

  useEffect(() => {
    loadSnippet();
  }, [loadSnippet]);

  const handleExport = async () => {
    if (!snippet) return;

    const uri =
      await exportSnippetAsText(snippet);

    if (uri) {
      await shareFile(uri);
    }
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
    return (
      <SafeAreaView
        edges={["left", "right"]}
        style={[
          styles.loading,
          {
            backgroundColor: colors.background,
          },
        ]}
      />
    );
  }

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text
          selectable
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
          {snippet.title}
        </Text>

        <View style={styles.metaRow}>
          <Text
            style={[
              styles.language,
              {
                color: colors.accent,
                backgroundColor: colors.accentSoft,
              },
            ]}
          >
            {snippet.language}
          </Text>

          {snippet.isFavorite === 1 && (
            <Text
              style={[
                styles.favoritePill,
                {
                  color: colors.accent,
                  backgroundColor: colors.accentSoft,
                },
              ]}
            >
              Favorite
            </Text>
          )}
        </View>

        {snippet.tags ? (
          <Text
            selectable
            style={[
              styles.tags,
              {
                color: colors.textMuted,
              },
            ]}
          >
            {snippet.tags}
          </Text>
        ) : null}

        <View
          style={[
            styles.codeContainer,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            selectable
            style={[
              styles.code,
              {
                color: colors.text,
              },
            ]}
          >
            {snippet.code}
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.button,
              {
                backgroundColor: colors.accent,
              },
            ]}
            onPress={handleFavorite}
          >
            <Text style={styles.buttonText}>
              {snippet.isFavorite
                ? "Remove Favorite"
                : "Add Favorite"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.button,
              {
                backgroundColor: colors.surfaceMuted,
                borderColor: colors.border,
                borderWidth: 1,
              },
            ]}
            onPress={handleExport}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: colors.text,
                },
              ]}
            >
              Export Snippet
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.button,
              {
                backgroundColor: colors.danger,
              },
            ]}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>
              Delete Snippet
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 38,
  },

  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  language: {
    overflow: "hidden",
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 12,
    fontSize: 13,
    fontWeight: "900",
  },

  favoritePill: {
    overflow: "hidden",
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 12,
    fontSize: 13,
    fontWeight: "900",
  },

  tags: {
    fontSize: 15,
    lineHeight: 22,
  },

  codeContainer: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
  },

  code: {
    fontFamily: "monospace",
    lineHeight: 22,
  },

  buttonGroup: {
    gap: 12,
  },

  button: {
    minHeight: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
});
