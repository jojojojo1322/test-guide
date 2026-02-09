// jcps-tr-be의 메뉴 API 타입 정의

export type Role = "CABIN" | "FLIGHT" | "ALL";
export type Permission = "user" | "admin";

export interface User {
	id: string;
	name: string;
	role: Role;
	permission: Permission;
}

export interface MenuItem {
	id: string;
	name: string;
	allowedPermissions: Permission[];
	children?: MenuItem[];
}

export type MenuTree = MenuItem[];

// 메뉴 트리를 평탄화 (라우팅용)
export function flattenMenus(menus: MenuItem[]): MenuItem[] {
	const result: MenuItem[] = [];

	const traverse = (items: MenuItem[]) => {
		for (const item of items) {
			result.push(item);
			if (item.children?.length) {
				traverse(item.children);
			}
		}
	};

	traverse(menus);
	return result;
}

// 배열을 객체로 변환 (키 기반 조회용)
export function arrayToObject<T>(
	array: T[],
	keyFn: (item: T) => string,
): Record<string, T> {
	return array.reduce(
		(acc, item) => {
			acc[keyFn(item)] = item;
			return acc;
		},
		{} as Record<string, T>,
	);
}
