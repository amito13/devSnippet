import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Snippet } from "../../types/snippet";

interface Props {
  snippet: Snippet;

  onPress: () => void;
}

export default function SnippetCard({
  snippet,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.topRow}>
        <Text style={styles.title}>
          {snippet.title}
        </Text>

        {snippet.isFavorite === 1 && (
          <View style={styles.favoriteBadge}>
            <Text style={styles.favoriteText}>
              ★
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.language}>
        {snippet.language}
      </Text>

      <Text
        numberOfLines={4}
        style={styles.code}
      >
        {snippet.code}
      </Text>

      {snippet.tags ? (
        <View style={styles.tagContainer}>
          {snippet.tags
            .split(",")
            .map((tag, index) => (
              <View
                key={index}
                style={styles.tag}
              >
                <Text
                  style={styles.tagText}
                >
                  #{tag.trim()}
                </Text>
              </View>
            ))}
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E293B",

    padding: 18,

    borderRadius: 18,

    marginBottom: 16,

    borderWidth: 1,

    borderColor: "#334155",
  },

  topRow: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",
  },

  title: {
    color: "white",

    fontSize: 20,

    fontWeight: "bold",

    flex: 1,
  },

  favoriteBadge: {
    backgroundColor: "#F97316",

    width: 28,

    height: 28,

    borderRadius: 999,

    justifyContent: "center",

    alignItems: "center",
  },

  favoriteText: {
    color: "white",

    fontWeight: "bold",
  },

  language: {
    color: "#F97316",

    marginTop: 10,

    fontSize: 15,

    fontWeight: "600",
  },

  code: {
    color: "#CBD5E1",

    marginTop: 14,

    lineHeight: 22,

    fontFamily: "monospace",
  },

  tagContainer: {
    flexDirection: "row",

    flexWrap: "wrap",

    marginTop: 16,

    gap: 8,
  },

  tag: {
    backgroundColor: "#334155",

    paddingVertical: 6,

    paddingHorizontal: 10,

    borderRadius: 999,
  },

  tagText: {
    color: "#E2E8F0",

    fontSize: 12,
  },
});