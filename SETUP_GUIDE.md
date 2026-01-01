# 🚀 Business Idea Lab 설정 가이드

이 가이드는 프로젝트를 처음 시작하는 분을 위한 단계별 설정 가이드입니다.

## ✅ 이미 완료된 작업

- ✅ Next.js 14 프로젝트 초기화
- ✅ 필요한 패키지 설치 (Supabase, Gemini, UI 라이브러리 등)
- ✅ 기본 프로젝트 구조 생성
- ✅ Gemini API 클라이언트 설정
- ✅ 환경 변수 파일 생성 (Gemini API 키 포함)

## 📋 지금 해야 할 작업

### 1️⃣ Supabase 프로젝트 생성 및 설정 (필수)

**이 작업은 반드시 해야 합니다!** 데이터베이스와 인증 기능을 사용하기 위해 필요합니다.

#### 단계:

1. **Supabase 프로젝트 생성**
   - [https://supabase.com](https://supabase.com)에 접속
   - 회원가입/로그인
   - "New Project" 클릭
   - 프로젝트 이름, 데이터베이스 비밀번호, 리전 설정
   - 프로젝트 생성 대기 (약 2분)

2. **환경 변수 가져오기**
   - Supabase 대시보드 → **Settings** → **API** 이동
   - **Project URL** 복사
   - **anon public** 키 복사
   - `.env.local` 파일 열기
   - 다음 값들을 업데이트:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```

3. **데이터베이스 스키마 설정**
   - Supabase 대시보드 → **SQL Editor** 이동
   - **New Query** 클릭
   - `supabase/migrations/001_initial_schema.sql` 파일 내용 전체 복사
   - SQL Editor에 붙여넣기
   - **Run** 버튼 클릭
   - ✅ 성공 메시지 확인

   > 💡 **자세한 가이드**: `SUPABASE_SETUP.md` 파일 참고

### 2️⃣ 개발 서버 실행 및 테스트

환경 변수를 설정한 후:

```bash
cd C:\Users\user\business-idea-lab
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## 🎯 다음 개발 단계

Supabase 설정이 완료되면 다음 기능들을 구현할 수 있습니다:

1. **인증 시스템**
   - 로그인/회원가입 페이지
   - 구글 소셜 로그인
   - 세션 관리

2. **아이디어 입력 폼**
   - 제목, 내용, 태그 입력
   - 날짜 자동 생성
   - Streak 기능 (연속 기록)

3. **아이디어 대시보드**
   - 카드/리스트 뷰
   - 검색 및 필터링
   - 최신순 정렬

4. **AI 인사이트**
   - 아이디어 분석 버튼
   - 카테고리 분류
   - 새로운 사업 모델 제안

## 🔐 보안 확인사항

- ✅ `.env.local` 파일은 절대 Git에 커밋하지 마세요 (이미 `.gitignore`에 포함됨)
- ✅ Gemini API 키는 이미 `.env.local`에 설정되어 있습니다
- ✅ RLS 정책이 데이터베이스에 적용되면 사용자별 데이터 격리가 보장됩니다

## ❓ 문제 해결

### Supabase 연결 오류
- `.env.local` 파일의 URL과 키가 정확한지 확인
- Supabase 프로젝트가 활성화되어 있는지 확인

### 데이터베이스 오류
- SQL 마이그레이션이 정상적으로 실행되었는지 확인
- Supabase 대시보드 → Table Editor에서 `ideas` 테이블이 생성되었는지 확인

### 개발 서버 오류
- `npm install`을 다시 실행해보세요
- Node.js 버전이 18 이상인지 확인하세요

## 📚 참고 문서

- `README.md` - 프로젝트 개요
- `SUPABASE_SETUP.md` - Supabase 상세 설정 가이드

---

**준비가 되셨나요?** Supabase 설정을 완료하시면 알려주세요. 다음 기능 구현을 도와드리겠습니다! 🚀

