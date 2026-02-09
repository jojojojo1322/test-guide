import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface UnauthorizedPageProps {
	menuId?: string;
}

export default function UnauthorizedPage({ menuId }: UnauthorizedPageProps) {
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
				<Typography variant="h4" color="warning.main" gutterBottom>
					403
				</Typography>
				<Typography variant="h6" color="text.secondary" gutterBottom>
					접근 권한이 없습니다
				</Typography>
				{menuId && (
					<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
						메뉴 ID: {menuId}
					</Typography>
				)}
				<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
					이 페이지에 접근할 권한이 없습니다. 관리자에게 문의하세요.
				</Typography>
				<Button variant="contained" onClick={() => navigate("/")}>
					홈으로 돌아가기
				</Button>
			</Paper>
		</Box>
	);
}
