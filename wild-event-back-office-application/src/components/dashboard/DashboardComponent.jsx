import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "@mui/material"

import {
	Drawer,
	Box,
	Toolbar,
	List,
	Divider,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material"

import LogoutIcon from "@mui/icons-material/Logout"
import itemList from "./DashboardElements"

export const DashboardComponent = () => {
	const isMd = useMediaQuery(theme => theme.breakpoints.up("md"))
	const isLg = useMediaQuery(theme => theme.breakpoints.up("lg"))

	const drawerWidth = isMd ? 300 : isLg ? 350 : 240
	const minFontSize = 16
	const maxFontSizeMd = 30
	const maxFontSizeLg = 30
	const fontSizeScale = isMd
		? maxFontSizeMd
		: isLg
		? maxFontSizeLg
		: minFontSize

	const navigate = useNavigate()

	const handleItemClick = path => {
		navigate(path)
	}

	const handleLogoutClick = () => {
		navigate("/logout")
	}

	return (
		<>
			<Drawer
				variant='permanent'
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}>
				<Toolbar />
				<Box sx={{ overflow: "auto" }}>
					<List>
						{itemList.map(item => (
							<ListItem key={item.text} disablePadding>
								<ListItemButton onClick={() => handleItemClick(item.path)}>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText
										primary={item.text}
										sx={{
											fontSize: fontSizeScale,
										}}
									/>
								</ListItemButton>
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						<ListItemButton onClick={handleLogoutClick}>
							<ListItemIcon>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText primary='Logout' />
						</ListItemButton>
					</List>
				</Box>
			</Drawer>
		</>
	)
}
