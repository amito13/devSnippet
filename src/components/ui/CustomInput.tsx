import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

import { useAppTheme } from "../../theme/AppTheme";

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  error?: string;
}

export default function CustomInput({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
  error,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: colors.text,
          },
        ]}
      >
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSubtle}
        selectionColor={colors.accent}
        multiline={multiline}
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            color: colors.text,
          },
          multiline && styles.multiline,
        ]}
      />

      {error && (
        <Text
          selectable
          style={[
            styles.error,
            {
              color: colors.danger,
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "800",
  },

  input: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    fontSize: 15,
  },

  multiline: {
    minHeight: 140,
    textAlignVertical: "top",
  },

  error: {
    marginTop: 6,
    fontWeight: "700",
  },
});
