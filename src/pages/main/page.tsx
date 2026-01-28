import { Box, Typography, Paper, Grid } from "@mui/material";
import { useAuthStore } from "@/store/authStore";

export default function MainPage() {
  const { user, isAuthenticated, menus } = useAuthStore();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        JCPS-TR 메인
      </Typography>

      {isAuthenticated ? (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                사용자 정보
              </Typography>
              <Typography>이름: {user?.name}</Typography>
              <Typography>역할: {user?.role}</Typography>
              <Typography>권한: {user?.permission}</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                메뉴 현황
              </Typography>
              <Typography>총 메뉴 수: {menus.length}개</Typography>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Paper sx={{ p: 3 }}>
          <Typography>로그인이 필요합니다.</Typography>
        </Paper>
      )}
    </Box>
  );
}
