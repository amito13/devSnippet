import * as FileSystem from "expo-file-system/legacy";

import * as Sharing from "expo-sharing";

import { EXPORTS_DIR } from "./fileService";

import { Snippet } from "../types/snippet";

export const exportSnippetAsText =
  async (snippet: Snippet) => {
    try {
      const fileName = `${snippet.title}.txt`;

      const fileUri =
        EXPORTS_DIR + fileName;

      const content = `
Title: ${snippet.title}

Language: ${snippet.language}

Tags: ${snippet.tags}

Code:
${snippet.code}
`;

      await FileSystem.writeAsStringAsync(
        fileUri,
        content
      );

      return fileUri;
    } catch (error) {
      console.log(error);
    }
  };

export const shareFile = async (
  uri: string
) => {
  const available =
    await Sharing.isAvailableAsync();

  if (!available) {
    return;
  }

  await Sharing.shareAsync(uri);
};