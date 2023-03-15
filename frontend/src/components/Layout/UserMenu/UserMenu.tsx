import React, {useState} from 'react';
import {Avatar, Chip, Menu, MenuItem} from "@mui/material";
import {User} from "../../../types";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {logout} from "../../../store/userThunk";
import {apiURl} from "../../../constans";

interface Props {
  user: User
}

const UserMenu:React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  let noImage = <Avatar>{user.displayName[0]}</Avatar>;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (user.avatar) {
    noImage = <Avatar alt="Natacha" src={apiURl + '/' + user.avatar} />
  }

  return (
    <>
      <Chip
        onClick={handleClick}
        avatar={noImage}
        label={user.displayName}
        variant="outlined"
        sx={{color: '#fff'}}
      />
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to='/track_history'>Track history</MenuItem>
        <MenuItem component={Link} to='/create_executor'>Create executor</MenuItem>
        <MenuItem component={Link} to='/create_album'>Create album</MenuItem>
        <MenuItem component={Link} to='/create_track'>Create track</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;