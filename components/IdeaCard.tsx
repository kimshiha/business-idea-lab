"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteIdea } from "@/app/actions/ideas";
import { EditIdeaDialog } from "./EditIdeaDialog";
import { Trash2, Calendar, Edit } from "lucide-react";
import type { Idea } from "@/types/database";

interface IdeaCardProps {
  idea: Idea;
  onDelete?: () => void;
  onUpdate?: () => void;
}

export function IdeaCard({ idea, onDelete, onUpdate }: IdeaCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    if (!confirm("정말 이 아이디어를 삭제하시겠습니까?")) {
      return;
    }

    const { error } = await deleteIdea(idea.id);
    if (error) {
      alert(`삭제 실패: ${error}`);
    } else {
      onDelete?.();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2">{idea.title}</CardTitle>
              {idea.category && (
                <span className="inline-block px-2 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 rounded-md text-zinc-700 dark:text-zinc-300">
                  {idea.category}
                </span>
              )}
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      <CardContent>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4 whitespace-pre-wrap">
          {idea.content}
        </p>

        {idea.tags && idea.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {idea.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded-md text-zinc-600 dark:text-zinc-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(idea.created_at)}</span>
        </div>
      </CardContent>
    </Card>

    {isEditing && (
      <EditIdeaDialog
        idea={idea}
        onClose={() => setIsEditing(false)}
        onSuccess={() => {
          setIsEditing(false);
          onUpdate?.();
        }}
      />
    )}
    </>
  );
}

