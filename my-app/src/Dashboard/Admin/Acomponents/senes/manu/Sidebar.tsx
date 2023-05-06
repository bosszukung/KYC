import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../../Theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import CasesOutlinedIcon from '@mui/icons-material/CasesOutlined';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";



const Item = ({ title, to, icon, selected, setSelected}:
  {
    title:string; 
    to:any; 
    icon:any;
    selected:any; 
    setSelected:any;
  }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}>
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};



const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");



  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#745e44 !important",
        },
        "& .pro-menu-item.active": {
          color: "#e16f36 !important",
        },
      }}
    >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.grey[100]}>
                    ADMIN
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {/*USER*/}
            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`https://vectorified.com/images/admin-logo-icon-18.png`}
                    style={{ cursor: "pointer", borderRadius: "50%" }} />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[300]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  > Admin

                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[200]}>
                    Administrator
                  </Typography>
                </Box>
              </Box>
            )}

            {/*MENU ITEM*/}
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/dashboard"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected} />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Data
              </Typography>
              <Item
                title="Financial Institutions"
                to="#"
                icon={<AccountBalanceOutlinedIcon />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Contacts Information"
                to="#"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected} />
              <Item
                title="Cases"
                to="#"
                icon={<CasesOutlinedIcon />}
                selected={selected}
                setSelected={setSelected} />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Pages
              </Typography>
              <Item
                title="Profile Form"
                to="#"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected} />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Charts
              </Typography>
              <Item
                title="Pie Chart"
                to="#"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected} />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
  );
};

export default Sidebar;