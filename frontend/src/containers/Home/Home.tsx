import React, {useEffect} from 'react';
import Layout from "../../components/Layout/Layout";
import {CircularProgress, Container, Grid, LinearProgress, Typography} from "@mui/material";
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
      <Container sx={{mt: 5}}>

        <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
          Исполнители
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {
            !loading ? (
              executors.map((executor) => (
                <CartExecutor key={executor._id} executor={executor}/>
              ))
            ) : <CircularProgress sx={{m: 5}}/>
          }
        </Grid>
      </Container>
    </Layout>
  );
};

export default Home;