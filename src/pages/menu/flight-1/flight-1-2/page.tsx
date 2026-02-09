import { Box, Paper, Typography } from "@mui/material";

export default function Flight12Page() {
	return (
		<Box>
			<Typography variant="h4" gutterBottom>
				운항현황 (중메뉴 - 리프)
			</Typography>
			<Paper sx={{ p: 3 }}>
				<Typography variant="body1">
					운항현황 페이지입니다. 이 메뉴는 중메뉴이지만 하위 메뉴가 없는 리프
					노드입니다.
				</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
					경로: /flight-1/flight-1-2
				</Typography>
			</Paper>
		</Box>
	);
}
