import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface NotFoundPageProps {
  menuId?: string;
}

export default function NotFoundPage({ menuId }: NotFoundPageProps) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <Paper sx={{ p: 4, textAlign: "center", maxWidth: 500 }}>
        <Typography variant="h4" gutterBottom>
          404
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          페이지를 찾을 수 없습니다
        </Typography>
        {menuId && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            메뉴 ID: {menuId}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          홈으로 돌아가기
        </Button>
      </Paper>
    </Box>
  );
}
