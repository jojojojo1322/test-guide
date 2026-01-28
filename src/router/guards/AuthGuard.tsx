import type { ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";
import UnauthorizedPage from "@/pages/error/UnauthorizedPage";

type AuthGuardProps = {
  menuId: string;
  children: ReactNode;
  fallback?: ReactNode;
};

export default function AuthGuard({ menuId, children, fallback }: AuthGuardProps) {
  const hasPermission = useAuthStore((state) => state.hasPermission);

  if (!hasPermission(menuId)) {
    return <>{fallback ?? <UnauthorizedPage menuId={menuId} />}</>;
  }

  return <>{children}</>;
}
