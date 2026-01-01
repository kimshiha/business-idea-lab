export type Idea = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
};

export type IdeaInsert = Omit<Idea, "id" | "user_id" | "created_at" | "updated_at">;

export type IdeaUpdate = Partial<Pick<Idea, "title" | "content" | "category" | "tags">>;

