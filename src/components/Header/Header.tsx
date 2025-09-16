import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useAuth } from "../../providers/AuthProvider";

export function Header() {
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" color="inherit">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Left side: App name */}
                <Typography variant="h6" noWrap>
                    Authentication App
                </Typography>

                {/* Right side: User info */}

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ mr: 2 }}>
                        {user?.username || ""}
                    </Typography>

                    <IconButton onClick={handleMenuOpen} size="large" color="inherit">
                        <Avatar
                            alt={"User"}
                            src={""}
                            sx={{ bgcolor: "secondary.main" }}
                        />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                    >
                        <MenuItem onClick={handleMenuClose}>
                            {user?.email || "No Email"}
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleMenuClose();
                                logout();
                            }}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
