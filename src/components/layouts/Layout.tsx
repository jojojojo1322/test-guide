import { Outlet } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useAuthStore } from "@/store/authStore";

export default function Layout() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            JCPS-TR
          </Typography>
          {isAuthenticated && user && (
            <Typography variant="body2">
              {user.name} ({user.role})
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
