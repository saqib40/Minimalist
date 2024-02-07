import React from "react";
import styled from '@emotion/styled';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { AddCircleOutline, SubjectOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { format } from "date-fns";
import Avatar from '@mui/material/Avatar';

const drawerWidth = "240px";

const StyledPage = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  padding: 24px;
  margin-top: 64px;
`;
const StyledRoot = styled.div`
  display: flex;
`;

// Layout is the component which wraps other component, children represnets children/nested components
export default function Layout({children}) {
    console.log("Hii this is layout component");
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            text: "My Notes",
            icon: <SubjectOutlined color="primary"/>,
            path: "/view"
        },
        {
            text: "Create Note",
            icon: <AddCircleOutline color="primary"/>,
            path: "/create"
        }
    ];

    return(
        <StyledRoot> {/* sx = {{backgroundColor: "red", width: "100%"}} this can't be understood by react */}
        <AppBar
         sx={{
            width: `calc(100% - ${drawerWidth})`,
            backgroundColor: "#f9f9f9",
            color: "black"
         }}
         elevation={0}
        >
            <Toolbar>
                <Typography sx={{flexGrow: 1}}>
                    Today is the {format(new Date(), "do MMMM y")}
                </Typography>
                <Typography> {/* Here goes the user name who's logged in */}
                    Mario
                </Typography>
                <Avatar src="mario-av.png" sx={{marginLeft: "16px"}}/>
            </Toolbar>
        </AppBar>
        <Drawer
          sx = {{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
                width: drawerWidth
              },
            }}
          variant="permanent"
          anchor="left"
        >
            <div>
                <Typography variant="h5" sx={{padding: "20px"}}>
                    Minimalist Notes
                </Typography>
            </div>

            {/* List/Links */}
            <List>
                {menuItems.map(item => (
                    <ListItem
                     key={item.text}
                     sx = {location.pathname === item.path ? {backgroundColor: "#f4f4f4"} : null}
                    >
                        <ListItemButton
                         disableRipple
                         sx={{
                            '&:hover': {
                                backgroundColor: '#f4f4f4',
                              }
                         }}
                         onClick={() => navigate(item.path)}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Drawer>
        <StyledPage>
            {children}
        </StyledPage>
        </StyledRoot>
    );
}