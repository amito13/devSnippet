import {
  useEffect,
  useState,
} from "react";

import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  deleteFile,
  getExportedFiles,
} from "../services/fileService";
import { useAppTheme } from "../theme/AppTheme";

export default function FileManagerScreen() {
  const [files, setFiles] = useState<string[]>([]);
  const { colors } = useAppTheme();

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    const result =
      await getExportedFiles();

    setFiles(result);
  };

  const handleDelete = (
    fileName: string
  ) => {
    Alert.alert(
      "Delete File",
      `Delete ${fileName}?`,
      [
        {
          text: "Cancel",
        },

        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteFile(fileName);
            loadFiles();
          },
        },
      ]
    );
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
        data={files}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text
              selectable
              style={[
                styles.heading,
                {
                  color: colors.text,
                },
              ]}
            >
              Exported Files
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
              Manage the text exports you have created
              from snippets.
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
                styles.empty,
                {
                  color: colors.textMuted,
                },
              ]}
            >
              No exported files yet
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.fileInfo}>
              <Text
                numberOfLines={1}
                style={[
                  styles.fileName,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {item}
              </Text>

              <Text
                style={[
                  styles.fileType,
                  {
                    color: colors.textMuted,
                  },
                ]}
              >
                Text File
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.deleteButton,
                {
                  backgroundColor: colors.accentSoft,
                },
              ]}
              onPress={() =>
                handleDelete(item)
              }
            >
              <Text
                style={[
                  styles.deleteText,
                  {
                    color: colors.accent,
                  },
                ]}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 40,
  },

  header: {
    marginBottom: 20,
    gap: 8,
  },

  heading: {
    fontSize: 32,
    fontWeight: "900",
  },

  subheading: {
    fontSize: 15,
    lineHeight: 22,
  },

  emptyCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 22,
  },

  empty: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },

  card: {
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },

  fileInfo: {
    flex: 1,
  },

  fileName: {
    fontSize: 16,
    fontWeight: "900",
  },

  fileType: {
    marginTop: 6,
    fontWeight: "700",
  },

  deleteButton: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  deleteText: {
    fontWeight: "900",
  },
});
