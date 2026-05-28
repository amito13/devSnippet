import {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  getExportedFiles,
  deleteFile,
} from "../services/fileService";

export default function FileManagerScreen() {
  const [files, setFiles] = useState<
    string[]
  >([]);

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
            await deleteFile(
              fileName
            );

            loadFiles();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Exported Files
      </Text>

      <FlatList
        data={files}
        keyExtractor={(item) => item}
        contentContainerStyle={{
          paddingTop: 20,
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No exported files
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.fileName}>
                {item}
              </Text>

              <Text style={styles.fileType}>
                Text File
              </Text>
            </View>

            <TouchableOpacity
              style={
                styles.deleteButton
              }
              onPress={() =>
                handleDelete(item)
              }
            >
              <Text
                style={
                  styles.deleteText
                }
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
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
  },

  empty: {
    color: "#94A3B8",
    marginTop: 40,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,

    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  fileName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  fileType: {
    color: "#94A3B8",
    marginTop: 6,
  },

  deleteButton: {
    backgroundColor: "#DC2626",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});