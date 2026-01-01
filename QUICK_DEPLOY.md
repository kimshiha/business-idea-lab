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
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
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

**Configure Project** 화면에서 **Environment Variables** 섹션 찾기

다음 3개 변수를 추가하세요:

#### 1. NEXT_PUBLIC_SUPABASE_URL
- **Value**: Supabase 대시보드 → Settings → API → Project URL
- 예: `https://abcdefghijklmnop.supabase.co`

#### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Value**: Supabase 대시보드 → Settings → API → anon public 키
- 긴 문자열입니다 (복사 시 전체 복사)

#### 3. GEMINI_API_KEY
- **Value**: [Google AI Studio](https://makersuite.google.com/app/apikey)에서 발급한 API 키

**각 변수마다:**
- ✅ Production 체크
- ✅ Preview 체크
- **Add** 클릭

### 배포 시작

1. 모든 환경 변수 추가 확인
2. **Deploy** 버튼 클릭
3. 2-3분 대기

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
- 환경 변수가 모두 추가되었는지 확인
- Vercel 대시보드 → Deployments → Logs에서 오류 확인

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

