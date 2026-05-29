import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAppTheme } from "../../theme/AppTheme";

export default function ThemeSwitch() {
  const {
    colors,
    isDark,
    toggleMode,
  } = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Toggle light and dark theme"
      onPress={toggleMode}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.78 : 1,
        },
      ]}
    >
      <View
        style={[
          styles.emojiBubble,
          {
            backgroundColor: colors.accentSoft,
          },
        ]}
      >
        <Text style={styles.emoji}>
          {isDark ? "🌙" : "☀️"}
        </Text>
      </View>

      {/* <Text
        style={[
          styles.label,
          {
            color: colors.text,
          },
        ]}
      >
        {isDark ? "Dark" : "Light"}
      </Text> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 1,
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 7,
    paddingLeft: 8,
    paddingRight: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  emojiBubble: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  emoji: {
    fontSize: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "900",
  },
});
