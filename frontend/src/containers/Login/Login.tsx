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
  Link, Paper,
  TextField,
  Typography
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {LoginMutation} from "../../types";
import Layout from "../../components/Layout/Layout";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLoginError, selectLoginLoading} from "../../store/userSlice";
import {googleLogin, login, metaLogin} from "../../store/userThunk";
import {GoogleLogin} from "@react-oauth/google";
import FacebookLogin, {ProfileSuccessResponse} from "@greatsumini/react-facebook-login";
import {META_CLIENT_ID} from "../../constans";

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

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  const metaLoginHandler = async (profileSuccessResponse: ProfileSuccessResponse) => {
    await dispatch(metaLogin(profileSuccessResponse)).unwrap();
    navigate('/');
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

          <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3, width: '500px'}}>
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

            <Paper sx={{mt: 1}} elevation={3}>
              <Grid p='5px' justifyContent='space-between' container>
                <Grid item>
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      if (credentialResponse.credential) {
                        void googleLoginHandler(credentialResponse.credential);
                      }
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </Grid>

                <Grid item>
                  <FacebookLogin
                    appId={META_CLIENT_ID}
                    onProfileSuccess={(response) => {
                      void metaLoginHandler(response);
                    }}
                    style={{
                      backgroundColor: '#4267b2',
                      color: '#fff',
                      fontSize: '16px',
                      padding: '12px 24px',
                      border: 'none',
                      borderRadius: '4px',
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Login;