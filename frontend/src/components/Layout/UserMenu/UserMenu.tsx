import React, {useState} from 'react';
import {Button, Menu, MenuItem} from "@mui/material";
import {User} from "../../../types";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {logout} from "../../../store/userThunk";

interface Props {
  user: User
}

const UserMenu:React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
      >
        Hello, {user.username}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to='/track_history'>Track history</MenuItem>
        <MenuItem component={Link} to='/create_executor'>Create executor</MenuItem>
        <MenuItem component={Link} to='/create_album'>Create album</MenuItem>
        <MenuItem>Create track</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;