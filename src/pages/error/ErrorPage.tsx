import { Box, Typography, Button, Paper } from "@mui/material";
import { useRouteError, useNavigate } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError | undefined;
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Paper sx={{ p: 4, textAlign: "center", maxWidth: 500 }}>
        <Typography variant="h4" color="error" gutterBottom>
          오류 발생
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {error?.statusText || error?.message || "알 수 없는 오류가 발생했습니다."}
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          홈으로 돌아가기
        </Button>
      </Paper>
    </Box>
  );
}
