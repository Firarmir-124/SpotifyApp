import React from 'react';
import {AppBar, Button, Grid, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

interface Props {
  children: React.ReactNode
}

export const linksStyle:React.CSSProperties = {
  textDecoration: 'none',
  color: '#333'
}

const Layout:React.FC<Props> = ({children}) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography style={{...linksStyle, color: '#fff'}} variant="h6" component={Link} to='/' sx={{ flexGrow: 1 }}>
            Spotify
          </Typography>
          <Grid item>
            <Button component={Link} to='/register' color="inherit">Register</Button>
            <Button component={Link} to='/login' color="inherit">Login</Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;