import { useCallback } from "react";
import { api } from "@/api/instance";
import { useAuthStore } from "@/store/authStore";
import type { MenuTree } from "@/models/menu";

export type MenuView = "FLIGHT" | "CABIN";

export const useMenu = () => {
  const { menus, setMenus } = useAuthStore();

  const fetchMenus = useCallback(
    async (userId: string, view?: MenuView) => {
      const params = new URLSearchParams({ userId });
      if (view) params.append("view", view);

      const response = await api.get(`/menus?${params.toString()}`);
      const data = response.data as MenuTree;
      setMenus(data);
      return data;
    },
    [setMenus]
  );

  return { menus, setMenus, fetchMenus };
};
