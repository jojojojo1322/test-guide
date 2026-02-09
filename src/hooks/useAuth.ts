import { useCallback } from "react";
import type { MenuTree, User } from "@/models/menu";
import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
	const {
		user,
		menus,
		isAuthenticated,
		isLoading,
		setUser,
		setMenus,
		setLoading,
		logout,
		hasPermission,
		getMenuById,
		getFlatMenus,
	} = useAuthStore();

	const login = useCallback(
		(nextUser: User, nextMenus?: MenuTree) => {
			setUser(nextUser);
			if (nextMenus) {
				setMenus(nextMenus);
			}
		},
		[setMenus, setUser],
	);

	return {
		user,
		menus,
		isAuthenticated,
		isLoading,
		setUser,
		setMenus,
		setLoading,
		logout,
		login,
		hasPermission,
		getMenuById,
		getFlatMenus,
	};
};
