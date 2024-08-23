# Moneylicious
`Moneylicious` 는 사용자의 자산관리를 위한 웹 서비스입니다. 사용자는 월별 소비 내역을 캘린더로 확인하고, 대시보드에서 다양한 통계를 확인할 수 있습니다. 자산관리를 위한 다양한 기능과 커뮤니티 게시판을 통해 다른 유저와 소통할 수 있는 기능을 제공합니다.

<br/>

## 기술 스택
- **프레임워크 및 언어** : ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
- **상태관리** : ![zustand](https://img.shields.io/badge/zustand-f7a904?style=for-the-badge&logo=zustand&logoColor=white)
- **라우팅** : ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=white)
- **스타일링** : ![styled--components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
- **데이터베이스** : ![Supabase](https://img.shields.io/badge/Supabase-3ecf8e?style=for-the-badge&logo=Supabase&logoColor=white)
- **번들러** : ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)
- **배포** : ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white)

<br/>

## 배포주소
[https://moneylicious.vercel.app/](https://moneylicious.vercel.app/)

<br/>

## 테스트 계정
```
id : test@test.com
pw : test123$%^
```
로그인하지 않으면 일부 페이지에 접근이 불가합니다. 아래의 계정으로 로그인해주세요.

<br/>

## 목차
- [설치 및 실행 방법](#설치-및-실행-방법)
- [환경 변수 설정](#환경변수-설정)
- [페이지 구성 및 기능 소개](#페이지-구성-및-기능-소개)
  - [메인 페이지](#메인-페이지)
  - [대시보드](#대시보드-페이지dashboard)
  - [자산관리](#자산관리-페이지management)
  - [커뮤니티](#커뮤니티-페이지board-boardid-boardwrite)
  - [회원가입](#회원가입-페이지)
  - [마이 페이지](#마이-페이지)
- [아키텍처](#아키텍처)
  - [디렉토리 구조](#디렉토리-구조)
  - [데이터의 흐름과 상태관리](#데이터의-흐름과-상태관리)
  - [라우팅](#라우팅)

<br/>

## 설치 및 실행 방법

### 클론
```bash
git clone https://github.com/mkk00/Moneylicious-Ledger-Book.git
```

### 패키지 설치
```bash
npm install
```

### 실행
```bash
npm run dev
```

<br/>

## 환경변수 설정
이 프로젝트를 로컬에서 실행하기 위해서는 환경 변수를 설정해야합니다.
1. `.env` 파일 생성
    ```
      SUPABASE_URL=<YOUR_SUPABASE_URL>
      SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
    ```

<br/>

2. 환경 변수 값 입력
    위의 코드에서 `<YOUR_SUPABASE_URL>`, `<YOUR_SUPABASE_ANON_KEY>`에 실제 환경 변수 값을 대입해야합니다.

<br/>

3. 환경 변수 적용
    ```bash
      npm run dev
    ```
    서버를 다시 실행합니다.




<br/>

## 페이지 구성 및 기능 소개

### 메인 페이지('/')
메인 페이지에는 `캘린더` 와 `가계부 내역` 으로 구성되어 있습니다.
이용자가 빠르게 가계부 서비스를 이용할 수 있도록 메인 페이지에 가계부 캘린더를 구성했습니다.

- 캘린더에는 일별 <span style="color:#3c5afe">수입</span>/<span style="color:#ff6e40">지출</span> 총 금액을 한눈에 확인할 수 있습니다.

> **가계부 내역 확인**

캘린더의 날짜 부분을 `토글`하여 해당 일자의 가계부 내역을 조회합니다.

> **가계부 내역 추가 모달**

- 내역 추가 버튼( + )을 누르면 '기록 추가' 모달이 열립니다.
- 모달 바깥쪽을 클릭하면 모달이 닫힙니다.

> **수입/지출 카테고리 선택** 
- 왼쪽 하단에 `+`, `-` 버튼을 통해 수입/지출(type)을 선택할 수 있습니다.
- 수입/지출별 카테고리를 선택할 수 있습니다.

> **내역 수정 및 삭제**

추가된 내역 리스트를 클릭하면 해당 기록을 수정하거나 삭제할 수 있습니다.

### 대시보드 페이지('/dashboard')
대시보드 페이지에는 `가계부 요약` 과 `월별/연별 지출 추세` 및 `카테고리별 수입/지출 비율` 로 구성되어 있습니다.

> **가계부 요약**
- 지금까지의 지출한 금액의 총액 표시
- 이번 달 가장 큰 지출 항목 표시
- 해당 년도에서 가장 많이 소비한 월 표시
- 해당 년도에서 가장 많이 소비한 카테고리 표시

> **월별 수입/지출 추세**
- 월별 수입/지출 추세를 막대 그래프로 시각화
- 그래프의 월 막대 부분을 클릭하면 아래쪽에 해당 월의 카테고리별 수입/지출 비율을 확인할 수 있다.

> **연도별 수입/지출 추세**
- 연도별 수입/지출 추세를 라인 그래프로 시각화
- `전년도`와 `당해년도`의 수입/지출 금액이 얼마나 변화가 있었는지 쉽게 확인 가능

> **카테고리별 수입/지출 비율**
- 월별/연도별 아래에 카테고리별 수입/지출 비율을 파이 그래프로 시각화
- 월별 카테고리별 수입/지출 비율은 월별 막대 그래프의 막대를 클릭하거나 `SelectBox` 를 통해 조작 가능

### 자산관리 페이지('/management')
자산관리 페이지에는 `자산 요약` 과 `목표 설정` 으로 구성되어 있습니다.

> **현금 이용 내역**
- 수입과 지출 금액의 차액(수입-지출)을 현금으로 표시
- 해당 카드를 클릭하면 현금 이용 내역 월별 조회 가능

> **자산 목록**
- 자산은 저축, 보험, 투자 등의 합계로 구성
- 자산 목록이 기본으로 보여지며 자산 카드 클릭을 통해 자산 목록 토글 가능
- 자산의 목록은 각 항목(저축/보험/투자)의 합계 금액과 세부 항목 금액 표시
- 하단의 `+` 버튼을 통해 저축/보험/투자 내역 추가 가능하며, 상세 내역을 클릭하면 수정/삭제 가능

> **한달 소비 계획 설정** 및 **연간 저축 목표 설정**
- 한달동안 소비할 금액의 목표를 설정 가능
- 연간 저축 목표 설정 가능
- 카드 하단에 현재 지출 금액 합계 및 현재 저축액 표시

### 커뮤니티 페이지('/board', '/board/[id]', '/board/write')
커뮤니티 페이지에서는 `카테고리별`(일반/소비습관/정보/고민/기타) 게시글을 조회/작성/수정/삭제할 수 있다.
- 카테고리별 게시글 조회 기능
- 게시글 추천 기능(좋아요)
- 댓글 작성/수정/삭제 기능
- 뒤로가기 하지 않고도 하단에 게시글 목록을 통해 다른 게시글로 이동 가능

### 회원가입 페이지
> **유효성 검사**
- 잘못된 입력 형식일 경우 오류 메시지 표기
- 이메일은 일반적인 이메일 형식에 맞춰 가입 가능 (예: money@moenylicious.com)
- 패스워드는 문자, 숫자 및 특수문자를 포함한 10글자 이상
- 닉네임은 3글자 이상 8글자 이하의 영어, 한글, 숫자

### 마이 페이지
- 프로필 사진 변경
- 패스워드 변경
- 닉네임 변경
- 사용자 메시지 수정


<br/>

## 아키텍처

### 디렉토리 구조

```
├─ public
│  └─ moneylicious.svg
├─ src
│  ├─ api   # supabase api 함수
│  ├─ components   # 재사용 가능 컴포넌트
│  │  ├─ board   # 커뮤니티 페이지 관련 컴포넌트
│  │  ├─ button   # 버튼 컴포넌트 모음
│  │  ├─ calendar   # 캘린더 관련 컴포넌트
│  │  ├─ common   # 공통 컴포넌트 (Header, Footer 등)
│  │  ├─ dashBoard   # 대시보드 페이지 관련 컴포넌트
│  │  ├─ input   # 폼 관련 컴포넌트
│  │  ├─ ledger   # 가계부 내역 관련 컴포넌트
│  │  ├─ management   # 자산 관리 페이지 관련 컴포넌트
│  │  ├─ modal   # 모달 컴포넌트 모음
│  │  ├─ textEditor   # 텍스트 에디터 컴포넌트
│  │  └─ userInfo   # 사용자 정보 관련 컴포넌트
│  ├─ data   # 정적 데이터 파일 모음
│  ├─ hook   # 커스텀 훅 모음
│  ├─ interface   # 타입스크립트 인터페이스 정의
│  ├─ layout   # 레이아웃 관련 컴포넌트
│  ├─ lib   # 외부 라이브러리 및 유틸리티 함수
│  ├─ pages   # 페이지 컴포넌트
│  ├─ store   # 상태관리 관련 파일
│  ├─ styles   # 글로벌 스타일 및 테마
│  ├─ utils   # 유틸리티 함수
│  ├─ main.tsx   # 애플리케이션 진입점
│  ├─ supabaseconfig.ts   # Supabase 설정 파일
│  └─ vite-env.d.ts   # Vite 환경 설정 파일
├─ .gitignore
├─ package-lock.json
├─ package.json
├─ tsconfig.json   # 타입스크립트
├─ tsconfig.node.json   # 타입스크립트
└─ vite.config.ts   # vite
├─ .prettierrc   # 프리티어
├─ README.md
```

<br/>

### 데이터의 흐름과 상태관리
> **상태를 전역과 지역으로 나누어 관리**

- **props 를 통해 자식 컴포넌트로 전달**
  - state 가 특정 컴포넌트에 제한된 경우
  - 2~3개의 계층 정도의 깊이만 존재할 경우

<br/>

- **전역 상태관리**
  - state 가 여러 컴포넌트에서 사용되는 경우
    - <span style="color:#9ea4aa">예) 캘린더 컴포넌트에서 날짜 선택(`SelectDate`)과 같은 컴포넌트의 경우 가계부 내역 컴포넌트에서도 사용되기 때문에 전역 상태관리를 통해 데이터 관리</span>
  - 인증 상태, 사용자 정보와 같은 데이터

<br/>

> **Zustand 를 통해 전역 상태 관리**

- 채택 이유
  - `Zustand` 는 패키지 크기가 가볍고, 코드가 간단하여 가독성이 좋기 때문에 채택
- 디렉토리 : `/src/store`
<br/>

- 사용 예시
```typescript
import { create } from 'zustand'

interface UserAuthProps {
  isLogin: boolean;
  setLogin: () => void;
  setLogout: () => void;
  userInfo: UserInfoProps | null;
}

const useAuthStore = create<UserAuthProps>((set) => ({
  isLogin: false,
  setLogin: () => set({ isLogin: true }),
  setLogout: () => set({ isLogin: false, userInfo: null }),
  userInfo: token ? {
    id: id,
    email: email,
    username: username,
    image_url: image_url,
    accessToken: accessToken
  } : null
}));
```

<br/>

### 라우팅
- **React Router(v6~)**
  - 클라이언트 사이드 라우팅 구현

<br/>

- **중첩 라우팅**
  - 커뮤니티 페이지의 경우,
  - 상단에는 게시글 상세 조회, 하단에는 게시글 목록을 보여주는 구조
  - 사용자가 **페이지 전환 없이**도 연속적인 콘텐츠 탐색하여 사용자 경험 개선

<br/>

> **라우팅 구조**
- 메인 페이지 (`/`)
- 대시보드 (`/dashboard`)
- 자산 관리 (`/management`)
- 커뮤니티 (`/board`)
  - 게시글 조회 (`/board/[id]`)
  - 게시글 작성 (`/board/write`)
- 회원가입 (`/signup`)
- 마이페이지 (`/mypage`)
- 로그인 안내 페이지 (`/loginRequired`)

<br/>

> **라우팅 설정**
```typescript
import { RouteObject } from 'react-router-dom'

const routerList: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/management',
    element: <Management />
  },
  {
    path: '/board',
    element: <Board />,
    children: [
      {
        path: ':id',
        element: <BoardDetail />
      }
    ]
  },
  {
    path: '/board/write',
    element: <BoardWrite />
  },
  {
    path: '/mypage',
    element: <Mypage />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/loginRequired',
    element: <LoginRequired />
  }
]
```

<br/>
