"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateIdea } from "@/app/actions/ideas";
import type { Idea, IdeaUpdate } from "@/types/database";

interface EditIdeaDialogProps {
  idea: Idea;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditIdeaDialog({ idea, onClose, onSuccess }: EditIdeaDialogProps) {
  const [formData, setFormData] = useState<IdeaUpdate>({
    title: idea.title,
    content: idea.content,
    category: idea.category || null,
    tags: idea.tags || null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await updateIdea(idea.id, formData);
      if (error) {
        const errorMessage = typeof error === 'string' ? error : error.message || '아이디어 수정에 실패했습니다.';
        throw new Error(errorMessage);
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "아이디어 수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleTagsChange = (value: string) => {
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    setFormData({ ...formData, tags: tags.length > 0 ? tags : null });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white dark:bg-zinc-900 p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-zinc-50">
          아이디어 수정
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">제목</label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">내용</label>
            <Textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
              disabled={loading}
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">카테고리 (선택사항)</label>
            <Input
              type="text"
              value={formData.category || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value || null,
                })
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">태그 (선택사항)</label>
            <Input
              type="text"
              placeholder="쉼표로 구분하여 입력"
              value={formData.tags?.join(", ") || ""}
              onChange={(e) => handleTagsChange(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              취소
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "저장 중..." : "저장"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

