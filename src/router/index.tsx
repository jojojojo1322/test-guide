import { useMemo, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { menuPagesById } from "@/pages/menu/scan";
import Layout from "@/components/layouts/Layout";
import type { MenuItem } from "@/models/menu";
import AuthGuard from "@/router/guards/AuthGuard";

// Page components
import MainPage from "@/pages/main/page";
import NotFoundPage from "@/pages/error/NotFoundPage";
import UnauthorizedPage from "@/pages/error/UnauthorizedPage";
import ErrorPage from "@/pages/error/ErrorPage";

// Loading component
const PageLoading = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      padding: "2rem",
    }}
  >
    Loading...
  </div>
);

// Build route path from menu hierarchy
// e.g., ["flight-1", "flight-1-1", "flight-1-1-1"] -> "/flight-1/flight-1-1/flight-1-1-1"
const buildRoutePath = (menuPath: string[]): string => {
  return "/" + menuPath.join("/");
};

// Recursively build routes from menu tree
const buildMenuRoutes = (menus: MenuItem[], parentPath: string[]): RouteObject[] => {
  const routes: RouteObject[] = [];

  for (const menu of menus) {
    const currentPath = [...parentPath, menu.id];
    const routePath = buildRoutePath(currentPath);
    const pageEntry = menuPagesById[menu.id];
    // If page exists for this menu, create route
    if (pageEntry) {
      const PageComponent = pageEntry.Page;

      routes.push({
        path: routePath,
        element: (
          <AuthGuard menuId={menu.id}>
            <Suspense fallback={<PageLoading />}>
              <PageComponent />
            </Suspense>
          </AuthGuard>
        ),
      });
    }

    // Recursively process children (regardless of whether current menu has a page)
    if (menu.children?.length) {
      const childRoutes = buildMenuRoutes(menu.children, currentPath);
      routes.push(...childRoutes);
    }
  }

  return routes;
};

export default function Router() {
  const { menus, isAuthenticated } = useAuthStore();

  // Build dynamic routes from menu tree
  const menuRoutes = useMemo<RouteObject[]>(() => {
    if (!isAuthenticated || !menus.length) {
      return [];
    }

    return buildMenuRoutes(menus, []);
  }, [isAuthenticated, menus]);

  // Create router
  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          ...menuRoutes,
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
      {
        path: "/error",
        element: <ErrorPage />,
      },
      {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
      },
    ]);
  }, [menuRoutes]);

  return <RouterProvider router={router} />;
}
