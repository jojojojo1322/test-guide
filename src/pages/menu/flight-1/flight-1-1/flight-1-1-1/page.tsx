import {
	Box,
	Button,
	Chip,
	Divider,
	Paper,
	Stack,
	Tab,
	Tabs,
	TextField,
	Typography,
} from "@mui/material";
import { useQueryState } from "@/hooks/useQueryState";
import { numberParam, stringParam } from "@/lib/queryParams";

const querySchema = {
	tab: numberParam(0, { min: 0, max: 2 }),
	from: stringParam(""),
	to: stringParam(""),
};

export default function Flight111Page() {
	const { query, setQuery, resetQuery } = useQueryState(querySchema);

	return (
		<Box>
			<Typography variant="h4" gutterBottom>
				국내선 비행계획 (소메뉴)
			</Typography>
			<Paper sx={{ p: 3 }}>
				<Typography variant="body1">국내선 비행계획 페이지입니다.</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
					경로: /flight-1/flight-1-1/flight-1-1-1
				</Typography>

				<Stack spacing={2} sx={{ mt: 3 }}>
					<Tabs
						value={query.tab}
						onChange={(_, value) => setQuery({ tab: value }, { replace: true })}
					>
						<Tab label="탭 1" value={0} />
						<Tab label="탭 2" value={1} />
						<Tab label="탭 3" value={2} />
					</Tabs>

					<Stack
						direction={{ xs: "column", sm: "row" }}
						spacing={2}
						alignItems="center"
					>
						<TextField
							label="From"
							placeholder="YYYYMMDD"
							size="small"
							value={query.from}
							onChange={(event) =>
								setQuery({ from: event.target.value }, { replace: true })
							}
						/>
						<TextField
							label="To"
							placeholder="YYYYMMDD"
							size="small"
							value={query.to}
							onChange={(event) =>
								setQuery({ to: event.target.value }, { replace: true })
							}
						/>
						<Button
							variant="outlined"
							onClick={() => resetQuery({ replace: true })}
						>
							Reset
						</Button>
					</Stack>

					<Divider />

					<Typography variant="body2" color="text.secondary">
						URL 쿼리와 화면 상태가 자동으로 동기화됩니다. (예:
						?tab=2&from=20251011&to=20251011)
					</Typography>
					<Stack direction="row" spacing={1} flexWrap="wrap">
						<Chip label={`tab=${query.tab}`} size="small" />
						<Chip label={`from=${query.from || "-"}`} size="small" />
						<Chip label={`to=${query.to || "-"}`} size="small" />
					</Stack>
				</Stack>
			</Paper>
		</Box>
	);
}
