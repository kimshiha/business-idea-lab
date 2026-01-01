"use client";

import { useState, useEffect } from "react";
import { IdeaCard } from "./IdeaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getIdeas } from "@/app/actions/ideas";
import { analyzeIdeas } from "@/app/actions/ai";
import { Sparkles, Search, Loader2 } from "lucide-react";
import type { Idea } from "@/types/database";

export function IdeasDashboard() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  useEffect(() => {
    loadIdeas();
  }, []);

  useEffect(() => {
    filterIdeas();
  }, [ideas, searchQuery, categoryFilter]);

  const loadIdeas = async () => {
    setLoading(true);
    const { data, error } = await getIdeas();
    if (error) {
      console.error("아이디어 로드 실패:", error);
    } else {
      setIdeas(data || []);
    }
    setLoading(false);
  };

  const filterIdeas = () => {
    let filtered = [...ideas];

    // 검색 필터
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (idea) =>
          idea.title.toLowerCase().includes(query) ||
          idea.content.toLowerCase().includes(query) ||
          idea.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // 카테고리 필터
    if (categoryFilter !== "all") {
      filtered = filtered.filter((idea) => idea.category === categoryFilter);
    }

    setFilteredIdeas(filtered);
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setAnalysisResult(null);

    const { data, error } = await analyzeIdeas();
    if (error) {
      alert(`분석 실패: ${error}`);
    } else {
      setAnalysisResult(data || null);
    }

    setAnalyzing(false);
  };

  const categories = Array.from(
    new Set(ideas.map((idea) => idea.category).filter(Boolean))
  ) as string[];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                type="text"
                placeholder="아이디어 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={analyzing || ideas.length === 0}
            variant="outline"
          >
            {analyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                분석 중...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                AI 인사이트
              </>
            )}
          </Button>
        </div>

        {categories.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={categoryFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("all")}
            >
              전체
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* AI 분석 결과 */}
      {analysisResult && (
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI 인사이트
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">
                {analysisResult}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 아이디어 목록 */}
      {filteredIdeas.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-zinc-500 dark:text-zinc-400">
              {ideas.length === 0
                ? "아직 아이디어가 없습니다. 첫 번째 아이디어를 추가해보세요!"
                : "검색 결과가 없습니다."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredIdeas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onDelete={loadIdeas}
              onUpdate={loadIdeas}
            />
          ))}
        </div>
      )}

      {filteredIdeas.length > 0 && (
        <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          총 {filteredIdeas.length}개의 아이디어
        </div>
      )}
    </div>
  );
}

