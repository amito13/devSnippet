import { useMemo } from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import SnippetCard from "../components/snippet/SnippetCard";
import { RootStackParamList } from "../navigation/types";
import { useSnippetStore } from "../store/snippetStore";
import { useAppTheme } from "../theme/AppTheme";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function FavoritesScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const { snippets } =
    useSnippetStore();

  const { colors } = useAppTheme();

  const favoriteSnippets =
    useMemo(() => {
      return snippets.filter(
        (snippet) =>
          snippet.isFavorite === 1
      );
    }, [snippets]);

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <FlatList
        data={favoriteSnippets}
        keyExtractor={(item) =>
          item.id!.toString()
        }
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text
              selectable
              style={[
                styles.heading,
                {
                  color: colors.text,
                },
              ]}
            >
              Favorites
            </Text>

            <Text
              selectable
              style={[
                styles.subheading,
                {
                  color: colors.textMuted,
                },
              ]}
            >
              Your high-signal snippets, saved for
              fast recall.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View
            style={[
              styles.emptyContainer,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.emptyTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              No favorites yet
            </Text>

            <Text
              style={[
                styles.emptyText,
                {
                  color: colors.textMuted,
                },
              ]}
            >
              Mark important snippets as favorites and
              they will collect here.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <SnippetCard
            snippet={item}
            onPress={() =>
              navigation.navigate(
                "SnippetDetails",
                {
                  id: item.id!,
                }
              )
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listContent: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 20,
    gap: 8,
  },

  heading: {
    fontSize: 32,
    fontWeight: "900",
  },

  subheading: {
    fontSize: 15,
    lineHeight: 22,
  },

  emptyContainer: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 24,
    gap: 10,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "900",
  },

  emptyText: {
    lineHeight: 24,
    fontSize: 16,
  },
});
