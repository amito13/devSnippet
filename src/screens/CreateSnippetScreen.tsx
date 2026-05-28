import { Controller, useForm } from "react-hook-form";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";

import CustomInput from "../components/ui/CustomInput";

import {
  snippetSchema,
  SnippetFormData,
} from "../utils/snippetSchema";

import { useSnippetStore } from "../store/snippetStore";

export default function CreateSnippetScreen() {
  const { addSnippet } = useSnippetStore();

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      <Text style={styles.heading}>
        Create Snippet
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
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>
          Save Snippet
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },

  button: {
    backgroundColor: "#F97316",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});