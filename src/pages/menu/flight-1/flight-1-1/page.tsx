import { Box, Typography, Paper, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Flight11Page() {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        비행계획 (중메뉴)
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          비행계획 페이지입니다. 이 메뉴는 중메뉴이면서 페이지를 가지고, 소메뉴도 가집니다.
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/flight-1/flight-1-1/flight-1-1-1")}>
              <ListItemText primary="국내선" secondary="/flight-1/flight-1-1/flight-1-1-1" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/flight-1/flight-1-1/flight-1-1-2")}>
              <ListItemText primary="국제선 (admin only)" secondary="/flight-1/flight-1-1/flight-1-1-2" />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}
