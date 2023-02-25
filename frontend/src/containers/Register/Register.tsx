import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { RegisterMutation } from '../../types';
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Layout from "../../components/Layout/Layout";

const Register = () => {
  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState(prevState => ({...prevState, [name]: value}));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Layout>
        <Container>
          <Box
            style={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={submitFormHandler} sx={{mt: 3}}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    name="username"
                    autoComplete="new-username"
                    fullWidth
                    value={state.username}
                    onChange={inputChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    fullWidth
                    value={state.password}
                    onChange={inputChangeHandler}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Layout>
    </>
  );
};

export default Register;