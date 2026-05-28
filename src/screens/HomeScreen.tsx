import { useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemeSwitch from "../components/ui/ThemeSwitch";
import { RootStackParamList } from "../navigation/types";
import { useSnippetStore } from "../store/snippetStore";
import { useAppTheme } from "../theme/AppTheme";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const {
    snippets,
    addSnippet,
    loadSnippets,
  } = useSnippetStore();

  const {
    colors,
  } = useAppTheme();

  useEffect(() => {
    loadSnippets();
  }, [loadSnippets]);

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
        data={snippets}
        keyExtractor={(item) =>
          item.id?.toString() ||
          `${item.title}-${item.createdAt}`
        }
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.heroRow}>
              <View style={styles.heroText}>
                <Text
                  selectable
                  style={[
                    styles.eyebrow,
                    {
                      color: colors.accent,
                    },
                  ]}
                >
                  DEV NOTES
                </Text>

                <Text
                  selectable
                  style={[
                    styles.title,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  Ship ideas before they cool down.
                </Text>

                <Text
                  selectable
                  style={[
                    styles.subtitle,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  Save snippets, tag patterns, and keep
                  your sharpest dev thoughts close.
                </Text>
              </View>

              <ThemeSwitch />
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.primaryButton,
                  {
                    backgroundColor: colors.accent,
                  },
                ]}
                onPress={() =>
                  navigation.navigate("CreateSnippet")
                }
              >
                <Text style={styles.primaryButtonText}>
                  New Snippet
                </Text>
              </TouchableOpacity>
{/* 
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.secondaryButton,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                  },
                ]}
                onPress={handleAddSnippet}
              >
                <Text
                  style={[
                    styles.secondaryButtonText,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  Quick Add
                </Text>
              </TouchableOpacity> */}
            </View>

            <View
              style={[
                styles.statsCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <View>
                <Text
                  style={[
                    styles.statNumber,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  {snippets.length}
                </Text>

                <Text
                  style={[
                    styles.statLabel,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  total snippets
                </Text>
              </View>

              <View
                style={[
                  styles.statDivider,
                  {
                    backgroundColor: colors.border,
                  },
                ]}
              />

              <View>
                <Text
                  style={[
                    styles.statNumber,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  {
                    snippets.filter(
                      (snippet) =>
                        snippet.isFavorite === 1
                    ).length
                  }
                </Text>

                <Text
                  style={[
                    styles.statLabel,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  favorites
                </Text>
              </View>
            </View>

            <Text
              selectable
              style={[
                styles.sectionTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              Recent notes
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View
            style={[
              styles.emptyCard,
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
              Nothing saved yet
            </Text>

            <Text
              style={[
                styles.emptyText,
                {
                  color: colors.textMuted,
                },
              ]}
            >
              Create your first snippet or use quick add
              to see the dashboard fill up.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.86}
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            onPress={() =>
              navigation.navigate("SnippetDetails", {
                id: item.id!,
              })
            }
          >
            <View style={styles.cardHeader}>
              <Text
                numberOfLines={1}
                style={[
                  styles.cardTitle,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {item.title}
              </Text>

              {item.isFavorite === 1 && (
                <View
                  style={[
                    styles.favoriteBadge,
                    {
                      backgroundColor:
                        colors.accentSoft,
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
              {item.language}
            </Text>

            <View
              style={[
                styles.codeBlock,
                {
                  backgroundColor:
                    colors.background,
                },
              ]}
            >
              <Text
                numberOfLines={3}
                style={[
                  styles.code,
                  {
                    color: colors.textMuted,
                  },
                ]}
              >
                {item.code}
              </Text>
            </View>
          </TouchableOpacity>
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
    paddingBottom: 32,
    gap: 14,
  },

  header: {
    gap: 18,
  },

  heroRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },

  heroText: {
    flex: 1,
    gap: 8,
  },

  eyebrow: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 38,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },

  actionRow: {
    flexDirection: "row",
    gap: 12,
  },

  primaryButton: {
    flex: 1,
    minHeight: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },

  secondaryButton: {
    flex: 1,
    minHeight: 50,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "800",
  },

  statsCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  statNumber: {
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    fontVariant: ["tabular-nums"],
  },

  statLabel: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
  },

  statDivider: {
    width: 1,
    height: 40,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
  },

  emptyCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 22,
    gap: 8,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "900",
  },

  emptyText: {
    fontSize: 15,
    lineHeight: 22,
  },

  card: {
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    gap: 12,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  cardTitle: {
    flex: 1,
    fontSize: 19,
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
    fontSize: 14,
    fontWeight: "800",
  },

  codeBlock: {
    borderRadius: 14,
    padding: 14,
  },

  code: {
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 20,
  },
});
