import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useAppTheme } from "../../theme/AppTheme";
import { Snippet } from "../../types/snippet";

interface Props {
  snippet: Snippet;
  onPress: () => void;
}

export default function SnippetCard({
  snippet,
  onPress,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
      activeOpacity={0.84}
      onPress={onPress}
    >
      <View style={styles.topRow}>
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
          {snippet.title}
        </Text>

        {snippet.isFavorite === 1 && (
          <View
            style={[
              styles.favoriteBadge,
              {
                backgroundColor: colors.accentSoft,
              },
            ]}
          >
            <Text
              style={[
                styles.favoriteText,
                {
                  color: colors.accent,
                },
              ]}
            >
              Fav
            </Text>
          </View>
        )}
      </View>

      <Text
        style={[
          styles.language,
          {
            color: colors.accent,
          },
        ]}
      >
        {snippet.language}
      </Text>

      <Text
        numberOfLines={4}
        style={[
          styles.code,
          {
            backgroundColor: colors.background,
            color: colors.textMuted,
          },
        ]}
      >
        {snippet.code}
      </Text>

      {snippet.tags ? (
        <View style={styles.tagContainer}>
          {snippet.tags
            .split(",")
            .map((tag, index) => (
              <View
                key={`${tag}-${index}`}
                style={[
                  styles.tag,
                  {
                    backgroundColor:
                      colors.accentSoft,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tagText,
                    {
                      color: colors.accent,
                    },
                  ]}
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
    padding: 18,
    borderRadius: 18,
    marginBottom: 16,
    borderWidth: 1,
    gap: 12,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },

  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "900",
  },

  favoriteBadge: {
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  favoriteText: {
    fontSize: 11,
    fontWeight: "900",
  },

  language: {
    fontSize: 15,
    fontWeight: "800",
  },

  code: {
    borderRadius: 14,
    padding: 14,
    lineHeight: 22,
    fontFamily: "monospace",
  },

  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },

  tagText: {
    fontSize: 12,
    fontWeight: "800",
  },
});
