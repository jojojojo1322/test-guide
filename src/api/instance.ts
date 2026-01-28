import { createApiClient, createInMemoryTokenManager } from "@company/commons/api";

// 토큰 매니저 설정
const tokenManager = createInMemoryTokenManager({
  onUnauthorized: () => {
    // 401 발생 시 로그인 페이지로 리다이렉트
    window.location.href = "/login";
  },
});

// API 클라이언트 인스턴스 생성
export const api = createApiClient({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3001/api",
  tokenManager,
});

// 토큰 설정 함수 (로그인 시 사용)
export const setAccessToken = (token: string) => {
  tokenManager.setAccessToken?.(token);
};

// 토큰 클리어 함수 (로그아웃 시 사용)
export const clearToken = () => {
  tokenManager.clear?.();
};
