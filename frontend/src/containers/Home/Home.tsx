import React, {useEffect} from 'react';
import Layout from "../../components/Layout/Layout";
import {Chip, CircularProgress, Container, Grid, LinearProgress, Paper, Typography} from "@mui/material";
import CartExecutor from "../../components/CartExecutor/CartExecutor";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectExecutorLoading, selectExecutors} from "../../store/executorSlice";
import {fetchExecutor} from "../../store/executorThunk";

const Home = () => {
  const dispatch = useAppDispatch();
  const executors = useAppSelector(selectExecutors);
  const loading = useAppSelector(selectExecutorLoading);

  useEffect(() => {
    dispatch(fetchExecutor());
  }, [dispatch]);

  return (
    <Layout>
      <Container>
        <Chip
          sx={{my: 2, fontSize: '20px', p: 3}}
          label="Исполнители"
          variant="outlined"
          color="info"
        />

        <Paper elevation={3} sx={{minHeight: '80vh', p: 1}}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
              !loading ? (
                executors.map((executor) => (
                  <CartExecutor key={executor._id} executor={executor}/>
                ))
              ) : <CircularProgress sx={{m: 5}}/>
            }
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Home;