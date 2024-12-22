import { routeNames } from "../../app-routes/RouteNemes";
import { ImageAssets } from "../../assets";
import "./layout.css";
import { NavLink } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const sideMenus = [
    {
      id: 0,
      sideMenu: "Project-Management",
      path: routeNames.projectManagement,
    },
    {
      id: 1,
      sideMenu: "User-Management",
      path: routeNames.userManagement,
    },
  ];
  const [anchorEl, setAnchorEl] = useState(null); // Correctly typed useState
  const open = Boolean(anchorEl); // Determines if the anchor element is set

  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Sets the clicked button as the anchor
  };

  const handleClose = (actionName) => {
    console.log(actionName, "actionName");
    if (actionName === "Logout") {
      window.location.href = "/";
      localStorage.clear();
    }
    setAnchorEl(null);
  };

  return (
    <div className="layout-container">
      <div className="side-menu-container">
        <div className="icon-container">
          <img
            src={ImageAssets.task_icon}
            alt="task-management"
            className="icon-task-management"
          />
        </div>
        <div className="side-menu">
          {sideMenus.map((sideMenu, index) => (
            <NavLink
              key={index}
              to={sideMenu.path}
              className={({ isActive }) =>
                isActive ? "side-menu-active" : "side-menu-inactive"
              }
              children={(isActive) => {
                return <span>{sideMenu.sideMenu}</span>;
              }}
            />
          ))}
        </div>
      </div>
      <div className="other-container">
        <div className="header-container">
          <span>
            {location.pathname
              .split("/")
              .filter((val) => val !== "")
              .map((name, index) => {
                return (
                  <span
                    style={{
                      marginRight: "1rem",
                      fontSize: "18px",
                    }}
                    key={index}
                  >
                    {name.toUpperCase()}
                  </span>
                );
              })}
          </span>
          <SettingsIcon
            sx={{ cursor: "pointer" }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleClose("Logout")}>Logout</MenuItem>
          </Menu>
        </div>
        <div className="outlet-container">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
