import { lazy, type ComponentType, type LazyExoticComponent } from "react";

export interface MenuPageEntry {
  // Full folder path: "flight-1/flight-1-1/flight-1-1-1"
  folderPath: string;
  // Menu ID (last segment): "flight-1-1-1"
  menuId: string;
  // Route path: "/flight-1/flight-1-1/flight-1-1-1"
  routePath: string;
  Page: LazyExoticComponent<ComponentType<unknown>>;
}

// Dynamically collect all pages matching pages/menu/**/page.tsx pattern
// Supports nested folder structure for hierarchical menus
export const menuPages: MenuPageEntry[] = (() => {
  const modules = import.meta.glob<{ default: ComponentType<unknown> }>(
    "./**/page.tsx"
  );

  return Object.entries(modules)
    .map(([fullpath, importFn]) => {
      // "./flight-1/flight-1-1/page.tsx" -> "flight-1/flight-1-1"
      const folderPath = fullpath.replace("./", "").replace("/page.tsx", "");

      // Get menu ID (last folder segment)
      const segments = folderPath.split("/");
      const menuId = segments[segments.length - 1];

      // Route path matches folder structure
      const routePath = `/${folderPath}`;

      return {
        folderPath,
        menuId,
        routePath,
        Page: lazy(importFn),
      };
    })
    .filter(Boolean);
})();

// Returns object with menuId as key for fast lookup
export const menuPagesById: Record<string, MenuPageEntry> = menuPages.reduce(
  (acc, entry) => {
    acc[entry.menuId] = entry;
    return acc;
  },
  {} as Record<string, MenuPageEntry>
);

// Returns object with folderPath as key
export const menuPagesByPath: Record<string, MenuPageEntry> = menuPages.reduce(
  (acc, entry) => {
    acc[entry.folderPath] = entry;
    return acc;
  },
  {} as Record<string, MenuPageEntry>
);
