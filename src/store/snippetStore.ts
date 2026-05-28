import { create } from "zustand";

import { Snippet } from "../types/snippet";

import {
  createSnippet,
  getAllSnippets,
  deleteSnippet,
  toggleFavoriteSnippet,
} from "../database/snippetRepository";

interface SnippetStore {
  snippets: Snippet[];

  loadSnippets: () => Promise<void>;

  addSnippet: (snippet: Snippet) => Promise<void>;

  deleteSnippetById: (
    id: number
  ) => Promise<void>;

  toggleFavorite: (
    id: number,
    currentValue: number
  ) => Promise<void>;
}

export const useSnippetStore =
  create<SnippetStore>((set, get) => ({
    snippets: [],

    loadSnippets: async () => {
      const snippets =
        await getAllSnippets();

      set({
        snippets:
          (snippets as Snippet[]) || [],
      });
    },

    addSnippet: async (snippet) => {
      await createSnippet(snippet);

      await get().loadSnippets();
    },

    deleteSnippetById: async (id) => {
      await deleteSnippet(id);

      await get().loadSnippets();
    },

    toggleFavorite: async (
      id,
      currentValue
    ) => {
      await toggleFavoriteSnippet(
        id,
        currentValue
      );

      await get().loadSnippets();
    },
  }));