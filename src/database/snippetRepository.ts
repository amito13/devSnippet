import db from "./sqlite";
import { Snippet } from "../types/snippet";

export const createSnippet = async (snippet: Snippet) => {
  try {
    const result = await db.runAsync(
      `
      INSERT INTO snippets
      (title, code, language, tags, isFavorite, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        snippet.title,
        snippet.code,
        snippet.language,
        snippet.tags ?? "",
        snippet.isFavorite ?? 0,
        snippet.createdAt,
        snippet.updatedAt,
      ]
    );

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllSnippets = async () => {
  try {
    const result = await db.getAllAsync(`
      SELECT * FROM snippets
      ORDER BY createdAt DESC
    `);

    return result;
  } catch (error) {
    console.log(error);
  }
};
export const getSnippetById = async (
  id: number
) => {
  try {
    const result = await db.getFirstAsync(
      `
      SELECT * FROM snippets
      WHERE id = ?
      `,
      [id]
    );

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSnippet = async (
  id: number
) => {
  try {
    await db.runAsync(
      `
      DELETE FROM snippets
      WHERE id = ?
      `,
      [id]
    );
  } catch (error) {
    console.log(error);
  }
};

export const toggleFavoriteSnippet = async (
    id: number,
    currentValue: number
  ) => {
    try {
      await db.runAsync(
        `
      UPDATE snippets
      SET isFavorite = ?
      WHERE id = ?
      `,
        [currentValue === 1 ? 0 : 1, id]
      );
    } catch (error) {
      console.log(error);
    }
};