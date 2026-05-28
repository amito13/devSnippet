import {
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

import { useAppTheme } from "../../theme/AppTheme";

export default function ThemeSwitch() {
  const {
    colors,
    isEmber,
    toggleMode,
  } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <View>
        <Text
          style={[
            styles.label,
            {
              color: colors.text,
            },
          ]}
        >
          {isEmber ? "Ember" : "Zinc"}
        </Text>

        <Text
          style={[
            styles.caption,
            {
              color: colors.textMuted,
            },
          ]}
        >
          Theme
        </Text>
      </View>

      <Switch
        value={isEmber}
        onValueChange={toggleMode}
        trackColor={{
          false: colors.surfaceSoft,
          true: colors.accentSoft,
        }}
        thumbColor={
          isEmber
            ? colors.accent
            : colors.textMuted
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 132,
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 18,
    paddingLeft: 14,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: "900",
  },

  caption: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
  },
});
