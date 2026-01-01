# 🚀 빠른 배포 가이드 (5분 안에 완료!)

가장 간단한 방법으로 전 세계 어디서나 접속 가능하게 만들기

## ✅ 배포 전 체크리스트

- [ ] GitHub 계정 있음 (없으면 [github.com](https://github.com)에서 무료 가입)
- [ ] Supabase 프로젝트 생성 완료
- [ ] Gemini API 키 발급 완료

## 📦 1단계: GitHub에 코드 업로드 (2분)

### GitHub 저장소 생성

1. [GitHub](https://github.com) 로그인
2. 우측 상단 **+** → **New repository** 클릭
3. Repository name: `business-idea-lab` (또는 원하는 이름)
4. **Public** 또는 **Private** 선택
5. **Create repository** 클릭

### 코드 업로드

터미널에서 프로젝트 폴더로 이동 후:

**1단계: Git 사용자 정보 설정 (처음 한 번만)**

```bash
git config --global user.email "kimshiha@naver.com"
git config --global user.name "kimshiha"
```

> 💡 실제 이메일과 이름으로 변경하세요 (GitHub 계정 이메일 권장)

**2단계: Git 초기화 및 코드 업로드**

```bash
# Git 초기화 (이미 되어있다면 스킵)
git init

# 기존 remote가 있다면 제거
git remote remove origin

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit"

# main 브랜치로 이름 변경
git branch -M main

# GitHub 저장소 연결 (kimshiha를 실제 사용자명으로 변경)
git remote add origin https://github.com/kimshiha/business-idea-lab.git

# 코드 업로드
git push -u origin main
```

> 💡 `kimshiha`를 실제 GitHub 사용자명으로 변경하세요

## 🚀 2단계: Vercel에 배포 (3분)

### Vercel 계정 생성

1. [vercel.com](https://vercel.com) 접속
2. **Sign Up** 클릭
3. **Continue with GitHub** 선택 (GitHub 계정으로 로그인)

### 프로젝트 가져오기

1. 대시보드에서 **Add New...** → **Project** 클릭
2. 방금 만든 GitHub 저장소 선택
3. **Import** 클릭

### 환경 변수 설정 (중요!)

**Configure Project** 화면에서 아래로 스크롤하여 **Environment Variables** 섹션 찾기

다음 3개 변수를 추가하세요:

#### 1. NEXT_PUBLIC_SUPABASE_URL
- **Value**: Supabase 대시보드 → Settings → API → Project URL
- 예: `https://abcdefghijklmnop.supabase.co`

#### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Value**: Supabase 대시보드 → Settings → API → anon public 키
- 긴 문자열입니다 (복사 시 전체 복사)

#### 3. GEMINI_API_KEY
- **Value**: [Google AI Studio](https://makersuite.google.com/app/apikey)에서 발급한 API 키

**환경 변수 추가 방법:**

1. **Key** 입력란에 변수 이름 입력
   - 예: `NEXT_PUBLIC_SUPABASE_URL`

2. **Value** 입력란에 실제 값 입력
   - 예: `https://abcdefghijklmnop.supabase.co`

3. **Environment** 선택 (체크박스 또는 드롭다운)
   - 화면에 체크박스가 보이면:
     - ✅ **Production** 체크
     - ✅ **Preview** 체크
   - 드롭다운 메뉴가 보이면:
     - **Production, Preview, Development** 모두 선택
   - 체크박스나 드롭다운이 안 보이면:
     - 그냥 **Add** 클릭 (기본값으로 모든 환경에 적용됨)

4. **Add** 또는 **Save** 버튼 클릭

5. 위 과정을 3개 변수 모두에 반복

> 💡 **팁**: 체크박스가 안 보이면 그냥 변수 이름과 값만 입력하고 Add 버튼을 클릭하세요. Vercel이 자동으로 모든 환경에 적용합니다.

### 배포 시작

1. 모든 환경 변수 추가 확인
   - ✅ `NEXT_PUBLIC_SUPABASE_URL`: 전체 URL이 입력되었는지 확인
   - ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 전체 키가 입력되었는지 확인 (매우 긴 문자열)
   - ✅ `GEMINI_API_KEY`: 전체 키가 입력되었는지 확인

2. **Deploy** 버튼 클릭 (화면 하단의 검은색 버튼)

3. 2-3분 대기

4. 배포가 실패하면:
   - **Build Logs** 클릭하여 오류 확인
   - 환경 변수 값이 완전한지 다시 확인
   - 수정 후 **Deploy** 버튼 다시 클릭

## ✅ 3단계: 완료!

배포가 완료되면:

1. **Visit** 버튼 클릭
2. `https://your-project-name.vercel.app` 주소로 접속 가능
3. 전 세계 어디서나 이 링크로 접속 가능! 🎉

## 🔐 보안 기능 (자동 적용됨)

✅ **HTTPS 자동 적용** - 모든 통신 암호화  
✅ **SSL 인증서 자동 발급** - 안전한 연결  
✅ **DDoS 보호** - 자동 공격 방어  
✅ **글로벌 CDN** - 빠른 속도  
✅ **자동 백업** - 코드 변경 이력 관리  

## 🔄 업데이트 방법

코드를 수정하면:

```bash
git add .
git commit -m "Update"
git push
```

Vercel이 자동으로 새 버전 배포! (약 2분)

## 🌐 커스텀 도메인 추가 (선택사항)

원하는 주소(예: `kimshiha.com`)를 사용하려면:

1. Vercel 대시보드 → 프로젝트 → **Settings** → **Domains**
2. **Add Domain** 클릭
3. 도메인 입력 (예: `kimshiha.com`)
4. DNS 설정 안내 따르기
5. 완료!

## ❓ 문제 해결

### Git 오류 해결

**오류: "Please tell me who you are"**
```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

**오류: "remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/kimshiha/business-idea-lab.git
```

**오류: "src refspec main does not match any"**
- 커밋이 없어서 발생합니다. 다음 순서로 실행:
```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

**오류: "fatal: unable to auto-detect email address"**
- Git 사용자 정보를 설정하세요 (위 참고)

### 배포 실패

**배포가 실패했을 때:**

1. **Build Logs** 클릭하여 오류 메시지 확인
   - 빨간색 X 아이콘이 있으면 오류가 있습니다
   - 오류 메시지를 읽고 문제 파악

2. **가장 흔한 오류들:**

   **환경 변수 오류:**
   - 환경 변수 값이 잘렸거나 불완전한 경우
   - 각 변수의 Value를 전체 값으로 다시 입력
   - 특히 `NEXT_PUBLIC_SUPABASE_ANON_KEY`는 매우 긴 문자열입니다

   **빌드 오류:**
   - `npm install` 실패: 패키지 문제
   - `npm run build` 실패: 코드 오류
   - Build Logs에서 정확한 오류 확인

3. **해결 방법:**
   - 환경 변수 수정 후 **Deploy** 버튼 다시 클릭
   - 코드 오류면 로컬에서 `npm run build` 테스트 후 수정

### 사이트가 작동하지 않음
- Supabase 프로젝트가 활성화되어 있는지 확인
- 환경 변수 값이 정확한지 확인

## 🎯 다음 단계

배포 후:
1. Google OAuth Redirect URI 추가:
   - Google Cloud Console → OAuth 클라이언트
   - `https://your-project.vercel.app/auth/callback` 추가
2. 테스트:
   - 회원가입/로그인 테스트
   - 아이디어 생성 테스트
   - AI 인사이트 테스트

---

**완료! 이제 전 세계 어디서나 접속 가능합니다! 🌍**

