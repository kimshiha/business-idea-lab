# Supabase 설정 가이드

이 문서는 Business Idea Lab 프로젝트를 위한 Supabase 설정 방법을 안내합니다.

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 로그인하세요.
2. "New Project" 버튼을 클릭하여 새 프로젝트를 생성하세요.
3. 프로젝트 이름, 데이터베이스 비밀번호, 리전을 설정하세요.
4. 프로젝트가 생성될 때까지 기다리세요 (약 2분 소요).

## 2. 환경 변수 가져오기

1. Supabase 대시보드에서 **Settings** → **API**로 이동하세요.
2. 다음 정보를 복사하세요:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** 키 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. 프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 입력하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
OPENAI_API_KEY=your-openai-api-key-here
```

## 3. 데이터베이스 스키마 설정

### 방법 1: SQL Editor 사용 (권장)

1. Supabase 대시보드에서 **SQL Editor**로 이동하세요.
2. **New Query**를 클릭하세요.
3. `supabase/migrations/001_initial_schema.sql` 파일의 전체 내용을 복사하여 붙여넣으세요.
4. **Run** 버튼을 클릭하여 실행하세요.
5. 성공 메시지를 확인하세요.

### 방법 2: Supabase CLI 사용

```bash
# Supabase CLI 설치 (아직 설치하지 않은 경우)
npm install -g supabase

# Supabase에 로그인
supabase login

# 프로젝트 연결
supabase link --project-ref your-project-ref

# 마이그레이션 실행
supabase db push
```

## 4. 인증 설정

### 이메일 인증 활성화

1. Supabase 대시보드에서 **Authentication** → **Providers**로 이동하세요.
2. **Email** 프로바이더가 활성화되어 있는지 확인하세요.
3. 필요시 **Email Templates**에서 이메일 템플릿을 커스터마이징할 수 있습니다.

### 구글 소셜 로그인 설정 (선택사항)

**⚠️ 중요: 구글 로그인을 사용하려면 반드시 다음 단계를 완료해야 합니다!**

1. **Supabase 대시보드에서 Google 활성화**
   - Supabase 대시보드 → **Authentication** → **Providers**로 이동
   - **Google**을 찾아서 **Enable** 버튼 클릭

2. **Google Cloud Console에서 OAuth 2.0 설정**
   - [Google Cloud Console](https://console.cloud.google.com)에 접속
   - 프로젝트 선택 또는 새 프로젝트 생성
   - **API 및 서비스** → **사용자 인증 정보**로 이동
   - **+ 사용자 인증 정보 만들기** → **OAuth 클라이언트 ID** 선택
   - **애플리케이션 유형**: 웹 애플리케이션 선택
   - **승인된 리디렉션 URI**에 다음 URL들을 추가:
     ```
     https://your-project-ref.supabase.co/auth/v1/callback
     http://localhost:3000/auth/callback  (개발 환경용)
     ```
     > 💡 `your-project-ref`는 Supabase 프로젝트의 참조 ID입니다. Supabase 대시보드 → Settings → API에서 확인할 수 있습니다.

3. **Supabase에 OAuth 정보 입력**
   - Google Cloud Console에서 생성한 **Client ID**와 **Client Secret** 복사
   - Supabase 대시보드 → **Authentication** → **Providers** → **Google**로 돌아가기
   - **Client ID (for OAuth)** 필드에 Google Client ID 입력
   - **Client Secret (for OAuth)** 필드에 Google Client Secret 입력
   - **Save** 버튼 클릭

4. **설정 확인**
   - Google OAuth 설정이 완료되면 Supabase 대시보드에서 Google 프로바이더가 **Enabled** 상태인지 확인
   - 브라우저 콘솔에서 400 오류가 발생하면 위 설정이 제대로 되지 않은 것입니다

**문제 해결 - redirect_uri_mismatch 오류:**

이 오류는 Google Cloud Console에 등록된 Redirect URI와 실제 요청하는 URI가 일치하지 않을 때 발생합니다.

1. **Supabase 프로젝트 URL 확인**
   - Supabase 대시보드 → **Settings** → **API**로 이동
   - **Project URL**을 복사 (예: `https://abcdefghijklmnop.supabase.co`)

2. **Google Cloud Console에서 정확한 Redirect URI 추가**
   - Google Cloud Console → **API 및 서비스** → **사용자 인증 정보**
   - 생성한 OAuth 2.0 클라이언트 ID 클릭
   - **승인된 리디렉션 URI** 섹션에 다음을 **정확히** 추가:
     ```
     https://abcdefghijklmnop.supabase.co/auth/v1/callback
     ```
     > ⚠️ 중요: `abcdefghijklmnop` 부분을 실제 Supabase 프로젝트 참조 ID로 교체하세요!
   
3. **로컬 개발 환경용 URI 추가** (개발 중인 경우)
   ```
   http://localhost:3000/auth/callback
   https://localhost:3000/auth/callback
   ```

4. **저장 후 확인**
   - Google Cloud Console에서 **저장** 클릭
   - 변경사항이 적용되는데 몇 분이 걸릴 수 있습니다
   - Supabase 대시보드에서 Google OAuth가 활성화되어 있는지 다시 확인

5. **추가 확인사항**
   - URI에 오타가 없는지 확인 (대소문자, 슬래시, 프로토콜 포함)
   - Supabase 프로젝트 URL이 정확한지 확인
   - Google Cloud Console에서 OAuth 동의 화면이 설정되어 있는지 확인

## 5. Row Level Security (RLS) 확인

RLS는 이미 `001_initial_schema.sql`에 포함되어 있습니다. 다음을 확인하세요:

1. **Table Editor**에서 `ideas` 테이블을 엽니다.
2. **Policies** 탭에서 다음 정책들이 있는지 확인하세요:
   - ✅ Users can view their own ideas
   - ✅ Users can insert their own ideas
   - ✅ Users can update their own ideas
   - ✅ Users can delete their own ideas

## 6. 테스트

프로젝트를 실행하고 다음을 테스트하세요:

```bash
npm run dev
```

1. 회원가입/로그인이 정상적으로 작동하는지 확인
2. 아이디어 생성이 정상적으로 작동하는지 확인
3. 다른 사용자의 아이디어에 접근할 수 없는지 확인 (RLS 테스트)

## 문제 해결

### RLS 정책이 작동하지 않는 경우

1. **Table Editor** → `ideas` 테이블 → **Policies**에서 정책이 활성화되어 있는지 확인
2. SQL Editor에서 다음 쿼리로 RLS 상태 확인:

```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'ideas';
```

`rowsecurity`가 `true`여야 합니다.

### 인증이 작동하지 않는 경우

1. `.env.local` 파일의 환경 변수가 올바른지 확인
2. Supabase 프로젝트의 URL과 키가 최신인지 확인
3. 브라우저 콘솔에서 에러 메시지 확인

## 추가 리소스

- [Supabase 문서](https://supabase.com/docs)
- [Row Level Security 가이드](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js + Supabase 가이드](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

