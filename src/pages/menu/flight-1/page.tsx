import { Box, Typography, Paper, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Flight1Page() {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        운항관리 (대메뉴)
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          운항관리 메인 페이지입니다. 하위 메뉴로 이동하세요.
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/flight-1/flight-1-1")}>
              <ListItemText primary="비행계획" secondary="/flight-1/flight-1-1" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/flight-1/flight-1-2")}>
              <ListItemText primary="운항현황" secondary="/flight-1/flight-1-2" />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}
