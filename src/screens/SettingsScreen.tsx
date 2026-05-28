import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSnippetStore } from "../store/snippetStore";
import { useAppTheme } from "../theme/AppTheme";

export default function SettingsScreen() {
  const { colors } = useAppTheme();
  const { snippets } = useSnippetStore();

  const favoritesCount =
    snippets.filter(
      (snippet) => snippet.isFavorite === 1
    ).length;

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
      <ScrollView
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text
          selectable
          style={[
            styles.heading,
            {
              color: colors.text,
            },
          ]}
        >
          Profile
        </Text>

        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: colors.accentSoft,
                borderColor: colors.accent,
              },
            ]}
          >
            <Text
              style={[
                styles.avatarText,
                {
                  color: colors.accent,
                },
              ]}
            >
              DN
            </Text>
          </View>

          <View style={styles.profileCopy}>
            <Text
              selectable
              style={[
                styles.name,
                {
                  color: colors.text,
                },
              ]}
            >
              Dev Notes User
            </Text>

            <Text
              selectable
              style={[
                styles.role,
                {
                  color: colors.textMuted,
                },
              ]}
            >
              Snippet collector
            </Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
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
              Snippets
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.statNumber,
                {
                  color: colors.text,
                },
              ]}
            >
              {favoritesCount}
            </Text>

            <Text
              style={[
                styles.statLabel,
                {
                  color: colors.textMuted,
                },
              ]}
            >
              Favorites
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.infoPanel,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.infoTitle,
              {
                color: colors.text,
              },
            ]}
          >
            Workspace
          </Text>

          <Text
            selectable
            style={[
              styles.infoText,
              {
                color: colors.textMuted,
              },
            ]}
          >
            Dev Notes keeps your code ideas, exports,
            and favorites organized in one local-first
            workspace.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },

  heading: {
    fontSize: 32,
    fontWeight: "900",
  },

  profileCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "900",
  },

  profileCopy: {
    flex: 1,
    gap: 4,
  },

  name: {
    fontSize: 21,
    fontWeight: "900",
  },

  role: {
    fontSize: 15,
    fontWeight: "700",
  },

  statsGrid: {
    flexDirection: "row",
    gap: 12,
  },

  statCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 4,
  },

  statNumber: {
    fontSize: 28,
    fontWeight: "900",
    fontVariant: ["tabular-nums"],
  },

  statLabel: {
    fontSize: 13,
    fontWeight: "800",
  },

  infoPanel: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    gap: 8,
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "900",
  },

  infoText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
