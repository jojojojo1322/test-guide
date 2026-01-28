import { Outlet } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Container } from "@mui/material";
import { useAuthStore } from "@/store/authStore";

export default function Layout() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
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

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth={false}>
          <Outlet />
        </Container>
      </Box>

      {/* Footer (optional) */}
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) => theme.palette.grey[100],
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          © 2026 JCPS-TR
        </Typography>
      </Box>
    </Box>
  );
}
