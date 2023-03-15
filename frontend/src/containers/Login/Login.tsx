import React, { useState } from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {LoginMutation} from "../../types";
import Layout from "../../components/Layout/Layout";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLoginError, selectLoginLoading} from "../../store/userSlice";
import {login} from "../../store/userThunk";
import {GoogleLogin} from "@react-oauth/google";

const Login = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoginLoading);
  const navigate = useNavigate();

  const [state, setState] = useState<LoginMutation>({
    username: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => ({...prevState, [name]: value}));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(login(state)).unwrap();
      navigate('/');
    } catch (e) {
      setState({
        username: '',
        password: '',
      });
    }
  };

  return (
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
            <LockOpenIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mt: 2}}>
              {error.error}
            </Alert>
          )}

          <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
            <Box sx={{ pb: 2 }}>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse)
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  name="username"
                  autoComplete="current-username"
                  fullWidth
                  value={state.username}
                  onChange={inputChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
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
              disabled={loading}
            >
              {!loading ? 'Sign In' : <CircularProgress size={27}/>}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  Or sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Login;