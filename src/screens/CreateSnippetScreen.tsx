import { Controller, useForm } from "react-hook-form";

import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { zodResolver } from "@hookform/resolvers/zod";

import CustomInput from "../components/ui/CustomInput";

import {
  snippetSchema,
  SnippetFormData,
} from "../utils/snippetSchema";

import { useSnippetStore } from "../store/snippetStore";
import { useAppTheme } from "../theme/AppTheme";

export default function CreateSnippetScreen() {
  const { addSnippet } = useSnippetStore();
  const { colors } = useAppTheme();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SnippetFormData>({
    resolver: zodResolver(snippetSchema),

    defaultValues: {
      title: "",
      code: "",
      language: "",
      tags: "",
    },
  });

  const onSubmit = async (
    data: SnippetFormData
  ) => {
    await addSnippet({
      ...data,

      isFavorite: 0,

      createdAt: new Date().toISOString(),

      updatedAt: new Date().toISOString(),
    });

    Alert.alert(
      "Success",
      "Snippet created successfully"
    );

    reset();
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
      edges={["left", "right"]}
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={
          process.env.EXPO_OS === "ios"
            ? "padding"
            : "height"
        }
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 40,
            gap: 4,
          }}
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
            Create Snippet
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
            Capture code, context, and tags while the
            thought is fresh.
          </Text>

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <CustomInput
                label="Title"
                value={value}
                onChangeText={onChange}
                placeholder="Enter title"
                error={errors.title?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="language"
            render={({ field: { onChange, value } }) => (
              <CustomInput
                label="Language"
                value={value}
                onChangeText={onChange}
                placeholder="JavaScript"
                error={errors.language?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, value } }) => (
              <CustomInput
                label="Tags"
                value={value || ""}
                onChangeText={onChange}
                placeholder="react-native,expo"
                error={errors.tags?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, value } }) => (
              <CustomInput
                label="Code"
                value={value}
                onChangeText={onChange}
                placeholder="Write your code..."
                multiline
                error={errors.code?.message}
              />
            )}
          />

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: colors.accent,
              },
            ]}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>
              Save Snippet
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  keyboardView: {
    flex: 1,
  },

  heading: {
    fontSize: 28,
    fontWeight: "900",
  },

  subheading: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },

  button: {
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
