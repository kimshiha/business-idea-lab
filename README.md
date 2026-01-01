# Business Idea Lab 🚀

비즈니스 아이디어를 매일 기록하고 AI를 통해 확장하는 웹 애플리케이션입니다.

## 기술 스택

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Lucide React, Shadcn/ui
- **Backend/DB**: Supabase (Auth, Database, Edge Functions)
- **AI**: Google Gemini API (gemini-2.5-flash)
- **Deployment**: Vercel

## 주요 기능

- ✅ 사용자 인증 (이메일/구글 소셜 로그인)
- ✅ Row Level Security (RLS)로 완벽한 데이터 보안
- ✅ 아이디어 입력 및 관리
- ✅ AI 기반 아이디어 분석 및 확장

## 🚀 빠른 배포 (5분 완료!)

전 세계 어디서나 접속 가능하게 만들기:

1. **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** 파일을 참고하세요
2. GitHub에 코드 업로드 → Vercel에 연결 → 환경 변수 설정 → 완료!
3. 자동으로 HTTPS, SSL, 보안 기능이 적용됩니다

## 시작하기

### 1. 환경 변수 설정

`.env.local.example` 파일을 복사하여 `.env.local` 파일을 생성하고 다음 값들을 설정하세요:

```bash
cp .env.local.example .env.local
```

`.env.local` 파일에 다음 정보를 입력하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

### 2. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트를 생성하세요.
2. 프로젝트 설정에서 URL과 Anon Key를 복사하여 `.env.local`에 입력하세요.
3. Supabase 대시보드의 SQL Editor에서 `supabase/migrations/001_initial_schema.sql` 파일의 내용을 실행하세요.

   또는 Supabase CLI를 사용하는 경우:

   ```bash
   supabase db push
   ```

### 3. 의존성 설치

```bash
npm install
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 보안 설정

이 프로젝트는 **Row Level Security (RLS)**를 사용하여 데이터 보안을 보장합니다:

- 사용자는 오직 자신의 아이디어만 조회, 생성, 수정, 삭제할 수 있습니다.
- 모든 데이터베이스 작업은 인증된 사용자만 수행할 수 있습니다.
- RLS 정책은 `supabase/migrations/001_initial_schema.sql`에 정의되어 있습니다.

## 프로젝트 구조

```text
business-idea-lab/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈 페이지
│   └── globals.css        # 전역 스타일
├── components/            # React 컴포넌트
│   └── ui/               # UI 컴포넌트 (Shadcn/ui)
├── lib/                   # 유틸리티 및 설정
│   ├── supabase/         # Supabase 클라이언트
│   ├── gemini/           # Gemini API 클라이언트
│   └── utils.ts          # 유틸리티 함수
├── supabase/             # Supabase 설정
│   └── migrations/       # 데이터베이스 마이그레이션
├── types/                 # TypeScript 타입 정의
└── middleware.ts         # Next.js 미들웨어 (세션 관리)
```

## 구현된 기능

- ✅ 인증 시스템 (이메일/비밀번호, 구글 소셜 로그인)
- ✅ 아이디어 입력 폼 (제목, 내용, 카테고리, 태그)
- ✅ 아이디어 대시보드 (카드 뷰, 검색, 필터링)
- ✅ 아이디어 수정 및 삭제
- ✅ AI 인사이트 기능 (Gemini API 연동)
- ✅ 반응형 디자인 (모바일/태블릿/데스크톱)
- ✅ 다크 모드 지원

## 라이선스

MIT
