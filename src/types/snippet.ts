export interface Snippet {
  id?: number;
  title: string;
  code: string;
  language: string;
  tags?: string;
  isFavorite?: number;
  createdAt: string;
  updatedAt: string;
}