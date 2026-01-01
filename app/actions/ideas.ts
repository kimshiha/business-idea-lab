"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { Idea, IdeaInsert, IdeaUpdate } from "@/types/database";

export async function getIdeas() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { data: [], error: "인증되지 않은 사용자입니다." };
    }

    const { data, error } = await supabase
      .from("ideas")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("아이디어 조회 오류:", error);
      return {
        data: [],
        error: error.message || "아이디어를 불러오는데 실패했습니다.",
      };
    }

    return { data: (data as Idea[]) || [], error: null };
  } catch (error: any) {
    console.error("아이디어 조회 예외:", error);
    return {
      data: [],
      error: error.message || "아이디어를 불러오는 중 예기치 않은 오류가 발생했습니다.",
    };
  }
}

export async function createIdea(idea: IdeaInsert) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { data: null, error: "인증되지 않은 사용자입니다." };
    }

    const { data, error } = await supabase
      .from("ideas")
      .insert({
        ...idea,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      console.error("아이디어 생성 오류:", error);
      return {
        data: null,
        error: error.message || "아이디어 저장에 실패했습니다.",
      };
    }

    revalidatePath("/");
    return { data: data as Idea | null, error: null };
  } catch (error: any) {
    console.error("아이디어 생성 예외:", error);
    return {
      data: null,
      error: error.message || "아이디어 저장 중 예기치 않은 오류가 발생했습니다.",
    };
  }
}

export async function updateIdea(id: string, updates: IdeaUpdate) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "인증되지 않은 사용자입니다." };
  }

  const { data, error } = await supabase
    .from("ideas")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error("아이디어 수정 오류:", error);
    return {
      data: null,
      error: error.message || "아이디어 수정에 실패했습니다.",
    };
  }

  revalidatePath("/");
  return { data: data as Idea | null, error: null };
}

export async function deleteIdea(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "인증되지 않은 사용자입니다." };
  }

  const { error } = await supabase
    .from("ideas")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (!error) {
    revalidatePath("/");
  }

  return { error };
}

