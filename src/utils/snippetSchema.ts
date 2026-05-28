import { z } from "zod";

export const snippetSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  code: z
    .string()
    .min(5, "Code must be at least 5 characters"),

  language: z
    .string()
    .min(1, "Language is required"),

  tags: z.string().optional(),
});

export type SnippetFormData = z.infer<
  typeof snippetSchema
>;