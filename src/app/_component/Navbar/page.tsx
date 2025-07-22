"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Badge,
  InputBase,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PeopleIcon from "@mui/icons-material/People";
import HistoryIcon from "@mui/icons-material/History";

import { useSelector, useDispatch } from "react-redux";
import { store } from "@/lib/store";
import { clearData } from "@/lib/authSlice";
import { deleteCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import { UserData } from "@/lib/postsSlice";

const SearchBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f0f2f5",
  borderRadius: 20,
  padding: "4px 8px",
  width: "200px",
}));

export default function Navbar() {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { userdata } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.posts
  );

  const avatarUrl = userdata?.photo || "https://i.pravatar.cc/150";

  const router = useRouter();
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bottomNav, setBottomNav] = useState(0);

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    dispatch(UserData());
  }, []);

  if (pathname === "/login" || pathname === "/register") return null;

  const handleLogout = () => {
    dispatch(clearData());
    localStorage.removeItem("token");
    deleteCookie("token");
    router.push("/login");
  };

  const handleBottomNavChange = (newValue: number) => {
    setBottomNav(newValue);
    if (newValue === 0) router.push("/");
    if (newValue === 1) console.log("Videos");
    if (newValue === 2) console.log("Marketplace");
    if (newValue === 3) console.log("Groups");
    if (newValue === 4) console.log("Gaming");
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "white",
          color: "black",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          zIndex: 1100,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* ✅ الجزء الشمال */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              src={avatarUrl}
              sx={{
                width: 35,
                height: 35,
                ml: 1,
                cursor: "pointer",
              }}
              onClick={() => router.push("/profile")}
            />

            {!isMobile && (
              <SearchBox>
                <SearchIcon sx={{ color: "gray", mr: 1 }} />
                <InputBase
                  placeholder="Search... "
                  sx={{ fontSize: 14, width: "100%" }}
                />
              </SearchBox>
            )}
          </Box>

          {/* ✅ الجزء النصي (الأيقونات الكبيرة) يظهر فقط على الديسكتوب */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <IconButton onClick={() => router.push("/")}>
                <HomeIcon sx={{ color: "#1877f2", fontSize: 30 }} />
              </IconButton>
              <IconButton>
                <OndemandVideoIcon sx={{ color: "gray", fontSize: 30 }} />
              </IconButton>
              <IconButton>
                <StorefrontIcon sx={{ color: "gray", fontSize: 30 }} />
              </IconButton>
              <IconButton>
                <GroupsIcon sx={{ color: "gray", fontSize: 30 }} />
              </IconButton>
              <IconButton>
                <SportsEsportsIcon sx={{ color: "gray", fontSize: 30 }} />
              </IconButton>
            </Box>
          )}

          {/* ✅ الجزء اليمين */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton>
              <Badge badgeContent={3} color="error">
                <ChatIcon sx={{ color: "gray" }} />
              </Badge>
            </IconButton>

            <IconButton>
              <Badge badgeContent={5} color="error">
                <NotificationsIcon sx={{ color: "gray" }} />
              </Badge>
            </IconButton>

            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ color: "gray" }} />
            </IconButton>

            {!isMobile && (
              <IconButton onClick={handleLogout}>
                <LogoutIcon sx={{ color: "gray" }} />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ Drawer الجانبي */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 260, p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar src={avatarUrl} sx={{ width: 40, height: 40, mr: 1 }} />
            <Typography variant="subtitle1" fontWeight="bold">
              {userdata?.name || "Your Name"}
            </Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          <List>
            {/* ✅ استخدم ListItemButton بدل button */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push("/profile")}>
                <ListItemIcon>
                  <Avatar src={avatarUrl} sx={{ width: 30, height: 30 }} />
                </ListItemIcon>
                <ListItemText primary="Your Profile" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HistoryIcon sx={{ color: "#1877f2" }} />
                </ListItemIcon>
                <ListItemText primary="Memories" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <StorefrontIcon sx={{ color: "#45bd62" }} />
                </ListItemIcon>
                <ListItemText primary="Marketplace" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon sx={{ color: "#f02849" }} />
                </ListItemIcon>
                <ListItemText primary="Friends" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <OndemandVideoIcon sx={{ color: "#f7b928" }} />
                </ListItemIcon>
                <ListItemText primary="Videos" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SportsEsportsIcon sx={{ color: "#a700ff" }} />
                </ListItemIcon>
                <ListItemText primary="Gaming" />
              </ListItemButton>
            </ListItem>
          </List>

          <Divider sx={{ my: 1 }} />

          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon sx={{ color: "#555" }} />
                </ListItemIcon>
                <ListItemText primary="Settings & Privacy" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HelpOutlineIcon sx={{ color: "#555" }} />
                </ListItemIcon>
                <ListItemText primary="Help & Support" />
              </ListItemButton>
            </ListItem>
          </List>

          {isMobile && (
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "red" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          )}
        </Box>
      </Drawer>

      {/* ✅ Bottom Navigation يظهر فقط في الموبايل */}
      {isMobile && (
        <Box sx={{ position: "fixed", bottom: 0, width: "100%", zIndex: 1200 }}>
          <BottomNavigation
            value={bottomNav}
            onChange={(_, newValue) => handleBottomNavChange(newValue)}
            sx={{
              bgcolor: "white",
              borderTop: "1px solid #ddd",
              boxShadow: "0 -1px 5px rgba(0,0,0,0.05)",
            }}
          >
            <BottomNavigationAction icon={<HomeIcon />} />
            <BottomNavigationAction icon={<OndemandVideoIcon />} />
            <BottomNavigationAction icon={<StorefrontIcon />} />
            <BottomNavigationAction icon={<GroupsIcon />} />
            <BottomNavigationAction icon={<SportsEsportsIcon />} />
          </BottomNavigation>
        </Box>
      )}
    </>
  );
}
