import { Box, Typography, Paper } from "@mui/material";

export default function Flight112Page() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        국제선 비행계획 (소메뉴)
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          국제선 비행계획 페이지입니다. (admin 권한 필요)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          경로: /flight-1/flight-1-1/flight-1-1-2
        </Typography>
      </Paper>
    </Box>
  );
}
