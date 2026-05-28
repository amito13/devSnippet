import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

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
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#64748B"
        multiline={multiline}
        style={[
          styles.input,
          multiline && styles.multiline,
        ]}
      />

      {error && (
        <Text style={styles.error}>
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
    color: "white",
    marginBottom: 8,
    fontSize: 16,
  },

  input: {
    backgroundColor: "#1E293B",
    color: "white",
    padding: 14,
    borderRadius: 12,
  },

  multiline: {
    minHeight: 140,
    textAlignVertical: "top",
  },

  error: {
    color: "#EF4444",
    marginTop: 6,
  },
});