import { useMemo } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";

import { useSnippetStore } from "../store/snippetStore";

import SnippetCard from "../components/snippet/SnippetCard";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function FavoritesScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const { snippets } =
    useSnippetStore();

  const favoriteSnippets =
    useMemo(() => {
      return snippets.filter(
        (snippet) =>
          snippet.isFavorite === 1
      );
    }, [snippets]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Favorite Snippets
      </Text>

      <FlatList
        data={favoriteSnippets}
        keyExtractor={(item) =>
          item.id!.toString()
        }
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 40,
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>
              ⭐
            </Text>

            <Text style={styles.emptyTitle}>
              No Favorites Yet
            </Text>

            <Text style={styles.emptyText}>
              Mark important snippets as
              favorites to quickly access
              them later.
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#0F172A",

    padding: 16,
  },

  heading: {
    color: "white",

    fontSize: 30,

    fontWeight: "bold",
  },

  emptyContainer: {
    marginTop: 120,

    alignItems: "center",

    paddingHorizontal: 30,
  },

  emptyEmoji: {
    fontSize: 54,
  },

  emptyTitle: {
    color: "white",

    fontSize: 24,

    fontWeight: "bold",

    marginTop: 18,
  },

  emptyText: {
    color: "#94A3B8",

    textAlign: "center",

    marginTop: 12,

    lineHeight: 24,

    fontSize: 16,
  },
});