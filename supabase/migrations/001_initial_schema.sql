-- Business Idea Lab 데이터베이스 스키마
-- Row Level Security (RLS) 정책 포함

-- ideas 테이블 생성
CREATE TABLE IF NOT EXISTS public.ideas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS ideas_user_id_idx ON public.ideas(user_id);
CREATE INDEX IF NOT EXISTS ideas_created_at_idx ON public.ideas(created_at DESC);
CREATE INDEX IF NOT EXISTS ideas_category_idx ON public.ideas(category);

-- updated_at 자동 업데이트를 위한 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 트리거 생성
CREATE TRIGGER update_ideas_updated_at
    BEFORE UPDATE ON public.ideas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) 활성화
ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (있다면)
DROP POLICY IF EXISTS "Users can view their own ideas" ON public.ideas;
DROP POLICY IF EXISTS "Users can insert their own ideas" ON public.ideas;
DROP POLICY IF EXISTS "Users can update their own ideas" ON public.ideas;
DROP POLICY IF EXISTS "Users can delete their own ideas" ON public.ideas;

-- RLS 정책: 사용자는 자신의 아이디어만 조회 가능
CREATE POLICY "Users can view their own ideas"
    ON public.ideas
    FOR SELECT
    USING (auth.uid() = user_id);

-- RLS 정책: 사용자는 자신의 아이디어만 삽입 가능
CREATE POLICY "Users can insert their own ideas"
    ON public.ideas
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- RLS 정책: 사용자는 자신의 아이디어만 수정 가능
CREATE POLICY "Users can update their own ideas"
    ON public.ideas
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- RLS 정책: 사용자는 자신의 아이디어만 삭제 가능
CREATE POLICY "Users can delete their own ideas"
    ON public.ideas
    FOR DELETE
    USING (auth.uid() = user_id);

-- 댓글: 이 스키마는 Supabase 대시보드의 SQL Editor에서 실행하거나
-- Supabase CLI를 사용하여 마이그레이션으로 적용할 수 있습니다.

