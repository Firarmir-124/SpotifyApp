import React from 'react';
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

interface Props {
  children: React.ReactNode
}

const Layout:React.FC<Props> = ({children}) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to='/' sx={{ flexGrow: 1 }}>
            Spotify
          </Typography>
          <Button component={Link} to='/register' color="inherit">Sign up</Button>
        </Toolbar>
      </AppBar>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;