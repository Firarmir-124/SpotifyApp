import React from 'react';
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../store/userSlice";
import UserMenu from "./UserMenu/UserMenu";
import AnonymousMenu from "./AnonymousMenu/AnonymousMenu";

interface Props {
  children: React.ReactNode
}

export const linksStyle:React.CSSProperties = {
  textDecoration: 'none',
  color: '#333'
};

const Layout:React.FC<Props> = ({children}) => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography style={{...linksStyle, color: '#fff'}} variant="h6" component={Link} to='/' sx={{ flexGrow: 1 }}>
            Spotify
          </Typography>
          <Grid item>
            {user ? (
              <UserMenu user={user}/>
            ) : <AnonymousMenu/>}
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