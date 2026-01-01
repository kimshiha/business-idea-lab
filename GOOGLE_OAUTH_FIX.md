# 구글 OAuth redirect_uri_mismatch 오류 해결 가이드

## 문제 증상
구글 로그인 시 "400 오류: redirect_uri_mismatch" 메시지가 표시됩니다.

## 원인
Google Cloud Console에 등록된 Redirect URI와 Supabase가 요청하는 URI가 일치하지 않을 때 발생합니다.

## 해결 방법

### 1단계: Supabase 프로젝트 URL 확인

1. Supabase 대시보드에 로그인
2. **Settings** → **API**로 이동
3. **Project URL**을 복사합니다
   - 예: `https://abcdefghijklmnop.supabase.co`
   - 이 URL의 `abcdefghijklmnop` 부분이 프로젝트 참조 ID입니다

### 2단계: Google Cloud Console에서 Redirect URI 추가

1. [Google Cloud Console](https://console.cloud.google.com)에 접속
2. 프로젝트 선택
3. **API 및 서비스** → **사용자 인증 정보**로 이동
4. OAuth 2.0 클라이언트 ID를 클릭 (없으면 생성)
5. **승인된 리디렉션 URI** 섹션에서:
   - **+ URI 추가** 클릭
   - 다음 형식으로 입력:
     ```
     https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
     ```
   - `[YOUR-PROJECT-REF]`를 1단계에서 확인한 프로젝트 참조 ID로 교체
   - 예: `https://abcdefghijklmnop.supabase.co/auth/v1/callback`

6. **로컬 개발용 URI 추가** (선택사항)
   ```
   http://localhost:3000/auth/callback
   ```

7. **저장** 클릭

### 3단계: Supabase에서 Google OAuth 활성화

1. Supabase 대시보드 → **Authentication** → **Providers**
2. **Google** 찾기
3. **Enable Google** 클릭
4. Google Cloud Console에서 생성한 **Client ID**와 **Client Secret** 입력
5. **Save** 클릭

### 4단계: 확인 및 테스트

1. 몇 분 기다린 후 (설정이 적용되는데 시간이 걸릴 수 있음)
2. 애플리케이션에서 구글 로그인 시도
3. 정상적으로 작동하는지 확인

## 주의사항

- ✅ URI는 정확히 일치해야 합니다 (대소문자, 슬래시, 프로토콜 포함)
- ✅ Supabase 프로젝트 URL이 변경되면 Google Cloud Console의 URI도 업데이트해야 합니다
- ✅ 변경사항이 적용되는데 몇 분이 걸릴 수 있습니다
- ✅ Google Cloud Console에서 OAuth 동의 화면이 설정되어 있어야 합니다

## 여전히 문제가 발생하는 경우

1. 브라우저 캐시를 지우고 다시 시도
2. Supabase 대시보드에서 Google OAuth를 비활성화했다가 다시 활성화
3. Google Cloud Console에서 OAuth 클라이언트를 삭제하고 다시 생성
4. Supabase 프로젝트 URL이 정확한지 다시 확인

