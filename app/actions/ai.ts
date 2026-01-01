"use server";

import { createClient } from "@/lib/supabase/server";
import { analyzeIdeasWithGemini } from "@/lib/gemini/client";
import type { Idea } from "@/types/database";

export async function analyzeIdeas() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { data: null, error: "인증되지 않은 사용자입니다." };
    }

    const { data: ideas, error } = await supabase
      .from("ideas")
      .select("title, content, category")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("아이디어 조회 오류:", error);
      return {
        data: null,
        error: error.message || "아이디어를 불러오는데 실패했습니다.",
      };
    }

    if (!ideas || ideas.length === 0) {
      return {
        data: null,
        error: "분석할 아이디어가 없습니다. 먼저 아이디어를 추가해주세요.",
      };
    }

    try {
      const analysis = await analyzeIdeasWithGemini(ideas);
      return { data: analysis, error: null };
    } catch (geminiError: any) {
      console.error("Gemini API 오류:", geminiError);
      return {
        data: null,
        error:
          geminiError.message ||
          "AI 분석 중 오류가 발생했습니다. GEMINI_API_KEY가 올바르게 설정되어 있는지 확인해주세요.",
      };
    }
  } catch (error: any) {
    console.error("아이디어 분석 예외:", error);
    return {
      data: null,
      error: error.message || "아이디어 분석 중 예기치 않은 오류가 발생했습니다.",
    };
  }
}

