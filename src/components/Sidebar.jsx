// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const Sidebar = () => {
  const menuItems = [
    { text: "Thể loại", path: "/types", icon: "ri-booklet-line" },
    { text: "Loại quần áo", path: "/typeDetails", icon: "ri-t-shirt-air-line" },
    { text: "Quần áo", path: "/clothes", icon: "ri-shirt-line" },
    { text: "Size", path: "/sizes", icon: "ri-ruler-line" },
    { text: "Màu sắc", path: "/colors", icon: "ri-palette-line" },
    { text: "Biến thể", path: "/variants", icon: "ri-shape-line" },
  ];
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        zIndex: 1000,
        "& .MuiDrawer-paper": {
          width: 200,
          boxSizing: "border-box",
          backgroundColor: "#f4f4f4",
          color: "#000",
        },
      }}
    >
      <List>
        <ListItem>
          <ListItemIcon sx={{ minWidth: 30, color: "#1976d2" }}>
            <i class="ri-store-2-line"></i>
          </ListItemIcon>
          <ListItemText
            sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
            primary={"Bán quần áo"}
          />
        </ListItem>
        {menuItems.map((item) => (
          <ListItem button component={Link} to={item.path} key={item.text}>
            <ListItemIcon sx={{ minWidth: 30, color: "#1976d2" }}>
              <i className={item.icon} />
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
export default Sidebar;
