import * as FileSystem from "expo-file-system/legacy";

const BASE_DIR =
  FileSystem.documentDirectory + "devvault/";

const EXPORTS_DIR =
  BASE_DIR + "exports/";

const ATTACHMENTS_DIR =
  BASE_DIR + "attachments/";

export const initializeFileSystem = async () => {
    const dirs = [
      BASE_DIR,
      EXPORTS_DIR,
      ATTACHMENTS_DIR,
    ];

    for (const dir of dirs) {
      const info =
        await FileSystem.getInfoAsync(dir);

      if (!info.exists) {
        await FileSystem.makeDirectoryAsync(
          dir,
          {
            intermediates: true,
          }
        );
      }
    }

    console.log(
      "File system initialized"
    );
};

export {
  BASE_DIR,
  EXPORTS_DIR,
  ATTACHMENTS_DIR,
};

export const getExportedFiles = async () => {
    try {
      const files =
        await FileSystem.readDirectoryAsync(
          EXPORTS_DIR
        );

      return files;
    } catch (error) {
      console.log(error);

      return [];
    }
  };

export const deleteFile = async (
  fileName: string
) => {
  try {
    const fileUri =
      EXPORTS_DIR + fileName;

    await FileSystem.deleteAsync(
      fileUri
    );
  } catch (error) {
    console.log(error);
  }
};