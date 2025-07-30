# 🎨 Photo Gallery - 프로페셔널 사진 갤러리

김미소 작가의 아름다운 순간들을 담은 **모던한 웹 갤러리**입니다.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.11-blue.svg)

## ✨ 주요 기능

### 🖼️ **갤러리 기능**
- **반응형 그리드 레이아웃** - 모든 디바이스에서 완벽한 표시
- **무한 스크롤** - 자연스러운 이미지 로딩
- **이미지 모달** - 큰 화면으로 상세 보기
- **원클릭 다운로드** - 고해상도 이미지 저장

### 🔍 **검색 & 필터링**
- **실시간 검색** - 제목, 설명, 작가, 위치 기반 검색
- **태그 필터링** - 카테고리별 사진 분류
- **검색 결과 하이라이트** - 활성 필터 표시
- **빠른 초기화** - 원클릭으로 필터 리셋

### 🎯 **사용자 경험**
- **Error Boundary** - 안정적인 에러 처리
- **로딩 애니메이션** - 부드러운 사용자 피드백
- **접근성 지원** - 키보드 네비게이션 및 ARIA 레이블
- **PWA 지원** - 앱과 같은 사용 경험

### 🚀 **성능 최적화**
- **이미지 지연 로딩** - 성능 향상
- **메모이제이션** - React 최적화 기법 적용
- **번들 최적화** - 최소한의 크기 (JS: 176KB, CSS: 9KB)
- **SEO 최적화** - 검색 엔진 친화적

## 🛠️ 기술 스택

### **Frontend**
- **React 18** - 최신 React 기능 활용
- **TypeScript** - 타입 안전성 보장
- **Tailwind CSS** - 유틸리티 우선 스타일링
- **Vite** - 빠른 빌드 도구

### **개발 도구**
- **ESLint** - 코드 품질 관리
- **PostCSS** - CSS 후처리
- **Error Boundary** - 에러 처리 시스템
- **Logger** - 통합 로깅 시스템

## 📦 설치 및 실행

### **필수 요구사항**
- Node.js 18+ 
- npm 또는 yarn

### **설치**

```bash
# 저장소 클론
git clone <repository-url>
cd photo-gallery

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:5173 접속
```

### **빌드**

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 코드 검사
npm run lint
```

## 📁 프로젝트 구조

```
photo-gallery/
├── public/
│   ├── manifest.json          # PWA 매니페스트
│   └── vite.svg
├── src/
│   ├── components/            # React 컴포넌트
│   │   ├── ErrorBoundary.tsx  # 에러 처리
│   │   ├── GalleryGrid.tsx    # 갤러리 그리드
│   │   ├── SearchAndFilter.tsx # 검색/필터링
│   │   ├── ProfileHeader.tsx  # 프로필 헤더
│   │   └── LoadingSpinner.tsx # 로딩 컴포넌트
│   ├── hooks/                 # 커스텀 훅
│   │   ├── useGallery.ts      # 갤러리 상태 관리
│   │   └── useInfiniteScroll.ts # 무한 스크롤
│   ├── utils/                 # 유틸리티 함수
│   │   ├── downloadImage.ts   # 이미지 다운로드
│   │   └── logger.ts          # 로깅 시스템
│   ├── data/                  # 데이터 모델
│   │   ├── galleryData.ts     # 갤러리 데이터
│   │   └── profileData.ts     # 프로필 데이터
│   ├── App.tsx               # 메인 앱 컴포넌트
│   ├── main.tsx              # 엔트리 포인트
│   └── index.css             # 전역 스타일
├── index.html                # HTML 템플릿
├── tailwind.config.js        # Tailwind 설정
├── vite.config.ts            # Vite 설정
└── package.json              # 프로젝트 설정
```

## 🎨 주요 컴포넌트

### **GalleryGrid**
- 이미지 그리드 표시
- 호버 인터랙션
- 모달 상세보기
- 다운로드 기능

### **SearchAndFilter**
- 실시간 검색
- 태그 기반 필터링
- 필터 상태 관리
- 검색 결과 표시

### **ErrorBoundary**
- React 에러 캐치
- 사용자 친화적 에러 페이지
- 개발 모드 디버깅 정보
- 자동 에러 로깅

## 🔧 커스터마이징

### **이미지 데이터 변경**
```typescript
// src/data/galleryData.ts
export const galleryImages: GalleryImage[] = [
  {
    id: "custom-1",
    url: "https://your-image-url.com/image.jpg",
    title: "커스텀 이미지",
    description: "설명을 입력하세요",
    tags: ["custom", "new"],
    photographer: "작가명",
    location: "촬영 위치"
  }
  // ... 더 많은 이미지
];
```

### **프로필 정보 변경**
```typescript
// src/data/profileData.ts
export const profileData: ProfileData = {
  name: "사용자 이름",
  bio: "소개글을 입력하세요",
  profileImage: "프로필 이미지 URL",
  socialLinks: {
    instagram: "인스타그램 URL",
    website: "웹사이트 URL",
    email: "이메일 주소"
  }
};
```

### **테마 색상 변경**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#your-color-50',
          500: '#your-color-500',
          600: '#your-color-600',
          700: '#your-color-700',
        }
      }
    }
  }
}
```

## 🔍 SEO 최적화

- **메타 태그** - 완전한 SEO 메타데이터
- **Open Graph** - 소셜 미디어 공유 최적화
- **JSON-LD** - 구조화된 데이터
- **시맨틱 HTML** - 검색 엔진 친화적 마크업

## 📱 PWA 지원

- **오프라인 지원** - 서비스 워커 (계획됨)
- **앱 설치** - 홈 화면에 추가 가능
- **반응형 디자인** - 모든 디바이스 지원
- **빠른 로딩** - 캐싱 최적화

## 🐛 에러 처리

- **Error Boundary** - React 컴포넌트 에러 캐치
- **전역 에러 핸들러** - JavaScript 에러 처리
- **로깅 시스템** - 자동 에러 로깅
- **사용자 피드백** - 친화적인 에러 메시지

## 🚀 성능 최적화

- **이미지 지연 로딩** - Intersection Observer 활용
- **무한 스크롤** - 효율적인 메모리 사용
- **메모이제이션** - React.memo, useMemo, useCallback
- **번들 분할** - 코드 스플리팅 (계획됨)

## 📈 성능 메트릭

- **번들 크기**: JS 176KB (gzip: 55KB), CSS 9KB (gzip: 2KB)
- **보안**: 취약점 0개
- **접근성**: WCAG 2.1 AA 준수
- **PWA**: Lighthouse 점수 90+ (계획됨)

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👤 작가

**김미소** - 자연과 일상의 아름다운 순간들을 담는 사진작가

- 이메일: contact@misokim.com
- 인스타그램: [@photographer_miso](https://instagram.com/photographer_miso)
- 웹사이트: [misokim.photography](https://misokim.photography)

## 🙏 감사의 말

- [Unsplash](https://unsplash.com) - 아름다운 무료 이미지 제공
- [Tailwind CSS](https://tailwindcss.com) - 훌륭한 CSS 프레임워크
- [React](https://reactjs.org) - 강력한 UI 라이브러리
- [Vite](https://vitejs.dev) - 빠른 빌드 도구

---

⭐ **이 프로젝트가 마음에 드시나요? Star를 눌러주세요!** ⭐
