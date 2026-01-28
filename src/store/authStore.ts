import { create } from "zustand";
import type { User, MenuItem, MenuTree, Permission } from "@/models/menu";
import { flattenMenus } from "@/models/menu";

interface AuthState {
  // 상태
  user: User | null;
  menus: MenuTree;
  isAuthenticated: boolean;
  isLoading: boolean;

  // 액션
  setUser: (user: User | null) => void;
  setMenus: (menus: MenuTree) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;

  // 유틸리티
  hasPermission: (menuId: string) => boolean;
  getMenuById: (menuId: string) => MenuItem | undefined;
  getFlatMenus: () => MenuItem[];
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // 초기 상태
  user: null,
  menus: [],
  isAuthenticated: false,
  isLoading: true,

  // 액션
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setMenus: (menus) => set({ menus }),

  setLoading: (isLoading) => set({ isLoading }),

  logout: () =>
    set({
      user: null,
      menus: [],
      isAuthenticated: false,
    }),

  // 유틸리티
  hasPermission: (menuId: string) => {
    const { user, menus } = get();
    if (!user) return false;

    const flatMenus = flattenMenus(menus);
    const menu = flatMenus.find((m) => m.id === menuId);
    if (!menu) return false;

    return menu.allowedPermissions.includes(user.permission as Permission);
  },

  getMenuById: (menuId: string) => {
    const { menus } = get();
    const flatMenus = flattenMenus(menus);
    return flatMenus.find((m) => m.id === menuId);
  },

  getFlatMenus: () => {
    const { menus } = get();
    return flattenMenus(menus);
  },
}));
