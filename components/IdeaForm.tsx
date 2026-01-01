"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createIdea } from "@/app/actions/ideas";
import type { IdeaInsert } from "@/types/database";

export function IdeaForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<IdeaInsert>({
    title: "",
    content: "",
    category: null,
    tags: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data, error } = await createIdea(formData);
      
      if (error) {
        console.error("아이디어 저장 오류:", error);
        setError(error);
        return;
      }

      if (!data) {
        setError("아이디어가 저장되었지만 데이터를 불러오지 못했습니다.");
        return;
      }

      setSuccess(true);
      setFormData({
        title: "",
        content: "",
        category: null,
        tags: null,
      });

      // 페이지 새로고침하여 대시보드 업데이트
      router.refresh();

      // 2초 후 성공 메시지 제거
      setTimeout(() => setSuccess(false), 2000);
    } catch (err: any) {
      console.error("아이디어 저장 예외:", err);
      setError(err.message || "아이디어 저장에 실패했습니다.");
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
    <Card>
      <CardHeader>
        <CardTitle>새 아이디어 추가</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-3 text-sm text-green-600 dark:text-green-400">
              아이디어가 성공적으로 저장되었습니다!
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">제목</label>
            <Input
              type="text"
              placeholder="아이디어 제목을 입력하세요"
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
              placeholder="아이디어에 대한 자세한 설명을 입력하세요"
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
              placeholder="예: 기술, 서비스, 제품 등"
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
              placeholder="쉼표로 구분하여 입력 (예: AI, 스타트업, B2B)"
              value={formData.tags?.join(", ") || ""}
              onChange={(e) => handleTagsChange(e.target.value)}
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">
              여러 태그는 쉼표로 구분하세요
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "저장 중..." : "아이디어 저장"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

