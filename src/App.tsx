import { useEffect } from "react";
import { AppProviders } from "@company/commons";
import Router from "@/router";
import { useAuthStore } from "@/store/authStore";
import type { User, MenuTree } from "@/models/menu";

// AG Grid CSS (필요시)
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Mock data for development
const loadMockData = async () => {
  // TODO: Replace with actual API call in production
  const mockUser: User = {
    id: "A",
    name: "테스트 유저",
    role: "FLIGHT",
    permission: "admin",
  };

  // Nested menu structure example:
  // - 대메뉴 (flight-1) -> has page
  //   - 중메뉴 (flight-1-1) -> has page + children
  //     - 소메뉴 (flight-1-1-1) -> has page (leaf)
  //     - 소메뉴 (flight-1-1-2) -> has page (leaf)
  //   - 중메뉴 (flight-1-2) -> has page (leaf, no children)
  const mockMenus: MenuTree = [
    {
      id: "flight-1",
      name: "운항관리",
      allowedPermissions: ["user", "admin"],
      children: [
        {
          id: "flight-1-1",
          name: "비행계획",
          allowedPermissions: ["user", "admin"],
          children: [
            {
              id: "flight-1-1-1",
              name: "국내선",
              allowedPermissions: ["user", "admin"],
            },
            {
              id: "flight-1-1-2",
              name: "국제선",
              allowedPermissions: ["admin"], // admin only
            },
          ],
        },
        {
          id: "flight-1-2",
          name: "운항현황",
          allowedPermissions: ["user", "admin"],
          // No children - this is a leaf menu at 중메뉴 level
        },
      ],
    },
    {
      id: "cabin-1",
      name: "객실관리",
      allowedPermissions: ["user", "admin"],
      children: [
        {
          id: "cabin-1-1",
          name: "승무원배정",
          allowedPermissions: ["user", "admin"],
        },
      ],
    },
  ];

  return { user: mockUser, menus: mockMenus };
};

const App = () => {
  const { setUser, setMenus, setLoading } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 개발 단계: Mock 데이터 사용
        const { user, menus } = await loadMockData();
        setUser(user);
        setMenus(menus);

        // TODO: 실제 API 연동 시 아래 코드 사용
        // const menus = await loadAuthData('A', 'FLIGHT');
        // setMenus(menus);
      } catch (error) {
        console.error("Auth initialization failed:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [setUser, setMenus, setLoading]);

  return (
    <AppProviders>
      <Router />
    </AppProviders>
  );
};

export default App;
