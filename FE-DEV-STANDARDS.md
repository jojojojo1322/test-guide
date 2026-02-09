# FE 개발 표준 (Biome)

## 3. 패키지
주요하게 사용하는 라이브러리만 정리합니다. 전체 목록은 package.json 참고.

| 유형 | 패키지명 | 설명 |
| --- | --- | --- |
| dependencies | react / react-dom | React 렌더링 코어 |
| dependencies | react-router-dom | 라우팅 |
| dependencies | @mui/material | UI 컴포넌트 |
| dependencies | @emotion/react / @emotion/styled | MUI 스타일 엔진 |
| dependencies | ag-grid-react / ag-grid-community / ag-grid-enterprise | 그리드 |
| dependencies | @fullcalendar/react / @fullcalendar/core / @fullcalendar/daygrid | 캘린더 |
| dependencies | recharts | 차트 |
| dependencies | react-calendar-timeline | 타임라인 |
| dependencies | interactjs | 드래그/리사이즈 인터랙션 |
| dependencies | axios | HTTP 클라이언트 |
| dependencies | dayjs | 날짜/시간 |
| dependencies | zustand | 전역 상태 |
| dependencies | react-toastify | 토스트 알림 |
| dependencies | @company/commons | 사내 공통 패키지 |
| devDependencies | vite / @vitejs/plugin-react | 빌드/번들러 |
| devDependencies | typescript | 타입 시스템 |
| devDependencies | @biomejs/biome | lint/format/check |
| devDependencies | husky | git hooks |
| devDependencies | @types/* | 타입 정의 |

## 4.1.1. 패키지 설치
ESLint, Prettier 대신 Biome 하나로 lint/format/import 정리를 통합합니다.

- 설치: pnpm add -D @biomejs/biome
- 초기화: pnpm exec biome init
- 검사/자동수정:
  - pnpm exec biome check .
  - pnpm exec biome check --write .

## 4.1.2. biome.json
biome init로 생성된 biome.json을 기준으로 관리합니다.

예시
  {
    "organizeImports": {
      "enabled": true
    },
    "linter": {
      "enabled": true,
      "rules": {
        "recommended": true
      }
    },
    "formatter": {
      "enabled": true,
      "indentStyle": "space",
      "indentWidth": 2
    }
  }

## 4.1.3. 포맷터 설정
biome.json의 formatter가 Prettier 역할을 대체합니다. .prettierrc는 사용하지 않습니다.

## 4.2. 네이밍 컨벤션

| 유형 | 컨벤션 | 예시 |
| --- | --- | --- |
| .tsx 파일 | PascalCase | TodoItem.tsx |
| .ts 파일 | camelCase | apiService.ts |
| 컴포넌트 | PascalCase | const UserProfileCard = () => { return <div>User Profile</div>; }; export default UserProfileCard; |
| 변수/함수 | camelCase | const userName = 'John Doe'; const fetchUserData = () => {}; |
| 상수 | uppercase letters with underscores | const API_URL = 'https://api.example.com'; const PAGE_CNT = 10; |
| 이벤트 핸들러 | 접두사 handle | handleClick |
| CSS 클래스 | lowercase letters and hyphens | className='example-container' |

## 4.3. 주석 컨벤션
주석은 **의도가 코드만으로 명확하지 않을 때**만 작성합니다. 기능 설명보다 **이유/제약/의사결정**을 적습니다.

### 4.3.1. 함수/클래스 주석
외부 공개(Export) 함수/컴포넌트, 복잡한 도메인 로직, 부작용이 있는 로직에만 JSDoc을 사용합니다.

예시
  /**
   * 항공편 검색 조건을 정규화한다.
   * - 입력값이 불완전할 수 있어 기본값을 보정한다.
   * - 서버 규격에 맞게 포맷을 보장한다.
   *
   * @param params 사용자 입력 검색 조건
   * @returns 정규화된 검색 조건
   */
  export const normalizeFlightQuery = (params: FlightQueryInput): FlightQuery => {
    // ...
  };

### 4.3.2. 블록 주석
복잡한 분기, 비즈니스 규칙, 성능/보안상의 이유가 있는 구간에만 작성합니다.

예시
  // 좌석 등급별 수수료 계산은 계약서 규정을 그대로 반영해야 함
  // 변경 시 반드시 QA 시나리오 재검증 필요
  const fee = calcSeatFee(seatClass, baseFare);

  /* API 한도 보호: 호출 빈도는 분당 20회 이하로 제한 */
  await limiter.wait("flight-search");
